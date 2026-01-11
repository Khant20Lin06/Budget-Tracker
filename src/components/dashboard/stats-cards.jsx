"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Wallet } from "lucide-react";
import { useTransactions } from "@/lib/store/transactions-store";

export default function StatsCards() {
  const { balance, income, expense } = useTransactions();

  const stats = [
    {
      title: "Total Balance",
      value: balance,
      icon: Wallet,
    },
    {
      title: "Income",
      value: income,
      icon: ArrowUp,
      color: "text-green-600",
    },
    {
      title: "Expense",
      value: expense,
      icon: ArrowDown,
      color: "text-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {stats.map((item) => (
        <Card key={item.title}>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                {item.title}
              </p>
              <p className="text-2xl font-bold">
                {item.value}
              </p>
            </div>

            <item.icon
              className={`h-8 w-8 ${item.color || ""}`}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
