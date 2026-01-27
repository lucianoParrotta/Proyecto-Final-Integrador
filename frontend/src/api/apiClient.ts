import axios, { type InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

// Siempre manda API key + (si existe) token JWT
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers = config.headers ?? {};

  // API KEY
  config.headers["x-api-key"] = import.meta.env.VITE_API_KEY;

  // JWT (lo guarda AuthContext en localStorage como "token")
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export default api;
