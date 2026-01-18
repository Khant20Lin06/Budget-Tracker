"use client";

import { useMemo } from "react";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { useTransactions } from "@/lib/store/transactions-store";

function money(n) {
  const v = Number(n || 0);
  return v.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function pickSummary(summary) {
  // ✅ try many shapes (because store/response often different)
  const total =
    summary?.total_balance ??
    summary?.balance ??
    summary?.total ??
    summary?.totalBalance ??
    0;

  const income =
    summary?.income ??
    summary?.total_income ??
    summary?.totalIncome ??
    0;

  const expense =
    summary?.expense ??
    summary?.total_expense ??
    summary?.totalExpense ??
    0;

  return { total, income, expense };
}

export default function StatsCards() {
  const { summary } = useTransactions(); // make sure your store exposes this
  const { total, income, expense } = useMemo(() => pickSummary(summary), [summary]);

  const cards = [
    {
      title: "Total Balance",
      value: money(total),
      Icon: Wallet,
      badge: "Net",
    },
    {
      title: "Income",
      value: money(income),
      Icon: TrendingUp,
      badge: "In",
    },
    {
      title: "Expense",
      value: money(expense),
      Icon: TrendingDown,
      badge: "Out",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map(({ title, value, Icon, badge }) => (
        <div
          key={title}
          className="rounded-3xl border border-slate-200/70 bg-white/80 backdrop-blur shadow-sm dark:border-white/10 dark:bg-white/5 overflow-hidden"
        >
          <div className="p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold tracking-wide text-slate-500 dark:text-white/60 uppercase">
                  {title}
                </p>

                <div className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {value}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded-full border border-slate-200/70 bg-white px-2 py-1 text-[10px] font-bold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                  {badge}
                </span>

                <div className="h-11 w-11 rounded-2xl bg-slate-100 ring-1 ring-slate-200 flex items-center justify-center dark:bg-white/5 dark:ring-white/10">
                  <Icon className="h-5 w-5 text-slate-900 dark:text-white" />
                </div>
              </div>
            </div>

            <div className="mt-4 h-px bg-slate-200/70 dark:bg-white/10" />

            <p className="mt-3 text-xs text-slate-500 dark:text-white/60">
              Updated from your latest transactions
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
