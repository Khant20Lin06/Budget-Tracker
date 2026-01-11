"use client";

import { useTransactions } from "@/lib/store/transactions-store";

export function useMonthlyTrend() {
  const { transactions } = useTransactions();

  return Object.values(
    transactions.reduce((acc, t) => {
      const month = new Date(t.date).toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      });

      if (!acc[month]) {
        acc[month] = {
          month,
          income: 0,
          expense: 0,
        };
      }

      acc[month][t.type] += t.amount;
      return acc;
    }, {})
  );
}
