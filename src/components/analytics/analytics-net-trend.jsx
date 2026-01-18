"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
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

function buildNetTrend(transactions = [], filters) {
  const map = new Map();
  const search = (filters?.search || "").trim().toLowerCase();

  for (const t of transactions) {
    if (!withinRange(t.date, filters?.from, filters?.to)) continue;
    if (filters?.tab !== "all" && t.type !== filters?.tab) continue;

    const hay = `${t.categoryName || ""} ${t.note || ""}`.toLowerCase();
    if (search && !hay.includes(search)) continue;

    const key = monthKey(t.date);
    if (!map.has(key)) map.set(key, { key, month: monthLabel(key), net: 0 });

    const row = map.get(key);
    const amt = Number(t.amount || 0);
    row.net += t.type === "income" ? amt : -amt;
  }

  const arr = Array.from(map.values());
  arr.sort((a, b) => a.key.localeCompare(b.key));
  return arr;
}

export default function AnalyticsNetTrend({ filters, transactions = [], exporting }) {
  const data = buildNetTrend(transactions, filters);

  return (
    <Card className="rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur shadow-sm dark:border-slate-800 dark:bg-slate-950/40 overflow-hidden">
      <CardHeader className="border-b border-slate-200/70 bg-white/60 dark:border-slate-800 dark:bg-slate-950/20">
        <div>
          <p className="text-lg font-bold text-slate-900 dark:text-white">Net Trend</p>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">Monthly net balance movement</p>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        {exporting ? (
          <div className="h-[340px] w-full min-w-0 flex items-center justify-center text-sm text-slate-500 dark:text-slate-400">
            Chart hidden for export
          </div>
        ) : data.length === 0 ? (
          <div className="h-[340px] w-full min-w-0">No data yet.</div>
        ) : (
          <div className="h-[340px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="net" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
