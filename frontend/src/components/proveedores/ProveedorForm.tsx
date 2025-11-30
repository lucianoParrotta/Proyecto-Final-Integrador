// frontend/src/components/proveedores/ProveedorForm.tsx
import React from "react";

const ProveedorForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Este formulario es parte del prototipo (no guarda en base de datos).");
  };

  return (
    <section className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">
          Nuevo proveedor (Prototipo)
        </h1>
        <p className="text-slate-500 text-sm">
          Completa los datos del proveedor. En esta etapa los datos se manejan solo del lado
          del frontend como mock.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Nombre *
          </label>
          <input
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
            placeholder="Proveedor SRL"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            CUIT
          </label>
          <input
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
            placeholder="20-12345678-9"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
            placeholder="contacto@proveedor.com"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Teléfono
          </label>
          <input
            type="tel"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
            placeholder="11 3456 7890"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Dirección
          </label>
          <input
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
            placeholder="Av. Siempre Viva 123"
          />
        </div>

        <div className="md:col-span-2 flex justify-end gap-3 mt-2">
          <button
            type="button"
            className="px-4 py-2 rounded-md border border-slate-300 text-sm text-slate-700 hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-slate-900 text-sm text-white hover:bg-slate-800"
          >
            Guardar (prototipo)
          </button>
        </div>
      </form>
    </section>
  );
};

export default ProveedorForm;
