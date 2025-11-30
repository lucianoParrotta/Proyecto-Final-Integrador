interface Movimiento {
  id: number;
  productoId: number;
  tipo: "ENTRADA" | "SALIDA";
  cantidad: number;
  fecha: string;
  descripcion: string;
  usuario: string;
  createdAt: string;
  updatedAt: string;
}

export const MOCK_MOVIMIENTOS: Movimiento[] = [
  {
    id: 1,
    productoId: 1,
    tipo: "ENTRADA",
    cantidad: 100,
    fecha: "2024-12-01T10:30:00",
    descripcion: "Compra a Proveedor SRL",
    usuario: "Luciano",
    createdAt: "2024-12-01T10:30:00",
    updatedAt: "2024-12-01T10:30:00",
  },
  {
    id: 2,
    productoId: 1,
    tipo: "SALIDA",
    cantidad: 25,
    fecha: "2024-12-02T14:15:00",
    descripcion: "Venta cliente ABC",
    usuario: "Franco",
    createdAt: "2024-12-02T14:15:00",
    updatedAt: "2024-12-02T14:15:00",
  },
  {
    id: 3,
    productoId: 2,
    tipo: "ENTRADA",
    cantidad: 50,
    fecha: "2024-12-03T09:00:00",
    descripcion: "Compra a Distribuidora Max",
    usuario: "Camilo",
    createdAt: "2024-12-03T09:00:00",
    updatedAt: "2024-12-03T09:00:00",
  },
  {
    id: 4,
    productoId: 3,
    tipo: "SALIDA",
    cantidad: 15,
    fecha: "2024-12-04T11:45:00",
    descripcion: "Venta cliente XYZ",
    usuario: "Federico",
    createdAt: "2024-12-04T11:45:00",
    updatedAt: "2024-12-04T11:45:00",
  },
  {
    id: 5,
    productoId: 2,
    tipo: "ENTRADA",
    cantidad: 75,
    fecha: "2024-12-05T13:20:00",
    descripcion: "Compra a Mayorista Centro",
    usuario: "Luciano",
    createdAt: "2024-12-05T13:20:00",
    updatedAt: "2024-12-05T13:20:00",
  },
  {
    id: 6,
    productoId: 1,
    tipo: "SALIDA",
    cantidad: 30,
    fecha: "2024-12-06T16:10:00",
    descripcion: "Devolución de cliente",
    usuario: "Franco",
    createdAt: "2024-12-06T16:10:00",
    updatedAt: "2024-12-06T16:10:00",
  },
  {
    id: 7,
    productoId: 3,
    tipo: "ENTRADA",
    cantidad: 120,
    fecha: "2024-12-07T08:30:00",
    descripcion: "Compra especial - Promoción",
    usuario: "Camilo",
    createdAt: "2024-12-07T08:30:00",
    updatedAt: "2024-12-07T08:30:00",
  },
  {
    id: 8,
    productoId: 2,
    tipo: "SALIDA",
    cantidad: 20,
    fecha: "2024-12-08T10:00:00",
    descripcion: "Venta online",
    usuario: "Federico",
    createdAt: "2024-12-08T10:00:00",
    updatedAt: "2024-12-08T10:00:00",
  },
];

export function getMovimientosMock(): Movimiento[] {
  return MOCK_MOVIMIENTOS;
}

export function getMovimientoPorIdMock(id: number): Movimiento | undefined {
  return MOCK_MOVIMIENTOS.find((m) => m.id === id);
}
