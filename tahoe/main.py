#!/usr/bin/python3

import datetime
import json
import sys
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



'''put data into index.html'''

def main():
    print('writing lift data...')
    # write lift data
    with open('/var/www/html/misc/tahoe/lift.info', 'w') as f:
        f.write(json.dumps(getLiftData()))
    print('wrote lift data!')
    
    print('writing last updated...')
    # write last updated
    with open('/var/www/html/misc/tahoe/update.info', 'w') as f:
        f.write(str(datetime.datetime.now()))
    print('wrote last updated!')
    
    
    # only run every 30 minutes
    if datetime.datetime.now().minute % 15 == 0 or sys.argv[1] == 'w':
        print('writing weather data...')
        # write last updated
        with open('/var/www/html/misc/tahoe/weather.info', 'w') as f:
            f.write(json.dumps(getWeatherData()))
        print('wrote weather data!')


main()
