import React from "react";

const Navbar: React.FC = () => {
  return (
    <header className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-4">
      <div className="font-semibold text-slate-800">
        SGIG - Sistema de Gestión de Inventario General
      </div>

      <div className="flex items-center gap-4 text-sm">
        <span className="text-slate-500">Rol: Admin</span>
        <button className="px-3 py-1 rounded-md border text-slate-700 text-xs hover:bg-slate-50">
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};

export default Navbar;