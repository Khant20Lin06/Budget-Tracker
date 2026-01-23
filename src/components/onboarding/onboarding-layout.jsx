"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/lib/store/onboarding-store";
import { getAccessToken } from "@/lib/auth/storage";

export default function OnboardingLayout({ children }) {
  const router = useRouter();
  const step = useOnboarding((s) => s.step);
  const completed = useOnboarding((s) => s.completed);

  useEffect(() => {
    // ✅ onboarding ပြီးရင် dashboard
    if (completed) {
      router.replace("/dashboard");
      return;
    }

    // ✅ step 1/2 မှာပဲ login စစ် (step0 = welcome free)
    if ((step === 1 || step === 2) && !getAccessToken()) {
      router.replace("/login?next=/onboarding?step=1");
    }
  }, [completed, step, router]);

  return (
    <div className="">{children}</div>
  );
}
