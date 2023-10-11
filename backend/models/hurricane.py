from . import db
class Hurricane(db.Model):
    __tablename__ = 'hurricanes'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    url = db.Column(db.String(500), unique=True, nullable=False)
    formed = db.Column(db.String(100), nullable=True)
    image = db.Column(db.String(500), nullable=False)
    caption = db.Column(db.String(500), nullable=False)
    dissipated = db.Column(db.String(100), nullable=True)
    category = db.Column(db.Integer, nullable=False)
    highest_winds = db.Column(db.String(50), nullable=True)
    lowest_pressure = db.Column(db.String(50), nullable=True)
    deaths = db.Column(db.String(200), nullable=True)
    damage = db.Column(db.String(100), nullable=True)
    areas_affected = db.Column(db.String(500), nullable=False)
    counties_mentioned = db.Column(db.String(500), nullable=False)
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
            'lowest_pressure': self.lowest_pressure,
            'deaths': self.deaths,
            'damage': self.damage,
            'areas_affected': self.areas_affected,
            'counties_mentioned': self.counties_mentioned
        }