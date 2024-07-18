import generateExcelData from "./ExcelGeneratorMingguan";

function downloadExcelFile(data: { tanggal: string, items: any[] }[]) {
  const excelData = generateExcelData(data);
  const url = URL.createObjectURL(excelData);
  const link = document.createElement("a");
  const today = new Date().toLocaleDateString();
  link.href = url;
  link.setAttribute("download", `harga-konsumen_${today}.xlsx`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default downloadExcelFile;