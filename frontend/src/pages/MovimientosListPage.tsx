import { useState, useEffect } from 'react';
import React from 'react';
import { getMovimientosMock } from '../mocks/movimientosMock';

interface Movimiento {
  id: number;
  productoId: number;
  tipo: 'ENTRADA' | 'SALIDA';
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
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroProducto, setFiltroProducto] = useState('');
  const [filtroFechaInicio, setFiltroFechaInicio] = useState('');
  const [filtroFechaFin, setFiltroFechaFin] = useState('');
  const [busqueda, setBusqueda] = useState('');

  // Modal
  const [mostrarModal, setMostrarModal] = useState(false);
  const [editando, setEditando] = useState(false);
  const [movimientoSeleccionado, setMovimientoSeleccionado] = useState<Movimiento | null>(null);

  // Formulario
  const [formulario, setFormulario] = useState({
    productoId: '',
    tipo: 'ENTRADA',
    cantidad: '',
    descripcion: '',
    usuario: '',
  });

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

  useEffect(() => {
    cargarMovimientos();
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
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      console.error('Error cargando movimientos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGuardar = async () => {
    try {
      if (!formulario.productoId || !formulario.cantidad) {
        setError('Por favor completa los campos requeridos');
        return;
      }

      const url = editando
        ? `${apiUrl}/movimientos/${movimientoSeleccionado?.id}`
        : `${apiUrl}/movimientos`;

      const method = editando ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_API_KEY || 'test-key',
        },
        body: JSON.stringify(formulario),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      setMostrarModal(false);
      setFormulario({
        productoId: '',
        tipo: 'ENTRADA',
        cantidad: '',
        descripcion: '',
        usuario: '',
      });
      setEditando(false);
      setMovimientoSeleccionado(null);
      cargarMovimientos();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
    }
  };

  const handleEditar = (movimiento: Movimiento) => {
    setMovimientoSeleccionado(movimiento);
    setFormulario({
      productoId: movimiento.productoId.toString(),
      tipo: movimiento.tipo,
      cantidad: movimiento.cantidad.toString(),
      descripcion: movimiento.descripcion || '',
      usuario: movimiento.usuario || '',
    });
    setEditando(true);
    setMostrarModal(true);
  };

  const handleEliminar = async (id: number) => {
    if (!window.confirm('¿Confirmas que deseas eliminar este movimiento?')) return;

    try {
      const response = await fetch(`${apiUrl}/movimientos/${id}`, {
        method: 'DELETE',
        headers: {
          'x-api-key': import.meta.env.VITE_API_KEY || 'test-key',
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      cargarMovimientos();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
    }
  };

  const handleNuevoMovimiento = () => {
    setFormulario({
      productoId: '',
      tipo: 'ENTRADA',
      cantidad: '',
      descripcion: '',
      usuario: '',
    });
    setEditando(false);
    setMovimientoSeleccionado(null);
    setMostrarModal(true);
  };

  const handleCancelar = () => {
    setMostrarModal(false);
    setFormulario({
      productoId: '',
      tipo: 'ENTRADA',
      cantidad: '',
      descripcion: '',
      usuario: '',
    });
    setEditando(false);
    setMovimientoSeleccionado(null);
  };

  const exportarPDF = async () => {
    try {
      const params = new URLSearchParams();
      if (filtroFechaInicio) params.append('fechaInicio', filtroFechaInicio);
      if (filtroFechaFin) params.append('fechaFin', filtroFechaFin);

      const response = await fetch(`${apiUrl}/movimientos/reportes/periodo?${params}`, {
        headers: {
          'x-api-key': import.meta.env.VITE_API_KEY || 'test-key',
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      // Simulación de descarga PDF
      const data = await response.json();
      const csvContent = [
        ['ID', 'Producto ID', 'Tipo', 'Cantidad', 'Fecha', 'Descripción', 'Usuario'],
        ...data.map((mov: Movimiento) => [
          mov.id,
          mov.productoId,
          mov.tipo,
          mov.cantidad,
          new Date(mov.fecha).toLocaleDateString(),
          mov.descripcion || '',
          mov.usuario || '',
        ]),
      ];

      const csv = csvContent.map(row => row.join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `movimientos-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
    }
  };

  const exportarRotacion = async () => {
    try {
      const response = await fetch(`${apiUrl}/movimientos/reportes/rotacion`, {
        headers: {
          'x-api-key': import.meta.env.VITE_API_KEY || 'test-key',
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();
      
      const csvContent = [
        ['Producto ID', 'Total Entradas', 'Total Salidas', 'Rotación (Salidas/Entradas)'],
        ...data.map((rot: any) => [
          rot.productoId,
          rot.totalEntradas,
          rot.totalSalidas,
          (rot.totalEntradas > 0 ? (rot.totalSalidas / rot.totalEntradas).toFixed(2) : '0.00'),
        ]),
      ];

      const csv = csvContent.map(row => row.join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `rotacion-productos-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Movimientos de Stock</h1>
          <p className="text-gray-600">Gestiona las entradas y salidas de stock</p>
        </div>

        {/* Alertas */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Botones y Filtros */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handleNuevoMovimiento}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              + Nuevo Movimiento
            </button>
            <div className="flex gap-2">
              <button
                onClick={exportarPDF}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
              >
                📥 Exportar Movimientos
              </button>
              <button
                onClick={exportarRotacion}
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition"
              >
                📊 Reporte Rotación
              </button>
            </div>
          </div>

          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <input
              type="text"
              placeholder="Buscar..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={filtroTipo}
              onChange={(e) => {
                setFiltroTipo(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los tipos</option>
              <option value="ENTRADA">Entrada</option>
              <option value="SALIDA">Salida</option>
            </select>

            <input
              type="number"
              placeholder="Producto ID"
              value={filtroProducto}
              onChange={(e) => {
                setFiltroProducto(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="date"
              value={filtroFechaInicio}
              onChange={(e) => {
                setFiltroFechaInicio(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="date"
              value={filtroFechaFin}
              onChange={(e) => {
                setFiltroFechaFin(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">Cargando movimientos...</p>
            </div>
          ) : movimientos.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">No hay movimientos registrados</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Producto</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Tipo</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Cantidad</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Fecha</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Usuario</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {movimientos.map((movimiento, index) => (
                    <tr
                      key={movimiento.id}
                      className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 border-b`}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{movimiento.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{movimiento.productoId}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            movimiento.tipo === 'ENTRADA'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {movimiento.tipo}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{movimiento.cantidad}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(movimiento.fecha).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{movimiento.usuario}</td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => handleEditar(movimiento)}
                          className="text-blue-500 hover:text-blue-700 font-semibold mr-3"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleEliminar(movimiento.id)}
                          className="text-red-500 hover:text-red-700 font-semibold"
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
            <div className="bg-gray-50 px-6 py-4 border-t flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Mostrando {movimientos.length} de {totalMovimientos} movimientos
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300"
                >
                  Anterior
                </button>
                <span className="px-4 py-2 text-gray-700">
                  Página {page} de {totalPages}
                </span>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-t-lg">
              <h2 className="text-2xl font-bold">
                {editando ? 'Editar Movimiento' : 'Nuevo Movimiento'}
              </h2>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Producto ID *</label>
                <input
                  type="number"
                  value={formulario.productoId}
                  onChange={(e) =>
                    setFormulario({ ...formulario, productoId: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo *</label>
                <select
                  value={formulario.tipo}
                  onChange={(e) =>
                    setFormulario({
                      ...formulario,
                      tipo: e.target.value as 'ENTRADA' | 'SALIDA',
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ENTRADA">Entrada</option>
                  <option value="SALIDA">Salida</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Cantidad *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formulario.cantidad}
                  onChange={(e) =>
                    setFormulario({ ...formulario, cantidad: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
                <textarea
                  value={formulario.descripcion}
                  onChange={(e) =>
                    setFormulario({ ...formulario, descripcion: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Usuario</label>
                <input
                  type="text"
                  value={formulario.usuario}
                  onChange={(e) =>
                    setFormulario({ ...formulario, usuario: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleGuardar}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition"
                >
                  Guardar
                </button>
                <button
                  onClick={handleCancelar}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-lg transition"
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
