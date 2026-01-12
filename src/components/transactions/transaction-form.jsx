"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CategorySelect from "@/components/categories/category-select";

export default function TransactionForm({ initialData, onSubmit }) {
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(null);
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (initialData) {
      setType(initialData.type);
      setAmount(initialData.amount);
      setCategory(initialData.category);
      setNote(initialData.note || "");
      setDate(initialData.date);
    }
  }, [initialData]);

  const submit = () => {
    onSubmit?.({
      id: initialData?.id,
      type,
      amount: Number(amount),
      category,
      note,
      date,
    });

    if (!initialData) {
      setAmount("");
      setCategory(null);
      setNote("");
      setDate("");
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur shadow-sm dark:border-slate-800 dark:bg-slate-950/40">
      <div className="p-6 space-y-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="h-11 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="expense">Expense</SelectItem>
              <SelectItem value="income">Income</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="number"
            placeholder="Amount"
            className="h-11 rounded-xl sm:col-span-2"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <CategorySelect value={category} onChange={setCategory} />

        <Input
          placeholder="Note (optional)"
          className="h-11 rounded-xl"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <Input
          type="date"
          className="h-11 rounded-xl"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <div className="flex justify-end">
          <Button className="rounded-xl px-6" onClick={submit}>
            {initialData ? "Update Transaction" : "Add Transaction"}
          </Button>
        </div>
      </div>
    </div>
  );
}
