import json
import filtering

data = None

def load_data():
    return json.loads(open('test_db.json').read())

def get_data():
    global data
    data = load_data()
    return data

def filter_data(data: dict, filter_params: dict):
    filters = filtering.create_filter_rules(filter_params)

    return filtering.apply_filter(data, filters)