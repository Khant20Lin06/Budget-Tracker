"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/lib/store/transactions-store";
import { useLocalStorage } from "@/lib/use-local-storage";

function monthKey(date) {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function monthLabel(key) {
    const [y, m] = key.split("-").map(Number);
    const d = new Date(y, m - 1, 1);
    return d.toLocaleString("en-US", { month: "long", year: "numeric" });
}

export default function AnalyticsGoals() {
    const { transactions } = useTransactions();

    const currentMonth = monthKey(new Date());
    const [target, setTarget] = useLocalStorage("goal:monthlyBudget", "1000");
    const [savingTarget, setSavingTarget] = useLocalStorage("goal:monthlySaving", "300");

    const stats = useMemo(() => {
        const monthTx = (transactions || []).filter((t) => monthKey(t.date) === currentMonth);
        const income = monthTx.filter((t) => t.type === "income").reduce((s, t) => s + Number(t.amount || 0), 0);
        const expense = monthTx.filter((t) => t.type === "expense").reduce((s, t) => s + Number(t.amount || 0), 0);
        const net = income - expense;

        const budget = Number(target || 0);
        const saveGoal = Number(savingTarget || 0);

        const spendPct = budget > 0 ? Math.min(100, (expense / budget) * 100) : 0;
        const netPct = saveGoal > 0 ? Math.min(100, (Math.max(0, net) / saveGoal) * 100) : 0;

        return { income, expense, net, budget, saveGoal, spendPct, netPct };
    }, [transactions, currentMonth, target, savingTarget]);

    return (
        <Card className="rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur shadow-sm dark:border-slate-800 dark:bg-slate-950/40 overflow-hidden">
            <CardHeader className="border-b border-slate-200/70 bg-white/60 dark:border-slate-800 dark:bg-slate-950/20">
                <div>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">
                        Goals
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                        Track your monthly targets ({monthLabel(currentMonth)})
                    </p>
                </div>
            </CardHeader>

            <CardContent className="p-4 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800 p-4">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                            Monthly Budget Target (Expense)
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                            <Input
                                type="number"
                                value={target}
                                onChange={(e) => setTarget(e.target.value)}
                                className="rounded-2xl"
                            />
                            <Button variant="outline" className="rounded-2xl" type="button">
                                Save
                            </Button>
                        </div>

                        <div className="mt-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-600 dark:text-slate-400">
                                    Spent
                                </span>
                                <span className="font-bold text-slate-900 dark:text-white">
                                    ${Math.round(stats.expense).toLocaleString()} / ${Math.round(stats.budget).toLocaleString()}
                                </span>
                            </div>
                            <div className="mt-2 h-3 w-full rounded-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
                                    style={{ width: `${stats.spendPct}%` }}
                                />
                            </div>
                            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                                {Math.round(stats.spendPct)}% of budget used
                            </p>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800 p-4">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                            Monthly Saving Goal (Net)
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                            <Input
                                type="number"
                                value={savingTarget}
                                onChange={(e) => setSavingTarget(e.target.value)}
                                className="rounded-2xl"
                            />
                            <Button variant="outline" className="rounded-2xl" type="button">
                                Save
                            </Button>
                        </div>

                        <div className="mt-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-600 dark:text-slate-400">
                                    Net
                                </span>
                                <span className="font-bold text-slate-900 dark:text-white">
                                    ${Math.round(stats.net).toLocaleString()} / ${Math.round(stats.saveGoal).toLocaleString()}
                                </span>
                            </div>
                            <div className="mt-2 h-3 w-full rounded-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-600"
                                    style={{ width: `${stats.netPct}%` }}
                                />
                            </div>
                            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                                {Math.round(stats.netPct)}% of goal reached
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800 p-4">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        Summary (this month)
                    </p>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                        <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/40 p-3">
                            <p className="text-slate-500 dark:text-slate-400">Income</p>
                            <p className="font-bold text-slate-900 dark:text-white">
                                ${Math.round(stats.income).toLocaleString()}
                            </p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/40 p-3">
                            <p className="text-slate-500 dark:text-slate-400">Expense</p>
                            <p className="font-bold text-slate-900 dark:text-white">
                                ${Math.round(stats.expense).toLocaleString()}
                            </p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/40 p-3">
                            <p className="text-slate-500 dark:text-slate-400">Net</p>
                            <p className="font-bold text-slate-900 dark:text-white">
                                ${Math.round(stats.net).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
