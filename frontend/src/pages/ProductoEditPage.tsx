import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductoForm from "../components/productos/ProductoForm";
import { MOCK_PRODUCTOS } from "../mocks/productosMock";

const ProductoEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const producto = MOCK_PRODUCTOS.find((p) => p.id === Number(id));

  const handleCancelar = () => {
    navigate("/productos");
  };

  if (!producto) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-slate-800">
          Producto no encontrado
        </h1>
        <p className="text-slate-500 text-sm">
          No se encontró un producto con ID <span className="font-mono">{id}</span> 
          en los datos mock del prototipo.
        </p>
        <button
          className="px-3 py-2 rounded-md border border-slate-300 text-sm text-slate-700 hover:bg-slate-50"
          onClick={() => navigate("/productos")}
        >
          Volver al listado
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">
          Editar producto
        </h1>
        <p className="text-slate-500 text-sm">
          Edición de los datos del producto con ID{" "}
          <span className="font-mono">{id}</span>. En este prototipo los datos
          se cargan desde el mock local.
        </p>
      </div>

      <ProductoForm
        modo="editar"
        onCancelar={handleCancelar}
        productoInicial={producto}
      />
    </div>
  );
};

export default ProductoEditPage;