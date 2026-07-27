export const locales = ["en", "de", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Cookie name for the active UI locale (cookie-based i18n; URLs stay unprefixed). */
export const LOCALE_COOKIE = "suricat-locale";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  de: "German",
  es: "Spanish",
};

export function isLocale(value: string | undefined | null): value is Locale {
  return locales.includes(value as Locale);
}
