import * as Icons from "lucide-react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TransactionRow({
  transaction,
  onEdit,
  onDelete,
}) {
  const Icon =
    Icons[transaction.category.icon] || Icons.Circle;

  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <p className="font-medium">
            {transaction.category.name}
          </p>
          <p className="text-sm text-muted-foreground">
            {transaction.note || transaction.date}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span
          className={
            transaction.type === "expense"
              ? "text-red-500"
              : "text-green-500"
          }
        >
          {transaction.type === "expense" ? "-" : "+"}
          {transaction.amount}
        </span>

        <Button size="icon" variant="ghost" onClick={onEdit}>
          <Pencil className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
