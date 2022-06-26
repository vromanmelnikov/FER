from flask import Flask, request
from flask_cors import CORS
from wallget import getUserWallInfo
from process_video import process_video
import json



app = Flask(__name__, static_folder='/')
CORS(app)

@app.route('/api/get_user_wall_info', methods=['POST', 'GET'])
def get_user_wall_info():
    # try:
    user_link = request.form.get('user_link')
    print('//////////////////////////////////////////////')
    print(user_link)
    print('//////////////////////////////////////////////')
    return {'data': getUserWallInfo(user_link)}
    # except Exception as e:
    #     return {'data': 'error'}


@app.route('/api/getfile', methods=['POST', 'GET'])
def getfile1():
    # try:
    name = request.form.get('name')
    bytes = request.form.get('bytes')

    file = request.files['file']
    filename = secure_filename(file.filename)

    user_id = str(request.remote_addr)
    if user_id != 'error':
        if os.path.isdir(f'{user_id}'):

            if os.path.exists(f'{user_id}/{filename}'):
                os.remove(f'{user_id}/{filename}')

            file.save(f'{user_id}/{filename}')

        else:
            os.mkdir(f'{user_id}')
            with open(f'{user_id}/{name}', 'xb') as fh:
                file.save(f'{user_id}/{filename}')


        new_data = process_video(f'{user_id}/{filename}')

        os.remove(f'{user_id}/{filename}')

        response = json.dumps({'data': new_data})

        return response
    else:
        return {'data': 'error'}




def main():
    app.run(debug=True, port=3000, host='0.0.0.0')


if __name__ == '__main__':
    main()