FROM python:3.7
COPY . /app
WORKDIR /app 
RUN pip install deeppavlov
RUN python -m deeppavlov install rusentiment_elmo_twitter_cnn
RUN pip install Flask==2.0.0
RUN pip install Flask-Cors==3.0.10
ENTRYPOINT ["python3"]
CMD ["app.py"]