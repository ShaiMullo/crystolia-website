import { NextRequest, NextResponse } from "next/server";
import { i18n } from "./i18n/config";

const PUBLIC_FILE = /\.(.*)$/;
const COOKIE_NAME = "preferred-lang";

/**
 * Get locale from cookie
 */
function getLocaleFromCookie(request: NextRequest): string | null {
  const cookie = request.cookies.get(COOKIE_NAME);
  if (cookie && i18n.locales.includes(cookie.value as any)) {
    return cookie.value;
  }
  return null;
}

/**
 * Detect locale from browser Accept-Language header
 */
function detectBrowserLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    // Parse Accept-Language header
    const languages = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim().toLowerCase());
    
    // Check for Hebrew (he, he-IL)
    if (languages.some((lang) => lang.startsWith("he"))) {
      return "he";
    }
    
    // Check for Russian (ru, ru-RU)
    if (languages.some((lang) => lang.startsWith("ru"))) {
      return "ru";
    }
    
    // Check for English (en, en-US, etc.)
    if (languages.some((lang) => lang.startsWith("en"))) {
      return "en";
    }
  }

  // Default to configured default locale
  return i18n.defaultLocale;
}

/**
 * Get the best locale for the request
 * Priority: 1. Cookie, 2. Browser language, 3. Default
 */
function getLocale(request: NextRequest): string {
  // First, check cookie (user preference)
  const cookieLocale = getLocaleFromCookie(request);
  if (cookieLocale) {
    return cookieLocale;
  }

  // Then, detect from browser language
  return detectBrowserLocale(request);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore public files, API routes, and Next.js internals
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale
  const pathnameLocale = pathname.split("/")[1];
  const hasLocale = i18n.locales.includes(pathnameLocale as any);

  // CRITICAL: If user is already on a localized route (/en, /he, /ru), do NOT override
  // This allows language switching to work correctly
  if (hasLocale) {
    return NextResponse.next();
  }

  // Only redirect root path "/" to detected locale
  // This is the ONLY case where we redirect based on cookie/browser language
  if (pathname === "/") {
    const locale = getLocale(request);
    const redirectUrl = new URL(`/${locale}`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // If pathname doesn't have a valid locale, redirect to detected locale
  // This handles edge cases where someone might access a path without locale
  const locale = getLocale(request);
  const redirectUrl = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|crystolia-logo.png).*)",
  ],
};
