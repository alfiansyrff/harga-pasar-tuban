import { utils, write, WorkBook, WorkSheet } from "xlsx";

interface Item {
  name: string;
  currentPrice: number;
}

interface DayData {
  tanggal: string;
  items: Item[];
}

function generateExcelData(data: DayData[]): Blob {
  const workbook: WorkBook = utils.book_new();
  const worksheetData: any[][] = [];
  const columnSpacing = 0;

  const headerRow = ["Komoditas", ...data.map(dayData => dayData.tanggal)];
  worksheetData.push(headerRow);


  const itemNames = data[0].items.map(item => item.name);

  itemNames.forEach((itemName, itemIndex) => {
    const rowData: any[] = [itemName]; 

    let total = 0;
    let count = 0;

    data.forEach(dayData => {
      const item = dayData.items[itemIndex];
      rowData.push(item.currentPrice);
      total += item.currentPrice;
      count += 1;
    });

    worksheetData.push(rowData);
  });

  const worksheet: WorkSheet = utils.aoa_to_sheet(worksheetData);
  utils.book_append_sheet(workbook, worksheet, "All Data");

  const excelData = write(workbook, { bookType: 'xlsx', type: 'array' });
  return new Blob([excelData], { type: "application/octet-stream" });
}

export default generateExcelData;