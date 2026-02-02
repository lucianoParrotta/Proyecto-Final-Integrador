// frontend/src/pages/MovimientosListPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  getMovimientos,
  createMovimiento,
  updateMovimiento,
  deleteMovimiento,
  type MovimientoDTO,
} from "../api/movimientosApi";
import { getProductos, type ProductoDTO } from "../api/productosApi";

type MovimientoFormState = {
  productoId: string; // string para select/input
  tipo: "ENTRADA" | "SALIDA";
  cantidad: string;
  descripcion: string;
};

const MovimientosListPage: React.FC = () => {
  const [movimientos, setMovimientos] = useState<MovimientoDTO[]>([]);
  const [productos, setProductos] = useState<ProductoDTO[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMovimientos, setTotalMovimientos] = useState(0);
  const [limit] = useState(10);

  // Filtros (backend)
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroProducto, setFiltroProducto] = useState(""); // productoId
  const [filtroFechaInicio, setFiltroFechaInicio] = useState("");
  const [filtroFechaFin, setFiltroFechaFin] = useState("");

  // Búsqueda (cliente, sobre página actual)
  const [busqueda, setBusqueda] = useState("");

  // Modal
  const [mostrarModal, setMostrarModal] = useState(false);
  const [editando, setEditando] = useState(false);
  const [movimientoSeleccionado, setMovimientoSeleccionado] =
    useState<MovimientoDTO | null>(null);

  // Formulario (✅ sin usuario)
  const [formulario, setFormulario] = useState<MovimientoFormState>({
    productoId: "",
    tipo: "ENTRADA",
    cantidad: "",
    descripcion: "",
  });

  // Map productoId => "CODIGO - Nombre"
  const productoLabelById = useMemo(() => {
    const map = new Map<number, string>();
    productos.forEach((p) => {
      const codigo = String(p.codigo ?? "").trim();
      const nombre = String(p.nombre ?? "").trim();
      const label =
        [codigo, nombre].filter(Boolean).join(" - ") || `Producto #${p.id}`;
      map.set(Number(p.id), label);
    });
    return map;
  }, [productos]);

  const cargarProductos = async () => {
    try {
      const prods = await getProductos();
      setProductos(prods);
    } catch (e: any) {
      console.error(e);
      setError(
        (prev) => prev ?? "No se pudieron cargar los productos para el selector."
      );
    }
  };

  const cargarMovimientos = async () => {
    setLoading(true);
    setError(null);

    try {
      const resp = await getMovimientos({
        page,
        limit,
        tipo: filtroTipo || undefined,
        productoId: filtroProducto || undefined,
        fechaInicio: filtroFechaInicio || undefined,
        fechaFin: filtroFechaFin || undefined,
      });

      setMovimientos(resp.data);
      setTotalPages(resp.pages);
      setTotalMovimientos(resp.total);
    } catch (err: any) {
      console.error(err);
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Error cargando movimientos.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    cargarMovimientos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filtroTipo, filtroProducto, filtroFechaInicio, filtroFechaFin]);

  const resetFormulario = () => {
    setFormulario({
      productoId: "",
      tipo: "ENTRADA",
      cantidad: "",
      descripcion: "",
    });
  };

  const handleNuevoMovimiento = () => {
    resetFormulario();
    setEditando(false);
    setMovimientoSeleccionado(null);
    setMostrarModal(true);
  };

  const handleEditar = (mov: MovimientoDTO) => {
    setMovimientoSeleccionado(mov);
    setFormulario({
      productoId: String(mov.productoId),
      tipo: mov.tipo,
      cantidad: String(mov.cantidad ?? ""),
      descripcion: String(mov.descripcion ?? ""),
    });
    setEditando(true);
    setMostrarModal(true);
  };

  const handleCancelar = () => {
    setMostrarModal(false);
    resetFormulario();
    setEditando(false);
    setMovimientoSeleccionado(null);
  };

  const handleGuardar = async () => {
    setError(null);

    const productoIdNum = Number(formulario.productoId);
    const cantidadNum = Number(formulario.cantidad);

    if (!Number.isFinite(productoIdNum) || productoIdNum <= 0) {
      setError("Seleccioná un producto.");
      return;
    }
    if (!Number.isFinite(cantidadNum) || cantidadNum <= 0) {
      setError("La cantidad debe ser un número mayor a 0.");
      return;
    }

    try {
      const payload = {
        tipo: formulario.tipo,
        cantidad: cantidadNum,
        descripcion: formulario.descripcion?.trim() || "",
      };

      if (editando && movimientoSeleccionado) {
        // ✅ no mandamos usuario
        await updateMovimiento(movimientoSeleccionado.id, payload);
      } else {
        // ✅ no mandamos usuario (backend lo obtiene del JWT)
        await createMovimiento({
          productoId: productoIdNum,
          ...payload,
        });
      }

      setMostrarModal(false);
      setEditando(false);
      setMovimientoSeleccionado(null);
      resetFormulario();

      await cargarMovimientos();
    } catch (err: any) {
      console.error(err);
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Error guardando movimiento";
      setError(msg);
    }
  };

  const handleEliminar = async (id: number) => {
    if (!window.confirm("¿Confirmas que deseas eliminar este movimiento?"))
      return;

    try {
      await deleteMovimiento(id);
      await cargarMovimientos();
    } catch (err: any) {
      console.error(err);
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Error eliminando movimiento";
      setError(msg);
    }
  };

  // búsqueda cliente sobre página actual + soporte por producto label
  const movimientosMostrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return movimientos;

    return movimientos.filter((m) => {
      const productoTxt = (
        productoLabelById.get(Number(m.productoId)) ?? ""
      ).toLowerCase();
      const text = `${m.descripcion ?? ""} ${m.usuario ?? ""} ${productoTxt}`.toLowerCase();
      return text.includes(q);
    });
  }, [movimientos, busqueda, productoLabelById]);

  // EXPORT CSV
  const exportarMovimientosCSV = async () => {
    try {
      const resp = await getMovimientos({
        page: 1,
        limit: 10000,
        tipo: filtroTipo || undefined,
        productoId: filtroProducto || undefined,
        fechaInicio: filtroFechaInicio || undefined,
        fechaFin: filtroFechaFin || undefined,
      });

      const rows = resp.data.map((mov) => ({
        id: mov.id,
        producto: productoLabelById.get(Number(mov.productoId)) ?? mov.productoId,
        tipo: mov.tipo,
        cantidad: mov.cantidad,
        fecha: mov.fecha,
        descripcion: mov.descripcion ?? "",
        usuario: mov.usuario ?? "",
      }));

      const encabezados = [
        "ID",
        "Producto",
        "Tipo",
        "Cantidad",
        "Fecha",
        "Descripción",
        "Usuario",
      ];

      const escapeCSV = (value: unknown) => {
        const str = String(value ?? "");
        if (/[",\n;]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
        return str;
      };

      const csvLines = [
        encabezados.map(escapeCSV).join(";"),
        ...rows.map((r) =>
          [r.id, r.producto, r.tipo, r.cantidad, r.fecha, r.descripcion, r.usuario]
            .map(escapeCSV)
            .join(";")
        ),
      ];

      const blob = new Blob([csvLines.join("\n")], {
        type: "text/csv;charset=utf-8;",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `movimientos-${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error(err);
      setError("No se pudo exportar movimientos.");
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
            Gestiona las entradas y salidas de stock (datos reales desde la API).
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={exportarMovimientosCSV}
            className="px-3 py-2 rounded-md border border-slate-300 text-sm text-slate-700 hover:bg-slate-50 inline-flex items-center gap-1"
          >
            Exportar movimientos
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
          {/* Búsqueda cliente */}
          <div className="col-span-1">
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Buscar
            </label>
            <input
              type="text"
              placeholder="Buscar por producto, descripción, usuario..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
            />
          </div>

          {/* Tipo (backend) */}
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

          {/* Producto (backend) */}
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Producto
            </label>

            <select
              value={filtroProducto}
              onChange={(e) => {
                setFiltroProducto(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
            >
              <option value="">Todos los productos</option>
              {productos
                .slice()
                .sort((a, b) =>
                  String(a.codigo ?? "").localeCompare(String(b.codigo ?? ""))
                )
                .map((p) => (
                  <option key={p.id} value={String(p.id)}>
                    {(String(p.codigo ?? "").trim() ? `${p.codigo} - ` : "") +
                      (p.nombre ?? "")}{" "}
                    (#{p.id})
                  </option>
                ))}
            </select>

            <p className="text-[11px] text-slate-400 mt-1">
              El filtro se aplica en backend por <code>productoId</code>.
            </p>
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
          Los filtros Tipo / Producto / Fecha se aplican en backend (API). La
          búsqueda textual se aplica en el cliente sobre la página actual.
        </p>
      </section>

      {/* Tabla */}
      <section className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs text-slate-500">
          <span>
            Mostrando <strong>{movimientosMostrados.length}</strong> de{" "}
            <strong>{totalMovimientos}</strong> movimientos
          </span>
          <span>Datos reales desde la API</span>
        </div>

        {loading ? (
          <div className="p-8 text-center text-sm text-slate-500">
            Cargando movimientos...
          </div>
        ) : movimientosMostrados.length === 0 ? (
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
                {movimientosMostrados.map((mov) => {
                  const productoLabel =
                    productoLabelById.get(Number(mov.productoId)) ??
                    `Producto #${mov.productoId}`;

                  return (
                    <tr
                      key={mov.id}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-3 py-2 text-xs text-slate-700">
                        {mov.id}
                      </td>

                      <td className="px-3 py-2 text-xs text-slate-700">
                        {productoLabel}
                      </td>

                      <td className="px-3 py-2 text-xs">
                        <span
                          className={
                            "inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium " +
                            (mov.tipo === "ENTRADA"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200")
                          }
                        >
                          {mov.tipo}
                        </span>
                      </td>

                      <td className="px-3 py-2 text-xs text-right text-slate-700">
                        {String(mov.cantidad)}
                      </td>

                      <td className="px-3 py-2 text-xs text-slate-600">
                        {new Date(mov.fecha).toLocaleDateString("es-AR")}
                      </td>

                      <td className="px-3 py-2 text-xs text-slate-600">
                        {mov.usuario || "-"}
                      </td>

                      <td className="px-3 py-2 text-xs text-right">
                        <button
                          onClick={() => handleEditar(mov)}
                          className="px-2 py-1 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 mr-1"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleEliminar(mov.id)}
                          className="px-2 py-1 rounded-md border border-slate-200 text-slate-400 hover:bg-rose-50 hover:text-rose-700"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

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

      {/* Modal (✅ sin input Usuario) */}
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
              {/* Producto */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Producto *
                </label>
                <select
                  value={formulario.productoId}
                  onChange={(e) =>
                    setFormulario({ ...formulario, productoId: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                >
                  <option value="">Seleccionar...</option>
                  {productos
                    .slice()
                    .sort((a, b) =>
                      String(a.codigo ?? "").localeCompare(String(b.codigo ?? ""))
                    )
                    .map((p) => (
                      <option key={p.id} value={String(p.id)}>
                        {(String(p.codigo ?? "").trim() ? `${p.codigo} - ` : "") +
                          (p.nombre ?? "")}
                      </option>
                    ))}
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  Se muestran productos reales (código + nombre).
                </p>
              </div>

              {/* Tipo */}
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

              {/* Cantidad */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Cantidad *
                </label>
                <input
                  type="number"
                  step="1"
                  value={formulario.cantidad}
                  onChange={(e) =>
                    setFormulario({ ...formulario, cantidad: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  required
                />
              </div>

              {/* Descripción */}
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

              {/* Botones */}
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