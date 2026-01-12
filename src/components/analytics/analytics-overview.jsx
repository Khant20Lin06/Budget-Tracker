"use client";

import { useMemo, useRef, useState } from "react";
import { CalendarDays, TrendingUp } from "lucide-react";

import AnalyticsSummary from "./analytics-summary";
import AnalyticsMonthlyBars from "./analytics-monthly-bars";
import AnalyticsCategoryPie from "./analytics-category-pie";
import AnalyticsNetTrend from "./analytics-net-trend";
import AnalyticsTopTable from "./analytics-top-table";
import AnalyticsGoals from "./analytics-goals";
import AnalyticsFilterDialog from "./analytics-filter-dialog";

import ExportDropdown from "@/components/analytics/export-dropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTransactions } from "@/lib/store/transactions-store";

import { downloadCSV } from "@/lib/csv";
import { downloadExcel } from "@/lib/excel";
import { exportElementToPDF } from "@/lib/pdf";

// ✅ local yyyy-mm-dd (avoid timezone shift)
function localISODate(d = new Date()) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}

function startOfMonthISO() {
    const d = new Date();
    d.setDate(1);
    return localISODate(d);
}

function todayISO() {
    return localISODate(new Date());
}

function withinRange(date, from, to) {
    const d = new Date(date);
    const a = from ? new Date(from) : null;
    const b = to ? new Date(to) : null;
    if (a && d < a) return false;
    if (b && d > b) return false;
    return true;
}

function applyFilters(t, filters) {
    if (!withinRange(t.date, filters?.from, filters?.to)) return false;
    if (filters?.tab !== "all" && t.type !== filters?.tab) return false;

    const s = (filters?.search || "").trim().toLowerCase();
    if (s) {
        const hay = `${t.categoryName || ""} ${t.note || ""}`.toLowerCase();
        if (!hay.includes(s)) return false;
    }

    const min = filters?.min !== "" ? Number(filters.min) : null;
    const max = filters?.max !== "" ? Number(filters.max) : null;
    const amt = Number(t.amount || 0);
    if (min != null && amt < min) return false;
    if (max != null && amt > max) return false;

    const ids = filters?.categoryIds || [];
    if (ids.length) {
        if (!ids.includes(t.categoryId)) return false;
    }

    return true;
}

