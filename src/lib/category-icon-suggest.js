// src/lib/category-icon-suggest.js

import { ALL_ICONS } from "./icons";
import { KEYWORDS } from "./category-keywords";

export function suggestIconsFromName(name, limit = 12) {
  const q = (name || "").toLowerCase().trim();
  if (!q) return ALL_ICONS.slice(0, limit);

  // find keyword group
  const group = KEYWORDS.find((g) =>
    g.keys.some((k) => q.includes(k))
  );

  // if matched → filter lucide icon names
  let icons = ALL_ICONS.filter(({ name }) => {
    const lower = name.toLowerCase();
    return group
      ? group.keys.some((k) => lower.includes(k))
      : lower.includes(q);
  });

  // fallback if nothing matched
  if (!icons.length) {
    icons = ALL_ICONS.filter(({ name }) =>
      name.toLowerCase().includes(q)
    );
  }

  return icons.slice(0, limit);
}
