import { useParams } from "react-router-dom";
import { getProveedoresMock } from "../../api/proveedores";
import type { Proveedor } from "../../types/proveedor";

export default function ProveedorDetallePage() {
  const { id } = useParams();
  const proveedor: Proveedor | undefined = getProveedoresMock().find(
    (p) => p.id === id
  );

  if (!proveedor) return <p className="p-6">Proveedor no encontrado.</p>;

  return (
    <div className="p-6 space-y-3">
      <h1 className="text-2xl font-bold">Detalle del Proveedor</h1>

      <div className="p-4 border rounded bg-white space-y-2">
        <p>
          <strong>Nombre:</strong> {proveedor.nombre}
        </p>
        <p>
          <strong>CUIT:</strong> {proveedor.cuit}
        </p>
        <p>
          <strong>Email:</strong> {proveedor.email}
        </p>
        <p>
          <strong>Teléfono:</strong> {proveedor.telefono}
        </p>
        <p>
          <strong>Dirección:</strong> {proveedor.direccion}
        </p>
      </div>
    </div>
  );
}
