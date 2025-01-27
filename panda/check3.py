import numpy as np
import plotly
import plotly.graph_objs as go
from plotly.offline import download_plotlyjs, init_notebook_mode, plot, iplot


data_file = np.loadtxt('daniLog.txt.csv',delimiter=',' ,dtype=str)
sensor_read_co2 = data_file[16:1016,1]
Co2_to_be_plotted = list(sensor_read_co2)
sensor_read_O2 = data_file[16:216,3]
O2_to_be_plotted = list(sensor_read_O2)
Rq = data_file[16:,9]


time_diffrence = (np.datetime64('2019-05-30T11:17:37') - np.datetime64('2019-05-29T17:16:48'))/2
y1 = np.arange(0,31516,1)

plot([go.Scatter(x=y1, y=Rq)])