// frontend/src/pages/ProductoDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProductoById, type ProductoDTO } from "../api/productosApi";
import { getProveedores } from "../api/proveedoresApi";
import type { Proveedor } from "../types/proveedor";

const ProductoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [producto, setProducto] = useState<ProductoDTO | null>(null);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        if (!id) return;
        const [prod, provs] = await Promise.all([
          getProductoById(Number(id)),
          getProveedores(),
        ]);
        setProducto(prod);
        setProveedores(provs);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const proveedorNombre = (() => {
    if (!producto?.proveedorId) return "-";
    const p = proveedores.find((x: any) => Number(x.id) === Number(producto.proveedorId));
    return p?.nombre ?? "-";
  })();

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

  const precioNumber = Number(producto.precio);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Detalle de producto</h1>
          <p className="text-slate-500 text-sm">Visualización del producto seleccionado.</p>
        </div>

        <div className="flex gap-2">
          <Link
            to={`/productos/${producto.id}/editar`}
            className="px-3 py-2 rounded-md border border-slate-300 text-sm text-slate-700 hover:bg-slate-50"
          >
            Editar
          </Link>
        </div>
      </div>

      <section className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-3">
          <div>
            <div className="text-xs font-medium text-slate-500 uppercase mb-1">Nombre</div>
            <div className="text-lg font-semibold text-slate-800">{producto.nombre}</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-xs font-medium text-slate-500 mb-1">Código</div>
              <div className="font-mono text-slate-800">{producto.codigo}</div>
            </div>

            <div>
              <div className="text-xs font-medium text-slate-500 mb-1">Categoría</div>
              <div className="text-slate-800">{producto.categoria?.nombre ?? "-"}</div>
            </div>

            <div>
              <div className="text-xs font-medium text-slate-500 mb-1">Proveedor</div>
              <div className="text-slate-800">{proveedorNombre}</div>
            </div>

            <div>
              <div className="text-xs font-medium text-slate-500 mb-1">Precio unitario</div>
              <div className="text-slate-800">
                ${Number.isFinite(precioNumber) ? precioNumber.toLocaleString("es-AR") : producto.precio}
              </div>
            </div>
          </div>

          {producto.descripcion && (
            <div>
              <div className="text-xs font-medium text-slate-500 mb-1">Descripción</div>
              <p className="text-sm text-slate-700">{producto.descripcion}</p>
            </div>
          )}
        </div>

        <div className="space-y-3 text-sm">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase">Stock actual</span>
              {producto.stock <= producto.stockMinimo && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  Stock bajo
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-slate-800">{producto.stock}</div>
            <div className="text-xs text-slate-500">
              Stock mínimo configurado: {producto.stockMinimo}
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
            <span className="text-xs font-medium text-slate-500 uppercase">Estado</span>
            <div>
              <span
                className={
                  "inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium " +
                  (producto.estado === "Activo"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-slate-100 text-slate-500 border border-slate-200")
                }
              >
                {producto.estado}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductoDetailPage;