"use client";

import TransactionRow from "./transaction-row";

export default function TransactionList({ transactions = [], onEdit, onDelete }) {
  const list = Array.isArray(transactions) ? transactions : [];

  if (!list.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 p-10 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-400">
        No transactions yet
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {list.map((tx, idx) => {
        // ✅ stable-ish fallback key if id missing
        const key =
          tx?.id ||
          `${tx?.date || "no-date"}-${tx?.type || "t"}-${tx?.amount || 0}-${idx}`;

        return (
          <TransactionRow
            key={key}
            transaction={tx}
            onEdit={() => onEdit?.(tx)}
            onDelete={() => onDelete?.(tx.id)}
          />
        );
      })}
    </div>
  );
}
