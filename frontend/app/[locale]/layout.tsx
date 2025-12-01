import { redirect } from "next/navigation";
import Header from "../components/Header";
import { getDictionary } from "../../i18n/getDictionary";
import { isValidLocale } from "../../i18n/config";
import type { Locale } from "../../i18n/config";

export function generateStaticParams() {
  return [{ locale: "he" }, { locale: "en" }, { locale: "ru" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    redirect("/en");
  }

  const dict = await getDictionary(locale);
  const isRTL = locale === "he";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"}>
      <body className="bg-white min-h-screen antialiased">
        <Header locale={locale} dict={dict} />
        <main className="relative">{children}</main>
      </body>
    </html>
  );
}
