"use client";

import ExcelJS from "exceljs";

export async function downloadExcel(
  filename,
  rows,
  sheetName = "Sheet1"
) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(sheetName);

  // rows = [ [header1, header2], [row1col1, row1col2] ... ]
  rows.forEach((row) => {
    sheet.addRow(row);
  });

  // style header row
  sheet.getRow(1).font = { bold: true };

  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.xlsx`;
  a.click();

  URL.revokeObjectURL(url);
}
