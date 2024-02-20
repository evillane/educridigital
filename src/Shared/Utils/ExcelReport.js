import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style'

const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel;charset=UTF-8';
const fileExtension= '.xlsx';

export function ExcelReport(dataTable) {
    const ws = XLSX.utils.json_to_sheet(dataTable);
    const wb = { Sheets : { 'data':ws } , SheetNames:['data']};
    const excelbuffer = XLSX.write(wb,{ bookType:'xlsx' , type:'array'});
    const dataToExport = new Blob([excelbuffer],{type:fileType});
    FileSaver.saveAs(dataToExport,'ReporteIncidenciaMuniPorve'+fileExtension );
}
