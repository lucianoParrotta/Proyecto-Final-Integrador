import React from "react";

const ProductosListPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-800 mb-2">
        Productos
      </h1>
      <p className="text-slate-500 text-sm mb-4">
        Acá va la tabla de productos, filtros y búsquedas. Por ahora es solo
        un placeholder del prototipo.
      </p>

      <div className="bg-white border border-slate-200 rounded-lg p-4 text-sm text-slate-500">
        [Tabla de productos - prototipo]
      </div>
    </div>
  );
};

export default ProductosListPage;