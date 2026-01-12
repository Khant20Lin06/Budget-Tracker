// // src/lib/icon-suggest.js
// const KEYWORDS = [
//   { keys: ["food", "restaurant", "cafe", "coffee", "dinner", "lunch", "meal"], icons: ["Utensils", "Coffee", "Pizza", "Sandwich"] },
//   { keys: ["grocery", "market", "shopping", "store", "mart"], icons: ["ShoppingCart", "Store", "ShoppingBag"] },
//   { keys: ["rent", "home", "house", "mortgage"], icons: ["Home", "Building2"] },
//   { keys: ["transport", "car", "taxi", "bus", "train", "gas", "fuel"], icons: ["Car", "Bus", "Train", "Fuel"] },
//   { keys: ["salary", "income", "pay", "wage"], icons: ["Wallet", "BadgeDollarSign", "DollarSign"] },
//   { keys: ["health", "hospital", "medicine", "pharmacy"], icons: ["HeartPulse", "Hospital", "Pill"] },
//   { keys: ["gift", "present", "donation"], icons: ["Gift", "HandHeart"] },
//   { keys: ["travel", "flight", "hotel", "trip"], icons: ["Plane", "Hotel", "Luggage"] },
//   { keys: ["phone", "internet", "wifi", "bill"], icons: ["Phone", "Wifi", "Receipt"] },
//   { keys: ["fun", "movie", "music", "game", "entertainment"], icons: ["Film", "Music", "Gamepad2"] },
// ];

// export function suggestIconNames(categoryName = "") {
//   const q = categoryName.trim().toLowerCase();
//   if (!q) return [];

//   const found = [];
//   for (const row of KEYWORDS) {
//     if (row.keys.some((k) => q.includes(k))) {
//       for (const ic of row.icons) found.push(ic);
//     }
//   }

//   // fallback: common set
//   const fallback = ["Tag", "Circle", "Wallet", "ShoppingCart", "Home", "Utensils", "Car", "Receipt"];
//   const combined = [...new Set([...found, ...fallback])];

//   return combined.slice(0, 12);
// }
