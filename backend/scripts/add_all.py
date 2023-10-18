from add_aid_organizations import get_orgs
from add_county_data import get_all_counties_in_texas
from scrape_wikipedia_hurricane_article import get_all_hurricanes

if __name__=="__main__": 
    print("Adding counties...")
    get_all_counties_in_texas()
    print("Adding aid organizations...")
    get_orgs()
    print("Adding hurricanes...")
    get_all_hurricanes()