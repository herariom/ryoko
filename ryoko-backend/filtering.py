import json
from typing import List
from abc import ABC, abstractmethod

class FilterRule(ABC):
    @abstractmethod
    def apply(self, json_obj: dict) -> dict:
        pass

class EqualsRule:
    def __init__(self, field: str, value: str):
        self.field = field
        self.value = value

    def apply(self, json_obj: dict) -> dict:
        if json_obj is None:
            return False
        if self.field not in json_obj:
            return false
        if str(json_obj[self.field]) == self.value:
            return True
        else:
            return False

class CityFilter:
    def __init__(self, filter_rules: List[FilterRule]):
        self.filter_rules = filter_rules

    def apply(self, json_obj: dict) -> dict:
        if self.filter_rules is None:
            return json_obj
            
        for rule in self.filter_rules:
            if not rule.apply(json_obj):
                return False

        return True

def apply_filter(json_obj: dict, city_filter: CityFilter) -> dict:
    if city_filter is None:
        return json_obj
    if json_obj is None:
        return json.loads('{}')

    response_dict = {}
    response_dict['d'] = [x for x in json_obj['d'] if city_filter.apply(x)]

    return response_dict


