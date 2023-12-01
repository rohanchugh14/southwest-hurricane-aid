import os
import logging
from flask import Flask, Blueprint, jsonify, request, url_for, current_app
from flask_sqlalchemy import SQLAlchemy
from models import db
from models.hurricane import Hurricane
from dateutil import parser
from models.aid_organization import AidOrganization
from models.county import County
from sqlalchemy import func, desc, or_, String, cast
from datetime import date, datetime
from flask_cors import CORS
from sqlalchemy import func, or_, text
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

# @api_bp.route('/counties/search/<string:name>', methods=['GET'])
# def search_county(name):
#     search_query = text("SELECT * FROM county WHERE to_tsvector('english', name) @@ to_tsquery('english', :name)")
#     result = db.engine.execute(search_query, name=name)
#     county = result.first()
#     if not county:
#         current_app.logger.info(f"County not found: {name}")
#         return jsonify({"error": "County not found"}), 404
#     return jsonify({"county_id": county.id})


## THIS ONE WORKS
# @api_bp.route('/aid_organizations/search/<string:name>', methods=['GET'])
# def search_aid_organization(name):
#     # Using PostgreSQL Full-Text Search
#     search_query = text(
#         "SELECT * FROM aid_organizations WHERE to_tsvector('english', shelter_name) @@ to_tsquery('english', :name)"
#     )
#     with db.session.begin():
#         result = db.session.execute(search_query, {'name': name})

#         organizations = []
#         for row in result:
#             dict_row = row._asdict()
#             organizations.append(dict_row)
#             # Manually instantiate your model
#             # model_instance = AidOrganization(**row_dict)
#             # organizations.append(model_instance.serialize())
#         if not organizations:
#             return jsonify({"error": "No matching organizations found"}), 404
#         return jsonify(organizations)

@api_bp.route('/aid_organizations/search', methods=['GET'])
def search_aid_organization():
    name = request.args.get('name', '')
    query = AidOrganization.query.filter(AidOrganization.shelter_name.ilike(f'%{name}%'))
    organizations = query.all()

    if not organizations:
        return jsonify({"error": "No matching organizations found"}), 404

    return jsonify([org.serialize() for org in organizations])

@api_bp.route('/hurricanes/search', methods=['GET'])
def search_hurricane():
    name = request.args.get('name', '')
    query = Hurricane.query.filter(Hurricane.name.ilike(f'%{name}%'))
    hurricanes = query.all()

    if not hurricanes:
        return jsonify({"error": "No matching hurricanes found"}), 404

    return jsonify([hurricane.serialize() for hurricane in hurricanes])

