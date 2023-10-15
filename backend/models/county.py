from . import db
class County(db.Model):
    __tablename__ = 'counties'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    est = db.Column(db.String(500), nullable=False)
    population = db.Column(db.String(100), nullable=True)
    area = db.Column(db.String(500), nullable=False)
    map = db.Column(db.String(500), nullable=False)
    def __repr__(self):
        return '<County %r>' % self.name
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'est': self.est,
            'population': self.population,
            'area': self.area,
            'map': self.map,
        }