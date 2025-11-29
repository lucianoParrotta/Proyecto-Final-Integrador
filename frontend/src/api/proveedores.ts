import type { Proveedor } from "../types/proveedor";

export function getProveedoresMock(): Proveedor[] {
  return [
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
  ];
}