@api_bp.route('/search/<string:query>', methods=['GET'])
def global_search(query):
    aid_org_query = text("""
        SELECT * FROM aid_organizations 
        WHERE to_tsvector('english', shelter_name || ' ' || address_1 || ' ' || city || ' ' || state || ' ' || zipcode || ' ' || org_organization_name) 
        @@ to_tsquery('english', :query)
    """)
    hurricane_query = text("""
        SELECT * FROM hurricanes 
        WHERE to_tsvector('english', name || ' ' || caption || ' ' || highest_winds || ' ' || lowest_pressure || ' ' || deaths || ' ' || damage || ' ' || areas_affected) 
        @@ to_tsquery('english', :query)
    """)
    county_query = text("""
        SELECT * FROM counties 
        WHERE to_tsvector('english', name || ' ' || county_seat) 
        @@ to_tsquery('english', :query)
    """)

    results = {}
    with db.session.begin():
        aid_org_results = db.session.execute(aid_org_query, {'query': query})
        results['aid_organizations'] = [row._asdict() for row in aid_org_results]
        hurricane_results = db.session.execute(hurricane_query, {'query': query})
        results['hurricanes'] = [row._asdict() for row in hurricane_results]
        county_results = db.session.execute(county_query, {'query': query})
        results['counties'] = [row._asdict() for row in county_results]

    if all(not results[key] for key in results):
        return jsonify({"error": "No matching records found"}), 404

    return jsonify(results)

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
    category = int(request.args.get('category', 0))
    search_criteria = request.args.get('search_criteria', '')
    descending = request.args.get('desc', 'false')
    order_by = request.args.get('order_by', "")
    filter_criteria = request.args.get('filter_by', "")
    filter_direction = request.args.get('filter_direction', "")
    filter_value = request.args.get('filter_value', "")
    
    #get the correct name for order_by that matches the model
    if(order_by.lower() == "deaths" or order_by.lower() == "fatalities"):
        order_by = "deaths_number"
    elif(order_by.replace(" ", "").lower() == "highestwinds"):
        order_by = "highest_winds_mph"
    elif(order_by.replace(" ","").lower() == "lowestpressure"):
        order_by = "lowest_pressure_mbar"
    elif(order_by.lower() == "damage"):
        order_by = "damage_number"
        
        
    #get the correct name for filter criteria that matches the model
    if(filter_criteria.lower() == "deaths" or filter_criteria.lower() == "fatalities"):
        filter_criteria = "deaths_number"
    elif(filter_criteria.replace(" ", "").lower() == "highestwinds"):
        filter_criteria = "highest_winds_mph"
    elif(filter_criteria.replace(" ","").lower() == "lowestpressure"):
        filter_criteria = "lowest_pressure_mbar"
    elif(filter_criteria.lower() == "damage"):
        filter_criteria = "damage_number"
        
    paginated_hurricanes = Hurricane.query
    
    # #filter by =
    # if category != 0:
    #     paginated_hurricanes = paginated_hurricanes.filter_by(category=category)
    
    #search for a term
    if(search_criteria != ""):
        
        paginated_hurricanes = paginated_hurricanes.filter(
            or_(
                func.replace(Hurricane.name, ' ', '').ilike(f"%{search_criteria.replace(' ', '')}%"),
                func.replace(Hurricane.caption, ' ', '').ilike(f"%{search_criteria.replace(' ', '')}%"),
                func.replace(Hurricane.highest_winds, ' ', '').ilike(f"%{search_criteria.replace(' ', '')}%"),
                func.replace(Hurricane.lowest_pressure, ' ', '').ilike(f"%{search_criteria.replace(' ', '')}%"),
                func.replace(Hurricane.highest_winds, ' ', '').ilike(f"%{search_criteria.replace(' ', '')}%"),
                func.replace(Hurricane.deaths, ' ', '').ilike(f"%{search_criteria.replace(' ', '')}%"),
                func.replace(Hurricane.damage, ' ', '').ilike(f"%{search_criteria.replace(' ', '')}%"),
                func.replace(Hurricane.areas_affected, ' ', '').ilike(f"%{search_criteria.replace(' ', '')}%"),
            )
        )
    
    # filter by >, =, <
    if(filter_criteria != "" and filter_direction != "" and filter_value != ""):
        if(filter_direction == ">"):
            paginated_hurricanes = paginated_hurricanes.filter(getattr(Hurricane, filter_criteria) > int(filter_value))
        elif(filter_direction == "<"):
            paginated_hurricanes = paginated_hurricanes.filter(getattr(Hurricane, filter_criteria) < int(filter_value))
        else:
            paginated_hurricanes = paginated_hurricanes.filter(getattr(Hurricane, filter_criteria) == int(filter_value))


    
    if(order_by != ""):
        if(descending == 'true'):
            paginated_hurricanes = paginated_hurricanes.order_by(desc(getattr(Hurricane, order_by)))
        else:
            paginated_hurricanes = paginated_hurricanes.order_by(getattr(Hurricane, order_by))
            
    
    
        
    
    paginated_hurricanes = paginated_hurricanes  \
        .paginate( \
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
        # formed= datetime.strptime(data.get('formed'), r"%B %d, %Y").date(),       
        # # dissipated=datetime.strptime(data.get('dissipated'), r"%B %d, %Y").date(),

@api_bp.route('/hurricanes', methods=['POST'])
def add_hurricane():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No input data provided"}), 400
    county_ids = data.get('county_ids', [])
    counties = County.query.filter(County.id.in_(county_ids)).all()
    

    formed_date = "01-01-0001"
    dissipated_date = "01-01-0001"
    
    formed = data.get("formed").split("(")[0]
    dissipated = data.get("dissipated").split("(")[0]

    #remove all space after the year
    try:
        formed_date = parser.parse(formed, fuzzy=True).date()
        dissipated_date = parser.parse(dissipated, fuzzy=True).date()
    except ValueError:
        pass

    
    
    new_hurricane = Hurricane(
        name=data['name'],
        url=data['url'],
        formed=formed_date,
        image=data['image'],
        caption=data['caption'],
        dissipated=dissipated_date,
        category=data['category'],
        highest_winds=data.get('highest_winds'),
        highest_winds_mph=data.get('highest_winds_mph'),
        lowest_pressure=data.get('lowest_pressure'),
        lowest_pressure_mbar=data.get('lowest_pressure_mbar'),
        deaths=data['deaths'],
        deaths_number=data['deaths_number'],
        damage=data['damage'],
        damage_number=data['damage_number'],
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
    
    search_criteria = request.args.get('search_criteria', '')
    descending = request.args.get('desc', 'false')
    order_by = request.args.get('order_by', "")
    filter_criteria = request.args.get('filter_by', "")
    filter_direction = request.args.get('filter_direction', "")
    filter_value = request.args.get('filter_value', "")
    
    paginated_organizations = AidOrganization.query

    if(search_criteria != ""):
    
        paginated_organizations = paginated_organizations.filter(
            or_(
                func.replace(AidOrganization.shelter_name, ' ', '').ilike(f"%{search_criteria.replace(' ', '')}%"),
                func.replace(AidOrganization.address_1, ' ', '').ilike(f"%{search_criteria.replace(' ', '')}%"),
                func.replace(AidOrganization.city, ' ', '').ilike(f"%{search_criteria.replace(' ', '')}%"),
                func.replace(AidOrganization.state, ' ', '').ilike(f"%{search_criteria.replace(' ', '')}%"),
                func.replace(AidOrganization.zipcode, ' ', '').ilike(f"%{search_criteria.replace(' ', '')}%"),
                func.replace(AidOrganization.org_organization_name, ' ', '').ilike(f"%{search_criteria.replace(' ', '')}%"),
                cast(AidOrganization.score, String).ilike(f"%{search_criteria.replace(' ', '')}%"),
                func.replace(AidOrganization.status, ' ', '').ilike(f"%{search_criteria.replace(' ', '')}%")
            )
        )

    # filter by >, =, <
    if(filter_criteria != "" and filter_direction != "" and filter_value != ""):
        if(filter_direction == ">"):
            paginated_organizations = paginated_organizations.filter(getattr(AidOrganization, filter_criteria) > int(filter_value))
        elif(filter_direction == "<"):
            paginated_organizations= paginated_organizations.filter(getattr(AidOrganization, filter_criteria) < int(filter_value))
        else:
            paginated_organizations = paginated_organizations.filter(getattr(AidOrganization, filter_criteria) == int(filter_value))

    
    if(order_by != ""):
        if(descending == 'true'):
            paginated_organizations = paginated_organizations.order_by(desc(getattr(AidOrganization, order_by)))
        else:
            paginated_organizations = paginated_organizations.order_by(getattr(AidOrganization, order_by))
            
    
    paginated_organizations = paginated_organizations.paginate(
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
    include_hurricanes = True if request.args.get('include_hurricanes') != None else False
    include_orgs= True if request.args.get('include_orgs') != None else False
    search_criteria = request.args.get('search_criteria', '')
    descending = request.args.get('desc', 'false')
    order_by = request.args.get('order_by', "")
    filter_criteria = request.args.get('filter_by', "")
    filter_direction = request.args.get('filter_direction', "")
    filter_value = request.args.get('filter_value', "")
    
        
    paginated_counties = County.query
    
    # #filter by =
    # if category != 0:
    #     paginated_hurricanes = paginated_hurricanes.filter_by(category=category)
    
    #search for a term
    if(search_criteria != ""):
        
        paginated_counties = paginated_counties.filter(
            or_(
                func.replace(County.name, ' ', '').ilike(f"%{search_criteria.replace(' ', '')}%"),
                func.replace(County.county_seat, ' ', '').ilike(f"%{search_criteria.replace(' ', '')}%"),
                cast(County.area, String).ilike(f"%{search_criteria.replace(' ', '')}%"),
                cast(County.population, String).ilike(f"%{search_criteria.replace(' ', '')}%"),
                cast(County.est, String).ilike(f"%{search_criteria.replace(' ', '')}%")
            )
        )

    # filter by >, =, <
    if(filter_criteria != "" and filter_direction != "" and filter_value != ""):
        if(filter_direction == ">"):
            paginated_counties = paginated_counties.filter(getattr(County, filter_criteria) > int(filter_value))
        elif(filter_direction == "<"):
            paginated_counties= paginated_counties.filter(getattr(County, filter_criteria) < int(filter_value))
        else:
            paginated_counties = paginated_counties.filter(getattr(County, filter_criteria) == int(filter_value))


    
    if(order_by != ""):
        if(descending == 'true'):
            paginated_counties = paginated_counties.order_by(desc(getattr(County, order_by)))
        else:
            paginated_counties = paginated_counties.order_by(getattr(County, order_by))
            
    
    
    
    paginated_counties = paginated_counties.paginate(
        page=page, per_page=per_page, error_out=False)
    counties = []
    for c in paginated_counties.items :
        county = c.serialize()
        if include_hurricanes :
            county['hurricanes'] = [{'name': h.name, 'id': h.id} for h in c.hurricanes]
        if include_orgs :
            county['aid_organizations'] = [{'shelter_name': a.shelter_name, 'id': a.id} for a in c.aid_organizations]
        counties.append(county)
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
