# -*- coding: utf-8 -*-

from deeppavlov import build_model, configs
from collections import Counter
from deeppavlov import build_model, configs

def datas(text):
    print(text)

def text_info(text):
    def stat_pos_neg(text): 
        model = build_model(configs.classifiers.rusentiment_elmo_twitter_cnn, download=True)
        for i in text:
            feedback = model([i])[0]
            if feedback == 'negative':
                print(i, '-neg')
            elif feedback == 'positive':
                print(i, '-pos')
            feedback_list.append(feedback)

    text = text.split('.')
    feedback_list = list()
    stat_pos_neg(text)

    print(feedback_list)
    for i in feedback_list:
        if i == 'negative':
            return 1
    
    return 0

# python -m deeppavlov install rusentiment_elmo_twitter_cnn