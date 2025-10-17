import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FavoritesProvider } from '@/context/FavoritesContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bookstore",
  description: "CRUD",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <FavoritesProvider>
          <main>{children}</main>
        </FavoritesProvider>
      </body>
    </html>
  );
}
