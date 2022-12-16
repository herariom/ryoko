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
    filter_rules = []
    for obj in filter_params:
        if obj['operator'] == '=':
            filter_rules.append(filtering.EqualsRule(obj['field'], obj['value']))
    city_filter = filtering.CityFilter(filter_rules)

    return filtering.apply_filter(data, city_filter)