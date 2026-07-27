"use client";

import {
  FaArrowRight,
  FaChartLine,
  FaClipboardList,
  FaClock,
  FaFileCircleExclamation,
  FaFolderOpen,
  FaUpRightFromSquare,
  FaUserGraduate,
} from "@/components/ui/icons";
import { MobileAutoplayCardSlider } from "@/components/ui/MobileAutoplayCardSlider";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import Link from "next/link";
import type { IconType } from "react-icons";

const CARDS: {
  id: "c1" | "c2" | "c3" | "c4" | "c5" | "c6";
  icon: IconType;
  href: string;
}[] = [
  {
    id: "c1",
    icon: FaFileCircleExclamation,
    href: "https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/compliance-actions-and-activities/warning-letters",
  },
  {
    id: "c2",
    icon: FaClipboardList,
    href: "https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/inspection-references/inspection-observations",
  },
  {
    id: "c3",
    icon: FaChartLine,
    href: "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts",
  },
  {
    id: "c4",
    icon: FaClock,
    href: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfres/res.cfm",
  },
  {
    id: "c5",
    icon: FaUserGraduate,
    href: "https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/inspection-references/inspection-observations",
  },
  {
    id: "c6",
    icon: FaFolderOpen,
    href: "https://www.fda.gov/medical-devices/postmarket-requirements-devices/quality-system-qs-regulationmedical-device-good-manufacturing-practices",
  },
];

export function ComplianceCostSection() {
  const t = useTranslations("home.complianceCost");

  return (
    <section id="compliance-cost-section" className="pt-8 max-w-7xl mx-auto">
      <div className="mb-6 lg:pt-0">
        <span className="text-teal font-bold text-sm uppercase tracking-widest mb-4 block">
          {t("eyebrow")}
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-[28px] leading-tight lg:leading-[36px] font-bold mb-4 sm:mb-4 max-w-3xl">
          {t("title")}
        </h2>
        <p className="text-base sm:text-lg lg:text-[20px] leading-relaxed lg:leading-[28px] text-navy max-w-4xl">
          {t("body")}
        </p>
      </div>
      <div className="relative mt-4 pl-0 extend_top-left o-flow-vis">
        <div className="compliance-cost-banner-bg rounded-[4px] p-10 lg:p-6 relative z-10 text-white extend_top-left-base">
          <div className="relative">
            <MobileAutoplayCardSlider
              id="compliance-cards-grid"
              gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4 py-2"
            >
              {CARDS.map((card, index) => {
                const Icon = card.icon;
                const stat = t(`cards.${card.id}.stat`);
                const title = t(`cards.${card.id}.title`);
                return (
                  <div key={card.id} className="compliance-cost-card">
                    <div className="compliance-cost-card-header">
                      <div className="compliance-cost-card-icon">
                        <Icon aria-hidden="true" />
                      </div>
                      <span className="compliance-cost-card-index" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="compliance-cost-card-label">
                      {t(`cards.${card.id}.label`)}
                    </p>
                    <p className="compliance-cost-card-title">
                      {stat ? (
                        <>
                          <span className="compliance-stat-emphasis">{stat}</span>
                          {title ? <> {title}</> : null}
                        </>
                      ) : (
                        title
                      )}
                    </p>
                    <p className="compliance-cost-card-body">
                      {t(`cards.${card.id}.body`)}
                    </p>
                    <div className="compliance-cost-card-footer">
                      <a
                        href={card.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="compliance-cost-card-link"
                      >
                        {t(`cards.${card.id}.link`)}
                        <FaUpRightFromSquare className="text-xs" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </MobileAutoplayCardSlider>
          </div>

          <div className="mt-10 lg:mt-8 flex flex-col items-center gap-4">
            <Link
              href="/readiness"
              className="compliance-banner-cta inline-flex items-center gap-2 border-2 border-teal text-teal px-8 py-2.5 rounded-full text-sm font-bold hover:bg-teal hover:text-navy transition-all group md:text-base"
            >
              {t("cta")}
              <FaArrowRight
                className="text-sm group-hover:translate-x-1 transition-transform duration-300"
                aria-hidden="true"
              />
            </Link>
            <p className="text-white/80 text-sm text-center">{t("ctaHint")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
