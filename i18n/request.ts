import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

type Messages = { [key: string]: Messages | string | string[] };

// Fills keys missing from the requested locale with the default locale's copy,
// so untranslated text shows in English instead of failing the page.
function withFallback(fallback: Messages, messages: Messages): Messages {
  const merged: Messages = { ...fallback };
  for (const [key, value] of Object.entries(messages)) {
    const base = merged[key];
    const bothObjects =
      typeof value === "object" &&
      !Array.isArray(value) &&
      typeof base === "object" &&
      !Array.isArray(base);
    merged[key] = bothObjects ? withFallback(base, value) : value;
  }
  return merged;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages: Messages = (await import(`../messages/${locale}.json`))
    .default;
  if (locale === routing.defaultLocale) return { locale, messages };

  const fallback: Messages = (
    await import(`../messages/${routing.defaultLocale}.json`)
  ).default;
  return { locale, messages: withFallback(fallback, messages) };
});
