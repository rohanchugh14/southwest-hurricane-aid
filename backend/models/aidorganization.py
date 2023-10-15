from . import db
class AidOrganization(db.Model):
    __tablename__ = 'aidorganizations'
    id = db.Column(db.Integer, primary_key=True)
    shelter_name = db.Column(db.String(200), nullable=True)
    address_1 = db.Column(db.String(700), nullable=True)
    city = db.Column(db.String(100), nullable=True)
    state = db.Column(db.String(500), nullable=True)
    county_parish = db.Column(db.String(500), nullable=True)
    zipcode = db.Column(db.String(500), nullable=True)
    ada_compliant = db.Column(db.String(100), nullable=True)
    wheelchair_accessible = db.Column(db.String(100), nullable=True)
    generator_onsite = db.Column(db.String(50), nullable=True)
    self_sufficient_electricity = db.Column(db.String(50), nullable=True)
    in_surge_slosh_area = db.Column(db.String(100), nullable=True)
    org_organization_name = db.Column(db.String(500), nullable=True)
    org_main_phone = db.Column(db.String(500), nullable=True)
    org_email = db.Column(db.String(700), nullable=True)
    score = db.Column(db.Integer, nullable=True)
    in_100_yr_floodplain = db.Column(db.String(500), nullable=True)
    status = db.Column(db.String(500), nullable=True)
    longitude = db.Column(db.Float, nullable=True)
    latitude = db.Column(db.Float, nullable=True)
    
    def __repr__(self):
        return '<AidOrganization %r>' % self.name
    def serialize(self):
        return {
            'id': self.id,
            'shelter_name': self.shelter_name,
            'address_1': self.address_1,
            'city': self.city,
            'state': self.state,
            'county_parish': self.county_parish,
            'zip': self.zipcode,
            'ada_compliant': self.ada_compliant,
            'wheelchair_accessible': self.wheelchair_accessible,
            'generator_onsite': self.generator_onsite,
            'self_sufficient_electricity': self.self_sufficient_electricity,
            'in_surge_slosh_area': self.in_surge_slosh_area,
            'org_organization_name': self.org_organization_name,
            'org_main_phone': self.org_main_phone,
            'org_email': self.org_email,
            'score': self.score,
            'in_100_yr_floodplain': self.in_100_yr_floodplain,
            'status': self.status,
            'longitude': self.longitude,
            'latitude': self.latitude
        }