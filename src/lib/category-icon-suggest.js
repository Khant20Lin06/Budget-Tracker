// src/lib/category-icon-suggest.js
import { ALL_ICONS } from "./icons";
import { KEYWORDS } from "./category-keywords";

export function suggestIconsFromName(name, limit = 30) {
  const q = (name || "").toLowerCase().trim();
  if (!q) return ALL_ICONS.slice(0, limit);

  const group = KEYWORDS.find((g) => g.keys.some((k) => q.includes(k)));

  let icons = ALL_ICONS.filter(({ name }) => {
    const lower = name.toLowerCase();

    // keyword group match
    if (group) return group.keys.some((k) => lower.includes(k));

    // direct match
    return lower.includes(q);
  });

  // fallback
  if (!icons.length) {
    icons = ALL_ICONS.filter(({ name }) => name.toLowerCase().includes(q));
  }

  return icons.slice(0, limit);
}
