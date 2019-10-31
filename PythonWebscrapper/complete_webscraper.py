import sys
from bs4 import BeautifulSoup
import requests
import lxml
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import re
import os

if sys.version_info[0] == 3:
    from urllib.request import urlopen
#else:
  #not part of our code but still using if someday python2 is used.


 
  
with urlopen("file:///C:/Users/awarring/Desktop/daniel/silver_reactor/silver_reactor/192.168.25.244/index.html") as url:
   page = url.read()
   soup = BeautifulSoup(page,'html.parser')
   att_body = soup.select('body')
   soup = BeautifulSoup(page, 'lxml')
   tags = soup.find_all('script')
    #don't give space in parenthesis because it can't detect
   l1 = soup.find_all('div', attrs ={'class':'rightPanel'})
   l2 = soup.find('body').find('div', attrs ={'class':'rightPanelWrapper mainWrapper tableCell'}).find_all('div', attrs ={'class':'rightPanel'})
   l3 = soup.select(".rightPanelWrapper mainWrapper tableCell")
   l4 = soup.find_all('div',{'class':'tableRow synoptic'})

    
print(l4)