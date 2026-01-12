"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, LayoutDashboard, ListChecks, PieChart, Tags } from "lucide-react";

const nav = [
  { href: "/dashboard", label: "Home", Icon: LayoutDashboard },
  { href: "/transactions", label: "Transactions", Icon: ListChecks },
  { href: "/analytics", label: "Analytics", Icon: PieChart },
  { href: "/categories", label: "Categories", Icon: Tags },
];

export default function MobileSidebar({ open, onClose }) {
  const pathname = usePathname();

  return (
    <div
      className={[
        "fixed inset-0 z-50 md:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      ].join(" ")}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={[
          "absolute inset-0 bg-black/30 transition-opacity",
          open ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />

      {/* Panel */}
      <aside
        className={[
          "absolute left-0 top-0 h-full w-80 max-w-[85%] bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800",
          "transition-transform duration-200",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow">
              <span className="text-white font-bold">B</span>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                BudgetFlow
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Finance Manager
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900"
            aria-label="Close menu"
          >
            <X className="h-5 w-5 text-slate-700 dark:text-slate-200" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {nav.map(({ href, label, Icon }) => {
            const active = pathname === href || pathname?.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={[
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition",
                  active
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200",
                ].join(" ")}
              >
                <Icon className="h-5 w-5" />
                <span className="font-semibold text-sm">{label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
