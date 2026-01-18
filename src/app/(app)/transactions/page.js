"use client";

import { useEffect, useMemo, useState } from "react";
import TransactionForm from "@/components/transactions/transaction-form";
import TransactionList from "@/components/transactions/transaction-list";
import { useTransactions } from "@/lib/store/transactions-store";

function isUUID(v) {
  return typeof v === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);
}

export default function TransactionsPage() {
  const {
    transactions,
    fetchTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    loading,
    error,
  } = useTransactions();

  const [editing, setEditing] = useState(null);

  // ✅ fetch once on mount (avoid dependency loop)
  useEffect(() => {
    fetchTransactions({ tab: "all" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async (data) => {
    const payload = {
      type: data.type,
      amount: Number(data.amount || 0),
      date: data.date,
      category: data.categoryId, 
      note: data.note || "",
    };

    if (editing?.id) {
      await updateTransaction(editing.id, payload);
      setEditing(null);
    } else {
      await createTransaction(payload);
    }

    await fetchTransactions({ tab: "all" });
  };



  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Transactions
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Track all your income and expenses.
        </p>

        {loading ? <p className="mt-2 text-sm text-slate-500">Loading...</p> : null}
        {error ? <p className="mt-2 text-sm text-rose-600">{error}</p> : null}
      </div>

      <TransactionForm
        initialData={editing}
        onSubmit={handleSave}
        onCancel={() => setEditing(null)} // if your form supports it
      />

      <TransactionList
        transactions={Array.isArray(transactions) ? transactions : []}
        onEdit={setEditing}
        onDelete={async (id) => {
          await deleteTransaction(id);
          await fetchTransactions({ tab: "all" }); // ✅ refresh
        }}
      />
    </div>
  );
}
