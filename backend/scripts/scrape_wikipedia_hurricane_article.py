from bs4 import BeautifulSoup
import requests
from typing import List
from typing import Dict
from scrape_wikipedia_hurricane_links import get_valid_links
import json
import re
import urllib.parse


def towns_in_text(towns: List[str], text: str) -> List[str]:
    towns_in_text = []
    for word in towns:
        if word in text:
            towns_in_text.append(word)
    return towns_in_text


def get_all_towns_in_texas() -> List[str]:

    towns_names = []
    towns_url = "https://en.wikipedia.org/wiki/List_of_municipalities_in_Texas"
    towns_page = requests.get(towns_url)
    towns_soup = BeautifulSoup(towns_page.content, "html.parser")

    towns_table = towns_soup.find('table')

    rows = towns_table.findAll('tr')

    for row in rows:
        # get all columns for this row
        cols = row.findAll('td')
        if(len(cols) >= 2):
            city_name = cols[1].find('a')
            if(city_name is not None):
                towns_names.append(city_name.text)

    return towns_names


def get_counties_by_town() -> Dict[str, List[str]]:
    
    counties_by_town = {}
    towns_url = "https://en.wikipedia.org/wiki/List_of_municipalities_in_Texas"
    towns_page = requests.get(towns_url)
    towns_soup = BeautifulSoup(towns_page.content, "html.parser")

    towns_table = towns_soup.find('table')

    rows = towns_table.findAll('tr')

    for row in rows:
        # get all columns for this row
        cols = row.findAll('td')
        
        if(len(cols) >= 5):
            #get the name of this town
            town_name = cols[1].find('a')
            
            if town_name is not None:
                
                counties_for_this_town = []
            
                primary_county = cols[3].find('a')
                secondary_counties = cols[4].findAll('a')
                
                #add primary county to list
                if(primary_county is not None):
                    counties_for_this_town.append(primary_county.text)
                    
                #add secondary counties to list, if they exist
                if(secondary_counties is not None):
                    for county in secondary_counties:
                        counties_for_this_town.append(county.text)
                
                
                counties_by_town[town_name.text] = counties_for_this_town

    return counties_by_town


def scrape_article(url: str, all_towns_in_texas: List[str], counties_by_city: Dict[str, List[str]]) -> dict:
    try:

        data = {}
        data["url"] = url
        page = requests.get(url)
        soup = BeautifulSoup(page.content, "html.parser")

        # find the
        hurricane_table = soup.find('table', class_="infobox ib-weather-event")

        # get the name of the hurricane
        hurricane_name = hurricane_table.find(
            'caption', class_='infobox-title').text
        data["name"] = hurricane_name.replace("\xa0", " ").replace("&nbsp;", " ")

        # get the image
        image_src = "https:" + hurricane_table.find('img')["src"]
        image_caption = hurricane_table.find(
            'div', class_="infobox-caption").text
        data["image_src"] = image_src
        data["image_caption"] = image_caption.replace("\xa0", " ").replace("&nbsp;", " ")

        # get the hurricane data from the table
        rows = hurricane_table.findAll('tr')

        for row in rows:
            if(row.find(class_="infobox-label") is not None):

                row_label = row.find(class_="infobox-label").text.replace("&nbsp;", " ").replace("\xa0", " ")
                row_data = row.find(class_="infobox-data").text.replace("&nbsp;", " ").replace("\xa0", " ")
                data[row_label] = row_data
            elif row.find(class_="infobox-header") is not None:
                span = row.find('span')
                if not span:
                    continue
                if "depression" in span.text.lower():
                    data["category"] = -1 # tropical depression
                elif "storm" in span.text.lower():
                    data["category"] = 0 # tropical storm
                elif "category" in span.text.lower():
                    data["category"] = int(span.text[len("Category "):len("Category ") + 1])

        # Get the cities/towns mentioned in the article
        try:

            article_body = soup.findAll("p")
            article_body_text = ""
            for p in article_body:
                article_body_text += p.text

            towns_mentioned = towns_in_text(
                all_towns_in_texas, article_body_text)
            
            counties_mentioned = []
            for town in towns_mentioned:
                counties_mentioned += counties_by_city[town]
                
            # towns_mentioned_text = ','.join(towns_mentioned)
            
            counties_mentioned_text = ','.join(list(set(counties_mentioned)))

            data["counties_mentioned"] = counties_mentioned_text
            # data["towns_mentioned"] = towns_mentioned_text
            
        except:
            data["counties_mentioned"] = "N/A"

        return data
    except:
        print("couldn't find all the data for this URL")
        print(url)
        return None


