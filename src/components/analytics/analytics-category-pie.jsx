"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTransactions } from "@/lib/store/transactions-store";

const COLORS = ["#2563eb", "#f97316", "#22c55e", "#e11d48", "#8b5cf6", "#14b8a6"];

function withinRange(date, from, to) {
  const d = new Date(date);
  const a = from ? new Date(from) : null;
  const b = to ? new Date(to) : null;
  if (a && d < a) return false;
  if (b && d > b) return false;
  return true;
}

function buildCategoryData(transactions = [], filters) {
  const acc = new Map();
  const search = (filters?.search || "").trim().toLowerCase();

  for (const t of transactions) {
    if (t.type !== "expense") continue;
    if (!withinRange(t.date, filters?.from, filters?.to)) continue;
    if (filters?.tab !== "all" && t.type !== filters?.tab) continue;

    const key = t.categoryName || t.categoryId || "Unknown";
    const hay = `${key} ${t.note || ""}`.toLowerCase();
    if (search && !hay.includes(search)) continue;

    if (!acc.has(key)) acc.set(key, { name: key, value: 0 });
    acc.get(key).value += Number(t.amount || 0);
  }

  const arr = Array.from(acc.values());
  arr.sort((a, b) => b.value - a.value);
  return arr.slice(0, 6);
}

export default function AnalyticsCategoryPie({ filters }) {
  const { transactions } = useTransactions();
  const data = buildCategoryData(transactions, filters);

  return (
    <Card className="rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur shadow-sm dark:border-slate-800 dark:bg-slate-950/40 overflow-hidden">
      <CardHeader className="border-b border-slate-200/70 bg-white/60 dark:border-slate-800 dark:bg-slate-950/20">
        <div>
          <p className="text-lg font-bold text-slate-900 dark:text-white">Top Expenses</p>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Distribution by category
          </p>
        </div>
      </CardHeader>

      <CardContent className="h-[340px] p-4">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-500 dark:text-slate-400">
            No expense data yet.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" outerRadius={110}>
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
