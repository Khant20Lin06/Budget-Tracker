"use client";

import { Trash2 } from "lucide-react";
import { useTransactions } from "@/lib/store/transactions-store";

export default function TransactionList() {
  const { transactions, deleteTransaction } = useTransactions();

  if (!transactions.length) {
    return (
      <p className="text-muted-foreground">
        No transactions yet.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {transactions.map((tx) => (
        <div
          key={tx.id}
          className="flex items-center justify-between rounded-lg border p-3"
        >
          <div>
            <p className="font-medium">
              {tx.categoryName}
            </p>
            <p className="text-sm text-muted-foreground">
              {tx.note}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span
              className={
                tx.type === "income"
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {tx.type === "income" ? "+" : "-"}
              {tx.amount}
            </span>

            <button
              onClick={() => deleteTransaction(tx.id)}
              className="text-muted-foreground hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
