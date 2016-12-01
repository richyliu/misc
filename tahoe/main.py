import urllib2
import datetime
from bs4 import BeautifulSoup
import requests



'''get lift data'''

def getLiftData():
    print 'Requesting page...'

    response = urllib2.urlopen('http://squawalpine.com/skiing-riding/weather-conditions-webcams/lift-grooming-status')
    squawSoup = BeautifulSoup(response.read(), 'html.parser')

    print 'Finish requesting page'


    # lifts and grooming
    squaw = {
        'lastUpdate': squawSoup.find(id='squaw-report').contents[1].contents[1].string,
        'openLifts': int(squawSoup.find(id='squaw-report').contents[1].find_all('p')[0].string),
        'openTrails': int(squawSoup.find(id='squaw-report').contents[1].find_all('p')[1].string),
        'openGroomed': int(squawSoup.find(id='squaw-report').contents[1].find_all('p')[2].string),
        'lifts': squawSoup.find(id='squaw-report').contents[13],
        'runs': squawSoup.find(id='squaw-report').contents[15]
    }
    # front: http://us1.vicomap.com/player/?mapID=1446
    # back: http://us1.vicomap.com/player/?mapID=1416

    alpine = {
        'lastUpdate': squawSoup.find(id='alpine-report').contents[1].contents[1].string,
        'openLifts': int(squawSoup.find(id='alpine-report').contents[1].find_all('p')[0].string),
        'openTrails': int(squawSoup.find(id='alpine-report').contents[1].find_all('p')[1].string),
        'openGroomed': int(squawSoup.find(id='alpine-report').contents[1].find_all('p')[2].string),
        'lifts': squawSoup.find(id='alpine-report').contents[13],
        'runs': squawSoup.find(id='alpine-report').contents[15]
    }
    # back: http://us1.vicomap.com/player/?mapID=152


    # print 'total lifts: ' + str(alpine['openLifts'])
    # print 'total trails: ' + str(alpine['openTrails'])
    # print 'total groomed: ' + str(alpine['openGroomed'])
    
    return {
        'squaw': squaw,
        'alpine': alpine
    }




'''get weather data'''

def getWeatherData():
    r = requests.get('https://api.darksky.net/forecast/9149e80d390a07dbd7a661d1bc8ae808/39.1996,-120.2285?units=uk2&exclude=daily,alerts,flags')
    data = r.json()
    
    print data



'''get photo data'''

def getPhoto(camera):
    date = datetime.datetime.today().day
    month = datetime.datetime.today().month
    year = datetime.datetime.today().year
    
    response = urllib2.urlopen('http://images.prismcam.com/cams/' + camera + '/' + str(year) + '/' + str(month) + '/' + str(date))
    photoSoup = BeautifulSoup(response.read(), 'html.parser')
    hourMinute = photoSoup.find('table').contents[-4].contents[1].contents[0].string
    
    # get photo
    return 'http://images.prismcam.com/cams/' + camera + '/' + str(year) + '/' + str(month) + '/' + str(date) + '/' + hourMinute + '720.jpg'


def getPhotoData():
    photos = {
        'squawHigh': '',
        'squawBase': '',
        'alpineBase': '',
    }
    
    photos['squawHigh'] = getPhoto('00016')
    photos['squawBase'] = getPhoto('00017')
    photos['alpineBase'] = getPhoto('00019')
    
    print photos
    return photos




'''put data into index.html'''

def main():
    indexSoup = BeautifulSoup(open('index.html'), 'html.parser')
    
    print indexSoup.prettify()



getPhotoData()
