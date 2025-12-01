import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crystolia - Premium Sunflower Oil",
  description: "Import and distribution of premium quality sunflower oil. Quality without compromise.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
