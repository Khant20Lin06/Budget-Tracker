// src/app/onboarding/page.jsx
"use client";

import OnboardingClient from "./OnboardingClient";

export default function OnboardingPage() {
  return <OnboardingClient />;
}


// "use client";

// import dynamic from "next/dynamic";

// const OnboardingClient = dynamic(() => import("./OnboardingClient"), {
//   ssr: false,
// });

// import { useEffect } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import OnboardingLayout from "@/components/onboarding/onboarding-layout";
// import OnboardingSteps from "@/components/onboarding/onboarding-steps";
// import { useOnboarding } from "@/lib/store/onboarding-store";
// import { getAccessToken } from "@/lib/auth/storage";

// export default function OnboardingPage() {
//   const sp = useSearchParams();
//   const router = useRouter();
//   const go = useOnboarding((s) => s.go);

//   useEffect(() => {
//     const stepParam = sp.get("step"); // "0" | "1" | "2"
//     if (stepParam !== null) {
//       const n = Number(stepParam);
//       if ([0, 1, 2].includes(n)) go(n);
//     }
//   }, [sp, go]);

//   useEffect(() => {
//     const stepParam = sp.get("step");
//     const stepNum = stepParam ? Number(stepParam) : 0;

//     if ((stepNum === 1 || stepNum === 2) && !getAccessToken()) {
//       router.replace("/login");
//     }
//   }, [sp, router]);

//   return (
//     <OnboardingClient/>
//   );
// }


// import dynamic from "next/dynamic";

// const OnboardingClient = dynamic(() => import("./OnboardingClient"), {
//   ssr: false,
// });

// export default function OnboardingPage() {
//   return <OnboardingClient />;
// }
