// src/app/onboarding/page.jsx
"use client";

import { Suspense } from "react";
import OnboardingClient from "./OnboardingClient";

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0b1020]" />}>
      <OnboardingClient />
    </Suspense>
  );
}
