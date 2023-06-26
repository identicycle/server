import requests
from pathlib import Path

#Identifications
client_id = 'FAFurpy5mH24X5xCBJY24ZBu'
client_secret = 'ieItRG4MrbJ50mGUnN0rDxGtPTHxl9OgDYyWQUm5SWNvCelz'
params = {'url': 'http://image.everypixel.com/2014.12/67439828186edc79b9be81a4dedea8b03c09a12825b_b.jpg', 'num_keywords': 10}
keywords = requests.get('https://api.everypixel.com/v1/keywords', params=params, auth=(client_id, client_secret)).json()

input_dir = Path.cwd()/'testDat'
glass = list(input_dir.rglob("*.jpg"))

check = 1

# for item in glass:
#     with open(item,'rb') as image:
#         data = {'data': image}
#         keywords = requests.post('https://api.everypixel.com/v1/keywords', files=data, auth=(client_id, client_secret)).json()
#     print("This item: ", keywords)
#     print("")
    
#     if check % 20 == 0:
#         print("-- Change --")
#         print("")
    
#     check += 1
    
with open("glass2.jpg",'rb') as image:
    data = {'data': image}
    keywords = requests.post('https://api.everypixel.com/v1/keywords', files=data, auth=(client_id, client_secret)).json()
print("This item: ", keywords)
   
    


