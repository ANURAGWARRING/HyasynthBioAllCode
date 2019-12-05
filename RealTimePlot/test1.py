import time
import serial
import re
from matplotlib import pyplot as plt
import numpy as np
from matplotlib import style

import numpy

# set up the serial line
ser = serial.Serial('COM8', 9600)
print(ser)
time.sleep(3)



for eachline in range(10000):
     b = ser.readline()         # read a byte string
     string_n = b.decode()
     FullRow = string_n.rstrip() # remove \n and \r
     SplitFullRow = re.split(',', FullRow)
     TotalTime = float(SplitFullRow[1])
     CO2 = float(SplitFullRow[3])
     print(TotalTime)
     print(CO2)
     plt.scatter(TotalTime, CO2)

     plt.pause(5)

plt.show()



ser.close()
