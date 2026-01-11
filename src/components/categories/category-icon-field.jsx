"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import IconPicker from "@/components/icon-picker/icon-picker";
import IconPreview from "@/components/icon-picker/icon-preview";

export default function CategoryIconField({ value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex gap-2 items-center">
            <IconPreview name={value || ""} className="h-4 w-4" />
            {value ? value : "Choose Icon"}
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-lg">
          <IconPicker
            value={value || ""}
            onChange={(iconName) => {
              onChange(iconName || "");
              setOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
