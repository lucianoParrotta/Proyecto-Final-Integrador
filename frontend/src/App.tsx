//frontend/src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ProductosListPage from "./pages/ProductosListPage";
import ProductoCreatePage from "./pages/ProductoCreatePage";
import ProductoEditPage from "./pages/ProductoEditPage";
import ProductoDetailPage from "./pages/ProductoDetailPage";
import MovimientosListPage from "./pages/MovimientosListPage";
import PrivateRoute from "./components/PrivateRoute";
import CategoriasPages from "./pages/CategoriasPages";
import ProveedoresPage from "./pages/ProveedoresPage";

// ⬇️ NUEVO IMPORT
import ProveedorCreatePage from "./pages/ProveedorCreatePage";

const App: React.FC = () => {
  return (
    <Routes>
      {/* Ruta de Login (sin protección) */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas con el layout general (protegidas) */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        }
      >
        <Route path="home" element={<HomePage />} />
        <Route index element={<HomePage />} />

        {/* Productos */}
        <Route path="productos" element={<ProductosListPage />} />
        <Route path="productos/nuevo" element={<ProductoCreatePage />} />
        <Route path="productos/:id" element={<ProductoDetailPage />} />
        <Route path="productos/:id/editar" element={<ProductoEditPage />} />

        {/* Movimientos */}
        <Route path="movimientos" element={<MovimientosListPage />} />

        {/* Perfil */}
        <Route path="perfil" element={<ProfilePage />} />

        {/* Categorías */}
        <Route path="categorias" element={<CategoriasPages />} />

        {/* Proveedores */}
        <Route path="proveedores" element={<ProveedoresPage />} />
        <Route path="proveedores/nuevo" element={<ProveedorCreatePage />} />
      </Route>
    </Routes>
  );
};

export default App;