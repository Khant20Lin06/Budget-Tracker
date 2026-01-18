"use client";

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#0b1020] text-slate-900 dark:text-slate-100 overflow-hidden">
      {/* ✅ push bg behind */}
      <div className="pointer-events-none absolute inset-x-0 -top-20 -z-10 h-[420px] bg-gradient-to-b from-slate-950 via-slate-900 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 -top-20 -z-10 h-[420px] opacity-40 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(59,130,246,0.45),transparent_60%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-slate-200/70 bg-white/80 backdrop-blur shadow-sm dark:border-slate-800 dark:bg-slate-950/40">
            <div className="px-6 pt-6">
              <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
              {subtitle ? (
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {subtitle}
                </p>
              ) : null}
            </div>

            <div className="px-6 py-6">{children}</div>

            {footer ? (
              <div className="border-t border-slate-200/70 px-6 py-4 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300">
                {footer}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
