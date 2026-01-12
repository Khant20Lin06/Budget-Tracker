"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useMonthlyTrend } from "./use-monthly-trend";

function Tip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-200 bg-white/95 px-3 py-2 text-xs shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
      <div className="font-semibold text-slate-900 dark:text-slate-100">{label}</div>
      <div className="mt-1 text-slate-600 dark:text-slate-300">
        Income: <span className="font-semibold">{payload?.find(p => p.dataKey === "income")?.value}</span>
      </div>
      <div className="text-slate-600 dark:text-slate-300">
        Expense: <span className="font-semibold">{payload?.find(p => p.dataKey === "expense")?.value}</span>
      </div>
    </div>
  );
}

export default function MonthlyTrend() {
  const data = useMonthlyTrend();

  return (
    <Card className="rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur shadow-sm dark:border-slate-800 dark:bg-slate-950/40">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Monthly Trend
        </CardTitle>
        <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
          Income and expense over time
        </CardDescription>
      </CardHeader>

      <CardContent className="h-[360px] p-4 sm:p-6">
        {!data?.length ? (
          <div className="h-full flex items-center justify-center text-sm text-slate-500 dark:text-slate-400">
            No trend data yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip content={<Tip />} />
              <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
