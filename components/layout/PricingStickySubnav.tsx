"use client";

import { StickySubnav } from "@/components/layout/StickySubnav";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { usePricingSubnavLinks } from "@/lib/i18n/use-nav-links";

export function PricingStickySubnav() {
  const t = useTranslations();
  const links = usePricingSubnavLinks();
  return (
    <StickySubnav
      links={links}
      category={t("nav.menus.pricing.label")}
      navLabel={t("nav.menus.pricing.label")}
    />
  );
}
