import axios from "axios";

// In production, use same-origin paths so Vercel can proxy /auth/* and /api/*
// to the backend while keeping the refresh cookie first-party and browser-sent.
// In development, fall back to the local backend URL when provided.
const api = axios.create({
  baseURL: import.meta.env.PROD ? "" : (import.meta.env.VITE_API_URL || "http://localhost:5000"),
  withCredentials: true,
});

export default api;
