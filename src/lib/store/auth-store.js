"use client";

import { create } from "zustand";
import { apiFetch } from "@/lib/api/client";

export const useAuth = create((set) => ({
  user: null,
  loading: false,
  error: "",

  register: async (payload) => {
    set({ loading: true, error: "" });
    try {
      // payload: {username,email,phone,password,confirm_password,profile_image?}
      const data = await apiFetch("/register/", {
        method: "POST",
        body: payload,
      });

      set({ loading: false, user: data?.user || null });
      return data;
    } catch (e) {
      set({ loading: false, error: e.message || "Register failed" });
      return null;
    }
  },

  login: async ({ username, password }) => {
    set({ loading: true, error: "" });
    try {
      const data = await apiFetch("/login/", {
        method: "POST",
        body: { username, password },
      });

      // ✅ YOUR backend returns tokens inside data.tokens
      const access = data?.tokens?.access;
      const refresh = data?.tokens?.refresh;

      if (access) localStorage.setItem("access_token", access);
      if (refresh) localStorage.setItem("refresh_token", refresh);

      set({ loading: false, user: data?.user || null });
      return data;
    } catch (e) {
      set({ loading: false, error: e.message || "Login failed" });
      return null;
    }
  },

  logout: async () => {
    try {
      const refresh = localStorage.getItem("refresh_token");
      // backend logout expects refresh token in body
      if (refresh) {
        await apiFetch("/logout/", {
          method: "POST",
          body: { refresh },
        });
      }
    } catch (_) {}

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    set({ user: null, error: "" });
  },
}));
