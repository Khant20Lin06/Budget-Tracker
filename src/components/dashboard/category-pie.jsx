"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useCategoryExpense } from "./use-category-expense";

const COLORS = ["#2563eb", "#f97316", "#22c55e", "#e11d48", "#8b5cf6", "#14b8a6"];

function Tip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div className="rounded-xl border border-slate-200 bg-white/95 px-3 py-2 text-xs shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
      <div className="font-semibold text-slate-900 dark:text-slate-100">{p?.name}</div>
      <div className="mt-1 text-slate-600 dark:text-slate-300">
        Amount: <span className="font-semibold">{p?.value}</span>
      </div>
    </div>
  );
}

export default function CategoryPie() {
  const data = useCategoryExpense();

  return (
    <Card className="rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur shadow-sm dark:border-slate-800 dark:bg-slate-950/40">
      {/* <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Expense by Category
        </CardTitle>
        <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
          Where your money goes
        </CardDescription>
      </CardHeader> */}

      <CardContent className="h-[320px] p-4 sm:p-6">
        {!data?.length ? (
          <div className="h-full flex items-center justify-center text-sm text-slate-500 dark:text-slate-400">
            No expense data yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                innerRadius={70}
                paddingAngle={2}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<Tip />} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
