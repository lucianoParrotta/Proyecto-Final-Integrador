import axios from 'axios';
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
   headers: {
    "x-api-key": import.meta.env.VITE_API_KEY
  }
});

export const getCategorias = (params) => api.get('/categorias', { params });
export const getCategoria = (id) => api.get(`/categorias/${id}`);
export const createCategoria = (payload) => api.post('/categorias', payload);
export const updateCategoria = (id, payload) => api.put(`/categorias/${id}`, payload);
export const deleteCategoria = (id) => api.delete(`/categorias/${id}`);
export const getProductosCount = () => api.get('/categorias/productos/count');
export const getStockBajo = (umbral) => api.get('/categorias/stock-bajo', { params: { umbral } });
