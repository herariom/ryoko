import os
from flask import Flask, request, session, jsonify, escape
from flask_cors import CORS
from flask_login import login_required, current_user, login_user, logout_user, LoginManager
from flask_bcrypt import Bcrypt
from schema import Schema, And, Use, Or, SchemaError
import database

app = Flask(__name__)

app.secret_key = os.urandom(24)
bcrypt = Bcrypt(app)

CORS(app, supports_credentials=True) # Enable CORS
bcrypt = Bcrypt(app) # Init Bcrypt

valid_operators = ['=', '<', '>']



# The value for each item can be empty on the client side, but we expect the client to have filtered this out. If they ask the server
# for it, then it better be valid
schema = Schema([{
    'field': And(str, lambda s: s.isalnum(), lambda s: len(s) <= 20),
    'value': Or(float, int, And(str, lambda s: all(x.isalpha() or x.isdigit() or x.isspace() or x == '.' for x in s), lambda s: len(s) <= 20)),
    'operator': And(str, lambda s: s in valid_operators, lambda s: len(s) <= 20),
}])


@app.route('/', methods=['POST', 'GET'])
def default():
    if request.method == 'GET':
        # Return all cities
        return jsonify(database.get_data()), 200
    else:
        # Get the search parameters from the request
        query_params = request.get_json()
        
        # Validate user query parameters
        try:
            schema.validate(query_params)
        except SchemaError as e:
            return jsonify({'error': 'Invalid query parameters'}), 400

        return jsonify(database.filter_data(database.get_data(), query_params)), 200

if __name__ == "__main__":
    app.run('0.0.0.0', '5000', debug=True)