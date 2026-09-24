"use client";

import { CtaBand } from "@/components/sections/CtaBand";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { getPricingFaqItems } from "@/lib/pricing/faq";
import { PricingFaq } from "@/components/sections/pricing/PricingFaq";
import { PricingHero } from "@/components/sections/pricing/PricingHero";

export function PricingFaqPageContent() {
  const t = useTranslations("pricing.faq");

  return (
    <>
      <PricingHero
        title={
          <>
            {t("heroTitleBefore")} <span className="text-teal">{t("heroTitleAccent")}</span>
          </>
        }
        subtitle={<p>{t("description")}</p>}
        cta={{ label: t("heroCta"), href: "/pricing" }}
      />
      <PricingFaq
        items={getPricingFaqItems(t, "full")}
        eyebrow={t("eyebrow")}
        title={t("pageTitle")}
        description={t("pageDescription")}
      />
      <CtaBand />
    </>
  );
}
