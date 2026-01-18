"use client";

import { create } from "zustand";
import axios from "axios";
import { EndPoint } from "@/lib/api/endpoints";
import { getAccessToken } from "@/lib/auth/storage";

function authHeader() {
  const token = getAccessToken?.();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function toISODate(d) {
  if (!d) return "";
  if (typeof d === "string") return d;
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function buildQuery(params = {}) {
  const qs = new URLSearchParams();

  // ✅ backend ဘက်က type/tab ဘာယူလဲမသေချာလို့ နှစ်ခုလုံးပို့
  if (params.type && params.type !== "all") qs.set("type", params.type);
  if (params.tab && params.tab !== "all") qs.set("tab", params.tab);

  if (params.from) qs.set("from", toISODate(params.from));
  if (params.to) qs.set("to", toISODate(params.to));

  if (params.min !== undefined && params.min !== "") qs.set("min", String(params.min));
  if (params.max !== undefined && params.max !== "") qs.set("max", String(params.max));

  if (params.search) qs.set("search", params.search);

  // ✅ categoryIds ကို comma separated ပို့ (backend support ရင် filter လုပ်ပေးနိုင်)
  if (Array.isArray(params.categoryIds) && params.categoryIds.length) {
    qs.set("categoryIds", params.categoryIds.join(","));
  }

  const s = qs.toString();
  return s ? `?${s}` : "";
}


function normalizeTx(t) {
  return {
    id: t.id,
    type: t.type,
    amount: Number(t.amount || 0),
    date: t.date,
    note: t.note || "",

    categoryId: t.category,          // FK id
    categoryName: t.category_name,   // serializer field (ရှိရင်)
    categoryIcon: t.category_icon,   // serializer field (ရှိရင်)
  };
}

export const useTransactions = create((set, get) => ({
  transactions: [],
  loading: false,
  error: "",

  // ✅ READ (list)
  fetchTransactions: async (filters = {}) => {
    set({ loading: true, error: "" });
    try {
      const q = buildQuery({
        type: filters.tab,
        from: filters.from,
        to: filters.to,
        min: filters.min,
        max: filters.max,
        search: filters.search,
        categoryIds: filters.categoryIds || [], // ✅ FIX: categoryIds
      });

      const url = `${EndPoint.TRANSACTIONLIST}${q}`;
      const res = await axios.get(url, { headers: authHeader() });

      const raw = res.data;
      const list = (Array.isArray(raw) ? raw : raw?.results || []).map(normalizeTx);

      // ✅ if backend already filters, this is optional, but keep safe:
      const ids = filters.categoryIds || [];
      const final = ids.length ? list.filter((t) => ids.includes(t.categoryId)) : list;

      set({ transactions: final, loading: false });
      return final;
    } catch (e) {
      set({
        loading: false,
        error: e?.response?.data?.detail || e?.response?.data?.message || e.message || "Failed",
      });
      return [];
    }
  },


  // ✅ CREATE
  createTransaction: async (payload) => {
    set({ error: "" });
    try {
      const res = await axios.post(EndPoint.TRANSACTIONCREATE, payload, {
        headers: authHeader(),
      });

      const tx = normalizeTx(res.data);
      set((s) => ({ transactions: [tx, ...(s.transactions || [])] }));
      return tx;
    } catch (e) {
      const msg =
        e?.response?.data?.detail ||
        e?.response?.data?.message ||
        JSON.stringify(e?.response?.data || {}) ||
        e.message ||
        "Create failed";
      set({ error: msg });
      throw e;
    }
  },

  // ✅ UPDATE
  updateTransaction: async (id, payload) => {
    set({ error: "" });
    try {
      const res = await axios.patch(EndPoint.TRANSACTIONUPDATE(id), payload, {
        headers: authHeader(),
      });

      const tx = normalizeTx(res.data);
      set((s) => ({
        transactions: (s.transactions || []).map((x) => (x.id === id ? tx : x)),
      }));
      return tx;
    } catch (e) {
      const msg =
        e?.response?.data?.detail ||
        e?.response?.data?.message ||
        JSON.stringify(e?.response?.data || {}) ||
        e.message ||
        "Update failed";
      set({ error: msg });
      throw e;
    }
  },

  // ✅ DELETE (မင်းလို flow)
  deleteTransaction: async (id) => {
    set({ error: "" });
    try {
      await axios.delete(EndPoint.TRANSACTIONDELETE(id), {
        headers: authHeader(),
      });

      set((s) => ({
        transactions: (s.transactions || []).filter((t) => t.id !== id),
      }));
    } catch (e) {
      const msg =
        e?.response?.data?.detail ||
        e?.response?.data?.message ||
        JSON.stringify(e?.response?.data || {}) ||
        e.message ||
        "Delete failed";
      set({ error: msg });
      throw e;
    }
  },

  // ✅ SUMMARY
  fetchSummary: async ({ tab = "all" } = {}) => {
    set({ error: "" });
    try {
      const res = await axios.get(EndPoint.TRANSACTIONSUMMARY, {
        headers: authHeader(),
      });

      // backend returns object (not list)
      set({ summary: res.data || null });
      return res.data;
    } catch (e) {
      set({
        error:
          e?.response?.data?.detail ||
          e?.response?.data?.message ||
          e.message ||
          "Failed to load summary",
      });
      set({ summary: null });
    }
  },
}));
