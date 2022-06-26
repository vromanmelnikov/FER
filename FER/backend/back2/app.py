from flask import Flask, request
from flask_cors import CORS
from check_text import text_info, datas
from tensorflow import keras



app = Flask(__name__, static_folder='/')
CORS(app)


@app.route('/api/get_text_info', methods=['POST', 'GET'])
def get_text_info():
    # try:
    text = request.form.get('text')
    print(text)
    data = text_info(text)
    return  {'data': data}
    # except Exception as e:
    #     return {'data': 0}




def main():
    app.run(debug=True, port=3001, host='0.0.0.0')


if __name__ == '__main__':
    main()