"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useTransition,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { setLocaleAction } from "@/lib/i18n/actions";
import { createTranslator } from "@/lib/i18n/create-translator";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary, Translator } from "@/lib/i18n/types";

type LocaleContextValue = {
  locale: Locale;
  dictionary: Dictionary;
  t: Translator;
  setLocale: (locale: Locale) => void;
  isPending: boolean;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: ReactNode;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = useMemo(
    () => createTranslator(dictionary, locale),
    [dictionary, locale],
  );

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      document.documentElement.lang = next;
      startTransition(async () => {
        await setLocaleAction(next);
        router.refresh();
      });
    },
    [locale, router],
  );

  const value = useMemo(
    () => ({ locale, dictionary, t, setLocale, isPending }),
    [locale, dictionary, t, setLocale, isPending],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}

export function useTranslations(namespace?: string): Translator {
  const { t } = useLocale();
  if (!namespace) return t;

  const scoped = ((
    key: string,
    params?: Record<string, string | number>,
  ): string => t(`${namespace}.${key}`, params)) as Translator;

  scoped.raw = (key: string) => t.raw(`${namespace}.${key}`);
  scoped.locale = t.locale;
  return scoped;
}
