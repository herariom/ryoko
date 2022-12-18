import os
import requests
import urllib.parse

def get_city_scores(lat: float, long: float) -> dict:
    params = {
        "format": "json",
        "lat": str(lat),
        "lon": str(long),
        "transit": "1",
        "bike": "1",
        "wsapikey": os.environ["WS_API"],
    }
    
    request = requests.get("https://api.walkscore.com/score", params=params)
    response = request.json()

    scores = {
            "walk": "Not Available",
            "bike": "Not Available",
            "transit": "Not Available"
        }

    if request.status_code == 200 and response["status"] == 1:
        scores["walk"] = generate_rating_response(response["walkscore"], response["description"])
        scores["bike"] = generate_rating_response(response["bike"]["score"], response["bike"]["description"])
        scores["transit"] = generate_rating_response(response["transit"]["score"], response["transit"]["description"])        
    return scores

def generate_rating_response(score: int, description: str) -> str:
    if score is None:
        return "Not Available"
    return description + " (" + str(score) + "/100)."

def get_city_job_links(city: dict) -> dict:
    city_name = city["city"]
    state = city["state"]

    indeed_link = "https://www.indeed.com/jobs?l=" + city_name + "%2C+" + state
    indeed_link = indeed_link.replace(" ", "+")

    glassdoor_link = "https://www.glassdoor.com/Search/results.htm?locName=" + city_name + ", " + state + " (US)"
    glassdoor_link = glassdoor_link.replace(" ", "%20")

    zillow_link = "https://www.zillow.com/homes/for_sale/" + city_name + "," + state + "/"
    zillow_link = zillow_link.replace(" ", "-")

    return {
        "indeed": indeed_link,
        "glassdoor": glassdoor_link,
        "zillow": zillow_link
    }