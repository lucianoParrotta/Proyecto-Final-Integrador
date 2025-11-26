import React from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/HomePage";
import ProductosListPage from "./pages/ProductosListPage";

const App: React.FC = () => {
  return (
    <Routes>
      {/* Rutas con el layout general */}
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="productos" element={<ProductosListPage />} />
        {/* después sumamos más rutas: categorías, etc. */}
      </Route>
    </Routes>
  );
};

export default App;