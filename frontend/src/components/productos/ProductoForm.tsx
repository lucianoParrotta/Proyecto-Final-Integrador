import React from "react";
import type { Producto } from "../../mocks/productosMock";

type ProductoFormProps = {
  modo: "crear" | "editar";
  onCancelar?: () => void;
  productoInicial?: Producto;
};

const ProductoForm: React.FC<ProductoFormProps> = ({ modo, onCancelar, productoInicial }) => {
  const esEdicion = modo === "editar";

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Código */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Código
          </label>
          <input
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
            placeholder="Ej: PRD-001"
            defaultValue={productoInicial?.codigo ?? ""}
          />
        </div>

        {/* Nombre */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Nombre
          </label>
          <input
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
            placeholder="Ej: Mate Imperial Negro"
            defaultValue={productoInicial?.nombre ?? ""}
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Categoría
          </label>
          <select className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400">
            <option value="">Seleccionar...</option>
            <option value="Regalería">Regalería</option>
            <option value="Bazar">Bazar</option>
            <option value="Decoración">Decoración</option>
          </select>
          defaultValue={productoInicial?.categoria ?? ""}
        </div>

        {/* Proveedor */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Proveedor
          </label>
          <select className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400">
            <option value="">Seleccionar...</option>
            <option value="Proveedor Andes">Proveedor Andes</option>
            <option value="AceroPlus">AceroPlus</option>
            <option value="Luz &amp; Aroma">Luz &amp; Aroma</option>
          </select>
          defaultValue={productoInicial?.proveedor ?? ""}
        </div>

        {/* Stock mínimo */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Stock mínimo
          </label>
          <input
            type="number"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
            placeholder="Ej: 5"
            defaultValue={productoInicial?.stockMinimo ?? ""}
          />
        </div>

        {/* Precio */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Precio unitario ($)
          </label>
          <input
            type="number"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
            placeholder="Ej: 15000"
            defaultValue={productoInicial?.precio ?? ""}
          />
        </div>

        {/* Estado */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Estado
          </label>
          defaultValue={productoInicial?.estado ?? "Activo"}
          <select className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400">
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1">
          Descripción
        </label>
        <textarea
          rows={3}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
          placeholder="Descripción breve del producto, materiales, uso, etc."
        />
        defaultValue={productoInicial?.descripcion ?? ""}
      </div>

      {/* Info prototipo */}
      <p className="text-xs text-slate-400">
        Este formulario forma parte del prototipo: los campos no están
        conectados al backend ni a la base de datos. En la versión final se
        validarán y persistirán los cambios.
      </p>

      {/* Botones */}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => onCancelar?.()}
          className="px-3 py-2 rounded-md border border-slate-300 text-sm text-slate-700 hover:bg-slate-50"
        >
          Cancelar
        </button>
        <button className="px-3 py-2 rounded-md bg-slate-900 text-sm text-white hover:bg-slate-800">
          {esEdicion ? "Guardar cambios" : "Crear producto"}
        </button>
      </div>
    </div>
  );
};

export default ProductoForm;