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
import { useTransactions } from "@/lib/store/transactions-store";

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

export default function AnalyticsMonthlyBars({ transactions = [], filters, exporting }) {
  const data = buildMonthlyData(transactions, filters);

  return (
    <Card className="rounded-2xl overflow-hidden">
      <CardHeader className="border-b">
        <div>
          <p className="text-lg font-bold">Income vs Expense</p>
          <p className="text-sm text-muted-foreground">Monthly comparison</p>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="h-[340px] w-full min-w-0">
          {exporting ? (
            <div className="h-full w-full rounded-2xl border flex items-center justify-center text-sm text-slate-500">
              Chart hidden for export
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%" minHeight={300}>
              <BarChart data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="income" />
                <Bar dataKey="expense" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

