"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/lib/store/onboarding-store";

export default function OnboardingLayout({ children }) {
  const router = useRouter();
  const { completed } = useOnboarding();

  useEffect(() => {
    if (completed) {
      router.replace("/dashboard");
    }
  }, [completed, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="w-full max-w-2xl rounded-xl bg-background p-8 shadow">
        {children}
      </div>
    </div>
  );
}
