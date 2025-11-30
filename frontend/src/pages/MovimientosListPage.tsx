import { useState, useEffect } from "react";
import React from "react";
import { getMovimientosMock } from "../mocks/movimientosMock";

interface Movimiento {
  id: number;
  productoId: number;
  tipo: "ENTRADA" | "SALIDA";
  cantidad: number;
  fecha: string;
  descripcion: string;
  usuario: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  total: number;
  page: number;
  limit: number;
  pages: number;
  data: Movimiento[];
}

const MovimientosListPage: React.FC = () => {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMovimientos, setTotalMovimientos] = useState(0);
  const [limit] = useState(10);

  // Filtros
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroProducto, setFiltroProducto] = useState("");
  const [filtroFechaInicio, setFiltroFechaInicio] = useState("");
  const [filtroFechaFin, setFiltroFechaFin] = useState("");
  const [busqueda, setBusqueda] = useState("");

  // Modal
  const [mostrarModal, setMostrarModal] = useState(false);
  const [editando, setEditando] = useState(false);
  const [movimientoSeleccionado, setMovimientoSeleccionado] =
    useState<Movimiento | null>(null);

  // Formulario
  const [formulario, setFormulario] = useState({
    productoId: "",
    tipo: "ENTRADA",
    cantidad: "",
    descripcion: "",
    usuario: "",
  });

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  useEffect(() => {
    cargarMovimientos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filtroTipo, filtroProducto, filtroFechaInicio, filtroFechaFin]);

  const cargarMovimientos = async () => {
    setLoading(true);
    setError(null);

    try {
      // Usar mocks en lugar de API
      let datos = getMovimientosMock();

      // Aplicar filtros
      if (filtroTipo) {
        datos = datos.filter((m) => m.tipo === filtroTipo);
      }
      if (filtroProducto) {
        datos = datos.filter((m) => m.productoId === parseInt(filtroProducto));
      }
      if (filtroFechaInicio || filtroFechaFin) {
        datos = datos.filter((m) => {
          const fecha = new Date(m.fecha);
          if (filtroFechaInicio && fecha < new Date(filtroFechaInicio))
            return false;
          if (filtroFechaFin && fecha > new Date(filtroFechaFin)) return false;
          return true;
        });
      }

      // Simular paginación
      const total = datos.length;
      const pages = Math.ceil(total / limit);
      const offset = (page - 1) * limit;
      const paginados = datos.slice(offset, offset + limit);

      setMovimientos(paginados);
      setTotalPages(pages);
      setTotalMovimientos(total);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido";
      setError(errorMessage);
      console.error("Error cargando movimientos:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGuardar = async () => {
    try {
      if (!formulario.productoId || !formulario.cantidad) {
        setError("Por favor completa los campos requeridos");
        return;
      }

      const url = editando
        ? `${apiUrl}/movimientos/${movimientoSeleccionado?.id}`
        : `${apiUrl}/movimientos`;

      const method = editando ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_API_KEY || "test-key",
        },
        body: JSON.stringify(formulario),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      setMostrarModal(false);
      setFormulario({
        productoId: "",
        tipo: "ENTRADA",
        cantidad: "",
        descripcion: "",
        usuario: "",
      });
      setEditando(false);
      setMovimientoSeleccionado(null);
      cargarMovimientos();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido";
      setError(errorMessage);
    }
  };

  const handleEditar = (movimiento: Movimiento) => {
    setMovimientoSeleccionado(movimiento);
    setFormulario({
      productoId: movimiento.productoId.toString(),
      tipo: movimiento.tipo,
      cantidad: movimiento.cantidad.toString(),
      descripcion: movimiento.descripcion || "",
      usuario: movimiento.usuario || "",
    });
    setEditando(true);
    setMostrarModal(true);
  };

  const handleEliminar = async (id: number) => {
    if (!window.confirm("¿Confirmas que deseas eliminar este movimiento?"))
      return;

    try {
      const response = await fetch(`${apiUrl}/movimientos/${id}`, {
        method: "DELETE",
        headers: {
          "x-api-key": import.meta.env.VITE_API_KEY || "test-key",
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      cargarMovimientos();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido";
      setError(errorMessage);
    }
  };

  const handleNuevoMovimiento = () => {
    setFormulario({
      productoId: "",
      tipo: "ENTRADA",
      cantidad: "",
      descripcion: "",
      usuario: "",
    });
    setEditando(false);
    setMovimientoSeleccionado(null);
    setMostrarModal(true);
  };

  const handleCancelar = () => {
    setMostrarModal(false);
    setFormulario({
      productoId: "",
      tipo: "ENTRADA",
      cantidad: "",
      descripcion: "",
      usuario: "",
    });
    setEditando(false);
    setMovimientoSeleccionado(null);
  };

  const exportarPDF = async () => {
    try {
      const params = new URLSearchParams();
      if (filtroFechaInicio) params.append("fechaInicio", filtroFechaInicio);
      if (filtroFechaFin) params.append("fechaFin", filtroFechaFin);

      const response = await fetch(
        `${apiUrl}/movimientos/reportes/periodo?${params}`,
        {
          headers: {
            "x-api-key": import.meta.env.VITE_API_KEY || "test-key",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();
      const csvContent = [
        [
          "ID",
          "Producto ID",
          "Tipo",
          "Cantidad",
          "Fecha",
          "Descripción",
          "Usuario",
        ],
        ...data.map((mov: Movimiento) => [
          mov.id,
          mov.productoId,
          mov.tipo,
          mov.cantidad,
          new Date(mov.fecha).toLocaleDateString(),
          mov.descripcion || "",
          mov.usuario || "",
        ]),
      ];

      const csv = csvContent.map((row) => row.join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `movimientos-${
        new Date().toISOString().split("T")[0]
      }.csv`;
      link.click();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido";
      setError(errorMessage);
    }
  };

  const exportarRotacion = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/movimientos/reportes/rotacion`,
        {
          headers: {
            "x-api-key": import.meta.env.VITE_API_KEY || "test-key",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();

      const csvContent = [
        [
          "Producto ID",
          "Total Entradas",
          "Total Salidas",
          "Rotación (Salidas/Entradas)",
        ],
        ...data.map((rot: any) => [
          rot.productoId,
          rot.totalEntradas,
          rot.totalSalidas,
          rot.totalEntradas > 0
            ? (rot.totalSalidas / rot.totalEntradas).toFixed(2)
            : "0.00",
        ]),
      ];

      const csv = csvContent.map((row) => row.join(",")).join("\n");
      const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `rotacion-productos-${
        new Date().toISOString().split("T")[0]
      }.csv`;
      link.click();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido";
      setError(errorMessage);
    }
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">
            Movimientos de Stock
          </h1>
          <p className="text-slate-500 text-sm">
            Gestiona las entradas y salidas de stock. Esta vista se conecta al
            backend real para registrar los movimientos.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={exportarPDF}
            className="px-3 py-2 rounded-md border border-slate-300 text-sm text-slate-700 hover:bg-slate-50 inline-flex items-center gap-1"
          >
            Exportar movimientos
          </button>
          <button
            onClick={exportarRotacion}
            className="px-3 py-2 rounded-md border border-slate-300 text-sm text-slate-700 hover:bg-slate-50 inline-flex items-center gap-1"
          >
            Reporte rotación
          </button>
          <button
            onClick={handleNuevoMovimiento}
            className="px-3 py-2 rounded-md bg-slate-900 text-sm text-white hover:bg-slate-800 inline-flex items-center justify-center"
          >
            + Nuevo movimiento
          </button>
        </div>
      </div>

      {/* Alertas */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* Filtros */}
      <section className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
          {/* Búsqueda */}
          <div className="col-span-1">
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Buscar
            </label>
            <input
              type="text"
              placeholder="Buscar por descripción, usuario..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
            />
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Tipo
            </label>
            <select
              value={filtroTipo}
              onChange={(e) => {
                setFiltroTipo(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
            >
              <option value="">Todos los tipos</option>
              <option value="ENTRADA">Entrada</option>
              <option value="SALIDA">Salida</option>
            </select>
          </div>

          {/* Producto ID */}
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Producto ID
            </label>
            <input
              type="number"
              placeholder="Producto ID"
              value={filtroProducto}
              onChange={(e) => {
                setFiltroProducto(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
            />
          </div>

          {/* Fecha desde */}
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Desde
            </label>
            <input
              type="date"
              value={filtroFechaInicio}
              onChange={(e) => {
                setFiltroFechaInicio(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
            />
          </div>

          {/* Fecha hasta */}
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Hasta
            </label>
            <input
              type="date"
              value={filtroFechaFin}
              onChange={(e) => {
                setFiltroFechaFin(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
            />
          </div>
        </div>

        <p className="text-xs text-slate-400">
          Los filtros se aplican sobre los datos reales devueltos por la API de
          movimientos.
        </p>
      </section>

      {/* Tabla de movimientos */}
      <section className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        {/* Header tabla */}
        <div className="border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs text-slate-500">
          <span>
            Mostrando <strong>{movimientos.length}</strong> de{" "}
            <strong>{totalMovimientos}</strong> movimientos
          </span>
          <span>Datos en tiempo real desde la API</span>
        </div>

        {loading ? (
          <div className="p-8 text-center text-sm text-slate-500">
            Cargando movimientos...
          </div>
        ) : movimientos.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-500">
            No hay movimientos registrados con los filtros actuales.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">
                    ID
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">
                    Producto
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">
                    Tipo
                  </th>
                  <th className="px-3 py-2 text-right text-xs font-semibold text-slate-500">
                    Cantidad
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">
                    Fecha
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">
                    Usuario
                  </th>
                  <th className="px-3 py-2 text-right text-xs font-semibold text-slate-500">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {movimientos
                  .filter((m) => {
                    if (!busqueda.trim()) return true;
                    const text = `${m.descripcion ?? ""} ${
                      m.usuario ?? ""
                    }`.toLowerCase();
                    return text.includes(busqueda.toLowerCase());
                  })
                  .map((movimiento) => (
                    <tr
                      key={movimiento.id}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-3 py-2 text-xs text-slate-700">
                        {movimiento.id}
                      </td>
                      <td className="px-3 py-2 text-xs text-slate-700">
                        {movimiento.productoId}
                      </td>
                      <td className="px-3 py-2 text-xs">
                        <span
                          className={
                            "inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium " +
                            (movimiento.tipo === "ENTRADA"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200")
                          }
                        >
                          {movimiento.tipo}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-xs text-right text-slate-700">
                        {movimiento.cantidad}
                      </td>
                      <td className="px-3 py-2 text-xs text-slate-600">
                        {new Date(movimiento.fecha).toLocaleDateString()}
                      </td>
                      <td className="px-3 py-2 text-xs text-slate-600">
                        {movimiento.usuario || "-"}
                      </td>
                      <td className="px-3 py-2 text-xs text-right">
                        <button
                          onClick={() => handleEditar(movimiento)}
                          className="px-2 py-1 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 mr-1"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleEliminar(movimiento.id)}
                          className="px-2 py-1 rounded-md border border-slate-200 text-slate-400 hover:bg-rose-50 hover:text-rose-700"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="border-t border-slate-200 px-4 py-2 flex items-center justify-between text-xs text-slate-500">
            <span>
              Página {page} de {totalPages}
            </span>
            <div className="inline-flex gap-1">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-2 py-1 rounded-md border border-slate-200 text-slate-500 disabled:opacity-40 hover:bg-slate-50"
              >
                Anterior
              </button>
              <button className="px-2 py-1 rounded-md border border-slate-900 bg-slate-900 text-white">
                {page}
              </button>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-2 py-1 rounded-md border border-slate-200 text-slate-500 disabled:opacity-40 hover:bg-slate-50"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Modal */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
              <h2 className="text-2xl font-bold">
                {editando ? "Editar movimiento" : "Nuevo movimiento"}
              </h2>
              <p className="text-sm text-blue-50/80 mt-1">
                Completa los datos del movimiento de stock.
              </p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Producto ID *
                </label>
                <input
                  type="number"
                  value={formulario.productoId}
                  onChange={(e) =>
                    setFormulario({
                      ...formulario,
                      productoId: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Tipo *
                </label>
                <select
                  value={formulario.tipo}
                  onChange={(e) =>
                    setFormulario({
                      ...formulario,
                      tipo: e.target.value as "ENTRADA" | "SALIDA",
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                >
                  <option value="ENTRADA">Entrada</option>
                  <option value="SALIDA">Salida</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Cantidad *
                </label>
                <input
                  type="number"
                  step="1"
                  value={formulario.cantidad}
                  onChange={(e) =>
                    setFormulario({
                      ...formulario,
                      cantidad: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Descripción
                </label>
                <textarea
                  value={formulario.descripcion}
                  onChange={(e) =>
                    setFormulario({
                      ...formulario,
                      descripcion: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Usuario
                </label>
                <input
                  type="text"
                  value={formulario.usuario}
                  onChange={(e) =>
                    setFormulario({
                      ...formulario,
                      usuario: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleGuardar}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2 px-4 rounded-lg text-sm"
                >
                  Guardar
                </button>
                <button
                  onClick={handleCancelar}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovimientosListPage;