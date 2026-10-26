"use client";

import { FaUpRightFromSquare } from "@/components/ui/icons";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { Container } from "@/components/ui/Container";

const STAT_CARDS = [
  {
    id: "failures" as const,
    href: "https://www.fda.gov/media/191127/download?attachment=",
  },
  {
    id: "exposure" as const,
    href: "https://www.fda.gov/about-fda/fda-track-agency-wide-program-performance/fda-track-medical-device-user-fee-amendments-mdufa-performance-reports",
  },
  {
    id: "remediation" as const,
    href: "https://www.cov.com/-/media/files/corporate/publications/2026/02/quarterly-medical-device-warning-letters-update-october--december-2025-and-2025-annual-summary.pdf",
  },
  {
    id: "design" as const,
    href: "https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/inspection-references/inspection-observations",
  },
] as const;

const FEATURED_STAT_HREF =
  "https://www.fda.gov/media/191127/download?attachment=";

export function ComplianceCostSection() {
  const t = useTranslations("home.complianceCost");

  return (
    <section id="compliance-cost-section">
      <div className="cc-cost-band bg-surface-muted pt-12 pb-4 lg:pb-6">
        <Container>
          <div className="mb-8 lg:mb-10">
            <span className="mb-4 block text-[16px] font-bold uppercase tracking-widest text-teal">
              {t("eyebrow")}
            </span>
            <h2 className="mb-4 w-full text-[32px] font-bold leading-tight text-navy">
              {t("titleLine1")}
              <br />
              {t("titleLine2")}
            </h2>
            <p className="w-full text-[20px] font-normal leading-relaxed text-navy lg:leading-[28px]">
              {t("bodyLine1")}
              <br />
              {t("bodyLine2")}
            </p>
          </div>

          <div className="cc-stats-layout">
            <article className="cc-featured-stat">
              <p className="cc-stat-category">{t("stats.costOfQuality.category")}</p>
              <p className="cc-featured-stat-value">{t("stats.costOfQuality.stat")}</p>
              <p className="cc-featured-stat-label">{t("stats.costOfQuality.label")}</p>
              <p className="cc-featured-stat-body">{t("stats.costOfQuality.body")}</p>
              <a
                href={FEATURED_STAT_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="cc-featured-stat-source"
              >
                <span>{t("stats.costOfQuality.source")}</span>
                <FaUpRightFromSquare
                  className="cc-source-icon"
                  aria-hidden="true"
                  size={14}
                />
              </a>
            </article>

            <div className="cc-stat-grid">
              {STAT_CARDS.map((card) => (
                <article key={card.id} className="cc-stat-card">
                  <p className="cc-stat-category cc-stat-category-light">
                    {t(`stats.${card.id}.category`)}
                  </p>
                  <p className="cc-stat-card-value">{t(`stats.${card.id}.stat`)}</p>
                  <p className="cc-stat-card-label">{t(`stats.${card.id}.label`)}</p>
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cc-stat-card-source"
                  >
                    <span>{t(`stats.${card.id}.source`)}</span>
                    <FaUpRightFromSquare
                      className="cc-source-icon"
                      aria-hidden="true"
                      size={14}
                    />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
