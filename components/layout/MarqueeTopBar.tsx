"use client";

import { FaAngleDoubleRight } from "@/components/ui/icons";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import Link from "next/link";

export function MarqueeTopBar() {
  const t = useTranslations("marquee");

  const content = (
    <p className="font-semibold text-navy">
      {t("text")}
      <Link
        href="/readiness"
        className="font-extrabold underline ml-2 text-navy group"
      >
        {t("cta")}
        <FaAngleDoubleRight className="inline-block text-xs transition-transform duration-300 group-hover:translate-x-1 ml-1" aria-hidden="true" />
      </Link>
    </p>
  );

  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        <div className="marquee-content">{content}</div>
        <div className="marquee-content" aria-hidden="true">
          {content}
        </div>
      </div>
    </div>
  );
}
