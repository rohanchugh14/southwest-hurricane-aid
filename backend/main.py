import os
import logging
from flask import Flask, Blueprint, jsonify, request, url_for, current_app
from flask_sqlalchemy import SQLAlchemy
from models import db
from models.hurricane import Hurricane
from models.aid_organization import AidOrganization
from models.county import County
from sqlalchemy import func
from flask_cors import CORS
app = Flask(__name__)
cors = CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URI']
app.logger.setLevel(logging.INFO)
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
    res = hurricane.serialize()
    res['counties'] = [c.serialize() for c in hurricane.counties]
    return jsonify(res)


@api_bp.route('/hurricanes', methods=['GET'])
def get_hurricanes():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 10))
    paginated_hurricanes = Hurricane.query.paginate(
        page=page, per_page=per_page, error_out=False)
    hurricanes = []
    for h in paginated_hurricanes.items:
        curr_hurricane = h.serialize()
        print(h)
        print(type(h))
        curr_hurricane["counties"] = [c.serialize() for c in h.counties]
        hurricanes.append(curr_hurricane)
    return jsonify({
        'hurricanes': hurricanes,
        'total_pages': paginated_hurricanes.pages,
        'current_page': paginated_hurricanes.page,
        'next_page_url': paginated_hurricanes.next_num and url_for('api.get_hurricanes', page=paginated_hurricanes.next_num, _external=True) or None,
        'prev_page_url': paginated_hurricanes.prev_num and url_for('api.get_hurricanes', page=paginated_hurricanes.prev_num, _external=True) or None,
    })


@api_bp.route('/hurricanes', methods=['POST'])
def add_hurricane():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No input data provided"}), 400
    county_ids = data.get('county_ids', [])
    counties = County.query.filter(County.id.in_(county_ids)).all()
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
        counties=counties
    )

    db.session.add(new_hurricane)
    db.session.commit()

    return jsonify(new_hurricane.serialize()), 201


@api_bp.route('/aid_organizations/<int:id>', methods=['GET'])
def get_organization_by_id(id):
    org = AidOrganization.query.get(id)
    if not org:
        return jsonify({"error": "Hurricane not found"}), 404
    res = org.serialize()
    # add all hurricanes that ocurred in the county
    res['hurricanes'] = [{'name': h.name, 'id': h.id} for h in org.county.hurricanes]
    return jsonify(res)


@api_bp.route('/aid_organizations', methods=['GET'])
def get_aid_organizations():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 10))
    paginated_organizations = AidOrganization.query.paginate(
        page=page, per_page=per_page, error_out=False)

    organizations = [a.serialize() for a in paginated_organizations.items]
    return jsonify({
        'aid_organizations': organizations,
        'total_pages': paginated_organizations.pages,
        'current_page': paginated_organizations.page,
        'next_page_url': paginated_organizations.next_num and url_for('api.get_aid_organizations', page=paginated_organizations.next_num, _external=True) or None,
        'prev_page_url': paginated_organizations.prev_num and url_for('api.get_aid_organizations', page=paginated_organizations.prev_num, _external=True) or None,
    })


@api_bp.route('/aid_organizations', methods=['POST'])
def add_organization():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No input data provided"}), 400

    new_org = AidOrganization(
        shelter_name=data['shelter_name'],
        address_1=data['address_1'],
        city=data['city'],
        state=data['state'],
        zipcode=data['zip'],
        ada_compliant=data['ada_compliant'],
        wheelchair_accessible=data['wheelchair_accessible'],
        generator_onsite=data['generator_onsite'],
        self_sufficient_electricity=data['self_sufficient_electricity'],
        in_surge_slosh_area=data['in_surge_slosh_area'],
        org_organization_name=data['org_organization_name'],
        org_main_phone=data['org_main_phone'],
        org_email=data['org_email'],
        score=data['score'],
        in_100_yr_floodplain=data['in_100_yr_floodplain'],
        status=data['status'],
        longitude=data['longitude'],
        latitude=data['latitude'],
        county_id=data['county_id']
    )

    db.session.add(new_org)
    db.session.commit()

    return jsonify(new_org.serialize()), 201


@api_bp.route('/counties/<int:id>', methods=['GET'])
def get_county_by_id(id):
    county = County.query.get(id)
    if not county:
        return jsonify({"error": "County not found"}), 404
    res = county.serialize()
    res['hurricanes'] = [{'name': h.name, 'id': h.id} for h in county.hurricanes]
    res['aid_organizations'] = [{'shelter_name': a.shelter_name, 'id': a.id} for a in county.aid_organizations]
    return jsonify(res)


@api_bp.route('/counties', methods=['GET'])
def get_counties():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 10))
    paginated_counties = County.query.paginate(
        page=page, per_page=per_page, error_out=False)

    counties = [c.serialize() for c in paginated_counties.items]
    return jsonify({
        'counties': counties,
        'total_pages': paginated_counties.pages,
        'current_page': paginated_counties.page,
        'next_page_url': paginated_counties.next_num and url_for('api.get_counties', page=paginated_counties.next_num, _external=True) or None,
        'prev_page_url': paginated_counties.prev_num and url_for('api.get_counties', page=paginated_counties.prev_num, _external=True) or None,
    })


@api_bp.route('/counties', methods=['POST'])
def add_county():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No input data provided"}), 400
    # Validate data here (e.g., check if all required fields are present)
    print(data)
    new_county = County(
        name=data['name'],
        county_seat=data['county_seat'],
        est=data['est'],
        population=data['population'],
        area=data['area'],
        map=data['map'],
    )

    db.session.add(new_county)
    db.session.commit()

    return jsonify(new_county.serialize()), 201


@api_bp.route('/counties/search/<string:name>', methods=['GET'])
def search_county(name):
    county = County.query.filter(func.replace(
        County.name, ' ', '').ilike(f"%{name.replace(' ', '')}%")).first()
    if not county:
        current_app.logger.info(f"County not found: {name}")
        return jsonify({"error": "County not found"}), 404
    return jsonify({"county_id": county.id})


app.register_blueprint(api_bp)
with app.app_context():
    db.create_all()
