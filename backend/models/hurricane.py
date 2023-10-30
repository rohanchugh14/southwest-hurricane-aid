from . import db
from .associations import hurricane_county_associations
class Hurricane(db.Model):
    __tablename__ = 'hurricanes'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    url = db.Column(db.String(500), unique=True, nullable=False)
    formed = db.Column(db.Date, nullable=True)
    image = db.Column(db.String(500), nullable=False)
    caption = db.Column(db.String(500), nullable=False)
    dissipated = db.Column(db.Date, nullable=True)
    category = db.Column(db.Integer, nullable=False)
    highest_winds = db.Column(db.String(50), nullable=True)
    highest_winds_mph = db.Column(db.Integer, nullable=True)
    lowest_pressure = db.Column(db.String(50), nullable=True)
    lowest_pressure_mbar = db.Column(db.Integer, nullable=True)
    deaths = db.Column(db.String(200), nullable=True)
    deaths_number = db.Column(db.Integer, nullable=True)
    damage = db.Column(db.String(100), nullable=True)
    damage_number = db.Column(db.Float, nullable=True)
    areas_affected = db.Column(db.String(500), nullable=False)
    counties = db.relationship('County', secondary=hurricane_county_associations, back_populates='hurricanes')
    def __repr__(self):
        return '<Hurricane %r>' % self.name
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'url': self.url,
            'formed': self.formed,
            'image': self.image,
            'caption': self.caption,
            'dissipated': self.dissipated,
            'category': self.category,
            'highest_winds': self.highest_winds,
            'highest_winds_mph': self.highest_winds_mph,
            'lowest_pressure': self.lowest_pressure,
            'lowest_pressure_mbar': self.lowest_pressure_mbar,
            'deaths': self.deaths,
            'deaths_number': self.deaths_number,
            'damage': self.damage,
            'damage_number': self.damage_number,
            'areas_affected': self.areas_affected,
        }