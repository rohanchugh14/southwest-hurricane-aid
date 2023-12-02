from . import db
from .associations import hurricane_county_associations
class Hurricane(db.Model):
    __tablename__ = 'hurricanes'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False, info={'fulltext_indexed': True})
    url = db.Column(db.String(500), unique=True, nullable=False)
    formed = db.Column(db.Date, nullable=True, info={'fulltext_indexed': True})
    image = db.Column(db.String(500), nullable=False)
    caption = db.Column(db.String(500), nullable=False, info={'fulltext_indexed': True})
    dissipated = db.Column(db.Date, nullable=True, info={'fulltext_indexed': True})
    category = db.Column(db.Integer, nullable=False, info={'fulltext_indexed': True})
    highest_winds = db.Column(db.String(50), nullable=True, info={'fulltext_indexed': True})
    highest_winds_mph = db.Column(db.Integer, nullable=True, info={'fulltext_indexed': True})
    lowest_pressure = db.Column(db.String(50), nullable=True, info={'fulltext_indexed': True})
    lowest_pressure_mbar = db.Column(db.Integer, nullable=True, info={'fulltext_indexed': True})
    deaths = db.Column(db.String(200), nullable=True, info={'fulltext_indexed': True})
    deaths_number = db.Column(db.Integer, nullable=True, info={'fulltext_indexed': True})
    damage = db.Column(db.String(100), nullable=True, info={'fulltext_indexed': True})
    damage_number = db.Column(db.Float, nullable=True, info={'fulltext_indexed': True})
    areas_affected = db.Column(db.String(500), nullable=False, info={'fulltext_indexed': True})
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