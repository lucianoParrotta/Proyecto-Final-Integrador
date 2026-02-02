// frontend/src/api/movimientosApi.ts
import api from "./apiClient";

export type MovimientoDTO = {
  id: number;
  productoId: number;
  tipo: "ENTRADA" | "SALIDA";
  cantidad: string | number;
  fecha: string;
  descripcion?: string | null;
  usuario?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type MovimientosListResponse = {
  total: number;
  page: number;
  limit: number;
  pages: number;
  data: MovimientoDTO[];
};

// ✅ respuesta real del backend en create/update/delete
export type MovimientoMutationResponse = {
  movimiento: MovimientoDTO;
  stockActual: number;
};

export type MovimientoDeleteResponse = {
  message?: string;
  stockActual?: number;
};

export async function getMovimientos(params?: Record<string, any>) {
  const { data } = await api.get<MovimientosListResponse>("/movimientos", {
    params,
  });
  return data;
}

// ✅ NO usuario desde frontend
export async function createMovimiento(payload: {
  productoId: number;
  tipo: "ENTRADA" | "SALIDA";
  cantidad: number;
  fecha?: string;
  descripcion?: string;
}) {
  const { data } = await api.post<MovimientoMutationResponse>(
    "/movimientos",
    payload
  );
  return data;
}

// ✅ NO usuario desde frontend
export async function updateMovimiento(
  id: number,
  payload: Partial<{
    tipo: "ENTRADA" | "SALIDA";
    cantidad: number;
    fecha: string;
    descripcion: string;
  }>
) {
  const { data } = await api.put<MovimientoMutationResponse>(
    `/movimientos/${id}`,
    payload
  );
  return data;
}

export async function deleteMovimiento(id: number) {
  const { data } = await api.delete<MovimientoDeleteResponse>(
    `/movimientos/${id}`
  );
  return data;
}