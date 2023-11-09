**Link to Website**

https://southwesthurricaneaid.me/

**Link to API**

https://api.southwesthurricaneaid.me/api 

**Canvas / Ed Discussion group number:**
- Group 21

**Names of the team members**
- Eshitha Bangray
- James Aidan Stewart
- Carolyn Stripling
- Rohan Chugh
- Nitish Bansal


**Name of the project**
- Southwest Hurricane Aid

**The proposed project**
- Providing aid to those living in hurricane-prone areas

**Phase Leaders**

Phase 1: Rohan Chugh \
Phase 2: Carolyn Stripling

Phase leader responsibilities: Setting up and leading meetings

**Estimated vs Actual Time**

Phase 1: \
Estimated time: 10 hours \
Actual time: 15 hours

Phase 2: \
Estimated time: 15 hours \
Actual time: 20 hours

User Stories for Phase 2 \
Estimated time: 1 hour \
Actual time: 1 hour

**Git SHA**
46d421796096784bde7e4fe534afa95ed8d45faa

**URLs of at least three data sources that you will programmatically scrape using a RESTful API (be very sure about this)**
- https://www.weather.gov/documentation/services-web-api 
- https://en.wikipedia.org/api/rest_v1/ (We will use this to access both county data and hurricane data)
- https://hifld-geoplatform.opendata.arcgis.com/datasets/geoplatform::national-shelter-system-facilities/about
- https://public.opendatasoft.com/explore/dataset/us-county-boundaries/table/?flg=en-us&disjunctive.statefp&disjunctive.countyfp&disjunctive.name&disjunctive.namelsad&disjunctive.stusab&disjunctive.state_name


**At least three models**
- Historic Hurricane data
- Texas Counties
- Aid Organizations (food, volunteer, Emergency Shelters)


**An estimate of the number of instances of each model**
- Hurricane data: 91
- Texas counties: 254
- Aid Organizations: 746


**Each model must have many attributes**

- Historic Hurricane data
    - Category
    - Name
    - Date
    - Counties affected
    - Image
    - Wind speeds
    - Fatalities

- Texas Counties
    - Name
    - Population
    - Land Area
    - Map Data (image)
    - Established
    - County Seat
    - Historic Hurricane Hits
    - Aid Organizations

- Aid Organizations
    - Name
    - Address
    - Map Data (longitude/latitude)
    - County
    - Organization Name
    - Score
    - Hurricanes


**Describe five of those attributes for each model that you can filter or sort
Instances of each model must connect to instances of at least two other models**

We can filter and sort by all of the attributes listed.

**Instances of each model must be rich with different media (e.g., feeds, images, maps, text, videos, etc.) (be very sure about this)
Describe two types of media for instances of each model**

- Historic Hurricane data: Images, Text
- Texas Counties: Images, Text
- Aid Organizations: Maps, Text



**Describe three questions that your site will answer**
- Do I live in an area that is susceptible to hurricanes?
- If my area is damaged by a hurricane or tropical storm, where can I find relief?
- How is the area I live in affected by hurricanes or tropical storms?

**Postman API Documentation**
https://documenter.getpostman.com/view/18568319/2s9YR9YsEf

**Postman API Collection and Tests**
https://www.postman.com/material-pilot-15383947/workspace/southwest-hurricane-aid/collection/18568319-9b3b1a6a-ba7d-439a-aed3-4ce06860e4e0?action=share&creator=18568319


**Comments**

Our final commit pipeline will be on prod instead of main.
We did this because we were running out of pipeline minutes.