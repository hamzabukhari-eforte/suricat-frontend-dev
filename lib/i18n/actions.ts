"use server";

import { cookies } from "next/headers";
import {
  isLocale,
  LOCALE_COOKIE,
  type Locale,
} from "@/lib/i18n/config";

/** Persist the selected locale in a cookie (1 year). */
export async function setLocaleAction(locale: string): Promise<Locale | null> {
  if (!isLocale(locale)) return null;

  const store = await cookies();
  store.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return locale;
}
