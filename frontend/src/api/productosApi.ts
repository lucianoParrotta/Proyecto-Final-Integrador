// frontend/src/api/productosApi.ts
import api from "./apiClient";

export type ProductoCategoriaDTO = { id: number; nombre: string };

export type ProductoDTO = {
  id: number;
  codigo: string;
  nombre: string;
  descripcion?: string;
  precio: string | number;
  stock: number;
  stockMinimo: number;
  estado: "Activo" | "Inactivo";
  categoriaId: number;
  proveedorId?: number | null;

  // viene en responses (GET)
  categoria?: ProductoCategoriaDTO;
};

export type ProductoCreateDTO = Omit<ProductoDTO, "id" | "categoria">;
export type ProductoUpdateDTO = Partial<ProductoCreateDTO>;

export async function getProductos() {
  const { data } = await api.get<ProductoDTO[]>("/productos");
  return data;
}

export async function getProductoById(id: number) {
  const { data } = await api.get<ProductoDTO>(`/productos/${id}`);
  return data;
}

export async function createProducto(payload: ProductoCreateDTO) {
  const { data } = await api.post<ProductoDTO>("/productos", payload);
  return data;
}

export async function updateProducto(id: number, payload: ProductoUpdateDTO) {
  const { data } = await api.put<ProductoDTO>(`/productos/${id}`, payload);
  return data;
}

export async function deleteProducto(id: number) {
  const { data } = await api.delete(`/productos/${id}`);
  return data;
}