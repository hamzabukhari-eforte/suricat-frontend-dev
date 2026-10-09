"use client";

import { useTranslations } from "@/components/i18n/LocaleProvider";
import Link from "next/link";

export function MarqueeTopBar() {
  const t = useTranslations("marquee");

  const content = (
    <p className="marquee-banner">
      <span className="marquee-banner-text">{t("text")}</span>{" "}
      <Link href="/get-started" className="marquee-banner-cta">
        {t("cta")}
        <span className="marquee-banner-chevron" aria-hidden="true">
          »
        </span>
      </Link>
    </p>
  );

  return (
    <div className="marquee-wrapper" role="region" aria-label={t("text")}>
      <div className="marquee-track">
        <div className="marquee-content">{content}</div>
        <div className="marquee-content" aria-hidden="true">
          {content}
        </div>
      </div>
    </div>
  );
}
