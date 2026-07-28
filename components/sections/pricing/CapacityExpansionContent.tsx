"use client";

import {
  PricingBottomCta,
  PricingCallout,
  PricingInfoGrid,
} from "@/components/sections/pricing/PricingSubpageBlocks";
import { useTranslations } from "@/components/i18n/LocaleProvider";

type ExpansionRow = { range: string; price: string };

export function CapacityExpansionContent() {
  const t = useTranslations("pricing.capacityExpansion");
  const rows = t.raw("rows") as ExpansionRow[];

  return (
    <>
      <section className="pt-8 px-4 sm:px-6 bg-surface-muted">
        <div className="max-w-5xl mx-auto">
          <span className="text-teal font-bold text-sm uppercase tracking-widest mb-4 block">
            {t("pricingEyebrow")}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[28px] leading-tight lg:leading-[36px] font-bold mb-4 text-navy max-w-3xl">
            {t("pricingTitle")}
          </h2>
          <p className="text-base sm:text-lg lg:text-[20px] leading-relaxed lg:leading-[28px] text-navy mb-8 max-w-4xl">
            {t("pricingDescription")}
          </p>
          <div className="overflow-x-auto rounded-[4px] border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-sm sm:text-base min-w-[320px]">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="px-4 sm:px-6 py-4 text-left font-bold uppercase tracking-wider text-xs sm:text-sm">
                    {t("additionalDocuments")}
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left font-bold uppercase tracking-wider text-xs sm:text-sm">
                    {t("price")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.range}
                    className={
                      i < rows.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    }
                  >
                    <td className="px-4 sm:px-6 py-4 text-navy font-semibold">
                      {row.range}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-navy">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <PricingInfoGrid
        muted={false}
        eyebrow={t("howItWorksEyebrow")}
        title={t("howItWorksTitle")}
        cards={[
          {
            title: t("cards.noTierChange.title"),
            body: t("cards.noTierChange.body"),
          },
          {
            title: t("cards.billedAnnually.title"),
            body: t("cards.billedAnnually.body"),
          },
          {
            title: t("cards.availableAnyTime.title"),
            body: t("cards.availableAnyTime.body"),
          },
          {
            title: t("cards.enterpriseRollover.title"),
            body: t("cards.enterpriseRollover.body"),
          },
        ]}
      />

      <section className="py-8 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <PricingCallout
            eyebrow={t("calloutEyebrow")}
            body={t("calloutBody")}
          />
          <PricingBottomCta
            href="/pricing#subscription-options"
            label={t("bottomCtaLabel")}
            note={t("bottomCtaNote")}
          />
        </div>
      </section>
    </>
  );
}
