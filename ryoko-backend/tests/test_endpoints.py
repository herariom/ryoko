from io import open
import os
import json
from flask import jsonify

def test_cities(test_client):

    params = {}

    headers = {
         'Content-Type': 'application/json'
    }

    response = test_client.post('/', data=json.dumps(params), headers=headers)

    assert response.get_json() == True
    assert response.status_code == 200