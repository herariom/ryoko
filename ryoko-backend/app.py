import os
from flask import Flask, request, session, jsonify, escape
from flask_cors import CORS
from flask_login import login_required, current_user, login_user, logout_user, LoginManager
from flask_bcrypt import Bcrypt
from schema import Schema, And, Use, Or, SchemaError
import database
import dashboard

app = Flask(__name__)

app.secret_key = os.urandom(24)
bcrypt = Bcrypt(app)

CORS(app) # Enable CORS
bcrypt = Bcrypt(app) # Init Bcrypt

valid_operators = ['=', '<', '>']


# The value for each item can be empty on the client side, but we expect the client to have filtered this out. If they ask the server
# for it, then it better be valid
query_schema = Schema([{
    'field': And(str, lambda s: s.isalnum(), lambda s: len(s) <= 20),
    'value': Or(float, int, And(str, lambda s: all(x.isalpha() or x.isdigit() or x.isspace() or x == '.' for x in s), lambda s: len(s) <= 20)),
    'operator': And(str, lambda s: s in valid_operators, lambda s: len(s) <= 20),
}])

location_schema = Schema([{
    'lat': And(Or(float, int), lambda n: n >= -90, lambda n: n <= 90),
    'long': And(Or(float, int), lambda n: n >= -180, lambda n: n <= 180),
    'distance': And(Or(float, int), lambda n: n >= 0, lambda n: n <= 1000),
}
])

@app.route('/api/cities', methods=['POST', 'GET'])
def default():
    if request.method == 'GET':
        # Return all cities
        return jsonify(database.get_data()), 200
    else:
        # Get the search parameters from the request
        request_data = request.get_json()
        
        query_params = request_data['d']
        location_params = request_data['l']
        
        # Validate user input
        try:
            query_schema.validate(query_params)
            location_schema.validate(location_params)
        except SchemaError as e:
            print(e)
            return jsonify({'error': 'Invalid query parameters'}), 400

        return jsonify(database.filter_data(database.get_data(), query_params, location_params)), 200

@app.route('/api/city', methods=['GET'])
def city():
    city_name = request.args.get('city')
    data = database.get_data()
    for city in data["d"]:
        if city["city"] == city_name:
            response = {}

            response["scores"] = dashboard.get_city_scores(city["lat"], city["long"])
            response["links"] = dashboard.get_city_job_links(city)

            return jsonify(response), 200
    return jsonify({'error': 'City not found'}), 400

if __name__ == "__main__":
    app.run('0.0.0.0', '5000', debug=True)