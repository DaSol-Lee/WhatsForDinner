import requests
import os
import io
import json
import urllib.request
import urllib.parse

from google.cloud import vision
from google.cloud.vision import types

from flask import Flask, request
from flask_cors import CORS

client = vision.ImageAnnotatorClient()
    

def getImageDescription(path):        
    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    image = types.Image(content = content)
    response = client.label_detection(image=image)
    labels = response.label_annotations

    return labels[0].description

def food_data(word):
    url = "https://api.edamam.com/api/food-database/parser?ingr=" + word + "&app_id=3089c69b&app_key=3dff7021ed1a48c020ba98da02b4da4f"
    returning_dict = {}
    response = urllib.request.urlopen(url)
    data = json.loads(response.read())["parsed"]
    
    if data == []:
        return returning_dict
    else:
        data = data[0]["food"]["nutrients"]

    returning_dict["Energy"] = str(int(data["ENERC_KCAL"])) + ' kcal'
    returning_dict["Protein"] = str(int(data["PROCNT"])) + ' g'
    returning_dict["Fat"] = str(int(data["FAT"])) + ' g'
    returning_dict["Carbs"] = str(int(data["CHOCDF"])) + ' g'

    return returning_dict

def ten_recipes(word):
    url = "https://api.edamam.com/search?app_id=9acff68c&app_key=84f206bf170073c302ca305e246e167e&q=" + word
    response = urllib.request.urlopen(url)
    data = json.loads(response.read())['hits']
    returning_dict2 = {}
    
    for i in range(10):
        changing_dict = {}
        data2 = data[i]['recipe']
        
        if i == 0:
            changing_dict[i] = (data2['label'], data2['url'], data2['image'])
        else:
            changing_dict[i] = (data2['label'], data2['url'])


        returning_dict2[i] = changing_dict[i]
        
    return returning_dict2
    

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET', 'POST'])
def hello_world():
    image = request.args.get('image')
    combine_dict = {}
    path = "../public/veggies/" + image
    # path = "../veggies/" + image
    # print(path)
    # print(os.path.abspath(path))
    food = getImageDescription(os.path.abspath(path))
    # print(food)
    food = urllib.parse.quote_plus(food)
    combine_dict["Nutrition"] = food_data(food)
    combine_dict["Recipes"] = ten_recipes(food)
    combine_dict["Name"] = food
    # combine_dict["File Name"] = image
    return combine_dict


if __name__ == '__main__':
    app.run(debug = True, port = 5000)
