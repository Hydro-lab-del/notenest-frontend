import axios from "axios";

// In production: requests go to the same Vercel origin (/auth/*, /api/*)
// Vercel rewrites proxy them to the Koyeb backend → cookie is first-party → always sent.
// In development: falls back to localhost.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  withCredentials: true,
});

export default api;
