import tkinter as tki # tkinter in Python 3

root = tki.Tk()

CheckList = [2,2,3,4,4,5,4,5,5,6,6,6,8,8,7,1]
SplitOurData = [CheckList[i:i + 2] for i in range(0, len(CheckList), 2)]
print(SplitOurData)
frm = tki.Frame(root, bd=16)
frm.grid()

var = tki.StringVar()
#for column in range(len(SplitOurData)):
    #mild = tki.Radiobutton(frm, text=CheckList[column], variable=var,bg='SlateBlue3', fg='white' )
    #mild.config(indicatoron=0, bd=4, width=12, value='Mild')
    #mild.grid(row=0, column=column)
#root.mainloop()

for i in range(len(SplitOurData)):
    j = 0
    for column in SplitOurData[i]:
        print(column)
        mild = tki.Radiobutton(frm, text=column, variable=var,bg='SlateBlue3', fg='white' )
        mild.config(indicatoron=0, bd=4, width=12, value='Mild')
        mild.grid(row=i, column=j)
        j=j+1



root.mainloop()



