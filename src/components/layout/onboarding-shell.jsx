// src/components/layout/onboarding-shell.jsx
"use client";

export default function OnboardingShell({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b1020] text-slate-100">
      {/* Premium OneUI-ish background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* base gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(59,130,246,0.28),transparent_60%),radial-gradient(900px_500px_at_-10%_40%,rgba(16,185,129,0.18),transparent_55%),radial-gradient(900px_520px_at_110%_55%,rgba(168,85,247,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070a14] via-[#0b1020] to-[#070a14]" />

        {/* subtle noise / grid feel */}
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:48px_48px]" />

        {/* top soft glow bar */}
        <div className="absolute -top-24 left-1/2 h-72 w-[900px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* Content */}
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl">
          {/* Glass Card */}
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.06] shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            {/* edge highlight */}
            <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/10" />
            <div className="pointer-events-none absolute -top-24 left-1/2 h-52 w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.20),transparent)] blur-2xl" />

            {/* inner surface */}
            <div className="p-6 sm:p-10">
              {/* optional: top spacing like Samsung cards */}
              <div className="mb-6 flex items-center justify-between">
                <div className="text-xs font-semibold tracking-wide text-white/60">
                  BudgetFlow Setup
                </div>
                <div className="h-2 w-2 rounded-full bg-emerald-400/80 shadow-[0_0_18px_rgba(16,185,129,0.45)]" />
              </div>

              {/* children */}
              <div className="rounded-2xl bg-white/5 p-4 sm:p-6 ring-1 ring-white/10">
                {children}
              </div>
            </div>

            {/* bottom fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
