from io import open
import json
import filtering

def test_apply_filter():
    data = json.loads(open('tests/test_db.json').read())
    
    filter_params = [{"field": "state", "operator": "=", "value": "North Carolina"}]
    filters = filtering.create_filter_rules(filter_params)
    filtered_data = filtering.apply_filter(data, filters)

    assert filtered_data == {"d": [{"city": "City 1", "state": "North Carolina", "population": 100000, "density": 0.7, "lat": 1.0, "long": 2.2}]}