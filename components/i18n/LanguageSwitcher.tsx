"use client";

import { locales, localeLabels, type Locale } from "@/lib/i18n/config";
import { useLocale } from "@/components/i18n/LocaleProvider";

type LanguageSwitcherProps = {
  variant: "nav-dropdown" | "nav-mobile" | "footer-select";
  onSelect?: () => void;
};

export function LanguageSwitcher({ variant, onSelect }: LanguageSwitcherProps) {
  const { locale, setLocale, t, isPending } = useLocale();

  const choose = (next: Locale) => {
    setLocale(next);
    onSelect?.();
  };

  if (variant === "footer-select") {
    return (
      <select
        className="w-full cursor-pointer appearance-none rounded-full border border-white/20 bg-navy px-6 py-2 text-sm focus:outline-none disabled:opacity-60"
        value={locale}
        aria-label={t("common.language")}
        disabled={isPending}
        onChange={(e) => choose(e.target.value as Locale)}
      >
        {locales.map((code) => (
          <option key={code} value={code}>
            {localeLabels[code]}
          </option>
        ))}
      </select>
    );
  }

  if (variant === "nav-mobile") {
    return (
      <>
        {locales.map((code) => (
          <button
            key={code}
            type="button"
            className={`block w-full px-4 py-2 text-left text-sm transition-colors ${
              code === locale
                ? "bg-gray-50 font-semibold text-navy"
                : "text-gray-700 hover:bg-gray-50 hover:text-[#413cc3]"
            }`}
            onClick={() => choose(code)}
            disabled={isPending}
          >
            {localeLabels[code]}
          </button>
        ))}
      </>
    );
  }

  return (
    <>
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          className={`nav-language-link w-full text-left${
            code === locale ? " is-active font-semibold" : ""
          }`}
          onClick={() => choose(code)}
          disabled={isPending}
        >
          {localeLabels[code]}
        </button>
      ))}
    </>
  );
}
