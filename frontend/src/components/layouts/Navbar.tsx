import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-4 shadow-sm">
      <div className="font-semibold text-slate-800">
        SGIG - Sistema de Gestión de Inventario General
      </div>

      <div className="flex items-center gap-4 text-sm relative">
        <span className="text-slate-600">
          {user ? `Usuario: ${user.user}` : "No autenticado"}
        </span>

        {/* Dropdown Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold flex items-center justify-center hover:shadow-md transition"
          >
            {user ? user.user.charAt(0).toUpperCase() : "?"}
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
              <button
                onClick={() => {
                  navigate("/perfil");
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                👤 Mi Perfil
              </button>
              <hr className="my-1" />
              <button
                onClick={() => {
                  handleLogout();
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                🚪 Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;