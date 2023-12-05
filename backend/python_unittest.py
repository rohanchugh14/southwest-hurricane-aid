import unittest
from main import app, db, Hurricane, add_hurricane
import main

class TestEndpoints(unittest.TestCase) :

    def setUp(self) :
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.app_context = app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_add_hurricane(self) :
        with app.test_request_context(json={
            'name': "test",
            'url': "test_url",
            'formed': "0000",
            'image': "test_image",
            'caption': "self.caption",
            'dissipated': "self.dissipated",
            'category': 1,
            'highest_winds': "self.highest_winds",
            'lowest_pressure': "self.lowest_pressure",
            'deaths': "self.deaths",
            'damage': "self.damage",
            'areas_affected': "self.areas_affected",
            'counties': ["test_county"],
            'highest_winds_mph': 1,
            'lowest_pressure_mbar': 1,
            'deaths_number': 1,
            'damage_number': 1.0
        }):
            response, status_code = add_hurricane()

        self.assertEqual(status_code, 201)
        data = response.get_json()
        self.assertEqual(data["name"], "test")

        hurricane = Hurricane.query.first()
        self.assertIsNotNone(hurricane)
        self.assertEqual(hurricane.name, "test")
    
    
    def test_get_hurricane_by_id(self) :
        with app.test_request_context(json={
            'name': "test",
            'url': "test_url",
            'formed': "0000",
            'image': "test_image",
            'caption': "self.caption",
            'dissipated': "self.dissipated",
            'category': 1,
            'highest_winds': "self.highest_winds",
            'lowest_pressure': "self.lowest_pressure",
            'deaths': "self.deaths",
            'damage': "self.damage",
            'areas_affected': "self.areas_affected",
            'counties': ["test_county"],
            'highest_winds_mph': 1,
            'lowest_pressure_mbar': 1,
            'deaths_number': 1,
            'damage_number': 1.0
        }):
            response, status_code = add_hurricane()
            self.assertEqual(main.get_hurricane_by_id(1).json['name'], 'test')
        

    def test_get_hurricanes(self) :
        with app.test_request_context(json={
            'name': "test",
            'url': "test_url",
            'formed': "0000",
            'image': "test_image",
            'caption': "self.caption",
            'dissipated': "self.dissipated",
            'category': 1,
            'highest_winds': "self.highest_winds",
            'lowest_pressure': "self.lowest_pressure",
            'deaths': "self.deaths",
            'damage': "self.damage",
            'areas_affected': "Houston",
            'counties': ["test_county"],
            'highest_winds_mph': 1,
            'lowest_pressure_mbar': 1,
            'deaths_number': 1,
            'damage_number': 1.0
        }):
            response, status_code = add_hurricane()
            with app.test_request_context('/api/hurricanes?page=1&per_page=10&search_criteria=houston&desc=false&order_by=category&filter_by=category&filter_direction=>&filter_value=-1') :
                self.assertEqual(main.get_hurricanes().json['total_pages'], 1)
                self.assertIsNone(main.get_hurricanes().json['next_page_url'])
                self.assertEqual(main.get_hurricanes().json['hurricanes'][0]['name'], 'test')


    def test_add_organization(self) :
        with app.test_request_context(json={
            'name': "test_county",
            'county_seat': "seat",
            'est': 0000,
            'population': 0,
            'area': 0,
            'map': "map"
        }):
            response, status_code = main.add_county()


        with app.test_request_context(json={
            'shelter_name': "test",
            'address_1': "address_1",
            'city': "city",
            'state': "state",
            'county': "county",
            'zip': "00000",
            'ada_compliant': "yes",
            'wheelchair_accessible': "yes",
            'generator_onsite': "yes",
            'self_sufficient_electricity': "yes",
            'in_surge_slosh_area': "self.in_surge_slosh_area",
            'org_organization_name': "self.org_organization_name",
            'org_main_phone': "self.org_main_phone",
            'org_email': "self.org_email",
            'score': 1,
            'in_100_yr_floodplain': "self.in_100_yr_floodplain",
            'status': "self.status",
            'longitude': 1.0,
            'latitude': 2.0,
            'county_id': 1
        }):
            response, status_code = main.add_organization()

        self.assertEqual(status_code, 201)
        data = response.get_json()
        self.assertEqual(data["shelter_name"], "test")

        org = main.AidOrganization.query.first()
        self.assertIsNotNone(org)
        self.assertEqual(org.shelter_name, "test")
    
    
    def test_get_aid_organization_by_id(self) :
        with app.test_request_context(json={
            'name': "test_county",
            'county_seat': "seat",
            'est': 0000,
            'population': 0,
            'area': 0,
            'map': "map"
        }):
            response, status_code = main.add_county()

        with app.test_request_context(json={
            'shelter_name': "test school",
            'address_1': "address_1",
            'city': "city",
            'state': "state",
            'county': "county",
            'zip': "00000",
            'ada_compliant': "yes",
            'wheelchair_accessible': "yes",
            'generator_onsite': "yes",
            'self_sufficient_electricity': "yes",
            'in_surge_slosh_area': "self.in_surge_slosh_area",
            'org_organization_name': "self.org_organization_name",
            'org_main_phone': "self.org_main_phone",
            'org_email': "self.org_email",
            'score': 90,
            'in_100_yr_floodplain': "self.in_100_yr_floodplain",
            'status': "self.status",
            'longitude': 1.0,
            'latitude': 2.0,
            'county_id': 1
        }):
            response, status_code = main.add_organization()
            with app.test_request_context('api/aid_organizations?page=2&per_page=10&search_criteria=school&desc=false&order_by=score&filter_by=score&filter_direction=>&filter_value=80'):
                self.assertEqual(main.get_organization_by_id(1).json['shelter_name'], 'test school')
        

    def test_get_aid_organizations(self) :
        with app.test_request_context(json={
            'name': "test_county",
            'county_seat': "seat",
            'est': 0000,
            'population': 0,
            'area': 0,
            'map': "map"
        }):
            response, status_code = main.add_county()
    
        with app.test_request_context(json={
            'name': "test_county",
            'county_seat': "seat",
            'est': 0000,
            'population': 0,
            'area': 0,
            'map': "map"
        }):
            response, status_code = main.add_county()


        with app.test_request_context(json={
            'shelter_name': "test",
            'address_1': "address_1",
            'city': "city",
            'state': "state",
            'county': "county",
            'zip': "00000",
            'ada_compliant': "yes",
            'wheelchair_accessible': "yes",
            'generator_onsite': "yes",
            'self_sufficient_electricity': "yes",
            'in_surge_slosh_area': "self.in_surge_slosh_area",
            'org_organization_name': "self.org_organization_name",
            'org_main_phone': "self.org_main_phone",
            'org_email': "self.org_email",
            'score': 1,
            'in_100_yr_floodplain': "self.in_100_yr_floodplain",
            'status': "self.status",
            'longitude': 1.0,
            'latitude': 2.0,
            'county_id': 1
        }):
            response, status_code = main.add_organization()


            self.assertEqual(main.get_aid_organizations().json['total_pages'], 1)
            self.assertIsNone(main.get_aid_organizations().json['next_page_url'])
            self.assertEqual(main.get_aid_organizations().json['aid_organizations'][0]['shelter_name'], 'test')

    def search_aid_organization(self) :
        with app.test_request_context(json={
            'shelter_name': "test",
            'address_1': "address_1",
            'city': "city",
            'state': "state",
            'county': "county",
            'zip': "00000",
            'ada_compliant': "yes",
            'wheelchair_accessible': "yes",
            'generator_onsite': "yes",
            'self_sufficient_electricity': "yes",
            'in_surge_slosh_area': "self.in_surge_slosh_area",
            'org_organization_name': "self.org_organization_name",
            'org_main_phone': "self.org_main_phone",
            'org_email': "self.org_email",
            'score': 1,
            'in_100_yr_floodplain': "self.in_100_yr_floodplain",
            'status': "self.status",
            'longitude': 1.0,
            'latitude': 2.0,
            'county_id': 1
        }):
            response, status_code = main.add_organization()
            result = main.search_county('test')
            self.assertEqual(result.json['county_id'], 1)
            self.assertEqual(main.get_county_by_id(result.json['county_id']).json['latitude'], response.json['latitude'])
        
    def test_add_county(self) :
        with app.test_request_context(json={
            'name': "test_county",
            'county_seat': "seat",
            'est': 0000,
            'population': 0,
            'area': 0,
            'map': "map"
        }):
            response, status_code = main.add_county()
        
        self.assertEqual(status_code, 201)
        data = response.get_json()
        self.assertEqual(data["name"], "test_county")

        county = main.County.query.first()
        self.assertIsNotNone(county)
        self.assertEqual(county.name, "test_county")

    def test_get_county_by_id(self) :
        with app.test_request_context(json={
            'name': "test_county",
            'county_seat': "seat",
            'est': 0000,
            'population': 0,
            'area': 10,
            'map': "map"
        }):
            response, status_code = main.add_county()
            with app.test_request_context('api/counties?page=1&per_page=10&search_criteria=county&desc=true&order_by=population&filter_by=area&filter_direction=<&filter_value=2000') :
                self.assertEqual(main.get_county_by_id(1).json['name'], 'test_county')

    def test_get_counties(self) :
        with app.test_request_context(json={
            'name': "test_county",
            'county_seat': "seat",
            'est': 0000,
            'population': 0,
            'area': 0,
            'map': "map"
        }):
            response, status_code = main.add_county()
            self.assertEqual(main.get_counties().json['total_pages'], 1)
            self.assertIsNone(main.get_counties().json['next_page_url'])
            self.assertEqual(main.get_counties().json['counties'][0]['name'], 'test_county')

    def test_search_county(self) :
        with app.test_request_context(json={
            'name': "test_county",
            'county_seat': "seat",
            'est': 0000,
            'population': 0,
            'area': 0,
            'map': "map"
        }):
            response, status_code = main.add_county()
            result = main.search_county('test_county')
            self.assertEqual(result.json['county_id'], 1)
            self.assertEqual(main.get_county_by_id(result.json['county_id']).json['est'], response.json['est'])
    



if __name__ == '__main__' :
    unittest.main()