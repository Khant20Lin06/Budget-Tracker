// src/components/auth/auth-shell.jsx
"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AuthShell({ title, subtitle, children, right }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(59,130,246,0.35),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

      <div className="relative mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 px-4 py-10 md:grid-cols-2 md:py-16">
        <Card className="rounded-3xl border-white/10 bg-slate-950/70 backdrop-blur-xl text-white shadow-xl">
          <CardHeader className="space-y-1">
            <p className="text-2xl font-bold tracking-tight">{title}</p>
            <p className="text-sm text-slate-300">{subtitle}</p>
          </CardHeader>
          <CardContent className="pt-2">{children}</CardContent>
        </Card>

        <div className="hidden md:block">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 text-white/90 backdrop-blur-xl">
            {right || (
              <>
                <p className="text-lg font-semibold">Budget Tracker</p>
                <p className="mt-2 text-sm text-slate-300">
                  Track income & expenses, see analytics, and manage categories with smart Lucide icons.
                </p>

                <div className="mt-6 space-y-3 text-sm text-slate-200/90">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    ✅ JWT Auth (Django SimpleJWT)
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    ✅ Protected Routes + Redirect
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    ✅ API auto attach Bearer token
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
