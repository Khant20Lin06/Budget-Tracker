"use client";

import { useState } from "react";
import TransactionForm from "@/components/transactions/transaction-form";
import TransactionList from "@/components/transactions/transaction-list";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [editing, setEditing] = useState(null);

  const handleSave = (data) => {
    if (editing) {
      setTransactions((prev) =>
        prev.map((t) => (t.id === editing.id ? { ...editing, ...data } : t))
      );
      setEditing(null);
    } else {
      setTransactions((prev) => [
        {
          ...data,
          id: crypto.randomUUID(),
        },
        ...prev,
      ]);
    }
  };

  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Transactions
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Track all your income and expenses in one place.
        </p>
      </div>

      {/* Form */}
      <TransactionForm initialData={editing} onSubmit={handleSave} />

      {/* List */}
      <TransactionList
        transactions={transactions}
        onEdit={setEditing}
        onDelete={handleDelete}
      />
    </div>
  );
}
