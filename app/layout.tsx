import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./_context/cart";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Food",
  description: "Order food online with FSW Food",
  authors: [{ name: "Artur Campos" }],
  keywords: ["food", "delivery", "restaurant"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
