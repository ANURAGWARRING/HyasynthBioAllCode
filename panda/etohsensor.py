import numpy as np
import plotly
import plotly.graph_objs as go
from plotly.offline import download_plotlyjs, init_notebook_mode, plot, iplot
import csv
with open('etoh823.txt.csv', 'r') as f:
 wines = list(csv.reader(f, delimiter=';'))
print(wines[:100])