import type { Proveedor } from "../../types/proveedor";
import ProveedorCard from "./ProveedorCard";

interface Props {
  proveedores: Proveedor[];
  onSelect: (p: Proveedor) => void;
  onDelete: (id: string) => void;   // ⬅️ NUEVO
}

export default function ProveedorList({ proveedores, onSelect, onDelete }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {proveedores.map((p) => (
        <ProveedorCard
          key={p.id}
          proveedor={p}
          onClick={() => onSelect(p)}
          onDelete={() => onDelete(p.id)}   // ⬅️ NUEVO
        />
      ))}
    </div>
  );
}
