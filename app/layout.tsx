import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";

import Logo from "@/components/Logo";
import Navigation from "@/components/Navigation";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin-sans",
  display: "swap",
});


export const metadata: Metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
console.log(josefinSans);

  return (
    <html
      lang="en"
      className={`${josefinSans.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>{new Date().getFullYear()} Copyright by The Wild Oasis</footer>
      </body>
    </html>
  );
}
