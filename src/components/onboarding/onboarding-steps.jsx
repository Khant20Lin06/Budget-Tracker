"use client";

import StepWelcome from "@/components/onboarding/step-welcome";
import StepCategories from "@/components/onboarding/step-categories";
import StepFinish from "@/components/onboarding/step-finish";

import { useOnboarding } from "@/lib/store/onboarding-store";
import { useCategories } from "@/lib/store/categories-store";

const STEPS = [
  StepWelcome,     // step = 0
  StepCategories,  // step = 1
  StepFinish,      // step = 2
];

export default function OnboardingSteps() {
  const { step } = useOnboarding();

  const StepComponent = STEPS[step] || StepWelcome;

  // const store = useCategories();
  // const addCategory = store.addCategory || store.createCategory;

  // return <StepComponent addCategory={addCategory} />;
  return <StepComponent />;
}
