// src/lib/api/axios.js
import axios from "axios";

export const api = axios.create({
  baseURL: "https://buget-tracker-api.vercel.app/api/",
});

api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access") : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
