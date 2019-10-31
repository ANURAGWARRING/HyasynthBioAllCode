from plotly.offline import plot
import plotly.graph_objs as go

fig = go.Figure(data=[go.Bar(y=[1, 3, 2])])
plot(fig, auto_open=True)