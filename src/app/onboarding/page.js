// src/app/onboarding/page.js (or page.jsx)
"use client";

import { useEffect } from "react";
import OnboardingLayout from "@/components/onboarding/onboarding-layout";
import OnboardingSteps from "@/components/onboarding/onboarding-steps";

export default function OnboardingPage() {
  useEffect(() => {
    // ✅ only clear ONCE when onboarding page first mounts
    if (typeof window !== "undefined") {
      // အကယ်လို clearing လိုမှပဲထား (မလိုရင်ဖျက်ထား)
      // localStorage.removeItem("onboarding-storage");
    }
  }, []);

  return (
    <OnboardingLayout>
      <OnboardingSteps />
    </OnboardingLayout>
  );
}
