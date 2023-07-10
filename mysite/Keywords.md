# All About the Keyword API

## About the API we are using.

The API we are using is called "Everypixel API," and it can be found at https://labs.everypixel.com/. This API gives a variety of services that the user can use like lipsync, face recognition, keywording, and many other things. We will mainly focus on using the keywording.  

## First of all - Credentials!

A user must create an account, and thus obtain their credentials, in order to use the Everypixel API. There is an account that is already done with an email account created for the sake of the project, and it is as follows:

* Email: identicycle@gmail.com
* Password: identicycle1234

__We are not done yet though__

There are two other credentials given by the API once an account is made: a client ID and a secret key. This all can be found at the Everypixel website, along with a way to generate a new secret password (also makes the old one obsolete).

These new credentials are the following:

* Client ID: bSUVOTMAqM81lkyhBF7uNwk7
* Secret Key: XKHHcW8xpKiH12D2orQFPaQjpLpOvOxIY6EHp7nUvil9z9uc

__Warinig__

The Everypixel API is a __PAID__ service. We get a hundred free requests per day, and then it costs a thousand requests for $0.60. The credentials must be kept secrent and only amongst the IdentiCycle team. Also, be mindful of the money spent with every request - it piles up quickly.

## How to use the Everypixel API

For this, you will need to go to the pixelApi.py file. The code to connect to the API, send requests, obtain responses, and more, will be kept on that file. Everything has comments to make it manageable for anyone to use it, but here is a brief rundown of how it words.

* Credentials: Two variables for credentials are already done for you. There is no need to change them unless a new secret key is created.
* Reading from Folder: There is code done to loop through the folder called "testDat" to read all .jpg images, including those in sub-folders - be mindful that for now it only reads __.jpg__ files.

(Needs Finishing)

## Related Keywords List - by Class

This section is mainly built for identifying the keywords for the different classes in IdentiCycle (classes being the trash identification). 

* E-waste: Technology, engineering, machine part, manufactoring equipment, mechanic, machinery, computer, computer monitor, semiconductor, computer part, cpu, industry, computer chip, mother board, circuit board, telephone, computer keyboard, factory, equipment, electrical component, capacitor, laptop, data...
* Glass: Glass, bottle, wine bottle,transparent, drink, jar...
* Metal: Crumpled, wrinkled, crushed, metal, shinny, gold, jewelry, equipment, industry, metal ore, 
* Organic: Food, healthy eating, organic, freshness, vegetable, fruit, apple, tomato, healthy lifestyle, agriculture, raw potato, harvesting, plant, lime, vegetarian food, juicy, ripe, pineaple, desert, sweet, anise, cucumber, seafood, fish, meal, healthy, lemon, cooking, appetizer, meat, chocolate, salad...
* Paper: Paper, book, education, newspaper, text, editorial, packet, document, envelope, mail, communication, crumple, blank...
* Plastic: Plastic, bottle, transparent, container, recycling...
* Trash: Crumpled, wrinkled, bag, garbage, damaged...