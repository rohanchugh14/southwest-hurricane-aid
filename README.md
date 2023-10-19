**Link to Website**

https://southwesthurricaneaid.me/

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

Phase 1: Rohan Chugh

**Estimated vs Actual Time**

Estimated time: 10 hours \
Actual time: 15 hours

**Git SHA**
da4e55ba6e071b6313ff76b08b3157331cd8aad8

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
- Hurricane data: 80
- Texas counties: 100
- Aid Organizations: 300


**Each model must have many attributes**

- Historic Hurricane data
    - Category
    - Wind speeds
    - Fatalities
    - Locations affected
    - Description of the hurricane

- Texas Counties
    - Land Area
    - Elevation
    - Flood risk
    - Population
    - Historic Hurricane Hits (number/names)

- Aid Organizations
    - Facility Type (food, volunteer, shelter)
    - Capacity
    - Status
    - Address
    - Phone


**Describe five of those attributes for each model that you can filter or sort
Instances of each model must connect to instances of at least two other models**



**Instances of each model must be rich with different media (e.g., feeds, images, maps, text, videos, etc.) (be very sure about this)
Describe two types of media for instances of each model**

- Historic Hurricane data: Maps, Graphs/ charts
- Texas Counties: Images, Maps
- Aid Organizations: Maps, list of services 



**Describe three questions that your site will answer**
- Do I live in an area that is susceptible to hurricanes?
- If my area is damaged by a hurricane or tropical storm, where can I find relief?
- How is the area I live in affected by hurricanes or tropical storms?

**Postman API Documentation**
https://documenter.getpostman.com/view/18568319/2s9YJZ3PeF

**Postman API Collection and Tests**
https://www.postman.com/material-pilot-15383947/workspace/southwest-hurricane-aid/collection/18568319-9b3b1a6a-ba7d-439a-aed3-4ce06860e4e0?action=share&creator=18568319