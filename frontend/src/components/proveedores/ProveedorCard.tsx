import type { Proveedor } from "../../types/proveedor";

interface Props {
  proveedor: Proveedor;
  onClick: () => void;
  onDelete: () => void;  // ⬅️ NUEVO
}

export default function ProveedorCard({ proveedor, onClick, onDelete }: Props) {
  return (
    <div className="border p-4 rounded shadow flex flex-col gap-2">
      <h2 className="text-xl font-semibold">{proveedor.nombre}</h2>
      <p>CUIT: {proveedor.cuit}</p>
      <p>Teléfono: {proveedor.telefono}</p>
      <p>Email: {proveedor.email}</p>

      <button
        onClick={onClick}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Ver Detalle
      </button>

      <button
        onClick={onDelete}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Eliminar
      </button>
    </div>
  );
}
