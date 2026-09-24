import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () =>
    import("@/messages/en.json").then((m) => m.default as unknown as Dictionary),
  de: () =>
    import("@/messages/de.json").then((m) => m.default as unknown as Dictionary),
  es: () =>
    import("@/messages/es.json").then((m) => m.default as unknown as Dictionary),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
