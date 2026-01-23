// src/app/onboarding/OnboardingClient.jsx
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import OnboardingLayout from "@/components/onboarding/onboarding-layout";
import OnboardingSteps from "@/components/onboarding/onboarding-steps";
import { useOnboarding } from "@/lib/store/onboarding-store";
import { getAccessToken } from "@/lib/auth/storage";

export default function OnboardingClient() {
  const sp = useSearchParams();
  const router = useRouter();
  const go = useOnboarding((s) => s.go);

  useEffect(() => {
    const stepParam = sp.get("step");
    if (stepParam !== null) {
      const n = Number(stepParam);
      if ([0, 1, 2].includes(n)) go(n);
    }
  }, [sp, go]);

  useEffect(() => {
    const stepParam = sp.get("step");
    const stepNum = stepParam ? Number(stepParam) : 0;

    if ((stepNum === 1 || stepNum === 2) && !getAccessToken()) {
      router.replace("/login");
    }
  }, [sp, router]);

  return (
    <OnboardingLayout>
      <OnboardingSteps />
    </OnboardingLayout>
  );
}




// "use client";

// import OnboardingLayout from "@/components/onboarding/onboarding-layout";
// import OnboardingSteps from "@/components/onboarding/onboarding-steps";

// export default function OnboardingClient() {
//   return (
//     <OnboardingLayout>
//       <OnboardingSteps />
//     </OnboardingLayout>
//   );
// }


// "use client";

// import { useEffect } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import OnboardingLayout from "@/components/onboarding/onboarding-layout";
// import OnboardingSteps from "@/components/onboarding/onboarding-steps";
// import { useOnboarding } from "@/lib/store/onboarding-store";
// import { getAccessToken } from "@/lib/auth/storage";

// export default function OnboardingClient() {
//   const sp = useSearchParams();
//   const router = useRouter();
//   const go = useOnboarding((s) => s.go);

//   // ✅ URL ?step=0|1|2 => store step sync
//   useEffect(() => {
//     const stepParam = sp.get("step");
//     if (stepParam == null) return;

//     const n = Number(stepParam);
//     if ([0, 1, 2].includes(n)) go(n);
//   }, [sp, go]);

//   // ✅ step 1/2 => login required (step0 = welcome free)
//   useEffect(() => {
//     const stepParam = sp.get("step");
//     const stepNum = stepParam ? Number(stepParam) : 0;

//     if ((stepNum === 1 || stepNum === 2) && !getAccessToken()) {
//       router.replace("/login?next=/onboarding?step=1");
//     }
//   }, [sp, router]);

//   return (
//     <OnboardingLayout>
//       <OnboardingSteps />
//     </OnboardingLayout>
//   );
// }
