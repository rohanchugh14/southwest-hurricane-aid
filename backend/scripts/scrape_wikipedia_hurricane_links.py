from bs4 import BeautifulSoup
import requests
from typing import List
import re


def get_valid_links() -> List[str]:
    
    url = 'https://en.wikipedia.org/wiki/Category:Hurricanes_in_Texas'
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")


    hurricane_pages = soup.find(id="mw-pages")

    hurricane_links = hurricane_pages.find_all("a")

    valid_link_regex = "^((?!(List|Categorization)).)*$"

    valid_links = []

    for link in hurricane_links:
        href = link["href"]
        if(re.search(valid_link_regex, href)):
            valid_links.append(href)
    





