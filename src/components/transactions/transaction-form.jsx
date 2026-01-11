"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
    onSubmit({
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
    <div className="rounded-xl border p-6 space-y-4">
      <div className="flex gap-4">
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-32">
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
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <CategorySelect value={category} onChange={setCategory} />

      <Input
        placeholder="Note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <Button onClick={submit}>
        {initialData ? "Update Transaction" : "Add Transaction"}
      </Button>
    </div>
  );
}
