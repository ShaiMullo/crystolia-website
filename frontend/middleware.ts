import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/; // ignore files like /favicon.ico

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Ignore public files and API routes
  if (
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname) ||
    pathname.includes("_next")
  ) {
    return NextResponse.next();
  }

  // If URL already includes a locale — do nothing
  const locales = ["en", "he", "ru"];
  const pathLocale = pathname.split("/")[1];

  if (locales.includes(pathLocale)) {
    return NextResponse.next();
  }

  // Detect user browser language
  const userLocale = req.headers
    .get("accept-language")
    ?.split(",")[0]
    ?.toLowerCase() || "en";

  let locale = "en";

  if (userLocale.startsWith("he")) locale = "he";
  else if (userLocale.startsWith("ru")) locale = "ru";

  // Redirect to /{locale}/...
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // apply to all pages except static files
};
