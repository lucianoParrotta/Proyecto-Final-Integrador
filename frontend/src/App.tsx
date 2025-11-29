import React from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/HomePage";
import ProductosListPage from "./pages/ProductosListPage";
import ProductoCreatePage from "./pages/ProductoCreatePage";
import ProductoEditPage from "./pages/ProductoEditPage";
import ProductoDetailPage from "./pages/ProductoDetailPage"; 

const App: React.FC = () => {
  return (
    <Routes>
      {/* Rutas con el layout general */}
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="productos" element={<ProductosListPage />} />
        <Route path="productos/nuevo" element={<ProductoCreatePage />} />
        <Route path="productos/:id" element={<ProductoDetailPage />} />        
        <Route path="productos/:id/editar" element={<ProductoEditPage />} />
      </Route>
    </Routes>
  );
};

export default App;