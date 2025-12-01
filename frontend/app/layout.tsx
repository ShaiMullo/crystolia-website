import "./globals.css";
import type { Metadata } from "next";
import WhatsAppButton from "./components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Crystolia – Premium Sunflower Oil",
  description:
    "Import and distribution of premium quality sunflower oil. Quality without compromise.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/favicon-180x180.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}