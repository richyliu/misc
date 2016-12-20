#!/usr/bin/python3

import urllib
import datetime
import random
import json
import requests



'''get lift and run data'''

def getLiftData():
    return {
        'squaw': {
            'front': requests.get('http://vicomap-cdn.resorts-interactive.com/api/details/1446').json()
        },
        # back: http://vicomap-cdn.resorts-interactive.com/api/details/1416
        'alpine': {
            'front': requests.get('http://vicomap-cdn.resorts-interactive.com/api/details/152').json(),
            'back': requests.get('http://vicomap-cdn.resorts-interactive.com/api/details/162').json()
        }
    }




'''get weather data'''

def getWeatherData():
    r = requests.get('https://api.darksky.net/forecast/9149e80d390a07dbd7a661d1bc8ae808/39.1996,-120.2285?units=uk2&exclude=daily,alerts,flags')
    return r.json()



'''get photo data'''

def getPhotoData():
    urllib.request.urlretrieve('http://storage.googleapis.com/prism-cam-00016/720.jpg', 'img/squawHigh.jpg')
    print('downloaded squaw high photo')
    urllib.request.urlretrieve('http://storage.googleapis.com/prism-cam-00017/720.jpg', 'img/squawBase.jpg')
    print('downloaded squaw base photo')
    urllib.request.urlretrieve('http://storage.googleapis.com/prism-cam-00019/720.jpg', 'img/alpineBase.jpg')
    print('downloaded alpine base photo')
    
    
    userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/' \
        + str(random.randint(0, 999)).zfill(3) \
        + '.36 (KHTML, like Gecko) Chrome/54.0.' \
        + str(random.randint(0, 9999)).zfill(4) \
        + '.98 Safari/' \
        + str(random.randint(0, 999)).zfill(3) \
        + '.36'
    print(userAgent)
    
    opener = urllib.request.build_opener()
    opener.addheaders = [('User-Agent', userAgent)]
    
    res = opener.open('http://backend.roundshot.com/cams/249/medium')
    res = opener.open(res.geturl())
    with open('img/squaw360.jpg', "wb") as f:
        f.write(res.read())
    print('downloaded squaw 360 photo')
    
    res = opener.open('http://backend.roundshot.com/cams/250/medium')
    res = opener.open(res.geturl())
    with open('img/alpine360.jpg', "wb") as f:
        f.write(res.read())
    print('downloaded alpine 360 photo')



'''put data into index.html'''

def main():
    print('writing lift data...')
    # write lift data
    with open('lift.info', 'w') as f:
        f.write(json.dumps(getLiftData()))
    print('wrote lift data!')
    
    print('writing last updated...')
    # write last updated
    with open('update.info', 'w') as f:
        f.write(str(datetime.datetime.now()))
    print('wrote last updated!')
    
    
    # only run every 30 minutes
    if datetime.datetime.now().minute == 30 or True:
        print('getting photo data...')
        getPhotoData()
        print('got photo data!')
        
        print('writing weather data...')
        # write last updated
        with open('weather.info', 'w') as f:
            f.write(json.dumps(getWeatherData()))
        print('wrote weather data!')


main()
