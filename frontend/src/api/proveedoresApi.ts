import api from "./apiClient";
import type { Proveedor } from "../types/proveedor";

export const getProveedores = (params?: Record<string, any>) =>
  api.get<{ data: Proveedor[]; total: number; page: number; limit: number }>("/proveedores", { params });

export const getProveedor = (id: number) =>
  api.get<Proveedor>(`/proveedores/${id}`);

export const createProveedor = (payload: Partial<Proveedor>) =>
  api.post<Proveedor>("/proveedores", payload);

export const updateProveedor = (id: number, payload: Partial<Proveedor>) =>
  api.put<Proveedor>(`/proveedores/${id}`, payload);

export const deleteProveedor = (id: number) =>
  api.delete(`/proveedores/${id}`);