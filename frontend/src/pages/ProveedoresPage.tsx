// frontend/src/pages/ProveedoresPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Proveedor } from "../types/proveedor";
import { getProveedoresMock } from "../api/proveedoresMock";
import ProveedorList from "../components/proveedores/ProveedorList";

const ProveedoresPage: React.FC = () => {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    setProveedores(getProveedoresMock());
  }, []);

  const handleDelete = (id: string) => {
    setProveedores((prev) => prev.filter((p) => p.id !== id));
  };

  const proveedoresFiltrados = useMemo(() => {
    const term = busqueda.trim().toLowerCase();
    if (!term) return proveedores;

    return proveedores.filter((p) =>
      [
        p.nombre,
        p.email,
        p.cuit,
        p.telefono,
        p.direccion,
      ]
        .filter(Boolean)
        .some((campo) => campo.toLowerCase().includes(term))
    );
  }, [proveedores, busqueda]);

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Proveedores</h1>
          <p className="text-slate-500 text-sm">
            Administración de proveedores del inventario. Esta vista es parte del
            prototipo: los datos están mockeados en el frontend.
          </p>
        </div>

        <div className="flex gap-2">
          {/* Botón de exportar futuro (por ahora deshabilitado) */}
          <button
            className="px-3 py-2 rounded-md border border-slate-200 text-sm text-slate-400 cursor-not-allowed"
            title="Funcionalidad en prototipo"
          >
            Exportar listado (Mock)
          </button>

          <Link
            to="/proveedores/nuevo"
            className="px-3 py-2 rounded-md bg-slate-900 text-sm text-white hover:bg-slate-800 inline-flex items-center justify-center"
          >
            Nuevo proveedor
          </Link>
        </div>
      </div>

      {/* Filtros / búsqueda */}
      <section className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          <div className="flex-1">
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Buscar
            </label>
            <input
              type="text"
              placeholder="Buscar por nombre, CUIT, email..."
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>

        <p className="text-xs text-slate-400">
          La búsqueda funciona solamente sobre el conjunto de datos mock del prototipo.
          En la versión final se conectará al backend real y a la base de datos.
        </p>
      </section>

      {/* Listado */}
      <ProveedorList
        proveedores={proveedoresFiltrados}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ProveedoresPage;
