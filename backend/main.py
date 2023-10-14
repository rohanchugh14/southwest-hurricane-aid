import os
from flask import Flask, Blueprint, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from models import db
from models.hurricane import Hurricane
from models.aidorganization import AidOrganization
from flask_cors import CORS
app = Flask(__name__)
cors = CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URI']

# Initialize the database
db.init_app(app)



api_bp = Blueprint('api', __name__, url_prefix='/api')

@app.route('/')
def index():
    return "Hello world!"

@api_bp.route('/endpoint')
def endpoint_function():
    return "Response from /api/endpoint"

@api_bp.route('/hurricanes/<int:id>', methods=['GET'])
def get_hurricane_by_id(id):
    hurricane = Hurricane.query.get(id)
    if not hurricane:
        return jsonify({"error": "Hurricane not found"}), 404
    return jsonify(hurricane.serialize())

@api_bp.route('/hurricanes', methods=['POST'])
def add_hurricane():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No input data provided"}), 400
    # Validate data here (e.g., check if all required fields are present)
    print(data)
    new_hurricane = Hurricane(
        name=data['name'],
        url=data['url'],
        formed=data.get('formed'),
        image=data['image'],
        caption=data['caption'],
        dissipated=data.get('dissipated'),
        category=data['category'],
        highest_winds=data.get('highest_winds'),
        lowest_pressure=data.get('lowest_pressure'),
        deaths=data['deaths'],
        damage=data['damage'],
        areas_affected=data['areas_affected'],
        counties_mentioned=data['counties_mentioned']
    )

    db.session.add(new_hurricane)
    db.session.commit()

    return jsonify(new_hurricane.serialize()), 201



@api_bp.route('/aidorganizations/<int:id>', methods=['GET'])
def get_organization_by_id(id):
    org = AidOrganization.query.get(id)
    if not org:
        return jsonify({"error": "Hurricane not found"}), 404
    return jsonify(org.serialize())



@api_bp.route('/aidorganizations', methods=['POST'])
def add_organization():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No input data provided"}), 400
    # Validate data here (e.g., check if all required fields are present)
    print(data)
    
    new_org = AidOrganization(
        shelter_name = data['shelter_name'],
        address_1 = data['address_1'],
        city = data['city'],
        state = data['state'],
        zipcode = data['zip'],
        ada_compliant = data['ada_compliant'],
        wheelchair_accessible = data['wheelchair_accessible'],
        generator_onsite = data['generator_onsite'],
        self_sufficient_electricity = data['self_sufficient_electricity'],
        in_surge_slosh_area = data['in_surge_slosh_area'],
        org_organization_name = data['org_organization_name'],
        org_main_phone = data['org_main_phone'],
        org_email = data['org_email'],
        score = data['score'],
        in_100_yr_floodplain = data['in_100_yr_floodplain'],
        status = data['status'],
        longitude = data['longitude'],
        latitude = data['latitude']
    )

    db.session.add(new_org)
    db.session.commit()

    return jsonify(new_org.serialize()), 201

app.register_blueprint(api_bp)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=4000)