export default function AnalyticsOverview() {
    const { transactions } = useTransactions();
    const exportRef = useRef(null);

    const [tab, setTab] = useState("all");
    const [from, setFrom] = useState(startOfMonthISO());
    const [to, setTo] = useState(todayISO());
    const [search, setSearch] = useState("");

    const [dialogFilters, setDialogFilters] = useState({
        categoryIds: [],
        min: "",
        max: "",
    });

    const filters = useMemo(
        () => ({
            tab,
            from,
            to,
            search,
            ...dialogFilters,
        }),
        [tab, from, to, search, dialogFilters]
    );

    // ✅ compute first, then export functions can use it safely
    const filteredTx = useMemo(() => {
        return (transactions || []).filter((t) => applyFilters(t, filters));
    }, [transactions, filters]);

    const buildRows = () => [
        ["Date", "Type", "Amount", "Category", "Note", "CategoryId", "TxId"],
        ...filteredTx.map((t) => [
            localISODate(new Date(t.date)),
            t.type,
            Number(t.amount || 0),
            t.categoryName || "",
            t.note || "",
            t.categoryId || "",
            t.id || "",
        ]),
    ];

    const exportCSV = () => {
        downloadCSV(`analytics-${from}-to-${to}.csv`, buildRows());
    };

    const exportExcel = async () => {
        const rows = [
            ["Date", "Type", "Amount", "Category", "Note", "CategoryId", "TxId"],
            ...filteredTx.map((t) => [
                new Date(t.date).toISOString().slice(0, 10),
                t.type,
                t.amount,
                t.categoryName || "",
                t.note || "",
                t.categoryId || "",
                t.id || "",
            ]),
        ];

        await downloadExcel(`analytics-${from}-to-${to}`, rows, "Transactions");
    };

    const exportPDF = async () => {
        // exportRef ကို wrapper div ထဲမှာ attach ထားရမယ် (အောက်မှာထားပြီးသား)
        if (!exportRef.current) return;
        await exportElementToPDF(exportRef.current, `analytics-${from}-to-${to}.pdf`);
    };

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 space-y-8"
        >

            {/* ✅ ဒီ wrapper ကို ref ချိတ် */}
            <div ref={exportRef} id="analytics-export">
                {/* Premium Page Header */}
                <div className="rounded-3xl border border-slate-200/70 bg-white/70 backdrop-blur shadow-sm dark:border-slate-800 dark:bg-slate-950/40">
                    <div className="p-6 sm:p-7">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-start gap-3">
                                <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow">
                                    <TrendingUp className="h-5 w-5" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                                        Analytics
                                    </h1>
                                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                        Understand your spending, income, and trends over time.
                                    </p>
                                </div>
                            </div>

                            {/* Toolbar */}
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-3 py-2 dark:border-slate-800 dark:bg-slate-950/30">
                                    <CalendarDays className="h-4 w-4 text-slate-500" />
                                    <input
                                        type="date"
                                        value={from}
                                        onChange={(e) => setFrom(e.target.value)}
                                        className="bg-transparent text-sm outline-none text-slate-700 dark:text-slate-200"
                                    />
                                    <span className="text-slate-400">—</span>
                                    <input
                                        type="date"
                                        value={to}
                                        onChange={(e) => setTo(e.target.value)}
                                        className="bg-transparent text-sm outline-none text-slate-700 dark:text-slate-200"
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <AnalyticsFilterDialog
                                        value={dialogFilters}
                                        onChange={setDialogFilters}
                                        triggerLabel="Filters"
                                    />

                                    {/* ✅ Export dropdown (CSV/Excel/PDF) */}
                                    <ExportDropdown
                                        onCSV={exportCSV}
                                        onExcel={exportExcel}
                                        onPDF={exportPDF}
                                    />

                                    {/* (optional) quick button */}
                                    <Button
                                        variant="outline"
                                        className="rounded-2xl"
                                        onClick={() => setDialogFilters({ categoryIds: [], min: "", max: "" })}
                                    >
                                        Reset
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Search + Tabs */}
                        <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                            <div className="w-full lg:max-w-md">
                                <Input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search category / note..."
                                    className="h-11 rounded-2xl"
                                />
                            </div>

                            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 p-1 dark:border-slate-800 dark:bg-slate-950/30">
                                {[
                                    { key: "all", label: "All" },
                                    { key: "expense", label: "Expense" },
                                    { key: "income", label: "Income" },
                                ].map((x) => (
                                    <button
                                        key={x.key}
                                        type="button"
                                        onClick={() => setTab(x.key)}
                                        className={cn(
                                            "px-4 py-2 text-sm font-semibold rounded-2xl transition",
                                            tab === x.key
                                                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                                                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
                                        )}
                                    >
                                        {x.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                            Showing <span className="font-bold">{filteredTx.length}</span> transactions for this view.
                        </p>
                    </div>
                </div>

                {/* Summary */}
                <AnalyticsSummary filters={filters} transactions={filteredTx} />

                {/* Goals */}
                <AnalyticsGoals filters={filters} transactions={filteredTx} />

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AnalyticsMonthlyBars filters={filters} transactions={filteredTx} />
                    <AnalyticsCategoryPie filters={filters} transactions={filteredTx} />
                </div>

                <AnalyticsNetTrend filters={filters} transactions={filteredTx} />

                {/* Top table */}
                <AnalyticsTopTable filters={filters} transactions={filteredTx} />
            </div>

        </div>
    );
}
