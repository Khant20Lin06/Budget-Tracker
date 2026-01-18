"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function monthKey(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function monthLabel(key) {
  const [y, m] = key.split("-").map(Number);
  const d = new Date(y, m - 1, 1);
  return d.toLocaleString("en-US", { month: "short", year: "2-digit" });
}

function withinRange(date, from, to) {
  const d = new Date(date);
  const a = from ? new Date(from) : null;
  const b = to ? new Date(to) : null;
  if (a && d < a) return false;
  if (b && d > b) return false;
  return true;
}

function buildMonthlyData(transactions = [], filters) {
  const map = new Map();

  for (const t of transactions) {
    if (!withinRange(t.date, filters?.from, filters?.to)) continue;
    if (filters?.tab !== "all" && t.type !== filters?.tab) continue;

    const key = monthKey(t.date);
    if (!map.has(key)) map.set(key, { key, month: monthLabel(key), income: 0, expense: 0 });

    const row = map.get(key);
    const amt = Number(t.amount || 0);
    if (t.type === "income") row.income += amt;
    if (t.type === "expense") row.expense += amt;
  }

  const arr = Array.from(map.values());
  arr.sort((a, b) => a.key.localeCompare(b.key));
  return arr;
}

// ✅ Premium Tooltip
function PremiumTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  const income = payload?.find((p) => p.dataKey === "income")?.value ?? 0;
  const expense = payload?.find((p) => p.dataKey === "expense")?.value ?? 0;

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/95 px-3 py-2 shadow-xl backdrop-blur text-slate-100">
      <p className="text-xs text-slate-300">{label}</p>
      <div className="mt-1 space-y-1">
        <div className="flex items-center justify-between gap-6 text-sm">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Income
          </span>
          <span className="font-semibold">{Number(income).toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between gap-6 text-sm">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-rose-400" />
            Expense
          </span>
          <span className="font-semibold">{Number(expense).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsMonthlyBars({ transactions = [], filters, exporting }) {
  const data = buildMonthlyData(transactions, filters);

  const hasData =
    Array.isArray(data) &&
    data.length > 0 &&
    data.some((d) => Number(d.income || 0) > 0 || Number(d.expense || 0) > 0);

  return (
    <Card className="rounded-3xl overflow-hidden border border-slate-200/60 bg-white/70 backdrop-blur shadow-sm dark:border-white/10 dark:bg-slate-950/40">
      {/* ✅ Premium header */}
      <CardHeader className="border-b border-slate-200/60 dark:border-white/10 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-lg font-bold tracking-tight text-slate-950 dark:text-slate-50">
              Income vs Expense
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Monthly comparison
            </p>
          </div>

          {/* ✅ Mini legend pill */}
          <div className="flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-xs text-slate-600 dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-300">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Income
            </span>
            <span className="mx-1 text-slate-300 dark:text-slate-700">•</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              Expense
            </span>
          </div>
        </div>

        {/* subtle accent */}
        <div className="mt-4 h-[1px] w-full bg-gradient-to-r from-transparent via-slate-300/60 to-transparent dark:via-white/10" />
      </CardHeader>

      <CardContent className="p-4 sm:p-5">
        <div className="relative h-[340px] w-full min-w-0">
          {/* ✅ Export placeholder */}
          {exporting ? (
            <div className="h-full w-full rounded-3xl border border-dashed border-slate-200/70 bg-white/60 flex items-center justify-center text-sm text-slate-500 dark:border-white/10 dark:bg-slate-950/30 dark:text-slate-400">
              Chart hidden for export
            </div>
          ) : !hasData ? (
            // ✅ Empty state
            <div className="h-full w-full rounded-3xl border border-slate-200/70 bg-white/60 flex items-center justify-center text-sm text-slate-500 dark:border-white/10 dark:bg-slate-950/30 dark:text-slate-400">
              No monthly data yet
            </div>
          ) : (
            <div className="h-full w-full min-w-0 min-h-[320px] h-[340px] rounded-3xl border border-slate-200/70 bg-white/60 dark:border-white/10 dark:bg-slate-950/30 p-2">
              <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                <BarChart data={data} barCategoryGap={18} barGap={6}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    fontSize={12}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    fontSize={12}
                    width={42}
                  />
                  <Tooltip content={<PremiumTooltip />} />

                  {/* ✅ Rounded bars + premium colors */}
                  <Bar dataKey="income" radius={[10, 10, 0, 0]} fill="#10b981" />
                  <Bar dataKey="expense" radius={[10, 10, 0, 0]} fill="#fb7185" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
