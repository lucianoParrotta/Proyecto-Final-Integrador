// frontend/src/api/proveedoresApi.ts
import api from "./apiClient";
import type { Proveedor } from "../types/proveedor";

export async function getProveedores(params?: Record<string, any>): Promise<Proveedor[]> {
  const { data } = await api.get<Proveedor[]>("/proveedores", { params });
  return data;
}

export async function getProveedor(id: number): Promise<Proveedor> {
  const { data } = await api.get<Proveedor>(`/proveedores/${id}`);
  return data;
}

export async function createProveedor(payload: Partial<Proveedor>): Promise<Proveedor> {
  const { data } = await api.post<Proveedor>("/proveedores", payload);
  return data;
}

export async function updateProveedor(id: number, payload: Partial<Proveedor>): Promise<Proveedor> {
  const { data } = await api.put<Proveedor>(`/proveedores/${id}`, payload);
  return data;
}

export async function deleteProveedor(id: number): Promise<{ message?: string }> {
  const { data } = await api.delete(`/proveedores/${id}`);
  return data;
}