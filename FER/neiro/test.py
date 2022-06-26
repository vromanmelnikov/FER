import os
import numpy
from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten, BatchNormalization, Activation
from keras.layers.convolutional import Conv2D, MaxPooling2D
from keras.constraints import maxnorm
from keras.utils import np_utils
from keras.models import load_model
from sklearn import metrics
import openFiles
from sklearn.metrics import classification_report
from keras.datasets import cifar10

# Set random seed for purposes of reproducibility
seed = 26

# loading in the data
# loading in the data
X_train, y_train = openFiles.get_train_files()
X_test, y_test = openFiles.get_test_files()
 
 # normalize the inputs from 0-255 to between 0 and 1 by dividing by 255
X_train = X_train.astype('float32')
X_test = X_test.astype('float32')
X_train = X_train / 255.0
X_test = X_test / 255.0


# one hot encode outputs
y_train = np_utils.to_categorical(y_train)
y_test = np_utils.to_categorical(y_test)
class_num = y_test.shape[1]

model = load_model('model_11.h5')

y_pred = model.predict(X_test, batch_size=64, verbose=1)
y_pred_bool = numpy.argmax(y_pred, axis=1)

print(classification_report(y_test, y_pred_bool))

# scores = model.evaluate(X_test, y_test, verbose=0)
# print("Accuracy: %.2f%%" % (scores[1]*100))