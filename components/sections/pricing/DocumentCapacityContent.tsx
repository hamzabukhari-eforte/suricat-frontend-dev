"use client";

import {
  PricingBottomCta,
  PricingCallout,
  PricingInfoGrid,
} from "@/components/sections/pricing/PricingSubpageBlocks";
import { Container } from "@/components/ui/Container";
import { useTranslations } from "@/components/i18n/LocaleProvider";

export function DocumentCapacityContent() {
  const t = useTranslations("pricing.documentCapacity");

  return (
    <>
      <PricingInfoGrid
        eyebrow={t("includesEyebrow")}
        title={t("includesTitle")}
        cards={[
          {
            title: t("cards.complianceDocumentation.title"),
            body: t("cards.complianceDocumentation.body"),
          },
          {
            title: t("cards.productDocumentation.title"),
            body: t("cards.productDocumentation.body"),
          },
          {
            title: t("cards.regulatoryEvidence.title"),
            body: t("cards.regulatoryEvidence.body"),
          },
          {
            title: t("cards.capacityExpansion.title"),
            body: t("cards.capacityExpansion.body"),
          },
        ]}
      />
      <section className="py-8 bg-white">
        <Container>
          <PricingCallout
            eyebrow={t("calloutEyebrow")}
            body={t("calloutBody")}
            bullets={t.raw("calloutBullets") as string[]}
          />
          <PricingBottomCta
            href="/pricing"
            label={t("bottomCtaLabel")}
            note={t("bottomCtaNote")}
          />
        </Container>
      </section>
    </>
  );
}
