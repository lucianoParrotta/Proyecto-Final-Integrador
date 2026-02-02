import React from "react";
import type { Proveedor } from "../../types/proveedor";

interface Props {
  proveedores: Proveedor[];
  onDelete: (id: string) => void;
}

const ProveedorList: React.FC<Props> = ({ proveedores, onDelete }) => {
  return (
    <section className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
      <div className="border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs text-slate-500">
        <span>
          Mostrando <strong>{proveedores.length}</strong> proveedores
        </span>
        <span>Datos reales</span>
      </div>

      {proveedores.length === 0 ? (
        <div className="px-4 py-6 text-center text-xs text-slate-400">
          No se encontraron proveedores con los filtros actuales.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">
                  Nombre
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">
                  Teléfono
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">
                  Email
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">
                  CUIT
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">
                  Dirección
                </th>
                <th className="px-3 py-2 text-right text-xs font-semibold text-slate-500">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((p: any) => (
                <tr key={p.id} className="border-b border-slate-100">
                  <td className="px-3 py-2 text-xs text-slate-700">{p.nombre}</td>
                  <td className="px-3 py-2 text-xs text-slate-600">{p.telefono ?? "-"}</td>
                  <td className="px-3 py-2 text-xs text-slate-600">{p.email ?? "-"}</td>
                  <td className="px-3 py-2 text-xs text-slate-600">{p.cuit ?? "-"}</td>
                  <td className="px-3 py-2 text-xs text-slate-600">{p.direccion ?? "-"}</td>
                  <td className="px-3 py-2 text-xs text-right">
                    <button
                      onClick={() => onDelete(String(p.id))}
                      className="px-2 py-1 rounded-md border border-red-200 text-red-600 text-xs hover:bg-red-50"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Paginado (si después querés, lo hacemos real) */}
      <div className="border-t border-slate-200 px-4 py-2 flex items-center justify-between text-xs text-slate-500">
        <span>Página 1 de 1</span>
        <div className="inline-flex gap-1">
          <button className="px-2 py-1 rounded-md border border-slate-200 text-slate-400 cursor-not-allowed">
            Anterior
          </button>
          <button className="px-2 py-1 rounded-md border border-slate-900 bg-slate-900 text-white">
            1
          </button>
          <button className="px-2 py-1 rounded-md border border-slate-200 text-slate-400 cursor-not-allowed">
            Siguiente
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProveedorList;