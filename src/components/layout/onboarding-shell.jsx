// src/components/layout/onboarding-shell.jsx
"use client";

export default function OnboardingShell({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070a14] text-slate-900 dark:text-slate-100">
      {/* same premium background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#070a14] via-[#0b1020] to-[#070a14]" />
        <div className="absolute -top-24 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.24),transparent)] blur-2xl" />
        <div className="absolute top-40 left-[-160px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.16),transparent)] blur-2xl" />
        <div className="absolute top-72 right-[-180px] h-[460px] w-[460px] rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.14),transparent)] blur-2xl" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl">
          <div className="rounded-3xl border border-slate-200/70 bg-white/80 backdrop-blur shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="p-6 sm:p-7">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
