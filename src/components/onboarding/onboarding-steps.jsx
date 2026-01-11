"use client";

import { useOnboarding } from "@/lib/store/onboarding-store";
import StepWelcome from "./step-welcome";
import StepCategories from "./step-categories";
import StepFinish from "./step-finish";

const STEPS = [
  StepWelcome,
  StepCategories,
  StepFinish,
];

export default function OnboardingSteps() {
  const { step } = useOnboarding();
  const StepComponent = STEPS[step];

  return <StepComponent />;
}
