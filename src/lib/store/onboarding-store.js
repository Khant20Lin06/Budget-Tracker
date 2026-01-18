import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useOnboarding = create(
  persist(
    (set) => ({
      step: 0,
      completed: false,
      next: () => set((s) => ({ step: s.step + 1 })),
      back: () => set((s) => ({ step: Math.max(0, s.step - 1) })),
      finish: () => set({ completed: true }),
      reset: () => set({ step: 0, completed: false }),
    }),
    {
      name: "onboarding-storage",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? window.localStorage : undefined
      ),
      // optional: only these fields persist
      partialize: (s) => ({ step: s.step, completed: s.completed }),
    }
  )
);
