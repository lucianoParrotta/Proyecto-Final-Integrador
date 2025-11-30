import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MOCK_PRODUCTOS } from "../mocks/productosMock";
// si llegaras a necesitar el tipo Producto:
// import type { Producto } from "../mocks/productosMock";

const ProductosListPage: React.FC = () => {
  const [busqueda, setBusqueda] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todos");
  const [filtroEstado, setFiltroEstado] = useState<string>("todos");

  // Opciones derivadas de los datos mock
  const categorias = useMemo(
    () => Array.from(new Set(MOCK_PRODUCTOS.map((p) => p.categoria))),
    []
  );

  const productosFiltrados = useMemo(() => {
    return MOCK_PRODUCTOS.filter((p) => {
      const matchBusqueda =
        busqueda.trim().length === 0 ||
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.codigo.toLowerCase().includes(busqueda.toLowerCase());

      const matchCategoria =
        filtroCategoria === "todos" || p.categoria === filtroCategoria;

      const matchEstado =
        filtroEstado === "todos" ||
        (filtroEstado === "con-stock-bajo"
          ? p.stock <= p.stockMinimo
          : filtroEstado === "activos"
          ? p.estado === "Activo"
          : filtroEstado === "inactivos"
          ? p.estado === "Inactivo"
          : true);

      return matchBusqueda && matchCategoria && matchEstado;
    });
  }, [busqueda, filtroCategoria, filtroEstado]);

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Productos</h1>
          <p className="text-slate-500 text-sm">
            Gestión de productos del inventario. Esta vista es parte del
            prototipo: los datos están mockeados en el frontend.
          </p>
        </div>

        <div className="flex gap-2">
          <button className="px-3 py-2 rounded-md border border-slate-300 text-sm text-slate-700 hover:bg-slate-50">
            Exportar listado (Mock)
          </button>
          <Link
            to="/productos/nuevo"
            className="px-3 py-2 rounded-md bg-slate-900 text-sm text-white hover:bg-slate-800 inline-flex items-center justify-center"
          >
            Nuevo producto
          </Link>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <section className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          {/* Búsqueda */}
          <div className="flex-1">
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Buscar
            </label>
            <input
              type="text"
              placeholder="Buscar por nombre o código..."
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          {/* Categoría */}
          <div className="w-full md:w-48">
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Categoría
            </label>
            <select
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
            >
              <option value="todos">Todas</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Estado */}
          <div className="w-full md:w-56">
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Estado / stock
            </label>
            <select
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="activos">Solo activos</option>
              <option value="inactivos">Solo inactivos</option>
              <option value="con-stock-bajo">Con stock bajo</option>
            </select>
          </div>
        </div>

        <p className="text-xs text-slate-400">
          Los filtros y la búsqueda funcionan solamente sobre el conjunto de
          datos mock del prototipo. En la versión final se conectarán al backend
          real y a la base de datos.
        </p>
      </section>

      {/* Tabla de productos */}
      <section className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs text-slate-500">
          <span>
            Mostrando <strong>{productosFiltrados.length}</strong> productos
            (mock)
          </span>
          <span>Prototipo · Datos locales</span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">
                  Código
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">
                  Nombre
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">
                  Categoría
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">
                  Proveedor
                </th>
                <th className="px-3 py-2 text-right text-xs font-semibold text-slate-500">
                  Stock
                </th>
                <th className="px-3 py-2 text-right text-xs font-semibold text-slate-500">
                  Precio
                </th>
                <th className="px-3 py-2 text-center text-xs font-semibold text-slate-500">
                  Estado
                </th>
                <th className="px-3 py-2 text-right text-xs font-semibold text-slate-500">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.map((p) => {
                const tieneStockBajo = p.stock <= p.stockMinimo;
                return (
                  <tr key={p.id} className="border-b border-slate-100">
                    <td className="px-3 py-2 text-xs text-slate-700">
                      {p.codigo}
                    </td>
                    <td className="px-3 py-2 text-xs text-slate-700">
                      {p.nombre}
                    </td>
                    <td className="px-3 py-2 text-xs text-slate-600">
                      {p.categoria}
                    </td>
                    <td className="px-3 py-2 text-xs text-slate-600">
                      {p.proveedor}
                    </td>
                    <td className="px-3 py-2 text-xs text-right">
                      <span
                        className={
                          "inline-flex items-center justify-end gap-1 " +
                          (tieneStockBajo
                            ? "text-amber-600"
                            : "text-slate-700")
                        }
                      >
                        {p.stock}
                        {tieneStockBajo && (
                          <span className="text-[10px] px-1 py-0.5 rounded bg-amber-50 border border-amber-200">
                            Bajo
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-xs text-right text-slate-700">
                      ${p.precio.toLocaleString("es-AR")}
                    </td>
                    <td className="px-3 py-2 text-xs text-center">
                      <span
                        className={
                          "inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium " +
                          (p.estado === "Activo"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-500 border border-slate-200")
                        }
                      >
                        {p.estado}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-xs text-right">
                      <div className="inline-flex gap-1">
                        <Link
                          to={`/productos/${p.id}`}
                          className="px-2 py-1 rounded-md border border-slate-300 hover:bg-slate-50"
                        >
                          Ver
                        </Link>
                        <Link
                          to={`/productos/${p.id}/editar`}
                          className="px-2 py-1 rounded-md border border-slate-300 hover:bg-slate-50"
                        >
                          Editar
                        </Link>
                        <button className="px-2 py-1 rounded-md border border-slate-200 text-slate-400 cursor-not-allowed">
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {productosFiltrados.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-3 py-6 text-center text-xs text-slate-400"
                  >
                    No se encontraron productos con los filtros actuales (mock).
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación mock */}
        <div className="border-t border-slate-200 px-4 py-2 flex items-center justify-between text-xs text-slate-500">
          <span>Página 1 de 1 (paginado mock)</span>
          <div className="inline-flex gap-1">
            <button className="px-2 py-1 rounded-md border border-slate-200 text-slate-400 cursor-not-allowed">
              Anterior
            </button>
            <button className="px-2 py-1 rounded-md border border-slate-900 bg-slate-900 text-white">
              1
            </button>
            <button className="px-2 py-1 rounded-md border border-slate-200 text-slate-400 cursor-not-allowed">
              Siguiente
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductosListPage;