"use client";

import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/lib/store/onboarding-store";

export default function StepFinish() {
  const { finish } = useOnboarding();

  return (
    <div className="text-center space-y-6">
      <h2 className="text-3xl font-bold">
        You’re all set 🎉
      </h2>

      <p className="text-muted-foreground">
        Your budget dashboard is ready.
      </p>

      <Button onClick={finish}>
        Go to Dashboard
      </Button>
    </div>
  );
}
