import { getDictionary } from "@/i18n/getDictionary";
import { defaultLocale, isValidLocale, type Locale } from "@/i18n/config";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Products from "../components/Products";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

type PageProps = {
  params: {
    locale: string;
  };
};

export default async function Page({ params }: PageProps) {
  const locale: Locale = isValidLocale(params.locale)
    ? params.locale
    : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict.nav} />
      <main>
        <Hero locale={locale} dict={dict.hero} />
        <Features locale={locale} dict={dict.features} />
        <Products locale={locale} dict={dict.products} />
        <About locale={locale} dict={dict.about} />
        <Contact locale={locale} dict={dict.contact} />
      </main>
      <Footer locale={locale} dict={dict.footer} />
    </>
  );
}
