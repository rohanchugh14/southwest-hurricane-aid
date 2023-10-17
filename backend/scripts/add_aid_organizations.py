import requests


def get_orgs():
    url = "https://gis.fema.gov/arcgis/rest/services/NSS/FEMA_NSS/FeatureServer/5/query?where=state%20%3D%20'TX'&outFields=shelter_name,address_1,city,state,zip,ada_compliant,wheelchair_accessible,generator_onsite,self_sufficient_electricity,in_surge_slosh_area,org_organization_name,org_main_phone,org_email,score,in_100_yr_floodplain,county_parish,status&outSR=4326&f=json"
    data = requests.get(url).json()
    
    features = data["features"]
    
    final_data = []
    
    for feature in features:
        longitude = feature["geometry"]["x"]
        latitude = feature["geometry"]["y"]
        
        if(longitude > -97.86 and longitude < -93.29
           and latitude > 25.76 and latitude < 30.338):
            attributes = feature["attributes"]
            
            attributes["longitude"] = longitude
            attributes["latitude"] = latitude
            
            final_data.append(attributes)
        
    
    incorrect = 0
    for feature in final_data:
        
        response = requests.post("http://localhost:4000/api/aid_organizations", json=feature)
        if(response.status_code != 201):
            incorrect += 1
            print(feature)
            
    print("incorrect: " + str(incorrect))


if __name__=="__main__": 
    get_orgs()