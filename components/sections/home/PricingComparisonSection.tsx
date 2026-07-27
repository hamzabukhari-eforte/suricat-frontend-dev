"use client";

import { FaBolt, FaBuilding, FaCheck, FaEye, FaLayerGroup, FaPaperPlane, FaPuzzlePiece, FaShieldHalved, FaUsers } from "@/components/ui/icons";
import { PricingStaggerReveal } from "@/components/sections/pricing/PricingStaggerReveal";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import type { IconType } from "react-icons";

type Cell = "check" | "dash" | "limited" | "optional";

type CompareRow = {
  key: string;
  cells: [Cell, Cell, Cell, Cell];
  lastInCategory?: boolean;
};

const CORE_ROWS: CompareRow[] = [
  { key: "allSix", cells: ["check", "check", "check", "check"] },
  { key: "customerDocumentation", cells: ["check", "check", "check", "check"] },
  { key: "analysisHistory", cells: ["limited", "check", "check", "check"] },
  { key: "emailSupport", cells: ["dash", "check", "check", "check"] },
  { key: "continuousMonitoring", cells: ["dash", "check", "check", "check"] },
  { key: "exportFindings", cells: ["dash", "check", "check", "check"] },
  { key: "sharedSaas", cells: ["check", "check", "check", "dash"] },
  { key: "guidedSaas", cells: ["check", "check", "check", "dash"], lastInCategory: true },
];

const COLLAB_ROWS: CompareRow[] = [
  { key: "teamCollaboration", cells: ["dash", "dash", "check", "check"] },
  { key: "sharedWorkspaces", cells: ["dash", "dash", "check", "check"] },
  { key: "priorityEmail", cells: ["dash", "dash", "check", "check"] },
  { key: "extendedRetention", cells: ["dash", "optional", "optional", "check"], lastInCategory: true },
];

const GOV_ROWS: CompareRow[] = [
  { key: "dedicatedCloud", cells: ["dash", "dash", "dash", "check"] },
  { key: "sso", cells: ["dash", "dash", "dash", "check"] },
  { key: "advancedGovernance", cells: ["dash", "dash", "dash", "check"] },
  { key: "sla", cells: ["dash", "dash", "dash", "check"] },
  { key: "capacityRollover", cells: ["dash", "dash", "dash", "check"], lastInCategory: true },
];

const EXT_ROWS: CompareRow[] = [
  { key: "apiAccess", cells: ["dash", "dash", "dash", "optional"] },
  { key: "customIntegrations", cells: ["dash", "dash", "dash", "optional"] },
  { key: "customerSuccess", cells: ["dash", "dash", "dash", "optional"] },
  { key: "technicalAccount", cells: ["dash", "dash", "dash", "optional"] },
];

function CellValue({
  type,
  limitedLabel,
  optionalLabel,
}: {
  type: Cell;
  limitedLabel: string;
  optionalLabel: string;
}) {
  if (type === "check") {
    return (
      <span className="pricing-check">
        <FaCheck aria-hidden="true" />
      </span>
    );
  }
  if (type === "dash") {
    return <span className="pricing-dash">—</span>;
  }
  if (type === "limited") {
    return <span className="pricing-badge-limited">{limitedLabel}</span>;
  }
  return <span className="pricing-badge-optional">{optionalLabel}</span>;
}

function CategoryRow({ icon: Icon, label }: { icon: IconType; label: string }) {
  return (
    <tr className="pricing-compare-row pricing-compare-category">
      <td
        colSpan={5}
        className="px-4 sm:px-5 py-3 bg-gray-50 border-b border-gray-100"
      >
        <span
          className="inline-flex items-center gap-2 text-teal text-[14px] font-bold uppercase tracking-[0.12em]"
        >
          <Icon aria-hidden="true" /> {label}
        </span>
      </td>
    </tr>
  );
}

