// "use client";

// import { useMemo, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { ICONS } from "@/lib/icons";

// export default function IconPicker({ value = "", onChange = () => {} }) {
//   const [query, setQuery] = useState("");

//   const filteredIcons = useMemo(() => {
//     const list = Array.isArray(ICONS) ? ICONS : [];
//     const q = query.trim().toLowerCase();
//     if (!q) return list;
//     return list.filter((it) => it?.name?.toLowerCase().includes(q));
//   }, [query]);

//   return (
//     <div className="space-y-2">
//       <Input
//         placeholder="Search icons..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />

//       <ScrollArea className="h-64 border rounded-md p-2">
//         <div className="grid grid-cols-6 gap-2">
//           {filteredIcons.map(({ name, Icon }) => (
//             <button
//               key={name}
//               type="button"
//               onClick={() => onChange(name)}
//               className={`p-2 rounded hover:bg-gray-200 ${
//                 value === name ? "bg-blue-200" : ""
//               }`}
//               title={name}
//             >
//               <Icon className="h-5 w-5" />
//             </button>
//           ))}
//         </div>
//       </ScrollArea>
//     </div>
//   );
// }
