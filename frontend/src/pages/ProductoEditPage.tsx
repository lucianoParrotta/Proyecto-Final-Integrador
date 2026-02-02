//frontend/src/pages/ProductoEditPage.tsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductoForm from "../components/productos/ProductoForm";
import { getProductoById, type ProductoDTO } from "../api/productosApi";

const ProductoEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [producto, setProducto] = useState<ProductoDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        if (!id) return;
        const data = await getProductoById(Number(id));
        setProducto(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="text-sm text-slate-500">Cargando...</div>;

  if (!producto) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-slate-800">Producto no encontrado</h1>
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
        <h1 className="text-2xl font-semibold text-slate-800">Editar producto</h1>
        <p className="text-slate-500 text-sm">
          Edición del producto con ID <span className="font-mono">{id}</span>.
        </p>
      </div>

      <ProductoForm
        modo="editar"
        productoInicial={producto}
        onCancelar={() => navigate("/productos")}
        onSuccess={() => navigate("/productos")}
      />
    </div>
  );
};

export default ProductoEditPage;