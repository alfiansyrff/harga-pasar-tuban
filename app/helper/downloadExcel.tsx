import generateExcelData from "./ExcelDataGenerator";

function downloadExcelFile(data: any) {
  const excelData = generateExcelData(data);
  const blob = new Blob([excelData], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const today = new Date().toLocaleDateString();
  link.href = url;
  link.setAttribute("download", `harga-konsumen_${today}.xlsx`);
  document.body.appendChild(link);
  link.click();
}

export default downloadExcelFile;