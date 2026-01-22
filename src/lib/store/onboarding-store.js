"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ✅ SSR-safe fallback storage
const noopStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const useOnboarding = create(
  persist(
    (set) => ({
      step: 0,
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
        typeof window !== "undefined" ? window.localStorage : noopStorage
      ),
      partialize: (s) => ({ step: s.step, completed: s.completed }),
    }
  )
);
