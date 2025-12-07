export const i18n = {
  defaultLocale: "he",
  locales: ["en", "he", "ru"] as const,
};

export type Locale = (typeof i18n.locales)[number];
