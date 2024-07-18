import { utils, write, WorkBook, WorkSheet } from "xlsx";

function generateExcelData(data: { tanggal: string, items: any[] }[]) {
  const workbook: WorkBook = utils.book_new();

  data.forEach((dayData) => {
    const worksheet: WorkSheet = utils.json_to_sheet(dayData.items);
    utils.book_append_sheet(workbook, worksheet, dayData.tanggal);
  });

  const excelData = write(workbook, { bookType: 'xlsx', type: 'array' });
  return new Blob([excelData], { type: "application/octet-stream" });
}

export default generateExcelData;