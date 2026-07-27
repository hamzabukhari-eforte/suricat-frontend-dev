import { createTranslator } from "@/lib/i18n/create-translator";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";

/** Server-side locale + translator for RSC / generateMetadata. */
export async function getTranslator() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const t = createTranslator(dictionary, locale);
  return { locale, dictionary, t };
}
