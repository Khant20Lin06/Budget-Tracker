"use client";

import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/lib/store/onboarding-store";

export default function StepWelcome() {
  const { next } = useOnboarding();

  return (
    <div className="text-center space-y-6">
      <h1 className="text-3xl font-bold">
        Welcome to BudgetFlow 👋
      </h1>

      <p className="text-muted-foreground">
        Let’s set up your budget in just a few steps.
      </p>

      <Button onClick={next}>
        Get Started
      </Button>
    </div>
  );
}
