"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ICONS } from "@/lib/icons";

export default function IconPicker({ value, onChange }) {
  const [query, setQuery] = useState("");

  // filter icons safely
  const filteredIcons = (ICONS || []).filter(({ name }) =>
    name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-2">
      <Input
        placeholder="Search icons..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ScrollArea className="h-64 border rounded-md p-2">
        <div className="grid grid-cols-6 gap-2">
          {(filteredIcons || []).map(({ name, Icon }) => (
            <button
              key={name}
              type="button"
              onClick={() => onChange(name)}
              className={`p-2 rounded hover:bg-gray-200 ${
                value === name ? "bg-blue-200" : ""
              }`}
            >
              <Icon className="h-5 w-5" />
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
