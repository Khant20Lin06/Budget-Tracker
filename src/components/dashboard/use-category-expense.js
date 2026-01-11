"use client";

import { useTransactions } from "@/lib/store/transactions-store";

export function useCategoryExpense() {
  const { transactions } = useTransactions();

  return Object.values(
    transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => {
        if (!acc[t.categoryId]) {
          acc[t.categoryId] = {
            name: t.categoryName,
            value: 0,
          };
        }
        acc[t.categoryId].value += t.amount;
        return acc;
      }, {})
  );
}
