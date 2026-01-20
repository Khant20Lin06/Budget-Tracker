// src/lib/store/onboarding-store.js
"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useOnboarding = create(
  persist(
    (set, get) => ({
      step: 0,          // 0=welcome, 1=categories, 2=finish
      completed: false,

      go: (n) => set({ step: n }),
      next: () => set((s) => ({ step: Math.min(2, s.step + 1) })),
      back: () => set((s) => ({ step: Math.max(0, s.step - 1) })),
      finish: () => set({ completed: true, step: 2 }),
      reset: () => set({ step: 0, completed: false }),
    }),
    {
      name: "onboarding-storage",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? window.localStorage : undefined
      ),
      partialize: (s) => ({ step: s.step, completed: s.completed }),
    }
  )
);
