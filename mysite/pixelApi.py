import requests
import json
from pathlib import Path

#Identifications
client_id = 'FAFurpy5mH24X5xCBJY24ZBu'
client_secret = 'ieItRG4MrbJ50mGUnN0rDxGtPTHxl9OgDYyWQUm5SWNvCelz'

#Reads all .jpg Files from the testDat Folder
input_dir = Path.cwd()/'dataTest'
images = list(input_dir.rglob("*.jpg")) #Everything is stored in glass

#Loops through data requests
for image in images:
    with open(image,'rb') as image:
        data = {'data': image}
        #Returns response as JSON file
        keywords = requests.post('https://api.everypixel.com/v1/keywords', files=data, auth=(client_id, client_secret)).json()
    
    #Counter for Keywords
    counter = 0
    
    print('CURRENT IMAGE -\n')
    
    #Word Filtering
    for word in keywords['keywords']:
        
        #E-waste
        if word['keyword'] == 'technology':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'engineering':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'machine part':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'manufactoring equipment':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'mechanic':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'machinery':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'computer':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'computer monitor':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'semiconductor':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'computer part':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'cpu':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'industry':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'computer chip':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'mother board':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'circuit board':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'telephone':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'computer keyboard':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'factory':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'equipment':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'electrical component':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'capacitor':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'laptop':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'data':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
            
        #Glass & Plastic
        if word['keyword'] == 'glass':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'bottle':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'wine bottle':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'transparent':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'drink':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'jar':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1  
        if word['keyword'] == 'plastic':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'container':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
            
        #Just Plastic
        if word['keyword'] == 'recycling':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
            
        #Metal
        if word['keyword'] == 'crumpled':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'wrinked':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'crushed':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'metal':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'shinny':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'gold':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'jewelry':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'metal ore':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
            
        #Organic
        if word['keyword'] == 'food':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'healthy eating':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'organic':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'freshness':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'vegetable':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'fruit':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'apple':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1  
        if word['keyword'] == 'tomato':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'healthy lifestyle':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'agriculture':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'raw potato':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'harvasting':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'plant':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'lime':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'vegetarian food':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'juicy':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'ripe':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'pineaple':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'desert':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'sweet':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'anise':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
            
        if word['keyword'] == 'cucumber':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'seafood':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'fish':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'meal':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'healthy':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'lemon':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'cooking':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'appetizer':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'meat':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'chocolate':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'salad':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
            
        #Paper
        if word['keyword'] == 'paper':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'book':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'education':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'newspaper':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'text':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'editorial':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'packet':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'document':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'envelope':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'mail':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'comunication':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'blank':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
            
        #Trash
        if word['keyword'] == 'bag':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'garbage':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
        if word['keyword'] == 'damaged':
            print('    Keyword: ', word['keyword'])
            print('    Confidence Score: ', word['score'], '\n')
            counter += 1
            
    #Displays
    if counter == 0:
        print('    NO SIGNIFICANT KEYWORDS\n')
        
    