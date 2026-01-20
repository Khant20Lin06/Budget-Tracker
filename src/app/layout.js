
// // src/app/layout.js
import "./globals.css";
import { AuthProvider } from "@/lib/auth/auth-context";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

// import AuthBoot from "@/components/auth/auth-boot";

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <AuthBoot>{children}</AuthBoot>
//       </body>
//     </html>
//   );
// }