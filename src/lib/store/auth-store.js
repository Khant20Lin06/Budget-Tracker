// src/lib/store/auth-store.js
"use client";

import { create } from "zustand";
import { apiFetch } from "@/lib/api/client";
import { EndPoint } from "@/lib/api/endpoints";

export const useAuth = create((set, get) => ({
  user: null,
  booting: true,
  loading: false,
  error: "",
  isAuthed: false, // ✅ boolean state

  boot: async () => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("access_token");
    if (!token) {
      set({ user: null, isAuthed: false, booting: false });
      return;
    }

    try {
      const data = await apiFetch(EndPoint.PROFILE, { method: "GET" });
      set({ user: data?.user || data, isAuthed: true, booting: false });
    } catch (_) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      document.cookie = "access_token=; Max-Age=0; path=/;";
      document.cookie = "refresh_token=; Max-Age=0; path=/;";
      set({ user: null, isAuthed: false, booting: false });
    }
  },

  login: async ({ username, password }) => {
    set({ loading: true, error: "" });
    try {
      const data = await apiFetch(EndPoint.LOGIN, {
        method: "POST",
        body: { username, password },
      });

      const access = data?.tokens?.access;
      const refresh = data?.tokens?.refresh;
      if (!access) throw new Error("No access token returned");

      localStorage.setItem("access_token", access);
      if (refresh) localStorage.setItem("refresh_token", refresh);

      // ✅ middleware cookie
      document.cookie = `access_token=${access}; path=/;`;
      if (refresh) document.cookie = `refresh_token=${refresh}; path=/;`;

      // user မပါရင် profile ခေါ်
      let u = data?.user || null;
      if (!u) {
        const me = await apiFetch(EndPoint.PROFILE, { method: "GET" });
        u = me?.user || me;
      }

      set({ user: u, isAuthed: true, loading: false });
      return u;
    } catch (e) {
      set({ loading: false, error: e.message || "Login failed" });
      return null;
    }
  },

  logout: async () => {
    try {
      const refresh = localStorage.getItem("refresh_token");
      if (refresh) {
        await apiFetch(EndPoint.LOGOUT, { method: "POST", body: { refresh } });
      }
    } catch (_) {}

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    document.cookie = "access_token=; Max-Age=0; path=/;";
    document.cookie = "refresh_token=; Max-Age=0; path=/;";
    set({ user: null, isAuthed: false, error: "" });
  },
}));
