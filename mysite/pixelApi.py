import requests
import json
from pathlib import Path

#Identifications
client_id = 'bSUVOTMAqM81lkyhBF7uNwk7'
client_secret = 'XKHHcW8xpKiH12D2orQFPaQjpLpOvOxIY6EHp7nUvil9z9uc'

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
    
# with open("test_textile.jpg",'rb') as image:
#     data = {'data': image}
#     keywords = requests.post('https://api.everypixel.com/v1/keywords', files=data, auth=(client_id, client_secret)).json()
# print("This image: ", keywords)
   
    


