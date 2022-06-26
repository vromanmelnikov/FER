from fer import Video
from fer import FER
import cv2
import sys
from tensorflow.keras import Sequential
from tensorflow.keras.models import load_model
import numpy as np
from tensorflow.keras.preprocessing.image import img_to_array


def process_video(video_filename):
    video = Video(video_filename)
    print(video)

    detector = FER(mtcnn=True)
    raw_data = video.analyze(detector, display=True)
    return raw_data
