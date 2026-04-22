import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import { ReservationProvider } from "@/components/ReservationContext";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
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

  return (
    <html lang="en">
      <body
        className={`${josefinSans.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1 px-8 py-12">
          <ReservationProvider>{children}</ReservationProvider>
        </main>
        <footer className="text-center py-4">{new Date().getFullYear()} Copyright by The Wild Oasis</footer>
      </body>
    </html>
  );
}
