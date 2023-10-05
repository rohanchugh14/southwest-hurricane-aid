import os
from flask import Flask, Blueprint
from flask_sqlalchemy import SQLAlchemy
# from flask_restless import APIManager
# import flask_restless

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URI']

# Initialize the database
db = SQLAlchemy(app)

# Your models and database setup here

# Initialize Flask-Restless after defining the models
# api_manager = APIManager(app, flask_sqlalchemy_db=db)

# Now, set up your routes and blueprints
api_bp = Blueprint('api', __name__, url_prefix='/api')

@api_bp.route('/endpoint')
def endpoint_function():
    return "Response from /api/endpoint"

app.register_blueprint(api_bp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)