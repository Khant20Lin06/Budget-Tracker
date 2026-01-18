"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/lib/store/onboarding-store";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function StepFinish() {
  const { finish } = useOnboarding();

  useEffect(() => {
  // next(); // auto-skip ချင်မှ run once
}, []);

  return (
    <div className="space-y-8 text-center">
      <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
        <CheckCircle2 className="h-8 w-8 text-white" />
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          You’re all set 🎉
        </h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto">
          Your dashboard is ready. Add transactions and watch your analytics update.
        </p>
      </div>

      <div className="rounded-2xl border bg-white/70 backdrop-blur p-5 md:p-6 shadow-sm max-w-lg mx-auto">
        <div className="flex items-center justify-between text-left">
          <div>
            <p className="text-sm font-semibold text-slate-900">Next</p>
            <p className="text-xs text-muted-foreground">Go to dashboard</p>
          </div>

          <Button onClick={finish} className="rounded-xl gap-2">
            Go to Dashboard
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
