import {
  PricingBottomCta,
  PricingCallout,
  PricingInfoGrid,
} from "@/components/sections/pricing/PricingSubpageBlocks";
import { useTranslations } from "@/components/i18n/LocaleProvider";

export function StartWithEvaluateContent() {
  const t = useTranslations("pricing.startWithEvaluate");

  return (
    <>
      <PricingInfoGrid
        eyebrow={t("includesEyebrow")}
        title={t("includesTitle")}
        cards={[
          {
            title: t("cards.documentationEvaluation.title"),
            body: t("cards.documentationEvaluation.body"),
          },
          {
            title: t("cards.allSolutions.title"),
            body: t("cards.allSolutions.body"),
          },
          {
            title: t("cards.focusedScope.title"),
            body: t("cards.focusedScope.body"),
          },
          {
            title: t("cards.guidedOnboarding.title"),
            body: t("cards.guidedOnboarding.body"),
          },
        ]}
      />
      <section className="pt-8 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <PricingCallout
            eyebrow={t("calloutEyebrow")}
            body={t("calloutBody")}
            bullets={t.raw("calloutBullets") as string[]}
          />
        </div>
      </section>
      <section className="pb-8 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <PricingBottomCta
            href="/pricing/interactive-sandbox"
            label={t("bottomCtaLabel")}
            note={t("bottomCtaNote")}
            noteClassName="text-sm"
          />
        </div>
      </section>
    </>
  );
}
