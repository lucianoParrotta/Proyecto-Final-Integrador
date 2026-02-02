import React from "react";
import { useNavigate } from "react-router-dom";
import ProductoForm from "../components/productos/ProductoForm";

const ProductoCreatePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">Nuevo producto</h1>
        <p className="text-slate-500 text-sm">Alta de productos en el inventario.</p>
      </div>

      <ProductoForm
        modo="crear"
        onCancelar={() => navigate("/productos")}
        onSuccess={() => navigate("/productos")}
      />
    </div>
  );
};

export default ProductoCreatePage;