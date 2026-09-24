import type { Dictionary, Translator } from "@/lib/i18n/types";

function getByPath(dict: Dictionary, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = dict;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Dictionary)[part];
  }
  return current;
}

function interpolate(
  template: string,
  params?: Record<string, string | number>,
): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    params[key] != null ? String(params[key]) : `{${key}}`,
  );
}

export function createTranslator(
  dictionary: Dictionary,
  locale: string,
): Translator {
  const t = ((
    key: string,
    params?: Record<string, string | number>,
  ): string => {
    const value = getByPath(dictionary, key);
    if (typeof value === "string") return interpolate(value, params);
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[i18n] Missing translation: ${key} (${locale})`);
    }
    return key;
  }) as Translator;

  t.raw = (key: string) => getByPath(dictionary, key);
  t.locale = locale;
  return t;
}
