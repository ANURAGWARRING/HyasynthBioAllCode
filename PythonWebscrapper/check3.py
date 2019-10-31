import urllib2
from lxml import etree

url =  "file:///C:/Users/awarring/Desktop/daniel/silver_reactor/silver_reactor/192.168.25.244/index.html"
response = urllib2.urlopen(url)
htmlparser = etree.HTMLParser()
tree = etree.parse(response, htmlparser)
tree.xpath(/html/body/div[1]/div[2]/div/div[2]/div/div/div[1]/div[1]/div[2]/div)
from lxml.cssselect import CSSSelector
td_empformbody = = CSSSelector('div.synopticItem:nth-child(1) > div:nth-child(2) > div:nth-child(1)')