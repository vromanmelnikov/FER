import vk_api
import requests

# Тут необходимо указать токен для проверки страницы ВК
token = ''



def getUserId(link):
    _id = link
    if not _id.replace('id', '').isdigit():
        address = 'https://api.vk.com/method/utils.resolveScreenName'
        # token = token
        name = _id.split('/')
        name = name[len(name)-1]
        query = f'{address}?access_token={token}&screen_name={name}&v=5.131'
        response = requests.get(query)
        _id = response.json()['response']['object_id']
    else:
        _id = _id.replace('id', '')
    print('id получен')
    return int(_id)

def get_text_info(text):

    address = 'http://127.0.0.1:3001/api/get_text_info'
    response = requests.post(address, data={'text': text})
    if response.status_code == 200:
        result = response.json()['data']
    else:
        result = 0

    return result

def getUserWall(id):
    address = 'https://api.vk.com/method/wall.get'
    # token = token
    query = f'{address}?access_token={token}&owner_id={id}&count=5&v=5.131'
    response = requests.get(query)
    wall = response.json()['response']['items']
    if wall != []:
        text = ''
        for i in wall:
            text = text + i['text']
        if 1 == get_text_info(text):
            return 'attention!'
    
    return 'clear'

def getUserWallInfo(url):
    id = getUserId(url)
    return getUserWall(id)

    