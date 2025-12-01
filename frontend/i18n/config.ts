export type Locale = "he" | "en" | "ru";

export const locales: Locale[] = ["he", "en", "ru"];

export const defaultLocale: Locale = "en";

export const isValidLocale = (locale: string): locale is Locale => {
  return locales.includes(locale as Locale);
};

