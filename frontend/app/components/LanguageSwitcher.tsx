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
 * Improved: Uses both max-age and expires for better compatibility
 */
function setLanguageCookie(locale: Locale) {
  if (typeof document === "undefined") return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + COOKIE_MAX_AGE * 1000);
  
  // Set cookie with max-age and expires for maximum compatibility
  document.cookie = `${COOKIE_NAME}=${locale}; max-age=${COOKIE_MAX_AGE}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
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
      // Preserve path after locale - extract everything after the locale segment
      const pathSegments = pathname.split("/").filter(Boolean);
      const hasLocale = i18n.locales.includes(pathSegments[0] as Locale);
      
      let newPath: string;
      
      if (hasLocale) {
        // Replace locale but keep the rest of the path (works for nested routes)
        pathSegments[0] = newLocale;
        newPath = "/" + pathSegments.join("/");
      } else {
        // No locale in path, add new locale and preserve rest
        // Handle root path and paths without locale prefix
        if (pathname === "/") {
          newPath = `/${newLocale}`;
        } else {
          newPath = `/${newLocale}${pathname.startsWith("/") ? pathname : "/" + pathname}`;
        }
      }
      
      // Navigate to the new path - Next.js will automatically re-render with new params
      router.push(newPath);
    });
  };

  return (
    <div className="flex items-center gap-2">
      {languages.map((lang) => {
        const isActive = currentLocale === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => changeLocale(lang.code)}
            disabled={isPending}
            className={`
              relative px-3 py-1.5 rounded-full
              transition-all duration-300 ease-out
              group
              ${isActive 
                ? "bg-gradient-to-r from-[#F5C542]/20 to-[#F5C542]/10 backdrop-blur-sm ring-2 ring-[#F5C542]/30 scale-110" 
                : "hover:bg-white/10 hover:ring-2 hover:ring-white/20"
              }
              hover:scale-110 active:scale-95
              disabled:opacity-50 disabled:cursor-not-allowed
              disabled:hover:scale-100
            `}
            aria-label={`Switch to ${lang.label}`}
            aria-pressed={isActive}
          >
            {/* Active indicator ring */}
            {isActive && (
              <span className="absolute inset-0 rounded-full ring-2 ring-[#F5C542]/50 animate-pulse" />
            )}
            <span className="text-2xl leading-none relative z-10 transition-transform duration-300 group-hover:scale-110">
              {lang.flag}
            </span>
          </button>
        );
      })}
    </div>
  );
}
