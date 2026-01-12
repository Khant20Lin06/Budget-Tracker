"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Sparkles, Wallet } from "lucide-react";
import { useTransactions } from "@/lib/store/transactions-store";

function formatMoney(n) {
  const val = Number(n || 0);
  return "$" + val.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

function withinRange(date, from, to) {
  const d = new Date(date);
  const a = from ? new Date(from) : null;
  const b = to ? new Date(to) : null;
  if (a && d < a) return false;
  if (b && d > b) return false;
  return true;
}

export default function AnalyticsSummary({ filters }) {
  const { transactions, income, expense, balance } = useTransactions();

  const filtered = useMemo(() => {
    const list = transactions || [];
    return list.filter((t) => {
      if (!withinRange(t.date, filters?.from, filters?.to)) return false;
      if (filters?.tab !== "all" && t.type !== filters?.tab) return false;

      const s = (filters?.search || "").trim().toLowerCase();
      if (!s) return true;
      const hay =
        `${t.categoryName || ""} ${t.note || ""}`.toLowerCase();
      return hay.includes(s);
    });
  }, [transactions, filters]);

  const calc = useMemo(() => {
    const inc = filtered
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    const exp = filtered
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    const net = inc - exp;
    const txCount = filtered.length;

    const expenseTxCount = filtered.filter((t) => t.type === "expense").length;
    const avgExpense = expenseTxCount ? exp / expenseTxCount : 0;

    return { inc, exp, net, txCount, avgExpense };
  }, [filtered]);

  const insight = useMemo(() => {
    if (!filtered.length) return "Add transactions to unlock analytics insights.";
    if (calc.net >= 0) return "Nice — you’re net positive in this period.";
    return "Your expenses are higher than income in this period. Consider reviewing categories.";
  }, [filtered, calc.net]);

  const items = [
    { title: "Transactions", value: calc.txCount, Icon: Sparkles, badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300" },
    { title: "Income", value: formatMoney(calc.inc), Icon: ArrowUp, badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300" },
    { title: "Expense", value: formatMoney(calc.exp), Icon: ArrowDown, badge: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300" },
    { title: "Net", value: formatMoney(calc.net), Icon: Wallet, badge: "bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200" },
    { title: "Avg Expense", value: formatMoney(calc.avgExpense), Icon: ArrowDown, badge: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300" },
  ];

  return (
    <div className="space-y-4">
      {/* Insight Banner */}
      <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/40">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          Quick insight
        </p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          {insight}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        {items.map(({ title, value, Icon, badge }) => (
          <Card
            key={title}
            className="rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur shadow-sm dark:border-slate-800 dark:bg-slate-950/40"
          >
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {title}
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                  {value}
                </p>
              </div>
              <div className={`h-11 w-11 rounded-2xl flex items-center justify-center ${badge}`}>
                <Icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
