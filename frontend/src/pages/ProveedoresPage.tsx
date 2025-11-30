import type { Proveedor } from "../types/proveedor";
import { getProveedoresMock } from "../api/proveedores";
import ProveedorList from "../components/proveedores/ProveedorList";
import ProveedorForm from "../components/proveedores/ProveedorForm";
import { useEffect, useState } from "react";

export default function ProveedoresPage() {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);

  useEffect(() => {
    setProveedores(getProveedoresMock());
  }, []);

  const handleDelete = (id: string) => {
    setProveedores((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Proveedores</h1>

      <ProveedorForm />

      <ProveedorList
        proveedores={proveedores}
        onDelete={handleDelete}
      />
    </div>
  );
}
