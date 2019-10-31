import sys
from bs4 import BeautifulSoup
import requests
import lxml
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import re
import os
import urllib


#Firefox session
#driver = webdriver.Firefox()
#driver.get("file:///C:/Users/awarring/Desktop/daniel/silver_reactor/silver_reactor/192.168.25.244/index.html")
#driver.implicitly_wait(50)
#driver.find_element_by_id('sensorId').text


url = "file:///C:/Users/awarring/Desktop/daniel/silver_reactor/silver_reactor/192.168.25.244/index.html"
response = urllib.request.urlopen(url)
html = response.read().decode('utf-8')

#print(html)
between_script_tags = re.search('document.querySelector("#mainPanel > div > div.tableCell.sensorCell > div:nth-child(1) > div:nth-child(2) > div")', html)

print(between_script_tags)
 