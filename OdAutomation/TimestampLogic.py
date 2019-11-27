#Code for datetime
# Python code to convert string to list
TimeDelta = []


#timeStart
def Convert(string):
    li = list(string.split("_"))
    return li

# Driver code
TStart = sheet_obj.cell(row=1, column=2)
t1 = TStart.value
#print(t1)

#print(Convert(t1[0:4]))
#print(t1)
#print("Total years in hrs:")
T1Yearsinhrs =365*24*int(t1[0:4])
#print(T1Yearsinhrs)
#print("Total months in hrs")
T1months = int(t1[5:7])
#print(T1months)
if  (T1months == 1) or (T1months == 3) or (T1months == 5) or (T1months == 7) or (T1months == 8) or  (T1months == 10)   or (T1months == 12):
    T1monthsinHrs = T1months*31*24
elif (T1months == 4) or (T1months == 6) or  (T1months == 9) or (T1months == 11):
    T1monthsinHrs = T1months * 30 * 24
elif (T1months == 2):
    T1monthsinHrs = T1months * 29 * 24
else:
    print("The month range is out of range")
#print(T1monthsinHrs)

T1Days = int(t1[8:10])
#print(T1Days)
T1DayinHrs = T1Days*24
#print(T1DayinHrs)
T1hrs = int(t1[11:13])
#print(T1hrs)
T1min = int(t1[14:16])
T1minInHrs = T1min/60

#print(T1minInHrs)
TotalStartTimeinHrs = T1Yearsinhrs+T1monthsinHrs+T1DayinHrs+T1hrs+T1minInHrs
#print(TotalStartTimeinHrs)


#TimeEnd
for i in range(0,count-1):
    TEndA = sheet_obj.cell(row=6+i, column=3)
    t2A = TEndA.value
    # print(t2)

    # print(Convert(t2[0:4]))
    # print(t2)
    # print("Total years in hrs:")
    T2YearsinhrsA = 365 * 24 * int(t2A[0:4])
    # print(T2Yearsinhrs)
    # print("Total months in hrs")
    T2monthsA = int(t2A[5:7])
    # print(T2months)
    if (T2monthsA == 1) or (T2monthsA == 3) or (T2monthsA == 5) or (T2monthsA == 7) or (T2monthsA == 8) or (
            T2monthsA == 10) or (T2monthsA == 12):
        T2monthsinHrsA = T2monthsA * 31 * 24
    elif (T2monthsA == 4) or (T2monthsA == 6) or (T2monthsA == 9) or (T2monthsA == 11):
        T2monthsinHrsA = T2monthsA * 30 * 24
    elif (T2monthsA == 2):
        T2monthsinHrsA = T2monthsA * 29 * 24
    else:
        print("The month range is out of range")
    # print(T2monthsinHrs)

    T2DaysA = int(t1[8:10])
    # print(T2Days)
    T2DayinHrsA = T2DaysA* 24
    # print("Total days in hrs:")
    # print(T2DayinHrs)
    T2hrsA = int(t2A[11:13])
    # print("Total hrs in hrs:")
    # print(T2hrs)
    T2minA = float(t2A[14:16])
    # print(T2min)
    T2minInHrsA = float(T2minA / 60)
    # print("Total mins in hrs:")
    # print(T2minInHrs)
    TotalEndTimeinHrsA = T2YearsinhrsA + T2monthsinHrsA + T2DayinHrsA + T2hrsA + T2minInHrsA
    # print(TotalEndTimeinHrs)
    TimeDifA = TotalEndTimeinHrsA - TotalStartTimeinHrs
    TimeDelta.append(TimeDifA)

   #saving The timediff
SplitTimeDelta =  [TimeDelta[i:i + 3] for i in range(0, len(TimeDelta), 3)]
k=0
for row in SplitTimeDelta:

    for i in range(0, 3):
        u20 = sheet_obj.cell(row=6 + k, column=20 + 3 * i)
        u20.value = row[i]
        print(u20.value
          )
    k = k + 1





print(TimeDelta)
wb_obj.save("OD.xlsx")
plt.plot(TimeDelta,avg,'.',)
plt.show()
