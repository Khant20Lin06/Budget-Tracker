"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/lib/store/onboarding-store";
import { Sparkles, ArrowRight } from "lucide-react";

export default function StepWelcome() {
  const { next } = useOnboarding();

  useEffect(() => {
  // next(); // auto-skip ချင်မှ run once
}, []);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
          <Sparkles className="h-7 w-7 text-white" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Welcome to <span className="text-blue-600">BudgetFlow</span>
        </h1>

        <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto">
          Set up your categories in a minute and start tracking income & expenses with a clean dashboard.
        </p>
      </div>

      <div className="rounded-2xl border bg-white/70 backdrop-blur p-5 md:p-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border bg-white p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase">Step 1</p>
            <p className="font-semibold mt-1">Welcome</p>
            <p className="text-xs text-muted-foreground mt-1">Quick intro</p>
          </div>
          <div className="rounded-xl border bg-white p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase">Step 2</p>
            <p className="font-semibold mt-1">Categories</p>
            <p className="text-xs text-muted-foreground mt-1">Create your groups</p>
          </div>
          <div className="rounded-xl border bg-white p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase">Step 3</p>
            <p className="font-semibold mt-1">Finish</p>
            <p className="text-xs text-muted-foreground mt-1">Go dashboard</p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            You can edit categories later anytime.
          </p>

          <Button onClick={next} className="rounded-xl gap-2">
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
