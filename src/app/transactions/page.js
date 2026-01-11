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
        prev.map((t) => (t.id === editing.id ? data : t))
      );
      setEditing(null);
    } else {
      setTransactions((prev) => [
        ...prev,
        { ...data, id: crypto.randomUUID() },
      ]);
    }
  };

  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Transactions</h1>

      <TransactionForm
        initialData={editing}
        onSubmit={handleSave}
      />

      <TransactionList
        transactions={transactions}
        onEdit={setEditing}
        onDelete={handleDelete}
      />
    </div>
  );
}
