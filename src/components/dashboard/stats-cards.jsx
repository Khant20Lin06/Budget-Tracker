"use client";

import { useMemo } from "react";
import { useTransactions } from "@/lib/store/transactions-store";

function fmt(n) {
  const v = Number(n || 0);
  return v.toLocaleString();
}

export default function StatsCards() {
  const { summary, totals, transactions } = useTransactions();

  // ✅ backend summary ရှိရင် summary သုံး
  // ✅ မရှိရင် transactions ထဲကနေ client-side calculate
  const computed = useMemo(() => {
    const list = Array.isArray(transactions) ? transactions : [];
    let income = 0;
    let expense = 0;

    for (const t of list) {
      const amt = Number(t.amount || 0);
      if (t.type === "income") income += amt;
      if (t.type === "expense") expense += amt;
    }
    return { income, expense, balance: income - expense };
  }, [transactions]);

  const income =
    summary?.income ?? totals?.income ?? computed.income;

  const expense =
    summary?.expense ?? totals?.expense ?? computed.expense;

  const balance =
    summary?.balance ??
    totals?.balance ??
    summary?.total ??
    computed.balance;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="rounded-2xl border bg-white/70 p-5 shadow-sm dark:bg-slate-950/40">
        <p className="text-xs text-slate-500 dark:text-slate-300/70">Total Balance</p>
        <p className="mt-2 text-2xl font-bold">{fmt(balance)}</p>
      </div>

      <div className="rounded-2xl border bg-white/70 p-5 shadow-sm dark:bg-slate-950/40">
        <p className="text-xs text-slate-500 dark:text-slate-300/70">Income</p>
        <p className="mt-2 text-2xl font-bold">{fmt(income)}</p>
      </div>

      <div className="rounded-2xl border bg-white/70 p-5 shadow-sm dark:bg-slate-950/40">
        <p className="text-xs text-slate-500 dark:text-slate-300/70">Expense</p>
        <p className="mt-2 text-2xl font-bold">{fmt(expense)}</p>
      </div>
    </div>
  );
}
