"use client";

import { FaTimes } from "@/components/ui/icons";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { useEffect, useState } from "react";

const STORAGE_KEY = "suricat-cookie-consent";

export function CookieBanner() {
  const t = useTranslations("cookie");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = (value: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      id="cookie-banner"
      className="cookie-banner fixed inset-x-0 bottom-0 z-[100] bg-white px-6 py-6 lg:py-4"
      role="dialog"
      aria-label={t("ariaLabel")}
    >
      <button
        type="button"
        onClick={() => dismiss("dismissed")}
        className="absolute right-4 top-4 cursor-pointer p-1 lg:right-6 lg:top-3"
        aria-label={t("close")}
      >
        <FaTimes className="text-gray-400" aria-hidden="true" />
      </button>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 pr-6 lg:flex-row lg:items-center lg:pr-8">
        <p className="w-full max-w-4xl text-[11px] leading-relaxed text-gray-600 lg:min-w-0 lg:flex-1">
          {t("body")}{" "}
          <a href="#" className="cursor-pointer text-navy underline">
            {t("privacyStatement")}
          </a>
        </p>
        <div className="flex w-full flex-col items-center gap-3 lg:w-auto lg:shrink-0 lg:items-end">
          <a
            href="#"
            className="cursor-pointer text-center text-[11px] font-bold text-navy underline lg:text-right lg:whitespace-nowrap"
          >
            {t("optOut")}
          </a>
          <div className="flex flex-wrap items-center justify-center gap-4 whitespace-nowrap lg:justify-end">
            <button
              type="button"
              onClick={() => dismiss("rejected")}
              className="cookie-cta-btn"
            >
              {t("rejectAll")}
            </button>
            <button
              type="button"
              onClick={() => dismiss("accepted")}
              className="cookie-cta-btn"
            >
              {t("acceptCookies")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
