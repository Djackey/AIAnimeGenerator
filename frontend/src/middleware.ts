import createMiddleware from "next-intl/middleware";

import { localePrefix, locales } from "./navigation";

export default createMiddleware({
  locales: locales,
  defaultLocale: "en",
  localePrefix: localePrefix,
});

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(en|zh|ja|ko|tw|pt|es|de|fr|vi|ar|hu|nl|pl)/:path*",

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
