import openpyxl
import numpy
from matplotlib import pyplot as plt
 #Give the location of the file
path = "test1.xlsx"

# workbook object is created
wb_obj = openpyxl.load_workbook(path)

ws1 = wb_obj.get_sheet_by_name("Sheet1")
sheet_obj = wb_obj.active

timestamp = []
A0V = []
A1V = []
A2V = []


count = 0
count1 = 0

m_row = sheet_obj.max_row

for i in range(1, m_row + 1):
    cell_obj = sheet_obj.cell(row=i*60, column=2)


    if cell_obj.value == None:
        break
    else :
        count=count+1
print(count)

for i in range(1, count-1 ):
    EachTime = sheet_obj.cell(row=i*60, column=2)
    timestamp.append((EachTime.value))

    EachA0V =  sheet_obj.cell(row=i*60, column=4)
    A0V.append(EachA0V.value)

    EachA1V = sheet_obj.cell(row=i * 60, column=6)
    A1V.append(EachA1V.value)

    EachA2V = sheet_obj.cell(row=i * 60, column=8)
    A2V.append(EachA2V.value)



#timestamp[0:2] = []
#A0V[0:2] = []
#A1V[0:2] = []
#A2V[0:2] = []
#A0V[3:13]= [0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02]
#A0V[51]= 0.02
#print(timestamp)
#print(A0V)
#print(A1V)
#print(A2V)



for i in range(42,302):
    timestamp[i] = timestamp[i]+12600

for i in range(302,1861):
    timestamp[i] = timestamp[i]+12600+78035
for i in range(0,1861):
    timestamp[i] = timestamp[i]/3600
#print(A0V)




plt.figure(1)
plt.subplot(311)
plt.plot(timestamp, A0V, 'o--' )
plt.ylabel("Voltage BB")

plt.subplot(312)
plt.plot(timestamp, A1V, 'ko--')
plt.ylabel("Voltage Bs")

plt.subplot(313)
plt.plot(timestamp, A2V, 'ro--')
plt.ylabel("Voltage BO")
plt.xlabel("Time dif in hrs")
plt.show()
