from bs4 import BeautifulSoup
import requests
from typing import List
from typing import Dict
from scrape_wikipedia_hurricane_links import get_valid_links
import json


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
        data["name"] = hurricane_name

        # get the image
        image_src = "https:" + hurricane_table.find('img')["src"]
        image_caption = hurricane_table.find(
            'div', class_="infobox-caption").text
        data["image_src"] = image_src
        data["image_caption"] = image_caption

        # get the hurricane data from the table
        rows = hurricane_table.findAll('tr')

        for row in rows:
            if(row.find(class_="infobox-label") is not None):

                row_label = row.find(class_="infobox-label").text
                row_data = row.find(class_="infobox-data").text

                data[row_label] = row_data

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


def scrape_all(urls: List[str]):
    data = []
    all_towns_in_texas = get_all_towns_in_texas()
    counties_by_city_texas = get_counties_by_town()

    # get the data
    for url in urls:
        article_data = scrape_article(url, all_towns_in_texas, counties_by_city_texas)
        if article_data is not None:
            data.append(article_data)

    print(f"Data size: {len(data)}")

    with open('hurricane_data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


if __name__=="__main__": 
    scrape_all(get_valid_links())

