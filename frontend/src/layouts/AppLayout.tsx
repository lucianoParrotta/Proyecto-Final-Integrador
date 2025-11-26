import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";
import Sidebar from "../components/layouts/Sidebar";

const AppLayout: React.FC = () => {
  return (
    <div className="h-screen flex flex-col bg-slate-100">
      {/* Navbar superior */}
      <Navbar />

      {/* Contenido bajo el navbar */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar izquierda */}
        <Sidebar />

        {/* Contenido principal */}
        <main className="flex-1 min-h-0 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;