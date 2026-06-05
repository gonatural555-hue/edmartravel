import "./globals.css";
import { headers } from "next/headers";
import { CartProvider } from "@/context/CartContext";
import { UserProvider } from "@/context/UserContext";
import { AuthProvider } from "@/context/AuthContext";
import { defaultLocale } from "@/lib/i18n/config";
import { headerNav, theater } from "@/lib/fonts";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-locale") || defaultLocale;

  return (
    <html lang={locale} className={`${theater.variable} ${headerNav.variable}`}>
      <body>
        <UserProvider>
          <AuthProvider>
            <CartProvider>{children}</CartProvider>
          </AuthProvider>
        </UserProvider>
      </body>
    </html>
  );
}
