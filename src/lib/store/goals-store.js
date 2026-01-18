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

// ✅ month ကို yyyy-mm format ပြန်ထုတ် (backend က month လိုချင်တာများ)
function monthYYYYMM(d = new Date()) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${yyyy}-${mm}`;
}

export const useGoals = create((set) => ({
  loading: false,
  error: "",

  upsertGoal: async ({ month, target_amount, gold_amount }) => {
    set({ loading: true, error: "" });
    try {
      const payload = {
        month: month || monthYYYYMM(),                 // ✅ REQUIRED
        target_amount: Number(target_amount || 0),     // ✅ REQUIRED
        gold_amount: Number(gold_amount || 0),         // ✅ REQUIRED (backend field name!)
      };

      const res = await axios.post(EndPoint.GOALUPSERT, payload, {
        headers: authHeader(),
      });

      set({ loading: false });
      return res.data;
    } catch (e) {
      console.log("GOAL UPSERT STATUS:", e?.response?.status);
      console.log("GOAL UPSERT RESPONSE:", e?.response?.data);
      console.log("GOAL UPSERT PAYLOAD:", { month, target_amount, gold_amount });

      const msg =
        e?.response?.data?.detail ||
        JSON.stringify(e?.response?.data || {}) ||
        e.message ||
        "Goal upsert failed";

      set({ loading: false, error: msg });
      throw new Error(msg);
    }
  },
}));
