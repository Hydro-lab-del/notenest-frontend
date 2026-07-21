import axios from "axios";

const api = axios.create({
  // Use relative path '/api' in production so Vercel proxies it automatically
  baseURL: import.meta.env.PROD ? "/api" : (import.meta.env.VITE_API_URL || "http://localhost:5000"),
  withCredentials: true,
});

export default api;