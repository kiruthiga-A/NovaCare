import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NavBar from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NOVA CARE INNOVATIONS",
  description: "Where checkup meets convenience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn("h-full font-sans relative antialiased", inter.className)}
      >
        <main className="flex flex-col relative min-h-screen">
          <NavBar />
          {children}
        </main>
      </body>
    </html>
  );
}
