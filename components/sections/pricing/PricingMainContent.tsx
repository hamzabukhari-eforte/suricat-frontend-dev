"use client";

import { CtaBand } from "@/components/sections/CtaBand";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { getPricingFaqItems } from "@/lib/pricing/faq";
import { PricingComparison } from "@/components/sections/pricing/PricingComparison";
import { PricingFaq } from "@/components/sections/pricing/PricingFaq";
import { PricingHero } from "@/components/sections/pricing/PricingHero";
import { PricingTiers } from "@/components/sections/pricing/PricingTiers";

export function PricingMainContent() {
  const t = useTranslations("pricing.main");
  const tf = useTranslations("pricing.faq");
  const badges = t.raw("badges") as string[];

  return (
    <>
      <PricingHero
        title={
          <>
            <span>{t("heroTitleBefore")}</span>
            <br className="hidden sm:block" />
            <span className="text-teal">{t("heroTitleAccent")}</span>
          </>
        }
        subtitle={
          <>
            <p>{t("heroSubtitle1")}</p>
            <p className="lg:text-[20px]">{t("heroSubtitle2")}</p>
          </>
        }
        cta={{ label: t("heroCta"), href: "/get-started" }}
        subtitleColorClass="text-white/80"
      >
        <p className="text-white/80 text-base sm:text-lg lg:text-[14px] font-normal !leading-[32px] max-w-5xl mx-auto animate-fade-up-3 mb-3">
          {t("notReady")}
        </p>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 animate-fade-up-3">
          {badges.map((label) => (
            <span key={label} className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs sm:text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
              {label}
            </span>
          ))}
        </div>
      </PricingHero>
      <PricingTiers />
      <PricingComparison />
      <PricingFaq items={getPricingFaqItems(tf, "teaser")} viewAllHref="/pricing/faq" viewAllLabel={tf("viewAll")} />
      <CtaBand />
    </>
  );
}
