import React from "react";

const HomePage: React.FC = () => {
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
            <div className="mt-2 text-2xl font-bold text-slate-800">124</div>
            <div className="mt-1 text-xs text-slate-500">
              Incluye todos los depósitos.
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4">
            <div className="text-xs font-medium text-amber-500 uppercase">
              Stock bajo
            </div>
            <div className="mt-2 text-2xl font-bold text-amber-600">7</div>
            <div className="mt-1 text-xs text-slate-500">
              Productos por debajo del mínimo.
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4">
            <div className="text-xs font-medium text-slate-400 uppercase">
              Movimientos hoy
            </div>
            <div className="mt-2 text-2xl font-bold text-emerald-600">23</div>
            <div className="mt-1 text-xs text-slate-500">
              Entradas y salidas registradas.
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4">
            <div className="text-xs font-medium text-slate-400 uppercase">
              Proveedores activos
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-800">18</div>
            <div className="mt-1 text-xs text-slate-500">
              Con operaciones en los últimos 30 días.
            </div>
          </div>
        </div>
      </section>

      {/* Sección de gráficos / viz (placeholder) */}
      <section>
        <h2 className="text-sm font-semibold text-slate-700 mb-3">
          Visualizaciones (prototipo)
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Gráfico 1 */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-700">
                Stock por categoría
              </h3>
              <span className="text-xs text-slate-400">Mock</span>
            </div>
            <div className="h-40 flex items-center justify-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-md">
              Aquí se mostrará un gráfico de barras con el stock agrupado por categoría.
            </div>
          </div>

          {/* Gráfico 2 */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-700">
                Movimientos últimos 7 días
              </h3>
              <span className="text-xs text-slate-400">Mock</span>
            </div>
            <div className="h-40 flex items-center justify-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-md">
              Aquí se mostrará un gráfico de líneas con entradas y salidas diarias.
            </div>
          </div>
        </div>
      </section>

      {/* Sección de alertas y actividad reciente */}
      <section>
        <h2 className="text-sm font-semibold text-slate-700 mb-3">
          Alertas y actividad reciente
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Alertas */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4">
            <h3 className="text-sm font-semibold text-slate-700 mb-2">
              Alertas de stock
            </h3>

            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-amber-500" />
                <div>
                  <p className="text-slate-700">
                    7 productos con stock por debajo del mínimo.
                  </p>
                  <p className="text-xs text-slate-400">
                    Revisar reporte de Stock Bajo en la sección Reportes.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-red-500" />
                <div>
                  <p className="text-slate-700">
                    2 productos sin proveedor asignado.
                  </p>
                  <p className="text-xs text-slate-400">
                    Verificar datos en el módulo de Productos / Proveedores.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                <div>
                  <p className="text-slate-700">
                    Última sincronización de inventario hace 3 horas.
                  </p>
                  <p className="text-xs text-slate-400">
                    Todo funcionando dentro de los parámetros esperados.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Actividad reciente */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4">
            <h3 className="text-sm font-semibold text-slate-700 mb-2">
              Últimos movimientos (mock)
            </h3>

            <div className="border border-slate-200 rounded-md overflow-hidden">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">
                      Fecha
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">
                      Tipo
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">
                      Producto
                    </th>
                    <th className="px-3 py-2 text-right text-xs font-semibold text-slate-500">
                      Cantidad
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="px-3 py-2 text-xs text-slate-600">
                      25/11/2025 10:32
                    </td>
                    <td className="px-3 py-2 text-xs text-emerald-600">
                      Entrada
                    </td>
                    <td className="px-3 py-2 text-xs text-slate-700">
                      Mate Imperial Negro
                    </td>
                    <td className="px-3 py-2 text-xs text-right text-emerald-600">
                      +15
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-3 py-2 text-xs text-slate-600">
                      25/11/2025 09:10
                    </td>
                    <td className="px-3 py-2 text-xs text-red-600">
                      Salida
                    </td>
                    <td className="px-3 py-2 text-xs text-slate-700">
                      Vaso térmico acero
                    </td>
                    <td className="px-3 py-2 text-xs text-right text-red-600">
                      -4
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-xs text-slate-600">
                      24/11/2025 18:45
                    </td>
                    <td className="px-3 py-2 text-xs text-emerald-600">
                      Entrada
                    </td>
                    <td className="px-3 py-2 text-xs text-slate-700">
                      Set velas decorativas
                    </td>
                    <td className="px-3 py-2 text-xs text-right text-emerald-600">
                      +30
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-2 text-xs text-slate-400">
              Esta tabla es solo ilustrativa para el prototipo. Luego se
              conectará al módulo real de Movimientos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;


/*
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-slate-800">
        Dashboard general
      </h1>
      <p className="text-slate-500 text-sm">
        Esta es la vista principal del prototipo. Acá después vas a mostrar
        tarjetas de stock, alertas y resúmenes.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-sm rounded-lg p-4 border border-slate-100">
          <div className="text-xs text-slate-400">Productos totales</div>
          <div className="text-2xl font-bold text-slate-800 mt-1">124</div>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-4 border border-slate-100">
          <div className="text-xs text-slate-400">Stock bajo</div>
          <div className="text-2xl font-bold text-amber-600 mt-1">7</div>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-4 border border-slate-100">
          <div className="text-xs text-slate-400">Movimientos hoy</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">23</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
*/
