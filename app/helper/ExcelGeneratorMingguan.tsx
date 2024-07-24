// import { utils, write, WorkBook, WorkSheet } from "xlsx";

// function generateExcelData(data: { tanggal: string, items: any[] }[]) {
//   const workbook: WorkBook = utils.book_new();

//   data.forEach((dayData) => {
//     const worksheet: WorkSheet = utils.json_to_sheet(dayData.items);
//     utils.book_append_sheet(workbook, worksheet, dayData.tanggal);
//   });

//   const excelData = write(workbook, { bookType: 'xlsx', type: 'array' });
//   return new Blob([excelData], { type: "application/octet-stream" });
// }

// export default generateExcelData;

import { utils, write, WorkBook, WorkSheet } from "xlsx";

interface Item {
  name: string;
  currentPrice: number;
  // other fields can be included if necessary
}

interface DayData {
  tanggal: string;
  items: Item[];
}

function generateExcelData(data: DayData[]): Blob {
  const workbook: WorkBook = utils.book_new();
  const worksheetData: any[][] = [];
  const columnSpacing = 2; // Number of empty columns between each day's data

  data.forEach((dayData, index) => {
    const dayRows: any[][] = [
      ['Name', 'Current Price'],
      ...dayData.items.map(item => [item.name, item.currentPrice])
    ];

    if (index === 0) {
      // Initialize worksheetData with the first day's data
      worksheetData.push([dayData.tanggal]);
      dayRows.forEach((row, rowIndex) => {
        if (worksheetData[rowIndex + 1] === undefined) {
          worksheetData[rowIndex + 1] = [];
        }
        worksheetData[rowIndex + 1].push(...row);
      });
    } else {
      // Calculate the starting column for this day's data
      const startColumn = worksheetData[0].length + columnSpacing;

      // Add date header in the correct position
      worksheetData[0][startColumn] = dayData.tanggal;

      // Append each row's data to the correct position
      dayRows.forEach((row, rowIndex) => {
        if (worksheetData[rowIndex + 1] === undefined) {
          worksheetData[rowIndex + 1] = [];
        }
        for (let i = 0; i < startColumn; i++) {
          if (worksheetData[rowIndex + 1][i] === undefined) {
            worksheetData[rowIndex + 1][i] = "";
          }
        }
        worksheetData[rowIndex + 1].push(...row);
      });
    }
  });

  const worksheet: WorkSheet = utils.aoa_to_sheet(worksheetData);
  utils.book_append_sheet(workbook, worksheet, "All Data");

  const excelData = write(workbook, { bookType: 'xlsx', type: 'array' });
  return new Blob([excelData], { type: "application/octet-stream" });
}

export default generateExcelData;
