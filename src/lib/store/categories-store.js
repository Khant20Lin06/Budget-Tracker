// src/lib/store/categories-store.js
"use client";

import { create } from "zustand";

export const useCategories = create((set) => ({
  categories: [],
  addCategory: (category) =>
    set((state) => ({ categories: [category, ...state.categories] })),
  updateCategory: (id, updates) =>
    set((state) => ({
      categories: state.categories.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    })),
  deleteCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((c) => c.id !== id),
    })),
}));
