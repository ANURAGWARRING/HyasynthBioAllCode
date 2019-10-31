import xlwings as xw

xw.Book('daniLog.txt.csv')
active_sheet = xw.sheets.active
used_range_rows = (active_sheet.api.UsedRange.Row, 
	active_sheet.api.UsedRange.Row + active_sheet.api.UsedRange.Rows.Count)
used_range_cols = (active_sheet.api.UsedRange.Column, 
	active_sheet.api.UsedRange.Column + active_sheet.api.UsedRange.Columns.Count)
used_range = xw.Range(*zip(used_range_rows, used_range_cols))
used_range.select()