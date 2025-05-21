import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const formatData = (data) => {
    return data.map((item) => {
      const formattedItem = { ...item };
  
      // Recorre las propiedades del objeto y convierte los arrays a cadenas
      for (const key in formattedItem) {
        if (Array.isArray(formattedItem[key])) {
          formattedItem[key] = formattedItem[key].join(", "); // Convierte el array a una cadena separada por comas
        }
      }
  
      return formattedItem;
    });
  };
  

export const exportToExcel = (data, fileName) => {

    const formattedData = formatData(data);

  // Crea una hoja de cálculo a partir del array de objetos
  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  // Crea un libro de trabajo y agrega la hoja
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

  // Convierte el libro a un archivo Blob
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });

  // Guarda el archivo
  saveAs(dataBlob, `${fileName}.xlsx`);
};
