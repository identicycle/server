import requests
import json
from pathlib import Path

#Identifications
client_id = 'FAFurpy5mH24X5xCBJY24ZBu'
client_secret = 'ieItRG4MrbJ50mGUnN0rDxGtPTHxl9OgDYyWQUm5SWNvCelz'

#Reads all .jpg Files from the testDat Folder
input_dir = Path.cwd()/'dataTest'
images = list(input_dir.rglob("*.jpg")) #Everything is stored in glass

categories = {
  "ewaste": ["technology", "engineering", "machine part", "manufacturing equipment", "mechanic", "machinery", "computer", "computer monitor", "semiconductor", "computer part", "cpu", "industry", "computer chip", "mother board", "circuit board", ""],
  "plastic": ["plastic", "bottle"],
  "ewaste": ["laptop", "battery"],
  "textile": ["clothing", "fashion", "textile"]
}

filteredResponse = []

#Loops through data requests
for image in images:
    with open(image,'rb') as image:
        data = {'data': image}
        #Returns response as JSON file
        keywords = requests.post('https://api.everypixel.com/v1/keywords', files=data, auth=(client_id, client_secret)).json()

    for keywordJSON in response["keywords"]:
        keyword, score = keywordJSON.values()

    for category, keywords in categories.items():
        if keyword in keywords:
            filteredResponse.append({
            "keyword": keyword,
            "score": score,
            "category": category
        })

    print(filteredResponse)
            
    