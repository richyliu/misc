#!/usr/bin/python3

import datetime
import json
import requests



'''get lift and run data'''

def getLiftData():
    trailsAndLifts = []
    
    squawFront = requests.get('http://vicomap-cdn.resorts-interactive.com/api/details/1446').json()
    alpineFront = requests.get('http://vicomap-cdn.resorts-interactive.com/api/details/152').json()
    alpineBack = requests.get('http://vicomap-cdn.resorts-interactive.com/api/details/162').json()
    
    
    for trail in squawFront['trails']:
        trail = checkTrail(trail)
        trailsAndLifts.append(trail)
    
    for trail in alpineFront['trails']:
        trail = checkTrail(trail)
        trailsAndLifts.append(trail)
    
    for trail in alpineBack['trails']:
        trail = checkTrail(trail)
        trailsAndLifts.append(trail)
    
    for lift in squawFront['lifts']:
        lift = checkLift(lift)
        trailsAndLifts.append(lift)
    
    for lift in alpineFront['lifts']:
        lift = checkLift(lift)
        trailsAndLifts.append(lift)
    
    for lift in alpineBack['lifts']:
        lift = checkLift(lift)
        trailsAndLifts.append(lift)
        
    return trailsAndLifts

def checkTrail(trail):
    if 'groomed' not in trail:
        trail['groomed'] = 'N/A'
        trail['groomedColor'] = 'black'
    elif trail['groomed']:
        trail['groomed'] = 'YES'
        trail['groomedColor'] = '#99CC00'
    else:
        trail['groomed'] = 'NO'
        trail['groomedColor'] = 'red'
    
    if 'status' not in trail:
        trail['status'] = 'N/A'
        trail['statusColour'] = 'black'
    
    trail.pop('description', None)
    trail.pop('id', None)
    trail.pop('x', None)
    trail.pop('y', None)
    
    return trail


def checkLift(lift):
    lift['groomed'] = '-'
    lift['groomedColor'] = 'black'
    
    if 'status' not in lift:
        lift['status'] = 'N/A'
        lift['statusColour'] = 'black'
    
    lift.pop('description', None)
    lift.pop('id', None)
    lift.pop('x', None)
    lift.pop('y', None)
    
    return lift



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
        r['minutelyRainIntensity'].append([(d['time'] - 8 * 60 * 60) * 1000, int(d['precipIntensity'] * 100)])
        r['minutelyRainProbability'].append([(d['time'] - 8 * 60 * 60) * 1000, int(d['precipProbability'] * 100)])
    
    for d in res['hourly']['data']:
        r['hourlyRainIntensity'].append([(d['time'] - 8 * 60 * 60) * 1000, int(d['precipIntensity'] * 100)])
        r['hourlyRainProbability'].append([(d['time'] - 8 * 60 * 60) * 1000, int(d['precipProbability'] * 100)])
        r['hourlyTempFeel'].append([(d['time'] - 8 * 60 * 60) * 1000, int(d['apparentTemperature'])])
        r['hourlyTemp'].append([(d['time'] - 8 * 60 * 60) * 1000, int(d['temperature'])])
        r['windSpeed'].append([(d['time'] - 8 * 60 * 60) * 1000, round(d['windSpeed'], 2)])
    
    
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
        
    print('writing weather data...')
    with open('/var/www/html/misc/tahoe/weather.info', 'w') as f:
        json.dump(getWeatherData(), f)
    print('wrote weather data!')

main()
