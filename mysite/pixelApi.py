import requests
import json
from pathlib import Path

#Identifications
client_id = 'FAFurpy5mH24X5xCBJY24ZBu'
client_secret = 'ieItRG4MrbJ50mGUnN0rDxGtPTHxl9OgDYyWQUm5SWNvCelz'

#Reads all .jpg Files from the testDat Folder
input_dir = Path.cwd()/'dataTest'
images = list(input_dir.rglob("*.jpg")) #Everything is stored in glass

namelist = list(input_dir.rglob("*.jpg"))

for each_name in namelist:
    print(Path(each_name).name)

categories = {
  "ewaste": ["technology", "engineering", "machine part", "manufacturing equipment", "mechanic", "machinery", "computer", "computer monitor", "semiconductor", "computer part", "cpu", "industry", "computer chip", "mother board", "circuit board", "telephone", "computer keyboard", "factory", "equipment", "electrical component", "capacitor", "laptop", "data"],
  "glass": ["glass", "bottle", "wine bottle", "transparent", "drink", "jar"],
  "metal": ["metal", "crumpled", "wrinkled", "crushed", "shiny", "gold", "jewelry", "equipment", "industry", "metal ore"],
  "organic": ["food", "healthy eating", "organic", "freshness", "begetable", "fruit", "apple", "tomato", "healthy lifestyle", "agriculture", "raw potato", "harvesting", "plant", "lime", "vegetarian food", "juicy", "ripe", "pineaple", "desert", "sweet", "anise", "cucumber", "seafood", "fish", "meal", "healthy", "lemon", "cooking", "appetizer", "meat", "chocolate", "salad"],
  "paper": ["paper", "crumpled", "book", "education", "newspaper", "text", "editorial", "packet", "document", "envelope", "mail", "communication", "crumple", "blank"],
  "plastic": ["plastic", "bottle", "trasparent", "container", "recycling"],
  "trash": ["crumpled", "wrinkled", "bag", "gargabe", "damaged"]
}

filteredResponse = []

#Loops through data requests
for image in images:
    with open(image,'rb') as image:
        data = {'data': image}
        #Returns response as JSON file
        response = requests.post('https://api.everypixel.com/v1/keywords', files=data, auth=(client_id, client_secret)).json()

    for keywordJSON in response["keywords"]:
        keyword, score = keywordJSON.values()

    for category, keywords in categories.items():
        if keyword in keywords:
            filteredResponse.append({
            "keyword": keyword,
            "score": score,
            "category": category
        })
            
    print("Current response: ", filteredResponse, "\n")

with open('keywords.json', 'w') as key_file:
    json.dump(filteredResponse, key_file, indent=4)
