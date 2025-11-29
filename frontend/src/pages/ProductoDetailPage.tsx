import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MOCK_PRODUCTOS } from "../mocks/productosMock";

const ProductoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const producto = MOCK_PRODUCTOS.find((p) => p.id === Number(id));

  if (!producto) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-slate-800">
          Producto no encontrado
        </h1>
        <p className="text-slate-500 text-sm">
          No se encontró un producto con ID{" "}
          <span className="font-mono">{id}</span> en los datos mock del
          prototipo.
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
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">
            Detalle de producto
          </h1>
          <p className="text-slate-500 text-sm">
            Visualización en modo solo lectura del producto seleccionado
            (prototipo con datos mock).
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            to={`/productos/${producto.id}/editar`}
            className="px-3 py-2 rounded-md border border-slate-300 text-sm text-slate-700 hover:bg-slate-50"
          >
            Editar
          </Link>
          <button
            className="px-3 py-2 rounded-md border border-slate-200 text-sm text-slate-400 cursor-not-allowed"
          >
            Eliminar
          </button>
        </div>
      </div>

      {/* Card principal */}
      <section className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Info básica */}
        <div className="md:col-span-2 space-y-3">
          <div>
            <div className="text-xs font-medium text-slate-500 uppercase mb-1">
              Nombre
            </div>
            <div className="text-lg font-semibold text-slate-800">
              {producto.nombre}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-xs font-medium text-slate-500 mb-1">
                Código
              </div>
              <div className="font-mono text-slate-800">{producto.codigo}</div>
            </div>

            <div>
              <div className="text-xs font-medium text-slate-500 mb-1">
                Categoría
              </div>
              <div className="text-slate-800">{producto.categoria}</div>
            </div>

            <div>
              <div className="text-xs font-medium text-slate-500 mb-1">
                Proveedor
              </div>
              <div className="text-slate-800">{producto.proveedor}</div>
            </div>

            <div>
              <div className="text-xs font-medium text-slate-500 mb-1">
                Precio unitario
              </div>
              <div className="text-slate-800">
                ${producto.precio.toLocaleString("es-AR")}
              </div>
            </div>
          </div>

          {producto.descripcion && (
            <div>
              <div className="text-xs font-medium text-slate-500 mb-1">
                Descripción
              </div>
              <p className="text-sm text-slate-700">{producto.descripcion}</p>
            </div>
          )}
        </div>

        {/* Panel de stock / estado */}
        <div className="space-y-3 text-sm">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase">
                Stock actual
              </span>
              {producto.stock <= producto.stockMinimo && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  Stock bajo
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-slate-800">
              {producto.stock}
            </div>
            <div className="text-xs text-slate-500">
              Stock mínimo configurado: {producto.stockMinimo}
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
            <span className="text-xs font-medium text-slate-500 uppercase">
              Estado
            </span>
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
            <p className="text-xs text-slate-500">
              Este campo se utiliza para habilitar o deshabilitar el producto en
              las operaciones habituales.
            </p>
          </div>
        </div>
      </section>

      {/* Sección extra mock (movimientos recientes del producto) */}
      <section className="bg-white border border-slate-200 rounded-lg shadow-sm p-4">
        <h2 className="text-sm font-semibold text-slate-700 mb-2">
          Movimientos recientes de este producto (mock)
        </h2>
        <p className="text-xs text-slate-400 mb-3">
          Esta sección es ilustrativa para el prototipo. En la versión final se
          consultarán los movimientos reales asociados a este producto.
        </p>
        <div className="border border-slate-200 rounded-md px-3 py-6 text-center text-xs text-slate-400 border-dashed">
          Aquí se podrían mostrar los últimos movimientos de entrada y salida
          relacionados con este producto.
        </div>
      </section>
    </div>
  );
};

export default ProductoDetailPage;