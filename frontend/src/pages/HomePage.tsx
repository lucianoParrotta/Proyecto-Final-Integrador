import React, { useEffect, useState } from "react";
import api from "../api/apiClient";


interface StatsData {
  totalProductos: number;
  productosStockBajo: number;
  valorizacionStock: number | string | null;
  cantidadPorCategoria: Array<{ nombre: string; cantidad: number }>;
  cantidadPorProveedor: Array<{ nombre: string; cantidad: number }>;
  rotacion: Array<{ productoId: number; rotacion: number }>;
}

const HomePage: React.FC = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatMoney = (value: number | string | null | undefined) => {
    const num = Number(value ?? 0);
    if (Number.isNaN(num)) return "0.00";

    return num.toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/stats/dashboard");
        setStats(res.data);
      } catch (err) {
        setError("Error al cargar estadísticas");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Dashboard general</h1>
          <p className="text-slate-500 text-sm">Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Dashboard general</h1>
          <p className="text-red-500 text-sm">{error || "No se pudieron cargar las estadísticas"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Título principal */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">Dashboard general</h1>
        <p className="text-slate-500 text-sm">
          Resumen general del estado del inventario y actividades recientes.
        </p>
      </div>

      {/* Cards de métricas principales */}
      <section>
        <h2 className="text-sm font-semibold text-slate-700 mb-3">
          Resumen rápido
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4">
            <div className="text-xs font-medium text-slate-400 uppercase">
              Productos totales
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-800">{stats.totalProductos}</div>
            <div className="mt-1 text-xs text-slate-500">
              Incluye todos los depósitos.
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4">
            <div className="text-xs font-medium text-amber-500 uppercase">
              Stock bajo
            </div>
            <div className="mt-2 text-2xl font-bold text-amber-600">{stats.productosStockBajo}</div>
            <div className="mt-1 text-xs text-slate-500">
              Productos por debajo del mínimo.
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4">
            <div className="text-xs font-medium text-blue-500 uppercase">
              Valorización del stock
            </div>
            <div className="mt-2 text-2xl font-bold text-blue-600">
              ${formatMoney(stats.valorizacionStock)}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Valor total en inventario.
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4">
            <div className="text-xs font-medium text-slate-400 uppercase">
              Categorías
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-800">{stats.cantidadPorCategoria.length}</div>
            <div className="mt-1 text-xs text-slate-500">
              Categorías registradas.
            </div>
          </div>
        </div>
      </section>

      {/* Sección de gráficos / viz (placeholder) */}
      <section>
        <h2 className="text-sm font-semibold text-slate-700 mb-3">
          Stock por categoría
        </h2>

        <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4">
          <div className="space-y-2">
            {stats.cantidadPorCategoria.length > 0 ? (
              stats.cantidadPorCategoria.map((cat, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700">{cat.nombre}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-slate-100 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{
                          width: `${Math.min((cat.cantidad / Math.max(...stats.cantidadPorCategoria.map(c => c.cantidad))) * 100, 100)}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-slate-700 w-8 text-right">
                      {cat.cantidad}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400">No hay datos de categorías.</p>
            )}
          </div>
        </div>
      </section>

      {/* Sección de alertas y actividad reciente */}
      <section>
        <h2 className="text-sm font-semibold text-slate-700 mb-3">
          Alertas y proveedores
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Alertas */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4">
            <h3 className="text-sm font-semibold text-slate-700 mb-2">
              Alertas de stock
            </h3>

            <ul className="space-y-2 text-sm">
              {stats.productosStockBajo > 0 && (
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-amber-500" />
                  <div>
                    <p className="text-slate-700">
                      {stats.productosStockBajo} {stats.productosStockBajo === 1 ? "producto" : "productos"} con stock por debajo del mínimo.
                    </p>
                    <p className="text-xs text-slate-400">
                      Revisar reporte de Stock Bajo en el módulo de Movimientos.
                    </p>
                  </div>
                </li>
              )}

                {Number(stats.valorizacionStock ?? 0) > 0 && (
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                    <div>
                      <p className="text-slate-700">
                        Valorización del inventario: ${formatMoney(stats.valorizacionStock)}
                      </p>
                      <p className="text-xs text-slate-400">
                        Valor total en stock disponible.
                      </p>
                    </div>
                  </li>
                )}

              {stats.productosStockBajo === 0 && (
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                  <div>
                    <p className="text-slate-700">
                      Todos los productos tienen stock adecuado.
                    </p>
                    <p className="text-xs text-slate-400">
                      Sistema funcionando dentro de los parámetros esperados.
                    </p>
                  </div>
                </li>
              )}
            </ul>
          </div>

          {/* Proveedores */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4">
            <h3 className="text-sm font-semibold text-slate-700 mb-2">
              Distribución por proveedor
            </h3>

            {stats.cantidadPorProveedor.length > 0 ? (
              <div className="space-y-2">
                {stats.cantidadPorProveedor.slice(0, 5).map((prov, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-slate-700">{prov.nombre}</span>
                    <span className="font-semibold text-slate-800">{prov.cantidad}</span>
                  </div>
                ))}
                {stats.cantidadPorProveedor.length > 5 && (
                  <p className="text-xs text-slate-400 mt-2">
                    +{stats.cantidadPorProveedor.length - 5} más
                  </p>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-400">No hay datos de proveedores.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
