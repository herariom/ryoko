import json
from typing import Callable, List

DictPredicate = Callable[[dict], bool]

def create_filter_rules(filter_params: dict) -> List[DictPredicate]:
    filter_rules = []
    for obj in filter_params:
        if obj["operator"] == "=":
            filter_rules.append(lambda x,obj=obj: str(obj["value"]) == str(x[obj["field"]]))
        if obj["operator"] == "<":
            filter_rules.append(lambda x,obj=obj: obj["value"] > x[obj["field"]])
        if obj["operator"] == ">":
            filter_rules.append(lambda x,obj=obj: obj["value"] < x[obj["field"]])
        if obj["operator"] == "<>":
            filter_rules.append(lambda x,obj=obj: obj["value"] != str(x[obj["field"]]))
    return filter_rules


def apply_filter(json_obj: dict, filters: List[DictPredicate]) -> dict:
    if json_obj is None:
        return {}
    if filters is None or not len(filters):
        return json_obj

    filtered = [x for x in json_obj["d"] if all((pred(x) for pred in filters))]

    response_dict = {"d": filtered}
    return response_dict