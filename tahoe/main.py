import urllib2
from bs4 import BeautifulSoup
import requests



# get lift data

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


print 'total lifts: ' + str(alpine['openLifts'])
print 'total trails: ' + str(alpine['openTrails'])
print 'total groomed: ' + str(alpine['openGroomed'])




# get weather data

r = requests.get('https://api.darksky.net/forecast/9149e80d390a07dbd7a661d1bc8ae808/39.1996,-120.2285?units=uk2&exclude=daily,alerts,flags')
data = r.json()



# get photo data

response = urllib2.urlopen('http://squawalpine.com/skiing-riding/weather-conditions-webcams/lift-grooming-status')
photoSoup = BeautifulSoup(response.read(), 'html.parser')

photos = {
    'squaw360': 'http://backend.roundshot.com/cams/249/medium',
    'squawHigh': photoSoup.find(findCam16).contents[0].contents[3]['style'],
    'squawBase': photoSoup.find(findCam17).contents[0].contents[3]['style'],
    'alpine360': 'http://backend.roundshot.com/cams/250/medium',
    'alpineBase': photoSoup.find(findCam19).contents[0].contents[3]['style'],
}

def findCam16(element):
    return element['cam-id'] == '16'

def findCam17(element):
    return element['cam-id'] == '17'

def findCam19(element):
    return element['cam-id'] == '19'



# put data into index.html

indexSoup = BeautifulSoup(open('index.html'), 'html.parser')
weatherDiv = indexSoup.find(id='weather')
photosDiv = indexSoup.find(id='photos')
liftsDiv = indexSoup.find(id='lifts')
