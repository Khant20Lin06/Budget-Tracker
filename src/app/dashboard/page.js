"use client";

import StatsCards from "@/components/dashboard/stats-cards";
import OverviewChart from "@/components/dashboard/overview-chart";
import CategoryPie from "@/components/dashboard/category-pie";
import MonthlyTrend from "@/components/dashboard/monthly-trend";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OverviewChart />
        <CategoryPie />
      </div>

      <MonthlyTrend />
    </div>
  );
}
