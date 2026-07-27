import {
  PricingBottomCta,
  PricingCallout,
  PricingInfoGrid,
} from "@/components/sections/pricing/PricingSubpageBlocks";
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
      <section className="py-8 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
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
        </div>
      </section>
    </>
  );
}
