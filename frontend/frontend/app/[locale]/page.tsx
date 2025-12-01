import Hero from "../components/Hero";
import Products from "../components/Products";
import Features from "../components/Features";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { getDictionary } from "../../i18n/getDictionary";
import { isValidLocale } from "../../i18n/config";
import { redirect } from "next/navigation";
import type { Locale } from "../../i18n/config";

export function generateStaticParams() {
  return [{ locale: "he" }, { locale: "en" }, { locale: "ru" }];
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    redirect("/en");
  }

  const dict = await getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <Products locale={locale} dict={dict} />
      <Features locale={locale} dict={dict} />
      <About locale={locale} dict={dict} />
      <Contact locale={locale} dict={dict} />
      <Footer locale={locale} dict={dict} />
    </>
  );
}
