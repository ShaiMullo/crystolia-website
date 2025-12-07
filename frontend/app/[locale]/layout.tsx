import { getDictionary } from "@/i18n/getDictionary";
import { Locale, i18n } from "@/i18n/config";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }> | { locale: string };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps) {
  // Handle params - can be Promise in Next.js 15+ or object in Next.js 14/16
  const resolvedParams = await Promise.resolve(params);
  const rawLocale = resolvedParams.locale;
  
  // Validate locale - CRITICAL: only use default if truly invalid
  // This ensures the route parameter is respected
  let locale: Locale;
  if (rawLocale && typeof rawLocale === "string" && i18n.locales.includes(rawLocale as Locale)) {
    locale = rawLocale as Locale;
  } else {
    // Only fallback if locale is completely invalid
    console.warn(`[i18n] Invalid locale "${rawLocale}", falling back to default "${i18n.defaultLocale}"`);
    locale = i18n.defaultLocale as Locale;
  }

  // Get dictionary - this will never return undefined due to fallback in getDictionary
  const dict = await getDictionary(locale);

  // Ensure dict is not undefined (double safety check)
  if (!dict) {
    console.error(`[i18n] Dictionary not found for locale: ${locale}`);
    throw new Error(`Dictionary not found for locale: ${locale}`);
  }

  // Validation: Log if dictionary structure is missing expected keys
  if (!dict.hero || !dict.nav || !dict.features) {
    console.warn(`[i18n] Dictionary for "${locale}" may be missing expected keys`);
  }

  const isRTL = locale === "he";

  return (
    <div className={isRTL ? "rtl" : "ltr"}>
      <Header locale={locale} dict={dict} />
      {children}
      <Footer locale={locale} dict={dict} />
    </div>
  );
}

