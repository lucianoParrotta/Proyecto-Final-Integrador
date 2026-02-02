// frontend/src/components/productos/ProductoForm.tsx
import React, { useEffect, useMemo, useState } from "react";
import type {
  ProductoDTO,
  ProductoCreateDTO,
  ProductoUpdateDTO,
} from "../../api/productosApi";
import { createProducto, updateProducto } from "../../api/productosApi";
import { getCategorias } from "../../api/categoriasApi";
import { getProveedores } from "../../api/proveedoresApi";

type ProductoFormProps = {
  modo: "crear" | "editar";
  onCancelar?: () => void;
  productoInicial?: Partial<ProductoDTO>;
  onSuccess?: (producto: ProductoDTO) => void;
};

type Categoria = { id: number; nombre: string };
type ProveedorCombo = { id: number; nombre: string };

// Normaliza: array directo o AxiosResponse
function unwrapData<T>(maybe: any): T {
  if (!maybe) return maybe as T;
  if (typeof maybe === "object" && "data" in maybe) return maybe.data as T;
  return maybe as T;
}

const ProductoForm: React.FC<ProductoFormProps> = ({
  modo,
  onCancelar,
  productoInicial,
  onSuccess,
}) => {
  const esEdicion = modo === "editar";

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [proveedores, setProveedores] = useState<ProveedorCombo[]>([]);

  const [combosLoading, setCombosLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [codigo, setCodigo] = useState(productoInicial?.codigo ?? "");
  const [nombre, setNombre] = useState(productoInicial?.nombre ?? "");
  const [descripcion, setDescripcion] = useState(productoInicial?.descripcion ?? "");
  const [precio, setPrecio] = useState(String(productoInicial?.precio ?? ""));
  const [stock, setStock] = useState<number>(productoInicial?.stock ?? 0);
  const [stockMinimo, setStockMinimo] = useState<number>(productoInicial?.stockMinimo ?? 0);

  const [estado, setEstado] = useState<"Activo" | "Inactivo">(
    (productoInicial?.estado as "Activo" | "Inactivo") ?? "Activo"
  );

  const [categoriaId, setCategoriaId] = useState<number>(productoInicial?.categoriaId ?? 0);
  const [proveedorId, setProveedorId] = useState<number>(productoInicial?.proveedorId ?? 0);

  // Refrescar form si cambia productoInicial
  useEffect(() => {
    setCodigo(productoInicial?.codigo ?? "");
    setNombre(productoInicial?.nombre ?? "");
    setDescripcion(productoInicial?.descripcion ?? "");
    setPrecio(String(productoInicial?.precio ?? ""));
    setStock(productoInicial?.stock ?? 0);
    setStockMinimo(productoInicial?.stockMinimo ?? 0);
    setEstado((productoInicial?.estado as "Activo" | "Inactivo") ?? "Activo");
    setCategoriaId(productoInicial?.categoriaId ?? 0);
    setProveedorId(productoInicial?.proveedorId ?? 0);
  }, [productoInicial]);

  // Cargar combos
  useEffect(() => {
    (async () => {
      setCombosLoading(true);
      setError(null);

      try {
        const [catsResp, provsResp] = await Promise.all([
          getCategorias(),
          getProveedores(),
        ]);

        const cats = unwrapData<any[]>(catsResp) ?? [];
        const provs = unwrapData<any[]>(provsResp) ?? [];

        const catsNorm: Categoria[] = cats.map((c) => ({
          id: Number(c.id),
          nombre: String(c.nombre ?? c.name ?? ""),
        }));

        const provsNorm: ProveedorCombo[] = provs.map((p) => ({
          id: Number(p.id),
          nombre: String(p.nombre ?? p.name ?? ""),
        }));

        setCategorias(catsNorm);
        setProveedores(provsNorm);
      } catch (e: any) {
        console.error(e);
        setError(
          e?.response?.data?.message ||
            e?.response?.data?.error ||
            e?.message ||
            "No se pudieron cargar categorías/proveedores."
        );
      } finally {
        setCombosLoading(false);
      }
    })();
  }, []);

  const canSubmit = useMemo(() => {
    return (
      codigo.trim().length > 0 &&
      nombre.trim().length > 0 &&
      precio.trim().length > 0 &&
      categoriaId > 0
    );
  }, [codigo, nombre, precio, categoriaId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!canSubmit) {
      setError("Completá código, nombre, precio y categoría.");
      return;
    }

    const precioNumber = Number(precio);
    if (Number.isNaN(precioNumber) || precioNumber <= 0) {
      setError("El precio debe ser un número mayor a 0.");
      return;
    }

    if (stock < 0 || stockMinimo < 0) {
      setError("Stock y stock mínimo no pueden ser negativos.");
      return;
    }

    const proveedorIdValue: number | null = proveedorId > 0 ? proveedorId : null;

    try {
      setLoading(true);

      if (esEdicion) {
        if (!productoInicial?.id) {
          setError("No se encontró el ID del producto para editar.");
          return;
        }

        const payloadUpdate: ProductoUpdateDTO = {
          codigo: codigo.trim(),
          nombre: nombre.trim(),
          descripcion: descripcion.trim() ? descripcion.trim() : undefined,
          precio: precioNumber,
          stock,
          stockMinimo,
          estado,
          categoriaId,
          proveedorId: proveedorIdValue,
        };

        const updated = await updateProducto(Number(productoInicial.id), payloadUpdate);
        onSuccess?.(updated);
      } else {
        const payloadCreate: ProductoCreateDTO = {
          codigo: codigo.trim(),
          nombre: nombre.trim(),
          descripcion: descripcion.trim() ? descripcion.trim() : undefined,
          precio: precioNumber,
          stock,
          stockMinimo,
          estado,
          categoriaId,
          proveedorId: proveedorIdValue,
        };

        const created = await createProducto(payloadCreate);
        onSuccess?.(created);
      }
    } catch (err: any) {
      console.error(err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Error guardando producto";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 space-y-4"
    >
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 text-red-700 text-sm px-3 py-2">
          {error}
        </div>
      )}

      {combosLoading && (
        <div className="rounded-md border border-slate-200 bg-slate-50 text-slate-700 text-sm px-3 py-2">
          Cargando categorías y proveedores...
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Código *
          </label>
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            placeholder="Ej: PRD-001"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Nombre *
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            placeholder="Ej: Mate Imperial Negro"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Categoría *
          </label>
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(Number(e.target.value))}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white"
          >
            <option value={0}>Seleccionar...</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Proveedor
          </label>
          <select
            value={proveedorId}
            onChange={(e) => setProveedorId(Number(e.target.value))}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white"
          >
            <option value={0}>Seleccionar...</option>
            {proveedores.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Stock
          </label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Stock mínimo
          </label>
          <input
            type="number"
            value={stockMinimo}
            onChange={(e) => setStockMinimo(Number(e.target.value))}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Precio unitario ($) *
          </label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            placeholder="Ej: 15000"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Estado
          </label>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value as "Activo" | "Inactivo")}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white"
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1">
          Descripción
        </label>
        <textarea
          rows={3}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm resize-none"
          placeholder="Descripción breve del producto..."
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => onCancelar?.()}
          className="px-3 py-2 rounded-md border border-slate-300 text-sm text-slate-700 hover:bg-slate-50"
          disabled={loading}
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={loading || !canSubmit}
          className="px-3 py-2 rounded-md bg-slate-900 text-sm text-white hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Guardando..." : esEdicion ? "Guardar cambios" : "Crear producto"}
        </button>
      </div>
    </form>
  );
};

export default ProductoForm;