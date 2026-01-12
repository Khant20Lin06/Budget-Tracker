"use client";

import StatsCards from "@/components/dashboard/stats-cards";
import OverviewChart from "@/components/dashboard/overview-chart";
import CategoryPie from "@/components/dashboard/category-pie";
import MonthlyTrend from "@/components/dashboard/monthly-trend";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="relative">
      {/* Premium dark hero background */}
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-[340px] bg-gradient-to-b from-slate-950 via-slate-900 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-[340px] opacity-40 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(59,130,246,0.45),transparent_60%)]" />

      {/* If header is sticky, give the page a little top padding so content doesn't hide behind it */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        {/* Page title row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest text-slate-300/80 uppercase">
              Home
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Overview of your income and expenses
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button className="h-10 rounded-xl gap-2 px-4 shadow-sm">
              <Plus className="h-4 w-4" />
              Add Transaction
            </Button>
          </div>
        </div>

        {/* Stats cards */}
        <div className="mt-8">
          <StatsCards />
        </div>

        {/* Charts row */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur shadow-sm dark:border-slate-800 dark:bg-slate-950/40">
            <div className="px-6 pt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Income vs Expense
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-300/80">
                Compare monthly cashflow
              </p>
            </div>
            <div className="p-4 sm:p-6">
              <OverviewChart />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur shadow-sm dark:border-slate-800 dark:bg-slate-950/40">
            <div className="px-6 pt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Expense by Category
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-300/80">
                Where your money goes
              </p>
            </div>
            <div className="p-4 sm:p-6">
              <CategoryPie />
            </div>
          </div>
        </div>

        {/* Monthly trend */}
        <div className="mt-6 rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur shadow-sm dark:border-slate-800 dark:bg-slate-950/40">
          <div className="px-6 pt-6">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Monthly Trend
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-300/80">
              Income and expense over time
            </p>
          </div>
          <div className="p-4 sm:p-6">
            <MonthlyTrend />
          </div>
        </div>
      </div>
    </div>
  );
}
