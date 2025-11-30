import type { Proveedor } from "../../types/proveedor";

interface Props {
  proveedores: Proveedor[];
  onDelete: (id: string) => void;
}

export default function ProveedorList({ proveedores, onDelete }: Props) {
  return (
    <div className="p-4 bg-white border rounded shadow">
      {/* Encabezado */}
      <div className="grid grid-cols-6 font-semibold border-b pb-2">
        <span>Nombre</span>
        <span>Teléfono</span>
        <span>Email</span>
        <span>CUIT</span>
        <span>Dirección</span>
        <span className="text-center">Acciones</span>
      </div>

      {/* Filas */}
      {proveedores.map((p) => (
        <div
          key={p.id}
          className="grid grid-cols-6 py-2 border-b hover:bg-gray-100 items-center"
        >
          <span>{p.nombre}</span>
          <span>{p.telefono}</span>
          <span>{p.email}</span>
          <span>{p.cuit}</span>
          <span>{p.direccion}</span>

          <div className="flex justify-center">
            <button
              onClick={() => onDelete(p.id)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
