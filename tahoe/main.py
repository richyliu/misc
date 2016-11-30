import urllib2
from bs4 import BeautifulSoup

response = urllib2.urlopen('http://squawalpine.com/skiing-riding/weather-conditions-webcams/lift-grooming-status');
res = response.read()
soup = BeautifulSoup(res, 'html.parser')


# total open lifts and grooming
lastUpdate = soup.find(id='squaw-report').contents[1].contents[1].string
openLifts = int(soup.find(id='squaw-report').contents[1].find_all('p')[0].string)
openTrails = int(soup.find(id='squaw-report').contents[1].find_all('p')[1].string)
openGroomed = int(soup.find(id='squaw-report').contents[1].find_all('p')[2].string)


# open lifts and grooming
lifts = soup.find(id='squaw-report').contents[13]
runs = soup.find(id='squaw-report').contents[15]


print('total lifts: ' + str(openLifts));
print('total trails: ' + str(openTrails));
print('total groomed: ' + str(openGroomed));

