/// <reference types="vite/client" />

declare module "*utils/exports.js" {
  export function exportCategoriasPDF(...args: any[]): any;
  export function exportCategoriasXLS(...args: any[]): any;
}