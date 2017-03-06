#!/usr/bin/python3

import urllib.request
import json



def getUrl(year, month, day):
    month = str(month).zfill(2)
    day = str(day).zfill(2)
    
    # Olympic Valley, CA
    url = 'https://api.darksky.net/forecast/9149e80d390a07dbd7a661d1bc8ae808/39.1996,-120.2285,' + str(year) + '-' + str(month) + '-' + str(day) + 'T00:00:00?units=uk2&exclude=alerts,flags,currently'
    
    return urllib.request.urlopen(url).read().decode('UTF-8')



print(json.loads(getUrl(2017, 2, 1)))
