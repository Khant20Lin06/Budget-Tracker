"use client";

import { createContext, useContext, useState } from "react";

// ----------------------
// Context
// ----------------------
const TransactionsContext = createContext(null);

// ----------------------
// Provider
// ----------------------
export function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useState([
    // mock data (for dashboard testing)
    {
      id: "t1",
      amount: 1200,
      type: "income",
      categoryId: "salary",
      categoryName: "Salary",
      categoryIcon: "Wallet",
      date: new Date("2024-04-01"),
      note: "April salary",
    },
    {
      id: "t2",
      amount: 300,
      type: "expense",
      categoryId: "food",
      categoryName: "Food",
      categoryIcon: "Utensils",
      date: new Date("2024-04-05"),
      note: "Lunch & dinner",
    },
  ]);

  // ----------------------
  // Actions (CRUD)
  // ----------------------
  const addTransaction = (tx) => {
    setTransactions((prev) => [
      { ...tx, id: crypto.randomUUID() },
      ...prev,
    ]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((tx) => tx.id !== id)
    );
  };

  const updateTransaction = (id, updatedTx) => {
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.id === id ? { ...tx, ...updatedTx } : tx
      )
    );
  };

  // ----------------------
  // Derived Data (Dashboard)
  // ----------------------
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        income,
        expense,
        balance,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

// ----------------------
// Hook
// ----------------------
export function useTransactions() {
  const ctx = useContext(TransactionsContext);
  if (!ctx) {
    throw new Error(
      "useTransactions must be used inside TransactionsProvider"
    );
  }
  return ctx;
}
