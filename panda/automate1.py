import xlwings as xw

xw.Book('daniLog.txt.csv')
wb = load_workbook(path, use_iterators=True)
    sheet = wb.worksheets[0]
row_count = sheet.max_row
print(row_count)