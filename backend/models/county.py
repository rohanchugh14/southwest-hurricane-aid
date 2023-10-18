from . import db
from .associations import hurricane_county_associations
from sqlalchemy.orm import relationship
class County(db.Model):
    __tablename__ = 'counties'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    county_seat = db.Column(db.String(500), nullable=False)
    est = db.Column(db.Integer, nullable=False)
    population = db.Column(db.Integer, nullable=False)
    area = db.Column(db.Integer, nullable=False)
    map = db.Column(db.String(500), nullable=False)
    aid_organizations = relationship('AidOrganization', backref='county')
    hurricanes = relationship('Hurricane', secondary=hurricane_county_associations, back_populates='counties')
    def __repr__(self):
        return '<County %r>' % self.name
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'county_seat': self.county_seat,
            'est': self.est,
            'population': self.population,
            'area': self.area,
            'map': self.map,
        }