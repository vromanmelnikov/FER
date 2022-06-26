FROM python:3.10
COPY . /app
WORKDIR /app 
RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6  -y
RUN pip install -r requirements.txt
RUN pip install fer[all]
ENTRYPOINT ["python3"]
CMD ["main.py"]