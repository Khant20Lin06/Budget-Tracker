"use client";

import { create } from "zustand";
import axios from "axios";
import { EndPoint } from "@/lib/api/endpoints";
import { getAccessToken } from "@/lib/auth/storage";

const authHeader = () => {
  const token = getAccessToken?.();
  return token ? { Authorization: `Bearer ${token}` } : {};
};


export const useCategories = create((set, get) => ({
  categories: [],
  loading: false,
  error: "",

  fetchCategories: async () => {
    set({ loading: true, error: "" });
    try {
      const res = await axios.get(EndPoint.CATEGORYLIST, { headers: authHeader() });
      const list = Array.isArray(res.data) ? res.data : res.data?.results || [];
      set({ categories: list, loading: false });
      return list;
    } catch (e) {
      set({ loading: false, error: e?.response?.data?.detail || e.message || "Failed" });
      return [];
    }
  },


  createCategory: async (payload) => {
    set({ error: "" });
    const res = await axios.post(EndPoint.CATEGORYCREATE, payload, { headers: authHeader() });
    const created = res.data;
    set((s) => ({ categories: [created, ...(s.categories || [])] }));
    return created;
  },

  updateCategory: async (id, payload) => {
    const updated = await apiFetch(`/categories/${id}/`, {
      method: "PATCH",
      body: payload,
    });
    set((s) => ({
      categories: (s.categories || []).map((c) => (c.id === id ? updated : c)),
    }));
    return updated;
  },

  deleteCategory: async (id) => {
    set({ error: "" });
    await axios.delete(EndPoint.CATEGORYDELETE(id), { headers: authHeader() });
    set((s) => ({ categories: (s.categories || []).filter((c) => c.id !== id) }));
  },
}));
