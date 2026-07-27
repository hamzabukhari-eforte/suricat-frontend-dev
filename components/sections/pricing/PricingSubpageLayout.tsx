"use client";

import type { ReactNode } from "react";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { PricingHero } from "@/components/sections/pricing/PricingHero";

type PricingSubpageLayoutProps = {
  page: "license" | "documentCapacity" | "capacityExpansion" | "interactiveSandbox" | "startWithEvaluate";
  children: ReactNode;
};

export function PricingSubpageLayout({ page, children }: PricingSubpageLayoutProps) {
  const t = useTranslations(`pricing.${page}`);
  const tp = useTranslations("pricing.common");

  return (
    <>
      <PricingHero
        title={
          <>
            {t("heroTitleBefore")} <span className="text-teal">{t("heroTitleAccent")}</span>
          </>
        }
        subtitle={<p>{t("heroSubtitle")}</p>}
        cta={{ label: tp("viewPricingStartEvaluation"), href: "/pricing" }}
      />
      {children}
    </>
  );
}
