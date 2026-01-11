import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useOnboarding = create(
  persist(
    (set) => ({
      step: 0,
      completed: false,

      next: () =>
        set((state) => ({ step: state.step + 1 })),

      back: () =>
        set((state) => ({ step: Math.max(0, state.step - 1) })),

      finish: () =>
        set({ completed: true }),

      reset: () =>
        set({ step: 0, completed: false }),
    }),
    {
      name: "onboarding-storage",
    }
  )
);
