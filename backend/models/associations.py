from . import db
hurricane_county_associations = db.Table('hurricane_county_associations',
    db.Column('hurricane_id', db.Integer, db.ForeignKey('hurricanes.id')),
    db.Column('county_id', db.Integer, db.ForeignKey('counties.id'))
)