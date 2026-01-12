"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Wallet } from "lucide-react";
import { useTransactions } from "@/lib/store/transactions-store";

function formatMoney(n) {
  const num = Number(n || 0);
  return (
    "$" +
    num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

export default function StatsCards() {
  const { balance, income, expense } = useTransactions();

  const stats = [
    {
      title: "Total Balance",
      value: formatMoney(balance),
      Icon: Wallet,
      pill: "bg-blue-500/10 text-blue-400 ring-blue-500/20",
    },
    {
      title: "Income",
      value: formatMoney(income),
      Icon: ArrowUp,
      pill: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
    },
    {
      title: "Expense",
      value: formatMoney(expense),
      Icon: ArrowDown,
      pill: "bg-rose-500/10 text-rose-400 ring-rose-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {stats.map(({ title, value, Icon, pill }) => (
        <Card
          key={title}
          className="group rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-950/40"
        >
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {title}
              </p>

              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {value}
              </p>

              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Updated just now
              </p>
            </div>

            <div
              className={[
                "h-12 w-12 rounded-2xl ring-1 flex items-center justify-center",
                pill,
                "transition group-hover:scale-[1.03]",
              ].join(" ")}
            >
              <Icon className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
