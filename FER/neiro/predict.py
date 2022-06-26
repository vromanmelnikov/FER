import os
import numpy
from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten, BatchNormalization, Activation
from keras.layers.convolutional import Conv2D, MaxPooling2D
from keras.constraints import maxnorm
from keras.utils import np_utils
from keras.models import load_model
from PIL import Image

model = load_model('model_6.h5')

def predict_by_filename(filename):
    data = []
    img = numpy.asarray(Image.open('test/' + filename))
    data.append(img)
    data = numpy.array(data)
    data = data.astype('float32')
    data = data / 255.0

    return model.predict(data)

def predict_by_photo(image):
    return model.predict(image)
