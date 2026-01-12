"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const data = [
  { name: "Jan", income: 4000, expense: 2400 },
  { name: "Feb", income: 3000, expense: 1398 },
  { name: "Mar", income: 5000, expense: 2800 },
];

function Tip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-200 bg-white/95 px-3 py-2 text-xs shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
      <div className="font-semibold text-slate-900 dark:text-slate-100">{label}</div>
      <div className="mt-1 text-slate-600 dark:text-slate-300">
        Income: <span className="font-semibold">{payload[0]?.value}</span>
      </div>
      <div className="text-slate-600 dark:text-slate-300">
        Expense: <span className="font-semibold">{payload[1]?.value}</span>
      </div>
    </div>
  );
}

export default function OverviewChart() {
  return (
    <Card className="rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur shadow-sm dark:border-slate-800 dark:bg-slate-950/40">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Income vs Expense
        </CardTitle>
        <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
          Compare monthly cashflow
        </CardDescription>
      </CardHeader>

      <CardContent className="h-[320px] p-4 sm:p-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={34}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip content={<Tip />} />
            <Bar dataKey="income" fill="#22c55e" radius={[10, 10, 0, 0]} />
            <Bar dataKey="expense" fill="#ef4444" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
