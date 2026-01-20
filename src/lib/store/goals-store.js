// src/lib/store/goals-store.js
"use client";

import { create } from "zustand";
import axios from "axios";
import { EndPoint } from "@/lib/api/endpoints";
import { getAccessToken } from "@/lib/auth/storage";

function authHeader() {
  const token = getAccessToken?.();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ✅ normalize month -> "YYYY-MM" (key for UI lookup)
function monthKeyFromMonthField(month) {
  if (!month) return "";
  // month can be "YYYY-MM-DD" or "YYYY-MM"
  return String(month).slice(0, 7);
}

// ✅ build month start "YYYY-MM-01" for backend
function monthStartISOFromKey(yyyyMM) {
  if (!yyyyMM) return "";
  return `${yyyyMM}-01`;
}

function normalizeGoal(g) {
  // backend fields: month, target_amount, gold_amount (per your errors)
  // month is "YYYY-MM-DD" in backend
  const key = monthKeyFromMonthField(g.month);

  return {
    id: g.id,
    month: g.month,                // "YYYY-MM-DD"
    monthKey: key,                 // "YYYY-MM" ✅
    target_amount: Number(g.target_amount || 0),
    gold_amount: Number(g.gold_amount || 0),
  };
}

export const useGoals = create((set, get) => ({
  goals: [],
  loading: false,
  saving: false,
  error: "",

  // ✅ LIST
  fetchGoals: async () => {
    set({ loading: true, error: "" });
    try {
      const res = await axios.get(EndPoint.GOALLIST, { headers: authHeader() });
      const raw = res.data;
      const list = Array.isArray(raw) ? raw : raw?.results || [];
      set({ goals: list.map(normalizeGoal), loading: false });
    } catch (e) {
      set({
        loading: false,
        goals: [],
        error:
          e?.response?.data?.detail ||
          e?.response?.data?.message ||
          e.message ||
          "Failed to load goals",
      });
    }
  },

  // ✅ GET ONE FOR MONTH (input = "YYYY-MM")
  getGoalForMonth: (yyyyMM) => {
    const key = String(yyyyMM || "").slice(0, 7);
    const goals = get().goals || [];
    return goals.find((g) => g.monthKey === key) || null;
  },

  // ✅ UPSERT
  upsertGoal: async ({ monthKey, target_amount, gold_amount }) => {
    set({ saving: true, error: "" });
    try {
      const payload = {
        month: monthStartISOFromKey(String(monthKey).slice(0, 7)), // ✅ "YYYY-MM-01"
        target_amount: Number(target_amount || 0),
        gold_amount: Number(gold_amount || 0),
      };

      const res = await axios.post(EndPoint.GOALUPSERT, payload, {
        headers: authHeader(),
      });

      // ✅ refresh list so UI uses API only
      await get().fetchGoals();

      set({ saving: false });
      return res.data;
    } catch (e) {
      const msg =
        e?.response?.data?.detail ||
        JSON.stringify(e?.response?.data || {}) ||
        e.message ||
        "Goal upsert failed";

      set({ saving: false, error: msg });
      throw new Error(msg);
    }
  },
}));
