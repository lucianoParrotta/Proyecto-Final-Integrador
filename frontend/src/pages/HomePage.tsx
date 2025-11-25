import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-slate-800">
        Dashboard general
      </h1>
      <p className="text-slate-500 text-sm">
        Esta es la vista principal del prototipo. Acá después vas a mostrar
        tarjetas de stock, alertas y resúmenes.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-sm rounded-lg p-4 border border-slate-100">
          <div className="text-xs text-slate-400">Productos totales</div>
          <div className="text-2xl font-bold text-slate-800 mt-1">124</div>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-4 border border-slate-100">
          <div className="text-xs text-slate-400">Stock bajo</div>
          <div className="text-2xl font-bold text-amber-600 mt-1">7</div>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-4 border border-slate-100">
          <div className="text-xs text-slate-400">Movimientos hoy</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">23</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
