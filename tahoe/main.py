import urllib
import urllib2
import datetime
import random
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

def savePhoto(camera, name):
    dt = datetime.datetime.now().strftime('/%Y/%m/%d/')
    
    response = urllib2.urlopen('http://images.prismcam.com/cams/' + camera + dt)
    photoSoup = BeautifulSoup(response.read(), 'html.parser')
    hourMinute = photoSoup.find('table').contents[-4].contents[1].contents[0].string
    
    # save photo
    urllib.urlretrieve('http://images.prismcam.com/cams/' + camera + dt + hourMinute + '720.jpg', 'img/' + name + ".jpg")


def getPhotoData():
    savePhoto('00016', 'squawHigh')
    print 'squaw high finished'
    savePhoto('00017', 'squawBase')
    print 'squaw base finished'
    savePhoto('00019', 'alpineBase')
    print 'alpine base finished'
    
    
    if random.random() < 0.5:
        userAgent = 'Mozilla/5.0'
    else:
        userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'
    
    urllib.URLopener.version = userAgent
    opener = urllib2.build_opener()
    opener.addheaders = [('User-Agent', userAgent)]
    
    res = opener.open('http://backend.roundshot.com/cams/249/medium')
    urllib.urlretrieve(res.geturl(), "img/squaw360.jpg")
    print 'squaw 360 finished'
    
    res = opener.open('http://backend.roundshot.com/cams/250/medium')
    urllib.urlretrieve(res.geturl(), "img/alpine360.jpg")
    print 'alpine 360 finished'



'''put data into index.html'''

def main():
    getPhotoData()
    
    # write last updated
    f = open('update.info', 'w')
    f.write(str(datetime.datetime.now()))
    f.close()


main()
