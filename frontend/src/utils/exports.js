import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from "xlsx";
import { saveAs } from 'file-saver';

export function exportCategoriasPDF(categorias, title = 'Reporte de Categorías') {
  const doc = new jsPDF();
  const dateStr = new Date().toLocaleString();

  // Encabezado
  doc.setFontSize(14);
  doc.text(title, 14, 16);
  doc.setFontSize(10);
  doc.text(`Fecha: ${dateStr}`, 14, 22);

  // Filas
  const rows = categorias.map(c => [
    c.nombre,
    c.descripcion || '',
    c.cantidad ?? ''
  ]);

  autoTable(doc, {
    head: [['Nombre', 'Descripción', 'Cantidad productos']],
    body: rows,
    startY: 28
  });

  doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
}

export function exportCategoriasXLS(categorias, filename = 'categorias.xlsx') {
  const wsData = categorias.map(c => ({
    Nombre: c.nombre,
    Descripcion: c.descripcion || '',
    Cantidad: c.cantidad ?? ''
  }));

  const ws = XLSX.utils.json_to_sheet(wsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Categorias');

  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), filename);
}

// ===============================
//  EXPORTAR STOCK BAJO (PDF)
// ===============================
export function exportStockBajoPDF(data, title = 'Stock Bajo por Categoría') {
  const doc = new jsPDF();
  const dateStr = new Date().toLocaleString();

  // Encabezado
  doc.setFontSize(14);
  doc.text(title, 14, 16);
  doc.setFontSize(10);
  doc.text(`Fecha: ${dateStr}`, 14, 22);

  // Construcción de filas
  const rows = [];

  data.forEach(cat => {
    cat.productosBajoStock.forEach(p => {
      rows.push([
        cat.categoria,
        p.nombre,
        p.stock
      ]);
    });
  });

  autoTable(doc, {
    head: [['Categoría', 'Producto', 'Stock']],
    body: rows,
    startY: 28
  });

  doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
}

// ===============================
//  EXPORTAR STOCK BAJO (XLS)
// ===============================
export function exportStockBajoXLS(data, filename = 'stock_bajo_categorias.xlsx') {
  const wsData = [];

  data.forEach(cat => {
    cat.productosBajoStock.forEach(p => {
      wsData.push({
        Categoria: cat.categoria,
        Producto: p.nombre,
        Stock: p.stock
      });
    });
  });

  const ws = XLSX.utils.json_to_sheet(wsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'StockBajo');

  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), filename);
}

