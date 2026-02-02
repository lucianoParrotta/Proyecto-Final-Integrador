import type { Proveedor } from "../types/proveedor";

export const MOCK_PROVEEDORES: Proveedor[] = [
  {
    id: "1",
    nombre: "Proveedor SRL",
    cuit: "20-12345678-9",
    telefono: "1134567890",
    email: "contacto@proveedor.com",
    direccion: "Av. Siempre Viva 123",
  },
  {
    id: "2",
    nombre: "Distribuidora Max",
    cuit: "30-98765432-1",
    telefono: "1122334455",
    email: "ventas@max.com",
    direccion: "Calle Falsa 456",
  },
  {
    id: "3",
    nombre: "Mayorista Centro",
    cuit: "27-55555555-3",
    telefono: "1167894321",
    email: "info@maycentro.com",
    direccion: "San Martín 890",
  },
];
