import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Redirects unprefixed URLs (e.g. the printed QR link) to a locale based on
// the visitor's Accept-Language header.
export default createMiddleware(routing);

export const config = {
  // Skip Next.js internals and files with an extension.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
