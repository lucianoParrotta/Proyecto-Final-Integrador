export type Producto = {
  id: number;
  codigo: string;
  nombre: string;
  categoria: string;
  proveedor: string;
  stock: number;
  stockMinimo: number;
  precio: number;
  estado: "Activo" | "Inactivo";
  descripcion?: string;
};

export const MOCK_PRODUCTOS: Producto[] = [
  {
    id: 1,
    codigo: "PRD-001",
    nombre: "Mate Imperial Negro",
    categoria: "Regalería",
    proveedor: "Proveedor Andes",
    stock: 15,
    stockMinimo: 5,
    precio: 15000,
    estado: "Activo",
    descripcion: "Mate imperial color negro con virola de acero inoxidable.",
  },
  {
    id: 2,
    codigo: "PRD-002",
    nombre: "Vaso térmico acero",
    categoria: "Bazar",
    proveedor: "AceroPlus",
    stock: 4,
    stockMinimo: 10,
    precio: 21000,
    estado: "Activo",
    descripcion: "Vaso térmico de acero inoxidable 500 ml.",
  },
  {
    id: 3,
    codigo: "PRD-003",
    nombre: "Set velas decorativas",
    categoria: "Decoración",
    proveedor: "Luz & Aroma",
    stock: 30,
    stockMinimo: 8,
    precio: 9500,
    estado: "Activo",
    descripcion: "Set de 3 velas aromáticas decorativas.",
  },
  {
    id: 4,
    codigo: "PRD-004",
    nombre: "Cuadro abstracto Nordic",
    categoria: "Decoración",
    proveedor: "Nordic Home",
    stock: 2,
    stockMinimo: 3,
    precio: 48000,
    estado: "Inactivo",
    descripcion: "Cuadro estilo nórdico con marco de madera natural.",
  },
];