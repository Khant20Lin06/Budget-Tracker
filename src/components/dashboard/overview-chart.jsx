"use client";

import { useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { useTransactions } from "@/lib/store/transactions-store";

// ---------- helpers ----------
function monthKey(date) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return null;
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function monthLabel(key) {
  const [y, m] = key.split("-").map(Number);
  const d = new Date(y, m - 1, 1);
  return d.toLocaleString("en-US", { month: "short" }); // Jan, Feb...
}

function buildMonthlyIncomeExpense(transactions = []) {
  const map = new Map();

  for (const t of transactions) {
    const key = monthKey(t?.date);
    if (!key) continue;

    if (!map.has(key)) {
      map.set(key, { key, name: monthLabel(key), income: 0, expense: 0 });
    }

    const row = map.get(key);
    const amt = Number(t?.amount || 0);

    if (t?.type === "income") row.income += amt;
    if (t?.type === "expense") row.expense += amt;
  }

  const arr = Array.from(map.values());
  arr.sort((a, b) => a.key.localeCompare(b.key));
  return arr;
}

// ---------- tooltip ----------
function money(n) {
  return Number(n || 0).toLocaleString("en-US");
}

function Tip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  const income = payload?.find((p) => p.dataKey === "income")?.value ?? 0;
  const expense = payload?.find((p) => p.dataKey === "expense")?.value ?? 0;

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/95 px-4 py-3 text-xs shadow-2xl backdrop-blur">
      <div className="font-semibold text-white">{label}</div>

      <div className="mt-2 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="text-slate-300">Income</span>
        </div>
        <span className="font-semibold text-emerald-300">{money(income)}</span>
      </div>

      <div className="mt-1 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
          <span className="text-slate-300">Expense</span>
        </div>
        <span className="font-semibold text-rose-300">{money(expense)}</span>
      </div>
    </div>
  );
}


export default function OverviewChart() {
  const { transactions, fetchTransactions, loading, error } = useTransactions();

  // ✅ safety: dashboard မခေါ်ရင်တောင် chart အတွက် fetch once
  useEffect(() => {
    if (!Array.isArray(transactions) || transactions.length === 0) {
      fetchTransactions?.({ tab: "all" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = useMemo(() => {
    return buildMonthlyIncomeExpense(Array.isArray(transactions) ? transactions : []);
  }, [transactions]);

  return (
    <Card className="rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur shadow-sm dark:border-slate-800 dark:bg-slate-950/40">
      {/* <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Income vs Expense
        </CardTitle>
        <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
          Compare monthly cashflow
        </CardDescription>
      </CardHeader> */}

      <CardContent className="h-[320px] min-h-[320px] p-4 sm:p-6">
        {loading ? (
          <div className="h-full w-full flex items-center justify-center text-sm text-slate-500">
            Loading...
          </div>
        ) : error ? (
          <div className="h-full w-full flex items-center justify-center text-sm text-rose-600">
            {error}
          </div>
        ) : data.length === 0 ? (
          <div className="h-full w-full flex items-center justify-center text-sm text-slate-500">
            No data yet
          </div>
        ) : (
          // --- inside <ResponsiveContainer> ... ---
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={34}>
              {/* ✅ Premium gradients */}
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity={1} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={1} />
                </linearGradient>

                <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fb7185" stopOpacity={1} />
                  <stop offset="100%" stopColor="#e11d48" stopOpacity={1} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />

              <Tooltip content={<Tip />} />

              {/* ✅ Premium Legend */}
              <g>
                {/* tiny custom legend spacing comes from wrapper below */}
              </g>

              <Bar
                dataKey="income"
                name="Income"
                fill="url(#incomeGrad)"
                radius={[12, 12, 0, 0]}
              />
              <Bar
                dataKey="expense"
                name="Expense"
                fill="url(#expenseGrad)"
                radius={[12, 12, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

        )}
      </CardContent>
    </Card>
  );
}
