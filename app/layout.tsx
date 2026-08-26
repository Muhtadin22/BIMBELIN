import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Bimbelin - Bimbel Terbaik untuk Kampus Impianmu",
  description: "Bimbingan belajar dengan tutor ahli dan modul terbaru.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Navbar />
        {/* pt-20 ditambahkan agar konten tidak tertutup Navbar yang fixed */}
        <main className="flex-grow pt-20"> 
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
} 