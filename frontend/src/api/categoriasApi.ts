// frontend/src/api/categoriasApi.ts
import api from "./apiClient";

export type CategoriaDTO = {
  id: number;
  nombre: string;
  descripcion?: string;
};

type CategoriasResponse = {
  data: CategoriaDTO[];
  total: number;
  page: number;
  limit: number;
};

export type CategoriaCreateDTO = {
  nombre: string;
  descripcion?: string;
};

export type CategoriaUpdateDTO = Partial<CategoriaCreateDTO>;

export async function getCategorias(
  params?: Record<string, any>
): Promise<CategoriasResponse> {
  const { data } = await api.get<CategoriasResponse>("/categorias", { params });
  return data; //devuelve {data,total,page,limit}
}

export async function getCategoriaById(id: number): Promise<CategoriaDTO> {
  const { data } = await api.get<CategoriaDTO>(`/categorias/${id}`);
  return data;
}

export async function createCategoria(payload: CategoriaCreateDTO): Promise<CategoriaDTO> {
  const { data } = await api.post<CategoriaDTO>("/categorias", payload);
  return data;
}

export async function updateCategoria(
  id: number,
  payload: CategoriaUpdateDTO
): Promise<CategoriaDTO> {
  const { data } = await api.put<CategoriaDTO>(`/categorias/${id}`, payload);
  return data;
}

export async function deleteCategoria(id: number): Promise<{ success: boolean }> {
  const { data } = await api.delete<{ success: boolean }>(`/categorias/${id}`);
  return data;
}

export async function getProductosCountPorCategoria(): Promise<
  { id: number; categoria: string; cantidad: number }[]
> {
  const { data } = await api.get<{ id: number; categoria: string; cantidad: number }[]>(
    "/categorias/productos/count"
  );
  return data;
}
