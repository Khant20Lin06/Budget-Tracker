import IconPreview from "@/components/icon-picker/icon-preview";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

export default function CategoryCard({ category, onEdit, onDelete }) {
  return (
    <div className="rounded-xl border p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 flex items-center justify-center rounded-md bg-muted">
          <IconPreview name={category.icon} className="h-5 w-5" />
        </div>

        <span className="font-medium">{category.name}</span>
      </div>

      <div className="flex gap-1">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onEdit(category)}
        >
          <Pencil className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => onDelete(category.id)}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    </div>
  );
}
