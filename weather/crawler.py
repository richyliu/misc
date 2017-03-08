#!/usr/bin/python3

import urllib.request
import json
from datetime import date, timedelta



# includes begin and end
def downloadDateRange(begin, end):
    data = []
    
    
    # get data
    for i in range((end - begin).days + 1):
        jsn = json.loads(getUrl(begin + timedelta(days=i)))
        hourlyData = jsn['hourly']['data']
        for hour in hourlyData:
            data.append([hour['time'], hour['apparentTemperature'], hour['cloudCover'], hour['dewPoint'], hour['humidity'], hour['precipIntensity'], hour['precipProbability'], hour['pressure'], hour['temperature'], hour['visibility'], hour['windBearing'], hour['windSpeed']])
    
    
    # save data into file
    f = open(str(begin.year) + '-' + str(begin.month) + '-' + str(begin.day) + '_' + str(end.year) + '-' + str(end.month) + '-' + str(end.day) + '.csv', 'w')
    
    f.write('time,apparentTemperature,cloudCover,dewPoint,humidity,precipIntensity,precipProbability,pressure,temperature,visibility,windBearing,windSpeed\n')
    
    for d in data:
        first = True
        for item in d:
            if first:
                first = False
                f.write(str(item))
            else:
                f.write(',' + str(item))
        f.write('\n')
    
    f.close()



def getUrl(time):
    month = str(time.month).zfill(2)
    day = str(time.day).zfill(2)
    
    # Olympic Valley, CA
    url = 'https://api.darksky.net/forecast/9149e80d390a07dbd7a661d1bc8ae808/39.1996,-120.2285,' + str(time.year) + '-' + str(month) + '-' + str(day) + 'T00:00:00?units=uk2&exclude=alerts,flags,currently,daily'
    
    print(url)
    return urllib.request.urlopen(url).read().decode('UTF-8')



downloadDateRange(date(2017, 3, 5), date(2017, 3, 7))
