"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import type { Locale } from "../../i18n/config";
import { i18n } from "../../i18n/config";

const languages: { code: Locale; flag: string; label: string }[] = [
  { code: "he", flag: "🇮🇱", label: "עברית" },
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "ru", flag: "🇷🇺", label: "Русский" },
];

const COOKIE_NAME = "preferred-lang";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

/**
 * Set a cookie with the preferred language
 */
function setLanguageCookie(locale: Locale) {
  if (typeof document === "undefined") return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + COOKIE_MAX_AGE * 1000);
  
  document.cookie = `${COOKIE_NAME}=${locale}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Extract current locale from pathname
  const pathSegments = pathname.split("/").filter(Boolean);
  const pathLocale = pathSegments[0];
  const currentLocale: Locale = i18n.locales.includes(pathLocale as Locale)
    ? (pathLocale as Locale)
    : (i18n.defaultLocale as Locale);

  const changeLocale = (newLocale: Locale) => {
    // Don't do anything if clicking the current locale
    if (newLocale === currentLocale) {
      return;
    }

    // Set cookie immediately before navigation
    setLanguageCookie(newLocale);

    startTransition(() => {
      // Always navigate to the root of the new locale
      // This ensures clean navigation and proper locale switching
      const newPath = `/${newLocale}`;
      
      // Navigate to the new path - Next.js will automatically re-render with new params
      router.push(newPath);
    });
  };

  return (
    <div className="flex items-center gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLocale(lang.code)}
          disabled={isPending}
          className={`
            relative px-3 py-1.5 rounded-full
            transition-all duration-300 ease-out
            hover:scale-110 active:scale-95
            ${
              currentLocale === lang.code
                ? "bg-gradient-to-r from-[#F5C542]/20 to-[#F5C542]/10 backdrop-blur-sm"
                : "hover:bg-white/10"
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          aria-label={`Switch to ${lang.label}`}
        >
          <span className="text-2xl leading-none">{lang.flag}</span>
        </button>
      ))}
    </div>
  );
}
