"use client";

import { FaCheck, FaFileLines } from "@/components/ui/icons";
import { PricingStaggerReveal } from "@/components/sections/pricing/PricingStaggerReveal";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import Link from "next/link";

type PricingPlansSectionProps = {
  showIntro?: boolean;
  sectionClassName?: string;
};

export function PricingPlansSection({
  showIntro = true,
  sectionClassName = "pricing-plans-scope pt-8 px-4 sm:px-6 bg-surface-muted",
}: PricingPlansSectionProps) {
  const t = useTranslations("home.pricingPlans");

  return (
    <>
      <section
            id="pricing-plans"
            className={sectionClassName}
          >
            <PricingStaggerReveal />
            <div className="max-w-7xl mx-auto">
              {showIntro ? <div className="mb-8 sm:mb-10">
                <span
                  className="text-teal font-bold text-sm uppercase tracking-widest mb-4 block"
                  >{t("eyebrow")}</span
                >
                <h2
                  className="text-2xl sm:text-3xl lg:text-[28px] leading-tight lg:leading-[36px] font-bold mb-4 text-navy max-w-3xl"
                >
                  {t("titleLine1")} <br /> {t("titleLine2")}
                </h2>
                <p
                  className="text-base sm:text-lg lg:text-[20px] leading-relaxed lg:leading-[28px] text-navy max-w-4xl mb-4"
                >
                  {t("body")}
                </p>
                <p
                  className="text-base sm:text-lg lg:text-[20px] font-semibold leading-relaxed lg:leading-[28px] text-navy max-w-4xl"
                >
                  {t("bodyEmphasis")}
                </p>
              </div> : null}
              <div id="pricing-cards">
                <div
                  id="subscription-options"
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6 items-stretch"
                >
                  {/* Evaluate */}
                  <article
                    id="start-with-evaluate"
                    className="pricing-stagger-item pricing-card bg-white rounded-[4px] border border-gray-200 shadow-sm flex flex-col overflow-hidden"
                  >
                    <div className="p-6 flex flex-col flex-1">
                      <p
                        className="text-navy text-[12px] font-bold uppercase tracking-[0.12em] mb-3"
                      >
                        {t("evaluate.badge")}
                      </p>
                      <h3 className="text-[28px] font-bold text-navy leading-tight mb-1">
                        {t("evaluate.name")}
                      </h3>
                      <p className="text-teal font-semibold text-base mb-2">
                        {t("evaluate.tagline")}
                      </p>
                      <p className="text-navy text-sm mb-5">
                        {t("evaluate.question")}
                      </p>
                      <div className="mb-5">
                        <p className="text-[32px] font-bold text-navy leading-none">{t("evaluate.price")}</p>
                        <p className="text-navy text-sm mt-1">{t("evaluate.term")}</p>
                      </div>
                      <div
                        className="pricing-doc-capacity rounded-[4px] bg-teal/10 border border-teal/20 p-4 mb-5"
                      >
                        <FaFileLines className="text-teal text-lg" aria-hidden="true" />
                        <p className="text-teal font-bold text-sm tracking-wide mt-1">
                          {t("evaluate.docsCount")}
                        </p>
                        <p className="text-navy font-bold text-sm mt-1">
                          {t("evaluate.docsLabel")}
                        </p>
                        <p className="text-navy text-xs mt-0.5">{t("labels.activeDocuments")}</p>
                      </div>
                      <ul className="space-y-2 text-sm text-navy mb-5">
                        <li className="flex items-start gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 shrink-0"
                          ></span
                          >{t("evaluate.limits.org")}
                        </li>
                        <li className="flex items-start gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 shrink-0"
                          ></span
                          >{t("evaluate.limits.users")}
                        </li>
                        <li className="flex items-start gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 shrink-0"
                          ></span
                          >{t("evaluate.limits.productFamily")}
                        </li>
                        <li className="flex items-start gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 shrink-0"
                          ></span
                          >{t("evaluate.limits.term")}
                        </li>
                      </ul>
                      <p
                        className="text-teal text-[14px] font-bold uppercase tracking-[0.12em] mb-3"
                      >
                        {t("labels.corePlatform")}
                      </p>
                      <ul className="space-y-2 text-sm text-navy mb-5">
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-teal shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >{t("evaluate.features.allSix")}
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-teal shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >{t("evaluate.features.workspace")}
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-teal shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >{t("evaluate.features.evidence")}
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-teal shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >{t("evaluate.features.onboarding")}
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-teal shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >{t("evaluate.features.knowledgeBase")}
                        </li>
                      </ul>
                      <p
                        className="text-teal text-[14px] font-bold uppercase tracking-[0.12em] mb-2"
                      >
                        {t("labels.support")}
                      </p>
                      <p className="text-sm text-navy font-semibold mb-6 flex-1">
                        <span className="block">{t("evaluate.supportLine1")}</span>
                        <span className="block mt-1.5">{t("evaluate.supportLine2")}</span>
                      </p>
                      <Link
                        href="/get-started"
                        className="suricat-teal-btn pricing-card-btn w-full inline-flex items-center justify-center font-bold px-6 py-3 rounded-full text-sm transition-all"
                      >
                        {t("evaluate.cta")}
                      </Link>
                    </div>
                  </article>

                  {/* Pilot */}
                  <article
                    className="pricing-stagger-item pricing-card bg-white rounded-[4px] border border-gray-200 shadow-sm flex flex-col overflow-hidden"
                  >
                    <div className="p-6 flex flex-col flex-1">
                      <p
                        className="text-navy text-[12px] font-bold uppercase tracking-[0.12em] mb-3"
                      >
                        {t("pilot.badge")}
                      </p>
                      <h3 className="text-[28px] font-bold text-navy leading-tight mb-1">
                        {t("pilot.name")}
                      </h3>
                      <p className="text-teal font-semibold text-base mb-2">
                        {t("pilot.tagline")}
                      </p>
                      <p className="text-navy text-sm mb-5">
                        {t("pilot.question")}
                      </p>
                      <div className="mb-5">
                        <p className="text-[32px] font-bold text-navy leading-none">
                          {t("pilot.price")}
                        </p>
                        <p className="text-navy text-sm mt-1">{t("labels.perYear")}</p>
                      </div>
                      <div
                        className="pricing-doc-capacity rounded-[4px] bg-teal/10 border border-teal/20 p-4 mb-5"
                      >
                        <FaFileLines className="text-teal text-lg" aria-hidden="true" />
                        <p className="text-teal font-bold text-sm tracking-wide mt-1">
                          {t("pilot.docsCount")}
                        </p>
                        <p className="text-navy font-bold text-sm mt-1">
                          {t("pilot.docsLabel")}
                        </p>
                        <p className="text-navy text-xs mt-0.5">{t("labels.activeDocuments")}</p>
                      </div>
                      <ul className="space-y-2 text-sm text-navy mb-5">
                        <li className="flex items-start gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 shrink-0"
                          ></span
                          >{t("pilot.limits.org")}
                        </li>
                        <li className="flex items-start gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 shrink-0"
                          ></span
                          >{t("pilot.limits.users")}
                        </li>
                        <li className="flex items-start gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 shrink-0"
                          ></span
                          >{t("pilot.limits.productFamily")}
                        </li>
                        <li className="flex items-start gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 shrink-0"
                          ></span
                          >{t("pilot.limits.framework")}
                        </li>
                        <li className="flex items-start gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 shrink-0"
                          ></span
                          >{t("pilot.limits.term")}
                        </li>
                      </ul>
                      <p
                        className="text-teal text-[14px] font-bold uppercase tracking-[0.12em] mb-3"
                      >
                        {t("labels.corePlatform")}
                      </p>
                      <ul className="space-y-2 text-sm text-navy mb-5">
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-teal shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >{t("pilot.features.allSix")}
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-teal shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >{t("pilot.features.workspace")}
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-teal shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >{t("pilot.features.monitoring")}
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-teal shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >{t("pilot.features.export")}
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-teal shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >{t("pilot.features.history")}
                        </li>
                      </ul>
                      <p
                        className="text-teal text-[14px] font-bold uppercase tracking-[0.12em] mb-2"
                      >
                        {t("labels.support")}
                      </p>
                      <p className="text-sm text-navy font-semibold mb-6 flex-1">
                        {t("pilot.support")}
                      </p>
                      <Link
                        href="/get-started"
                        className="suricat-teal-btn pricing-card-btn w-full inline-flex items-center justify-center font-bold px-6 py-3 rounded-full text-sm transition-all"
                      >
                        {t("pilot.cta")}
                      </Link>
                    </div>
                  </article>

                  {/* Foundation */}
                  <article
                    id="document-capacity"
                    className="pricing-stagger-item pricing-card pricing-card-featured pricing-card-foundation relative rounded-[4px] border shadow-lg flex flex-col"
                  >
                    <span className="pricing-most-popular">{t("labels.mostPopular")}</span>
                    <div className="p-6 flex flex-col flex-1">
                      <p
                        className="text-[12px] font-bold uppercase tracking-[0.12em] mb-3"
                      >
                        {t("foundation.badge")}
                      </p>
                      <h3 className="text-[28px] font-bold leading-tight mb-1">
                        {t("foundation.name")}
                      </h3>
                      <p className="font-semibold text-base mb-2">
                        {t("foundation.tagline")}
                      </p>
                      <p className="text-sm mb-5">
                        {t("foundation.question")}
                      </p>
                      <div className="mb-5">
                        <p className="text-[32px] font-bold leading-none">{t("foundation.price")}</p>
                        <p className="pricing-price-muted text-sm mt-1">{t("labels.perYear")}</p>
                      </div>
                      <div
                        className="pricing-doc-capacity pricing-doc-box rounded-[4px] border p-4 mb-5"
                      >
                        <FaFileLines className="text-lg" aria-hidden="true" />
                        <p className="font-bold text-sm tracking-wide mt-1">
                          {t("foundation.docsCount")}
                        </p>
                        <p className="font-bold text-sm mt-1">
                          {t("foundation.docsLabel")}
                        </p>
                        <p className="pricing-doc-muted text-xs mt-0.5">{t("labels.activeDocuments")}</p>
                      </div>
                      <ul className="space-y-2 text-sm mb-5">
                        <li className="flex items-start gap-2">
                          <span
                            className="pricing-bullet w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          ></span
                          >{t("foundation.limits.org")}
                        </li>
                        <li className="flex items-start gap-2">
                          <span
                            className="pricing-bullet w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          ></span
                          >{t("foundation.limits.users")}
                        </li>
                        <li className="flex items-start gap-2">
                          <span
                            className="pricing-bullet w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          ></span
                          >{t("foundation.limits.productFamilies")}
                        </li>
                        <li className="flex items-start gap-2">
                          <span
                            className="pricing-bullet w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          ></span
                          >{t("foundation.limits.frameworks")}
                        </li>
                        <li className="flex items-start gap-2">
                          <span
                            className="pricing-bullet w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          ></span
                          >{t("foundation.limits.term")}
                        </li>
                      </ul>
                      <p
                        className="text-[14px] font-bold uppercase tracking-[0.12em] mb-3"
                      >
                        {t("labels.corePlatform")}
                      </p>
                      <ul className="space-y-2 text-sm mb-5">
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-teal shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >{t("foundation.features.everythingInPilot")}
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-teal shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >{t("foundation.features.collaboration")}
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-teal shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >{t("foundation.features.workspaces")}
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-teal shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >{t("foundation.features.reporting")}
                        </li>
                      </ul>
                      <p
                        className="text-[14px] font-bold uppercase tracking-[0.12em] mb-2"
                      >
                        {t("labels.support")}
                      </p>
                      <p className="text-sm font-semibold mb-6 flex-1">
                        <span className="block">{t("foundation.supportLine1")}</span>
                        <span className="block mt-1.5">{t("foundation.supportLine2")}</span>
                      </p>
                      <Link
                        href="/get-started"
                        className="pricing-card-btn w-full inline-flex items-center justify-center border-2 font-bold px-6 py-3 rounded-full text-sm transition-all"
                      >
                        {t("foundation.cta")}
                      </Link>
                    </div>
                  </article>

                  {/* Enterprise */}
                  <article
                    id="capacity-expansion"
                    className="pricing-stagger-item pricing-card pricing-card-enterprise rounded-[4px] border shadow-sm flex flex-col overflow-hidden"
                  >
                    <div className="p-6 flex flex-col flex-1">
                      <p
                        className="pricing-accent text-[12px] font-bold uppercase tracking-[0.12em] mb-3"
                      >
                        {t("enterprise.badge")}
                      </p>
                      <h3 className="text-[28px] font-bold leading-tight mb-1">
                        {t("enterprise.name")}
                      </h3>
                      <p className="pricing-accent font-semibold text-base mb-2">
                        {t("enterprise.tagline")}
                      </p>
                      <p className="text-sm mb-5">
                        {t("enterprise.question")}
                      </p>
                      <div className="mb-5">
                        <p className="text-[32px] font-bold leading-none">
                          {t("enterprise.price")}
                        </p>
                        <p className="text-sm mt-1">{t("enterprise.term")}</p>
                      </div>
                      <div
                        className="pricing-doc-capacity pricing-doc-box rounded-[4px] border py-4 px-2 mb-5"
                      >
                        <FaFileLines className="pricing-accent text-lg" aria-hidden="true" />
                        <p className="pricing-accent font-bold text-sm tracking-wide mt-1">
                          {t("enterprise.docsCount")}
                        </p>
                        <p className="font-bold text-sm mt-1">
                          {t("enterprise.docsLabel")}
                        </p>
                        <p className="text-xs mt-0.5">{t("labels.activeDocuments")}</p>
                      </div>
                      <ul className="space-y-2 text-sm mb-5">
                        <li className="flex items-start gap-2">
                          <span
                            className="pricing-bullet w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          ></span
                          >{t("enterprise.limits.users")}
                        </li>
                        <li className="flex items-start gap-2">
                          <span
                            className="pricing-bullet w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          ></span
                          >{t("enterprise.limits.productFamilies")}
                        </li>
                        <li className="flex items-start gap-2">
                          <span
                            className="pricing-bullet w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          ></span
                          >{t("enterprise.limits.frameworks")}
                        </li>
                        <li className="flex items-start gap-2">
                          <span
                            className="pricing-bullet w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          ></span
                          >{t("enterprise.limits.term")}
                        </li>
                      </ul>
                      <p
                        className="pricing-accent text-[14px] font-bold uppercase tracking-[0.12em] mb-3"
                      >
                        {t("labels.corePlatform")}
                      </p>
                      <ul className="space-y-2 text-sm mb-5">
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-violet shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >{t("enterprise.features.dedicatedCloud")}
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-violet shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >{t("enterprise.features.retention")}
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-violet shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >{t("enterprise.features.rollover")}
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-violet shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >{t("enterprise.features.sso")}
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-violet shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >{t("enterprise.features.rbac")}
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-violet shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >{t("enterprise.features.sla")}
                        </li>
                      </ul>
                      <p
                        className="pricing-accent text-[14px] font-bold uppercase tracking-[0.12em] mb-2"
                      >
                        {t("labels.support")}
                      </p>
                      <p className="text-sm font-semibold mb-6 flex-1">
                        {t("enterprise.support")}
                      </p>
                      <Link
                        href="/contact"
                        className="pricing-card-btn w-full inline-flex items-center justify-center border-2 font-bold px-6 py-3 rounded-full text-sm transition-all"
                      >
                        {t("enterprise.cta")}
                      </Link>
                    </div>
                  </article>
                </div>

                <div
                  className="pricing-stagger-item flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8 sm:mt-10 pb-2 text-sm text-navy"
                >
                  <span className="inline-flex items-center gap-2"
                    ><span className="w-1.5 h-1.5 rounded-full bg-teal"></span>{t("footnotes.publishedPricing")}</span
                  >
                  <span className="inline-flex items-center gap-2"
                    ><span className="w-1.5 h-1.5 rounded-full bg-teal"></span
                    >{t("footnotes.twelveMonthTerms")}</span
                  >
                  <span className="inline-flex items-center gap-2"
                    ><span className="w-1.5 h-1.5 rounded-full bg-teal"></span>{t("footnotes.noPerSeatFees")}</span
                  >
                </div>
              </div>

            </div>
          </section>
    </>
  );
}
