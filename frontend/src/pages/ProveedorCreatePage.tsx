import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProveedor } from "../api/proveedoresApi";
import type { Proveedor } from "../types/proveedor";

const ProveedorCreatePage: React.FC = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [cuit, setCuit] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!nombre.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }

    const payload: Partial<Proveedor> = {
      nombre: nombre.trim(),
      cuit: cuit.trim() || undefined,
      email: email.trim() || undefined,
      telefono: telefono.trim() || undefined,
      direccion: direccion.trim() || undefined,
    };

    try {
      setLoading(true);
      await createProveedor(payload);
      navigate("/proveedores");
    } catch (err: any) {
      console.error(err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Error creando proveedor";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => navigate("/proveedores");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">Nuevo Proveedor</h1>
        <p className="text-slate-500 text-sm">
          Registrar un proveedor en el inventario.
        </p>
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 text-red-700 text-sm px-3 py-2">
          {error}
        </div>
      )}

      <section className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 max-w-4xl">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Nombre *
              </label>
              <input
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm 
                           focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                placeholder="Nombre del proveedor"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                CUIT
              </label>
              <input
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm 
                           focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                placeholder="20-12345678-9"
                value={cuit}
                onChange={(e) => setCuit(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Teléfono
              </label>
              <input
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm 
                           focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                placeholder="Ej: 1123456789"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm 
                           focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                placeholder="contacto@proveedor.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Dirección
            </label>
            <input
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm 
                         focus:outline-none focus:ring-2 focus:ring-slate-900/10"
              placeholder="Calle y número"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md bg-slate-900 text-white text-sm 
                         hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="px-4 py-2 rounded-md bg-slate-100 text-slate-700 text-sm 
                         hover:bg-slate-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ProveedorCreatePage;