function FeatureRows({
  rows,
  t,
}: {
  rows: CompareRow[];
  t: (key: string) => string;
}) {
  return (
    <>
      {rows.map((row) => (
        <tr
          key={row.key}
          className={`pricing-compare-row border-b ${row.lastInCategory ? "border-gray-200" : "border-gray-100"} font-semibold`}
        >
          <td className="px-4 sm:px-5 py-3 text-navy">
            {t(`rows.${row.key}`)}
          </td>
          {row.cells.map((cell, i) => (
            <td
              key={i}
              className={`text-center py-3${i === 2 ? " bg-navy/[0.02]" : ""}`}
            >
              <CellValue
                type={cell}
                limitedLabel={t("badges.limited")}
                optionalLabel={t("badges.optional")}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export function PricingComparisonSection() {
  const t = useTranslations("home.pricingComparison");

  return (
    <>
      <section id="pricing-comparison-section" className="pricing-plans-scope pt-8 pb-3 px-4 sm:px-6 bg-white">
            <PricingStaggerReveal />
            <div className="max-w-7xl mx-auto">
              <div
                id="pricing-compare-sticky-bar"
                className="pricing-compare-sticky-bar"
                hidden
                aria-hidden="true"
              >
                <div
                  id="pricing-compare-sticky-scroll"
                  className="pricing-compare-sticky-scroll"
                ></div>
              </div>

              <div id="pricing-comparison">
                <div id="capability-comparison" className="pricing-compare-header mb-8 sm:mb-10">
                  <span
                    className="text-teal font-bold text-sm uppercase tracking-widest mb-4 block"
                    >{t("eyebrow")}</span
                  >
                  <h2
                    className="text-2xl sm:text-3xl lg:text-[28px] leading-tight lg:leading-[36px] font-bold mb-4 text-navy max-w-3xl"
                  >
                    {t("titleLine1")} {t("titleLine2")}
                  </h2>
                  <p
                    className="text-base sm:text-lg lg:text-[20px] leading-relaxed lg:leading-[28px] text-navy max-w-4xl"
                  >
                    {t("body")}
                  </p>
                </div>

                <div id="pricing-compare-sticky-root">
                  <div
                    className="pricing-compare-table-wrap overflow-x-auto rounded-[4px] border border-gray-200 bg-white shadow-sm"
                  >
                    <table className="pricing-compare-table w-full min-w-[880px] text-sm">
                      <thead id="pricing-compare-thead">
                        <tr
                          className="pricing-compare-thead-row border-b border-gray-200 font-semibold"
                        >
                          <th
                            className="text-left px-4 sm:px-5 py-3 font-bold text-navy uppercase tracking-wide text-sm w-[28%]"
                          >
                            {t("capability")}
                          </th>
                          <th className="px-4 sm:px-5 py-3 text-center w-[18%]">
                            <div className="flex flex-col items-center gap-1">
                              <span
                                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-teal"
                                ><FaEye className="text-sm" aria-hidden="true" /></span>
                              <span
                                className="font-bold text-navy text-sm uppercase tracking-wide"
                                >{t("tiers.evaluate.name")}</span
                              >
                              <span className="text-navy text-sm">{t("tiers.evaluate.tagline")}</span>
                            </div>
                          </th>
                          <th className="px-4 sm:px-5 py-3 text-center w-[18%]">
                            <div className="flex flex-col items-center gap-1">
                              <span
                                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-teal"
                                ><FaPaperPlane className="text-sm" aria-hidden="true" /></span>
                              <span
                                className="font-bold text-navy text-sm uppercase tracking-wide"
                                >{t("tiers.pilot.name")}</span
                              >
                              <span className="text-navy text-sm">{t("tiers.pilot.tagline")}</span>
                            </div>
                          </th>
                          <th className="px-4 sm:px-5 py-3 text-center w-[18%] bg-navy/5">
                            <div className="flex flex-col items-center gap-1">
                              <span
                                className="inline-block bg-teal text-navy text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full mb-1"
                                >{t("mostPopular")}</span
                              >
                              <span
                                className="w-9 h-9 rounded-full border border-teal/40 bg-teal/10 flex items-center justify-center"
                                ><FaBolt className="text-sm" aria-hidden="true" /></span>
                              <span
                                className="font-bold text-navy text-sm uppercase tracking-wide"
                                >{t("tiers.foundation.name")}</span
                              >
                              <span className="text-navy text-sm">{t("tiers.foundation.tagline")}</span>
                            </div>
                          </th>
                          <th className="px-4 sm:px-5 py-3 text-center w-[18%]">
                            <div className="flex flex-col items-center gap-1">
                              <span
                                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-teal"
                                ><FaBuilding className="text-sm" aria-hidden="true" /></span>
                              <span
                                className="font-bold text-navy text-sm uppercase tracking-wide"
                                >{t("tiers.enterprise.name")}</span
                              >
                              <span className="text-navy text-sm"
                                >{t("tiers.enterprise.tagline")}</span
                              >
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <CategoryRow icon={FaLayerGroup} label={t("categories.corePlatform")} />
                        <FeatureRows rows={CORE_ROWS} t={t} />

                        <CategoryRow icon={FaUsers} label={t("categories.collaboration")} />
                        <FeatureRows rows={COLLAB_ROWS} t={t} />

                        <CategoryRow icon={FaShieldHalved} label={t("categories.governance")} />
                        <FeatureRows rows={GOV_ROWS} t={t} />

                        <CategoryRow icon={FaPuzzlePiece} label={t("categories.extensions")} />
                        <FeatureRows rows={EXT_ROWS} t={t} />
                      </tbody>
                    </table>
                  </div>
                </div>

                <div
                  className="pricing-compare-legend flex flex-wrap justify-center gap-x-5 gap-y-3 mt-8 text-xs sm:text-sm text-navy"
                >
                  <span className="inline-flex items-center gap-2"
                    ><span className="pricing-check pricing-check-legend"
                      ><FaCheck aria-hidden="true" /></span
                    >{t("legend.included")}</span
                  >
                  <span className="inline-flex items-center gap-2"
                    ><span className="pricing-dash">—</span>{t("legend.notIncluded")}</span
                  >
                  <span className="inline-flex items-center gap-2"
                    ><span className="pricing-badge-limited">{t("badges.limited")}</span>{t("legend.limitedAccess")}</span
                  >
                  <span className="inline-flex items-center gap-2"
                    ><span className="pricing-badge-optional">{t("badges.optional")}</span>{t("legend.availableAsAddOn")}</span
                  >
                </div>
              </div>
            </div>
          </section>
    </>
  );
}
