import React from "react";
import { NavLink } from "react-router-dom";

const linkBase =
  "block px-3 py-2 rounded-md text-sm font-medium transition-colors";
const linkInactive = "text-slate-500 hover:bg-slate-100 hover:text-slate-900";
const linkActive = "bg-slate-900 text-white";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 border-r border-slate-200 bg-slate-50 h-full flex flex-col">
      {/* Header */}
      <div className="h-14 flex items-center px-4 border-b border-slate-200">
        <span className="font-bold text-slate-800 text-sm">
          SGIG Panel
        </span>
      </div>

      {/* Navegación */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        {/* Principal */}
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          Dashboard
        </NavLink>

        {/* Inventario */}
        <div className="mt-3 text-xs font-semibold text-slate-400 uppercase px-2">
          Inventario
        </div>

        <NavLink
          to="/productos"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          Productos
        </NavLink>

        <NavLink
          to="/categorias"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          Categorías
        </NavLink>

        <NavLink
          to="/proveedores"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          Proveedores
        </NavLink>

        {/* Operaciones */}
        <div className="mt-3 text-xs font-semibold text-slate-400 uppercase px-2">
          Operaciones
        </div>

        <NavLink
          to="/movimientos"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          Movimientos de Stock
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 p-3 text-xs text-slate-400">
        SGIG · Prototipo
      </div>
    </aside>
  );
};

export default Sidebar;