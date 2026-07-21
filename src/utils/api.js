import axios from "axios";

const api = axios.create({
  // In production, leave baseURL empty so it uses the current domain (vercel.app)
  baseURL: import.meta.env.PROD ? "" : (import.meta.env.VITE_API_URL || "http://localhost:5000"),
  withCredentials: true,
});

export default api;