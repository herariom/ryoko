from io import open
import os
import json
from flask import jsonify

def test_cities(test_client):
     response = test_client.get('/')

     assert response.status_code == 200