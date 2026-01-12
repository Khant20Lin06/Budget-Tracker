"use client";

import TransactionRow from "./transaction-row";

export default function TransactionList({
  transactions = [],
  onEdit,
  onDelete,
}) {
  if (!transactions.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 p-10 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-400">
        No transactions yet
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((tx) => (
        <TransactionRow
          key={tx.id}
          transaction={tx}
          onEdit={() => onEdit(tx)}
          onDelete={() => onDelete(tx.id)}
        />
      ))}
    </div>
  );
}
