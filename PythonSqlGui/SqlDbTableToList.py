import tkinter
from tkinter import *
import tkinter as tk
MODES = [tk.SINGLE, tk.BROWSE, tk.MULTIPLE, tk.EXTENDED]
import psycopg2
conn = psycopg2.connect(host="localhost",database="strains", user="postgres", password="Jora2775@")
cur = conn.cursor()


queryData = "SELECT * FROM players.info"

cur.execute(queryData)

options = list()
mylist = []

for i in cur.fetchall():
    for row in i:
        mylist.append(row)



SplitOurData = [mylist[i:i + 4] for i in range(0, len(mylist), 4)]
print(SplitOurData)







