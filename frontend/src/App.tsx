import React from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/HomePage";
import ProductosListPage from "./pages/ProductosListPage";
<<<<<<< Updated upstream

// IMPORTS DE PROVEEDORES (agregar)
import ProveedoresPage from "./pages/proveedores/ProveedoresPage";
import ProveedorDetallePage from "./pages/proveedores/ProveedorDetallePage";
=======
import ProductoCreatePage from "./pages/ProductoCreatePage";
import ProductoEditPage from "./pages/ProductoEditPage";
import ProductoDetailPage from "./pages/ProductoDetailPage";
import MovimientosListPage from "./pages/MovimientosListPage";
import PrivateRoute from "./components/PrivateRoute";
import CategoriasPages from "./pages/CategoriasPages";
import ProveedoresPage from "./pages/ProveedoresPage";
>>>>>>> Stashed changes

const App: React.FC = () => {
  return (
    <Routes>
      {/* Rutas con el layout general */}
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="productos" element={<ProductosListPage />} />

        {/* 📌 RUTAS DEL MÓDULO PROVEEDORES */}
        <Route path="proveedores" element={<ProveedoresPage />} />

        {/* después sumamos más rutas: categorías, etc. */}
      </Route>
    </Routes>
  );
};

export default App;