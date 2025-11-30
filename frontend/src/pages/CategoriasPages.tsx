import React, { useEffect, useState, useMemo } from "react";
import { MOCK_CATEGORIAS } from "../mocks/categoriasMock";
import { MOCK_PRODUCTOS } from "../mocks/productosMock";

import ModalCategoria from "../components/categorias/ModalCategoria";
import ModalExportar from "../components/categorias/ExportModal";

import { exportCategoriasPDF, exportCategoriasXLS } from "../utils/exports";

export interface Categoria {
  id: number;
  nombre: string;
  descripcion?: string;
}

const CategoriasPage: React.FC = () => {
  const [allCategorias, setAllCategorias] = useState<Categoria[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [editData, setEditData] = useState<Categoria | null>(null);

  const [showExportModal, setShowExportModal] = useState<boolean>(false);

  // paginado
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  // busqueda
  const [search, setSearch] = useState("");
  const [lastPageBeforeSearch, setLastPageBeforeSearch] =
    useState<number | null>(null);

  // orden
  const [sortBy, setSortBy] = useState("az");

  // opcion de exportacion
  const [exportOption, setExportOption] = useState("todas");

  // --- CALCULAR STOCK X CATEGORIA ---
  const stockPorCategoria = useMemo(() => {
    const map: Record<string, number> = {};

    MOCK_PRODUCTOS.forEach((p) => {
      if (!map[p.categoria]) map[p.categoria] = 0;
      map[p.categoria] += p.stock;
    });

    return map;
  }, []);

  // carga inicial
  useEffect(() => {
    setLoading(true);
    const inicial = MOCK_CATEGORIAS.map((c) => ({ ...c }));
    setAllCategorias(inicial);
    setLoading(false);
  }, []);

  // recalcular lista segun filtros
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      let filtered = [...allCategorias];

      // busqueda
      filtered = filtered.filter((c) =>
        c.nombre.toLowerCase().includes(search.toLowerCase())
      );

      // ordenamiento
      switch (sortBy) {
        case "az":
          filtered.sort((a, b) => a.nombre.localeCompare(b.nombre));
          break;

        case "za":
          filtered.sort((a, b) => b.nombre.localeCompare(a.nombre));
          break;

        case "masStock":
          filtered.sort(
            (a, b) =>
              (stockPorCategoria[b.nombre] || 0) -
              (stockPorCategoria[a.nombre] || 0)
          );
          break;

        case "menosStock":
          filtered.sort(
            (a, b) =>
              (stockPorCategoria[a.nombre] || 0) -
              (stockPorCategoria[b.nombre] || 0)
          );
          break;
      }

      // paginado
      const start = (Math.max(1, page) - 1) * limit;
      const paginated = filtered.slice(start, start + limit);

      setCategorias(paginated);
      setTotal(filtered.length);
      setLoading(false);
    }, 120);

    return () => clearTimeout(timer);
  }, [allCategorias, search, sortBy, page, limit, stockPorCategoria]);

  // CRUD
  const handleGuardar = (data: Omit<Categoria, "id">, editId: number | null) => {
    if (editId) {
      setAllCategorias((prev) =>
        prev.map((c) => (c.id === editId ? { ...c, ...data } : c))
      );
    } else {
      setAllCategorias((prev) => {
        const nuevoId = Math.max(0, ...prev.map((p) => p.id)) + 1;
        return [...prev, { ...data, id: nuevoId }];
      });
    }
  };

  const handleEliminar = (id: number) => {
    if (!confirm("¿Eliminar categoría?")) return;

    setAllCategorias((prev) => prev.filter((c) => c.id !== id));

    setTimeout(() => {
      const maxPage = Math.max(1, Math.ceil((total - 1) / limit));
      if (page > maxPage) setPage(maxPage);
    }, 0);
  };

  const handleNueva = () => {
    setEditData(null);
    setShowModal(true);
  };

  const handleEditar = (cat: Categoria) => {
    setEditData(cat);
    setShowModal(true);
  };

  // busqueda con preservacion de pagina
  const onSearchChange = (value: string) => {
    const wasEmpty = search.length === 0;

    if (wasEmpty && value.length > 0) {
      setLastPageBeforeSearch(page);
      setSearch(value);
      setPage(1);
      return;
    }

    if (!wasEmpty && value.length === 0) {
      setSearch("");
      if (lastPageBeforeSearch !== null) {
        setPage(lastPageBeforeSearch);
        setLastPageBeforeSearch(null);
      }
      return;
    }

    setSearch(value);
  };

  const limpiarBusqueda = () => {
    setSearch("");
    if (lastPageBeforeSearch !== null) {
      setPage(lastPageBeforeSearch);
      setLastPageBeforeSearch(null);
    }
  };

  // Exportacion con seleccion PDF/XLS
  const handleExportModal = (formatos: { pdf: boolean; xls: boolean }) => {
    let dataExport = [...allCategorias].map((cat) => ({
      ...cat,
      cantidad: stockPorCategoria[cat.nombre] || 0,
    }));

    if (exportOption === "mayor") {
      dataExport.sort((a, b) => b.cantidad - a.cantidad);
    }

    if (exportOption === "menor") {
      dataExport.sort((a, b) => a.cantidad - b.cantidad);
    }

    if (formatos.pdf) exportCategoriasPDF(dataExport, "Reporte de Categorías");
    if (formatos.xls) exportCategoriasXLS(dataExport, "categorias.xlsx");

    setShowExportModal(false);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Categorías</h1>
          <p className="text-slate-500 text-sm">
            Administración de categorías del inventario.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* SELECT EXPORTAR */}
          <label htmlFor="exportOption" className="text-sm">Exportar:</label>
          <select
            value={exportOption}
            onChange={(e) => setExportOption(e.target.value)}
            className="border border-slate-400 p-2 rounded text-sm"
          >
            <option value="todas">Todas las categorías</option>
            <option value="mayor">Categorías con más stock</option>
            <option value="menor">Categorías con menos stock</option>
          </select>

          {/* BOTON QUE ABRE MODAL */}
          <button
            onClick={() => setShowExportModal(true)}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-500"
          >
            Exportar
          </button>

          {/* EXISTENTE */}
          <button
            onClick={handleNueva}
            className="px-4 py-2 text-sm bg-slate-900 text-white rounded-md hover:bg-slate-800"
          >
             Nueva Categoría
          </button>
        </div>
      </div>

      {/* BUSCADOR + ORDEN */}
      <div className="flex items-center gap-3">
        <input
          className="border p-2 rounded flex-1 border-slate-400 focus:border-slate-600 transition"
          placeholder="Buscar categorías..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        {search.length > 0 && (
          <button onClick={limpiarBusqueda} className="text-sm text-slate-500">
            ✖
          </button>
        )}
        <label htmlFor="sortBy" className="text-sm">Filtros:</label>
        <select
          className="border border-slate-400 focus:border-slate-600 transition p-2 rounded text-sm"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
          <option value="masStock">Más stock</option>
          <option value="menosStock">Menos stock</option>
        </select>
      </div>

      {/* TABLA */}
      <div className="bg-white border rounded-lg shadow-sm overflow-hidden mt-2">
        {loading ? (
          <p className="p-4">Cargando...</p>
        ) : (
          <>
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-3 py-2 text-left">Nombre</th>
                  <th className="px-3 py-2 text-left">Descripción</th>
                  <th className="px-3 py-2 text-left">Stock</th>
                  <th className="px-3 py-2 text-right">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {categorias.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      No hay categorías
                    </td>
                  </tr>
                ) : (
                  categorias.map((cat) => (
                    <tr key={cat.id} className="border-b hover:bg-slate-50">
                      <td className="px-3 py-2">{cat.nombre}</td>
                      <td className="px-3 py-2">{cat.descripcion}</td>

                      <td className="px-3 py-2">
                        {stockPorCategoria[cat.nombre] || 0}
                      </td>

                      <td className="px-3 py-2 text-right">
                        <button
                          className="mr-2 px-2 py-1 text-xs border rounded"
                          onClick={() => handleEditar(cat)}
                        >
                          Editar
                        </button>

                          <button
                          className="px-2 py-1 text-xs border border-red-400 text-red-600 rounded"
                          onClick={() => handleEliminar(cat.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* PAGINACION */}
            <div className="border-t border-slate-200 px-4 py-2 flex items-center justify-between text-xs text-slate-500">
              <span>
                Página {page} de {Math.max(1, Math.ceil(total / limit))}
              </span>

              <div className="inline-flex gap-1">
                <button
                  onClick={() => page > 1 && setPage(page - 1)}
                  disabled={page === 1}
                  className={`px-2 py-1 rounded-md border ${
                    page === 1
                      ? "border-slate-200 text-slate-400 cursor-not-allowed"
                      : "border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  Anterior
                </button>

                <button className="px-2 py-1 rounded-md border border-slate-900 bg-slate-900 text-white">
                  {page}
                </button>

                <button
                  onClick={() =>
                    page < Math.ceil(total / limit) && setPage(page + 1)
                  }
                  disabled={page >= Math.ceil(total / limit)}
                  className={`px-2 py-1 rounded-md border ${
                    page >= Math.ceil(total / limit)
                      ? "border-slate-200 text-slate-400 cursor-not-allowed"
                      : "border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  Siguiente
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* MODAL NUEVA/EDITAR */}
      <ModalCategoria
        show={showModal}
        editData={editData}
        onClose={() => setShowModal(false)}
        onSaved={(payload, editId) => {
          handleGuardar(payload, editId);
          setShowModal(false);
          setEditData(null);
        }}
      />

      {/* MODAL EXPORTACION */}
      <ModalExportar
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleExportModal}
      />
    </div>
  );
};

export default CategoriasPage;
