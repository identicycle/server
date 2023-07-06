import requests
import json
from pathlib import Path

#Identifications
client_id = 'FAFurpy5mH24X5xCBJY24ZBu'
client_secret = 'ieItRG4MrbJ50mGUnN0rDxGtPTHxl9OgDYyWQUm5SWNvCelz'

#Reads all .jpg Files from the testDat Folder
input_dir = Path.cwd()/'testDat'
images = list(input_dir.rglob("*.jpg")) #Everything is stored in glass

#Loops through data requests
for image in images:
    with open(image,'rb') as image:
        data = {'data': image}
        #Returns response as JSON file
        keywords = requests.post('https://api.everypixel.com/v1/keywords', files=data, auth=(client_id, client_secret)).json()
    
    #Prints the keywords
    print("This image: ", keywords) 
    print("")
    
jsonFile = open('dum.json', 'w')
jsonFile.write(str(keywords))
jsonFile.close()
