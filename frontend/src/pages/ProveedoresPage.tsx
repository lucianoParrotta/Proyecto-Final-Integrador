import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Proveedor } from "../types/proveedor";
import { getProveedores, deleteProveedor } from "../api/proveedoresApi";
import ProveedorList from "../components/proveedores/ProveedorList";

const ProveedoresPage: React.FC = () => {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [busqueda, setBusqueda] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProveedores = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProveedores();
      setProveedores(data);
    } catch (e: any) {
      console.error(e);
      setError(
        e?.response?.data?.message ||
          e?.response?.data?.error ||
          e?.message ||
          "No se pudieron cargar los proveedores."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProveedores();
  }, []);

  const handleDelete = async (id: string) => {
    // id viene como string en tu type (mock), pero en backend es numérico.
    const idNum = Number(id);
    if (!Number.isFinite(idNum)) {
      alert("ID inválido. No se pudo eliminar.");
      return;
    }

    if (!window.confirm("¿Seguro que querés eliminar este proveedor?")) return;

    try {
      await deleteProveedor(idNum);
      // optimista: actualizo state local
      setProveedores((prev) => prev.filter((p) => String(p.id) !== String(id)));
    } catch (e: any) {
      console.error(e);
      alert(
        e?.response?.data?.message ||
          e?.response?.data?.error ||
          e?.message ||
          "No se pudo eliminar el proveedor."
      );
    }
  };

  const proveedoresFiltrados = useMemo(() => {
    const term = busqueda.trim().toLowerCase();
    if (!term) return proveedores;

    return proveedores.filter((p: any) =>
      [p.nombre, p.email, p.cuit, p.telefono, p.direccion]
        .filter(Boolean)
        .some((campo: string) => campo.toLowerCase().includes(term))
    );
  }, [proveedores, busqueda]);

  if (loading) {
    return <div className="text-sm text-slate-500">Cargando proveedores...</div>;
  }

  //exportar CSV
  const exportarProveedoresCSV = () => {
    try {
      const rows = proveedoresFiltrados;

      const encabezados = ["ID", "Nombre", "Teléfono", "Email", "CUIT", "Dirección"];

      const escapeCSV = (value: unknown) => {
        const str = String(value ?? "");
        if (/[",\n;]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
        return str;
      };

      const csvLines = [
        encabezados.map(escapeCSV).join(";"),
        ...rows.map((p) =>
          [
            p.id,
            p.nombre ?? "",
            p.telefono ?? "",
            p.email ?? "",
            p.cuit ?? "",
            p.direccion ?? "",
          ]
            .map(escapeCSV)
            .join(";")
        ),
      ];

      const blob = new Blob([csvLines.join("\n")], {
        type: "text/csv;charset=utf-8;",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `proveedores-${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      setError("No se pudo exportar el listado de proveedores.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Proveedores</h1>
          <p className="text-slate-500 text-sm">
            Administración de proveedores del inventario (datos reales).
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={exportarProveedoresCSV}
            className="px-3 py-2 rounded-md border border-slate-300 text-sm text-slate-700 hover:bg-slate-50 inline-flex items-center gap-1"
          >
            Exportar listado
          </button>

          <Link
            to="/proveedores/nuevo"
            className="px-3 py-2 rounded-md bg-slate-900 text-sm text-white hover:bg-slate-800 inline-flex items-center justify-center"
          >
            Nuevo proveedor
          </Link>
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 text-red-700 text-sm px-3 py-2">
          {error}
        </div>
      )}

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
      </section>

      {/* Listado */}
      <ProveedorList proveedores={proveedoresFiltrados} onDelete={handleDelete} />
    </div>
  );
};

export default ProveedoresPage;