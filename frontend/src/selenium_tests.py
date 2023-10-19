# import all required frameworks
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
import time

# inherit TestCase Class and create a new test class

base_url = "http://localhost:3000"

class SeleniumTests(unittest.TestCase):

    # initialization of webdriver
    def setUp(self):
        self.driver = webdriver.Chrome()


    # Test case method. It should always start with test_
    def test_title_correct(self):

        # get driver
        driver = self.driver
        # get python.org using selenium
        driver.get(base_url)

        # assertion to confirm if title has python keyword in it
        self.assertIn("Southwest Hurricane Aid", driver.title)
        
    

    def test_nav_about(self):
        
        #get the driver
        driver = self.driver
        
        driver.get(base_url)

        #go to the about link on the navbar
        path = f"//a[@href='/About']"
        
        link= driver.find_element(By.XPATH, path)
        
        #make sure the element is not None
        self.assertIsNotNone(link)
        
        #click on the link to the about page
        link.click()
        
        #make sure that the link took us to the correct page
        self.assertEquals(driver.current_url, f"{base_url}/About")
        
    def test_nav_hurricane(self):
        
        #get the driver
        driver = self.driver
        
        driver.get(base_url)

        #go to the about link on the navbar
        path = f"//a[@href='/Hurricanes/1']"
        
        link= driver.find_element(By.XPATH, path)
        
        #make sure the element is not None
        self.assertIsNotNone(link)
        
        #click on the link to the about page
        link.click()
        
        #make sure that the link took us to the correct page
        self.assertEquals(driver.current_url, f"{base_url}/Hurricanes/1")
        
    def test_nav_counties(self):
         #get the driver
        driver = self.driver
        
        driver.get(base_url)

        #go to the about link on the navbar
        path = f"//a[@href='/Counties/1']"
        
        link= driver.find_element(By.XPATH, path)
        
        #make sure the element is not None
        self.assertIsNotNone(link)
        
        #click on the link to the about page
        link.click()
        
        #make sure that the link took us to the correct page
        self.assertEquals(driver.current_url, f"{base_url}/Counties/1")
        
    def test_nav_orgs(self):
         #get the driver
        driver = self.driver
        
        driver.get(base_url)

        #go to the about link on the navbar
        path = f"//a[@href='/Aid Organizations/1']"
        
        link= driver.find_element(By.XPATH, path)
        
        #make sure the element is not None
        self.assertIsNotNone(link)
        
        #click on the link to the about page
        link.click()
        
        #make sure that the link took us to the correct page
        self.assertEquals(driver.current_url, f"{base_url}/Aid%20Organizations/1")
    
    
    
    def test_hurricane_instance_back(self):
        driver = self.driver
        
        #go to a hurricane instance
        driver.get(f"{base_url}/Hurricanes/HurricaneInstances/5")
        
        #get the link to go back
        back_link = WebDriverWait(self.driver, 10)\
            .until(expected_conditions.element_to_be_clickable((By.CSS_SELECTOR, 'a.back-button'))) 
        
        #click the link
        back_link.click()
        
        #make sure we went to the right place
        self.assertEqual(driver.current_url, f"{base_url}/Hurricanes/1")
        
    
        
    def test_hurricane_instance_to_county(self):
        driver = self.driver
        
        #go to a hurricane instance
        driver.get(f"{base_url}/Hurricanes/HurricaneInstances/5")
        
        #get the link to go to a county
        back_link = WebDriverWait(self.driver, 10)\
            .until(expected_conditions.element_to_be_clickable((By.CSS_SELECTOR, 'div.MuiGrid-root a'))) 
        
        #click the link
        back_link.click()
        
        #make sure we went to the right place
        self.assertIn( f"{base_url}/Counties/CountyInstances", driver.current_url)
        
    def test_county_back(self):
        
        driver = self.driver
        
        #go to a hurricane instance
        driver.get(f"{base_url}/Counties/CountyInstances/5")
        
        #get the link to go to a county
        back_link = WebDriverWait(self.driver, 10)\
            .until(expected_conditions.element_to_be_clickable((By.CSS_SELECTOR, 'a.back-button'))) 
        
        #click the link
        back_link.click()
        
        #make sure we went to the right place
        self.assertIn( f"{base_url}/Counties/", driver.current_url)

        
    
    
    def test_aid_back(self):
        driver = self.driver
        
        #go to a hurricane instance
        driver.get(f"{base_url}/Aid%20Organizations/AidOrganizationInstances/5")
        
        #get the link to go to a county
        back_link = WebDriverWait(self.driver, 10)\
            .until(expected_conditions.element_to_be_clickable((By.CSS_SELECTOR, 'a.back-button'))) 
        
        #click the link
        back_link.click()
        
        #make sure we went to the right place
        self.assertIn( f"{base_url}/Aid%20Organizations/", driver.current_url)
        
        
    
    def test_org_to_county(self):
        driver = self.driver
        
        #go to a hurricane instance
        driver.get(f"{base_url}/Aid%20Organizations/AidOrganizationInstances/5")
        
        
        #get the link to go to a county
        WebDriverWait(self.driver, 10)\
            .until(expected_conditions.text_to_be_present_in_element((By.CSS_SELECTOR, 'p.MuiTypography-body1 a'), 'County')) 
        
        
        link = driver.find_element(By.CSS_SELECTOR, 'p.MuiTypography-body1 a')
        
        print(link.get_attribute('href'))
        
        #click the link
        link.click()
        
        #make sure we went to the right place
        self.assertIn( f"{base_url}/Counties/CountyInstances/", driver.current_url)
        
        

    # cleanup method called after every test performed

    def tearDown(self):
        self.driver.close()


# execute the script
if __name__ == "__main__":
    unittest.main()
