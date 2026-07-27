import {
  PricingBottomCta,
  PricingCallout,
  PricingInfoGrid,
} from "@/components/sections/pricing/PricingSubpageBlocks";
import { useTranslations } from "@/components/i18n/LocaleProvider";

export function LicenseContent() {
  const t = useTranslations("pricing.license");

  return (
    <>
      <PricingInfoGrid
        muted={false}
        eyebrow={t("includesEyebrow")}
        title={t("includesTitle")}
        cards={[
          {
            title: t("cards.intelligenceLayer.title"),
            body: t("cards.intelligenceLayer.body"),
          },
          {
            title: t("cards.monitoring.title"),
            body: t("cards.monitoring.body"),
          },
          {
            title: t("cards.secureEnvironment.title"),
            body: t("cards.secureEnvironment.body"),
          },
          {
            title: t("cards.operationsSupport.title"),
            body: t("cards.operationsSupport.body"),
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
            noteClassName="text-sm"
          />
        </div>
      </section>
    </>
  );
}
