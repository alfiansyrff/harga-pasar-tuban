import { utils, writeFile } from "xlsx";

function generateExcelData(data: any) {
  const worksheet = utils.json_to_sheet(data);
  const workbook = utils.book_new();
  const today = new Date().toLocaleDateString();
  utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const excelData = writeFile(workbook, `harga-konsumen_${today}.xlsx`, {
    compression: true,
  });
  return excelData;
}

export default generateExcelData;