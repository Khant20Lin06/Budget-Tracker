// import * as Icons from "lucide-react";

// export default function IconPreview({ name, className }) {
//   if (!name || !Icons[name]) return null;

//   const Icon = Icons[name];
//   return <Icon className={className} />;
// }
// import { getIconByName } from "@/lib/icons";

// export default function IconPreview({ name, size = 20 }) {
//   const Icon = getIconByName(name);
//   return <Icon size={size} />;
// }




// src/components/icon-picker/icon-preview.jsx
"use client";

export default function IconPreview({ icon: Icon, name, className }) {
  if (!Icon && !name) return null;

  return (
    <span className={className}>
      {Icon ? <Icon className={className} /> : name}
    </span>
  );
}
