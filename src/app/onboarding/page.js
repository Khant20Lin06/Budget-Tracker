// "use client";

import OnboardingLayout from "@/components/onboarding/onboarding-layout";
import OnboardingSteps from "@/components/onboarding/onboarding-steps";

// import { useState } from "react";
// import OnboardingLayout from "@/components/onboarding/onboarding-layout";
// import StepWelcome from "@/components/onboarding/step-welcome";
// import StepCategories from "@/components/onboarding/step-categories";
// import StepFinish from "@/components/onboarding/step-finish";

// const STEPS = ["welcome", "categories", "finish"];

// export default function OnboardingPage() {
//   const [stepIndex, setStepIndex] = useState(0);
//   const [categories, setCategories] = useState([]);

//   const next = () => setStepIndex((s) => Math.min(s + 1, STEPS.length - 1));
//   const back = () => setStepIndex((s) => Math.max(s - 1, 0));

//   return (
//     <OnboardingLayout step={stepIndex} steps={STEPS}>
//       {stepIndex === 0 && <StepWelcome onNext={next} />}

//       {stepIndex === 1 && (
//         <StepCategories
//           categories={categories}
//           setCategories={setCategories}
//           onNext={next}
//           onBack={back}
//         />
//       )}

//       {stepIndex === 2 && (
//         <StepFinish
//           categories={categories}
//         />
//       )}
//     </OnboardingLayout>
//   );
// }

export default function OnboardingPage() {
  return (
    <OnboardingLayout>
      <OnboardingSteps />
    </OnboardingLayout>
  );
}
