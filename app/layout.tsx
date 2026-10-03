import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Note Application",
  description: "A simple note application built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-orange-50/50 text-slate-800 antialiased">{children}</body>
    </html>
  );
}