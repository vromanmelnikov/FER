import numpy
import os
from PIL import Image
import json


def answers():

    i = 0
    ans = {}

    for filename in os.listdir("dataset/angry"):
        if filename in ans:
            os.rename('dataset/angry/' + filename, 'dataset/angry/aaaaaaaa' + str(i) + '.png')
            ans |= {'aaaaaaaa' + str(i) + '.png': 0}
            i += 1
        else:
            ans |= {filename: 0}


    for filename in os.listdir("dataset/disgust"):
        if filename in ans:
            os.rename('dataset/disgust/' + filename, 'dataset/disgust/aaaaaaaa' + str(i) + '.png')
            ans |= {'aaaaaaaa' + str(i) + '.png': 1}
            i += 1
        else:
            ans |= {filename: 1}


    for filename in os.listdir("dataset/fear"):
        if filename in ans:
            os.rename('dataset/fear/' + filename, 'dataset/fear/aaaaaaaa' + str(i) + '.png')
            ans |= {'aaaaaaaa' + str(i) + '.png': 2}
            i += 1
        else:
            ans |= {filename: 2}

    for filename in os.listdir("dataset/happy"):
        if filename in ans:
            os.rename('dataset/happy/' + filename, 'dataset/happy/aaaaaaaa' + str(i) + '.png')
            ans |= {'aaaaaaaa' + str(i) + '.png': 3}
            i += 1
        else:
            ans |= {filename: 3}

    for filename in os.listdir("dataset/sad"):
        if filename in ans:
            os.rename('dataset/sad/' + filename, 'dataset/sad/aaaaaaaa' + str(i) + '.png')
            ans |= {'aaaaaaaa' + str(i) + '.png': 4}
            i += 1
        else:
            ans |= {filename: 4}

    for filename in os.listdir("dataset/surprise"):
        if filename in ans:
            os.rename('dataset/surprise/' + filename, 'dataset/surprise/aaaaaaaa' + str(i) + '.png')
            ans |= {'aaaaaaaa' + str(i) + '.png': 5}
            i += 1
        else:
            ans |= {filename: 5}

    for filename in os.listdir("dataset/neutral"):
        if filename in ans:
            os.rename('dataset/neutral/' + filename, 'dataset/neutral/aaaaaaaa' + str(i) + '.png')
            ans |= {'aaaaaaaa' + str(i) + '.png': 6}
            i += 1
        else:
            ans |= {filename: 6}

    with open ('ans_v.json', 'w') as file:
        json.dump(ans, file, ensure_ascii=False, indent=4)




def get_train_files():

    with open ('ans.json', 'r') as file:
        ans = json.load(file)

    x_train = []
    y_train = []

    for filename in os.listdir("train"):
        img = numpy.asarray(Image.open('train/' + filename).resize([48, 48]))
        x_train.append(img)
        y_train.append(ans[filename])
    
    x_train = numpy.array(x_train)
    y_train = numpy.array(y_train)
    
    return x_train, y_train

def get_test_files():
    with open ('ans_t.json', 'r') as file:
        ans = json.load(file)

    x_train = []
    y_train = []

    for filename in os.listdir("test"):
        img = numpy.asarray(Image.open('test/' + filename).resize([48, 48]))
        x_train.append(img)
        y_train.append(ans[filename])
    
    x_train = numpy.array(x_train)
    y_train = numpy.array(y_train)
    
    return x_train, y_train