def get_dollar_amount_from_string(s):
    damage_mil_regex = r'\$([\d,.]+) million'
    damage_mil_search = re.search(damage_mil_regex, s)
    
    if(damage_mil_search is not None):
        return float(damage_mil_search.group(1).replace(',', '')) * 1000000
    
    damage_bil_regex = r'\$([\d,.]+) billion'
    damage_bil_search = re.search(damage_bil_regex, s)
    
    if(damage_bil_search is not None):
        return float(damage_bil_search.group(1).replace(',', '')) * 1000000000
    
    damage_regex = r'\$([\d,.]+)'
    damage_search = re.search(damage_regex, s)
    if(damage_search is not None):
        return float(damage_search.group(1).replace(',', ''))
    
    return 0.0
    
    


def scrape_all(urls: List[str]):
    data = []
    all_towns_in_texas = get_all_towns_in_texas()
    counties_by_city_texas = get_counties_by_town()

    # get the data
    for url in urls:
        article_data = scrape_article(url, all_towns_in_texas, counties_by_city_texas)
        if article_data is not None:
            data.append(article_data)
    # UNCOMMENT BELOW TO WRITE TO FILE
    # with open('hurricane_data.json', 'w', encoding='utf-8') as f:
    #     json.dump(data, f, ensure_ascii=False, indent=4)
    print(f"Data size: {len(data)}")
    for hurricane in data:
        # make a POST request to http://localhost:4000/api/hurricanes
        # remove newlines from counties_mentioned
        hurricane["counties_mentioned"] = hurricane["counties_mentioned"].replace("\n", "")
        county_ids = []
        for county in hurricane["counties_mentioned"].split(","):
            encoded_county_name = urllib.parse.quote(county)
            county_id = requests.get(f"http://localhost:4000/api/counties/search/{encoded_county_name}").json()
            if("county_id" not in county_id):
                print("county not found: " + county)
                print(hurricane["name"])
                print(hurricane["url"])
            else:
                county_ids.append(county_id["county_id"])
        # print(county_ids, hurricane["counties_mentioned"])
        first_number_regex = r'\d+'
        
        highest_winds_mph = 0
        lowest_pressure_mbar = 0
        deaths_number = 0
        damage_number = 0.0
        
        if hurricane.get("Highest winds") is not None:
            highest_winds_mph = re.search(first_number_regex, hurricane.get("Highest winds").replace(',', '')).group()
            
        if hurricane.get("Lowest pressure") is not None:
            lowest_pressure_mbar = re.search(first_number_regex, hurricane.get("Lowest pressure").replace(',','')).group()
            
        if(hurricane.get("Fatalities") is not None):
            deaths_search = re.search(first_number_regex, hurricane.get("Fatalities").replace(',',''))
            if(deaths_search is not None):
                try:
                    deaths_number = float(deaths_search.group())
                except:
                    pass
                
        if(hurricane.get("Damage") is not None):
            damage_number = get_dollar_amount_from_string(hurricane.get("Damage"))
                
            
        
        

        json_data = {
            "name": hurricane["name"],
            "url": hurricane["url"],
            "formed": hurricane.get("Formed"),
            "image": hurricane["image_src"],
            "caption": hurricane["image_caption"],
            "dissipated": hurricane.get("Dissipated"),
            "category": hurricane["category"],
            "highest_winds": hurricane.get("Highest winds"),
            "highest_winds_mph": highest_winds_mph,
            "lowest_pressure": hurricane.get("Lowest pressure"),
            "lowest_pressure_mbar": lowest_pressure_mbar,
            "deaths": hurricane.get("Fatalities"),
            "deaths_number": deaths_number,
            "damage": hurricane.get("Damage"),
            "damage_number": damage_number,
            "areas_affected": hurricane["Areas affected"],
            "counties_mentioned": hurricane["counties_mentioned"],
            "county_ids": county_ids
        }
        response = requests.post("http://localhost:4000/api/hurricanes", json=json_data)
        if(response.status_code != 201):
            print(f"Error adding hurricane {hurricane['name']} to database")
            print(response.text)


def get_all_hurricanes():
    scrape_all(get_valid_links())


if __name__=="__main__": 
    get_all_hurricanes()

