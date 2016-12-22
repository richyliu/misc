#!/usr/bin/python3

import datetime
import json
import sys
import requests



'''get lift and run data'''

def getLiftData():
    trailsAndLifts = []
    
    squawFront = requests.get('http://vicomap-cdn.resorts-interactive.com/api/details/1446').json()
    alpineFront = requests.get('http://vicomap-cdn.resorts-interactive.com/api/details/152').json()
    alpineBack = requests.get('http://vicomap-cdn.resorts-interactive.com/api/details/162').json()
    
    
    for trail in squawFront['trails']:
        trailsAndLifts.append(trail)
    
    for trail in alpineFront['trails']:
        trailsAndLifts.append(trail)
    
    for trail in alpineBack['trails']:
        trailsAndLifts.append(trail)
    
    for lift in squawFront['lifts']:
        trailsAndLifts.append(lift)
    
    for lift in alpineFront['lifts']:
        trailsAndLifts.append(lift)
    
    for lift in alpineBack['lifts']:
        trailsAndLifts.append(lift)
        
    return trailsAndLifts



'''get weather data'''

def getWeatherData():
    res = requests.get('https://api.darksky.net/forecast/9149e80d390a07dbd7a661d1bc8ae808/39.1996,-120.2285?units=uk2&exclude=daily,alerts,flags').json()
    r = {
        'minutelyRainIntensity': [],
        'minutelyRainIntensityError': [],
        'minutelyRainProbability': [],
        'hourlyRainIntensity': [],
        'hourlyRainProbability': [],
        'hourlyTempFeel': [],
        'hourlyTemp': [],
        'windSpeed': []
    }
    
    
    for d in res['minutely']['data']:
        r['minutelyRainIntensity'].append([d['time'] * 1000, int(d['precipIntensity'] * 100)])
        r['minutelyRainProbability'].append([d['time'] * 1000, int(d['precipProbability'] * 100)])
    
    for d in res['hourly']['data']:
        r['hourlyRainIntensity'].append([d['time'] * 1000, int(d['precipIntensity'] * 100)])
        r['hourlyRainProbability'].append([d['time'] * 1000, int(d['precipProbability'] * 100)])
        r['hourlyTempFeel'].append([d['time'] * 1000, int(d['apparentTemperature'])])
        r['hourlyTemp'].append([d['time'] * 1000, int(d['temperature'])])
        r['windSpeed'].append([d['time'] * 1000, round(d['windSpeed'], 2)])
    
    
    return r



'''put data into index.html'''

def main():
    print('writing lift data...')
    with open('/var/www/html/misc/tahoe/lift.info', 'w') as f:
        json.dump(getLiftData(), f)
    print('wrote lift data!')
    
    print('writing last updated...')
    with open('/var/www/html/misc/tahoe/update.info', 'w') as f:
        f.write(str(datetime.datetime.now()))
    print('wrote last updated!')
    
    
    # only run every 30 minutes
    if datetime.datetime.now().minute % 15 == 0 or sys.argv[1] == 'w':
        print('writing weather data...')
        with open('weather.info', 'w') as f:
            json.dump(getWeatherData(), f)
        print('wrote weather data!')

# main()
with open('lift.info', 'w') as f:
    json.dump(getLiftData(), f)