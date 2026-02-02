export interface CategoriaMock {
  id: number;
  nombre: string;
  descripcion?: string;
}

export const MOCK_CATEGORIAS: CategoriaMock[] = [
  { id: 1, nombre: "Regalería", descripcion: "Artículos de regalo" },
  { id: 2, nombre: "Bazar", descripcion: "Productos de cocina y hogar" },
  { id: 3, nombre: "Decoración", descripcion: "Objetos decorativos" },
  { id: 4, nombre: "Electrónica", descripcion: "Dispositivos electrónicos" },
];
