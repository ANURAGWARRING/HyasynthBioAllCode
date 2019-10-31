# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
from matplotlib.pyplot import figure

plt.figure(figsize=(500,400))

data_file = np.loadtxt('etoh823.txt.csv',delimiter=';' ,dtype=str)
sensor_read_co2 = data_file[16:1016,1]
Co2_to_be_plotted = list(sensor_read_co2)
sensor_read_O2 = data_file[16:216,3]
O2_to_be_plotted = list(sensor_read_O2)
Rq = data_file[16:116,9]


time_diffrence = (np.datetime64('2019-05-30T11:17:37') - np.datetime64('2019-05-29T17:16:48'))/2
y1 = np.arange(1,100,100)
data = Rq



x = np.linspace(1, 100,num=100)
plt.plot(y1,Rq,'ro')

plt.savefig('15000_readings.svg',dpi=1000)