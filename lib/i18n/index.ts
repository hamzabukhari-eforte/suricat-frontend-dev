export {
  defaultLocale,
  isLocale,
  LOCALE_COOKIE,
  localeLabels,
  locales,
  type Locale,
} from "@/lib/i18n/config";
export { createTranslator } from "@/lib/i18n/create-translator";
export { getDictionary } from "@/lib/i18n/get-dictionary";
export { getLocale } from "@/lib/i18n/get-locale";
export { getTranslator } from "@/lib/i18n/server";
export type { Dictionary, Translator } from "@/lib/i18n/types";
