"use client";

import { useEffect } from "react";
import StatsCards from "@/components/dashboard/stats-cards";
import OverviewChart from "@/components/dashboard/overview-chart";
import CategoryPie from "@/components/dashboard/category-pie";
import MonthlyTrend from "@/components/dashboard/monthly-trend";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles, ArrowUpRight, CreditCard } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import { useTransactions } from "@/lib/store/transactions-store";
import { useCategories } from "@/lib/store/categories-store";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();

  const { fetchTransactions, fetchSummary } = useTransactions();
  const { fetchCategories } = useCategories();

  useEffect(() => {
    fetchCategories?.();
    fetchTransactions?.({ tab: "all" });
    fetchSummary?.({ tab: "all" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Premium background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.28),transparent)] blur-2xl" />
        <div className="absolute top-40 left-[-160px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.20),transparent)] blur-2xl" />
        <div className="absolute top-72 right-[-180px] h-[460px] w-[460px] rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.18),transparent)] blur-2xl" />
        <div className="absolute inset-x-0 -top-10 h-[320px] bg-gradient-to-b from-slate-950 via-slate-900/80 to-transparent dark:from-slate-950 dark:via-slate-950/60" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-14">
        {/* Top hero */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200 backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Dashboard
            </div>

            <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                {user?.username || "User"}
              </span>
            </h1>

            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
              Track your income, expenses, and trends in one clean overview.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <Button
              className="h-11 rounded-2xl gap-2 px-5 shadow-sm"
              onClick={() => router.push("/transactions")}
            >
              <Plus className="h-4 w-4" />
              Add Transaction
            </Button>

            <Button
              variant="outline"
              className="h-11 rounded-2xl gap-2 border-slate-200/70 bg-white/70 backdrop-blur hover:bg-white/90 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
              onClick={() => router.push("/analytics")}
            >
              View Analytics
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8">
          <div className="rounded-3xl border border-slate-200/70 bg-white/75 backdrop-blur shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="px-6 pt-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Overview
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-300/70">
                  Total balance, income and expenses (auto-updated)
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 rounded-2xl border border-slate-200/60 bg-white/70 px-3 py-2 text-xs text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                <CreditCard className="h-4 w-4" />
                BudgetFlow
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <StatsCards />
            </div>
          </div>
        </div>

        {/* Charts grid */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Income vs Expense */}
          <div className="rounded-3xl border border-slate-200/70 bg-white/75 backdrop-blur shadow-sm dark:border-white/10 dark:bg-white/5 overflow-hidden">
            <div className="px-6 pt-6">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Income vs Expense
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-300/70">
                Monthly cashflow comparison
              </p>
            </div>

            {/* ✅ IMPORTANT: chart container must have height */}
            <div className="p-4 sm:p-6">
              <div className="h-[340px] w-full min-w-0">
                <OverviewChart />
              </div>
            </div>
          </div>

          {/* Category pie */}
          <div className="rounded-3xl border border-slate-200/70 bg-white/75 backdrop-blur shadow-sm dark:border-white/10 dark:bg-white/5 overflow-hidden">
            <div className="px-6 pt-6">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Expense by Category
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-300/70">
                Where your money goes
              </p>
            </div>

            <div className="p-4 sm:p-6">
              <div className="h-[340px] w-full min-w-0">
                <CategoryPie />
              </div>
            </div>
          </div>
        </div>

        {/* Monthly trend */}
        <div className="mt-6 rounded-3xl border border-slate-200/70 bg-white/75 backdrop-blur shadow-sm dark:border-white/10 dark:bg-white/5 overflow-hidden">
          <div className="px-6 pt-6">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Monthly Trend
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-300/70">
              Income & expense over time
            </p>
          </div>

          <div className="p-4 sm:p-6">
            <div className="h-[380px] w-full min-w-0">
              <MonthlyTrend />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
