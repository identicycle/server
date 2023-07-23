import requests
import json
from pathlib import Path

#Identifications
client_id = 'FAFurpy5mH24X5xCBJY24ZBu'
client_secret = 'ieItRG4MrbJ50mGUnN0rDxGtPTHxl9OgDYyWQUm5SWNvCelz'

#Reads all .jpg Files from the testDat Folder
folder = "trash"
input_dir = Path.cwd()/f'dataTest/{folder}'
images = list(input_dir.rglob("*.jpg")) #Everything is stored in glass

#All keywords needed for all of the categories
categories = {
  "ewaste": ["technology", "engineering", "machine part", "manufacturing equipment", "mechanic", "machinery", "computer", "computer monitor", "semiconductor", "computer part", "cpu", "industry", "computer chip", "mother board", "circuit board", "telephone", "computer keyboard", "factory", "equipment", "electrical component", "capacitor", "laptop", "data"],
  "glass": ["glass", "bottle", "wine bottle", "transparent", "drink", "jar"],
  "metal": ["metal", "crumpled", "wrinkled", "crushed", "shiny", "gold", "jewelry", "equipment", "industry", "metal ore"],
  "organic": ["food", "healthy eating", "organic", "freshness", "vegetable", "fruit", "apple", "tomato", "healthy lifestyle", "agriculture", "raw potato", "harvesting", "plant", "lime", "vegetarian food", "juicy", "ripe", "pineaple", "desert", "sweet", "anise", "cucumber", "seafood", "fish", "meal", "healthy", "lemon", "cooking", "appetizer", "meat", "chocolate", "salad"],
  "paper": ["paper", "crumpled", "book", "education", "newspaper", "text", "editorial", "packet", "document", "envelope", "mail", "communication", "crumple", "blank"],
  "plastic": ["plastic", "bottle", "trasparent", "container", "recycling"],
  "trash": ["crumpled", "wrinkled", "bag", "gargabe", "damaged"]
}

#Total responses - This dictionary will be the filtered output for the JSON file
totalResponse = {}

#Total Raw Keywords - This temporary dictionary gets the unfiltered keywords for the output
totalRawKeywords = {}

#Loops through data requests
for image in images:
    
    #Obtains all the names
    fileName = Path(image).name
    
    #Filtered keywords, scores, and categories
    filteredResponse = []
    
    #Opens image and 
    with open(image,'rb') as image:
        data = {'data': image}
        #Returns response as JSON file
        response = requests.post('https://api.everypixel.com/v1/keywords', files=data, auth=(client_id, client_secret)).json()
        
    print("Raw Response: ", response, "\n")
    
    totalRawKeywords[fileName] = response["keywords"]

    for keywordJSON in response["keywords"]:
        keyword, score = keywordJSON.values()

        for category, keywords in categories.items():
            if keyword in keywords:
                filteredResponse.append({
                    "keyword": keyword,
                    "score": score,
                    "category": category
                })
            
    totalResponse[fileName] = filteredResponse
            
    print("Current response: ", filteredResponse, "\n")

    with open(f'keywords_{folder}.json', 'w') as key_file:
        json.dump(totalRawKeywords, key_file, indent=4)