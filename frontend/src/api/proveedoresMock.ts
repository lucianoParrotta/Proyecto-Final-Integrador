import { MOCK_PROVEEDORES } from "../mocks/proveedoresMock";
import type { Proveedor } from "../types/proveedor";

export function getProveedoresMock(): Proveedor[] {
  return MOCK_PROVEEDORES;
}
