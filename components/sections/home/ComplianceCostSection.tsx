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
    href: "https://www.cov.com/en/news-and-insights",
  },
  {
    id: "design" as const,
    href: "https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/inspection-references/inspection-observations",
  },
] as const;

const FEATURED_STAT_HREF =
  "https://www.fda.gov/media/191127/download?attachment=";

const WHY_NOW_HREF = "https://www.fda.gov/media/191960/download";

export function ComplianceCostSection() {
  const t = useTranslations("home.complianceCost");

  return (
    <section id="compliance-cost-section">
      <div className="cc-cost-band bg-white pt-12 pb-4 lg:pb-6">
        <Container>
          <div className="mb-8 lg:mb-10">
            <span className="mb-4 block text-[14px] font-bold uppercase tracking-widest text-orange">
              {t("eyebrow")}
            </span>
            <h2 className="mb-4 w-full text-[32px] font-bold leading-tight text-navy">
              {t("title")}
            </h2>
            <p className="w-full text-[20px] font-normal leading-relaxed text-navy lg:leading-[28px]">
              {t("body")}
            </p>
          </div>

          <div className="cc-stats-layout">
            <a
              href={FEATURED_STAT_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="cc-featured-stat"
            >
              <p className="cc-stat-category">{t("stats.costOfQuality.category")}</p>
              <p className="cc-featured-stat-value">{t("stats.costOfQuality.stat")}</p>
              <p className="cc-featured-stat-label">{t("stats.costOfQuality.label")}</p>
              <p className="cc-featured-stat-body">{t("stats.costOfQuality.body")}</p>
              <p className="cc-featured-stat-source">
                <span>{t("stats.costOfQuality.source")}</span>
                <FaUpRightFromSquare
                  className="cc-source-icon"
                  aria-hidden="true"
                  size={14}
                />
              </p>
            </a>

            <div className="cc-stat-grid">
              {STAT_CARDS.map((card) => (
                <a
                  key={card.id}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cc-stat-card"
                >
                  <p className="cc-stat-category cc-stat-category-light">
                    {t(`stats.${card.id}.category`)}
                  </p>
                  <p className="cc-stat-card-value">{t(`stats.${card.id}.stat`)}</p>
                  <p className="cc-stat-card-label">{t(`stats.${card.id}.label`)}</p>
                  <p className="cc-stat-card-body">{t(`stats.${card.id}.body`)}</p>
                  <p className="cc-stat-card-source">
                    <span>{t(`stats.${card.id}.source`)}</span>
                    <FaUpRightFromSquare
                      className="cc-source-icon"
                      aria-hidden="true"
                      size={14}
                    />
                  </p>
                </a>
              ))}
            </div>
          </div>

          <a
            href={WHY_NOW_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="cc-why-now"
          >
            <div className="cc-why-now-copy">
              <span className="cc-why-now-eyebrow">{t("whyNow.eyebrow")}</span>
              <p className="cc-why-now-title">{t("whyNow.title")}</p>
              <p className="cc-why-now-body">{t("whyNow.body")}</p>
              <p className="cc-why-now-source">
                <span>{t("whyNow.source")}</span>
                <FaUpRightFromSquare
                  className="cc-source-icon"
                  aria-hidden="true"
                  size={14}
                />
              </p>
            </div>
            <div className="cc-why-now-aside" aria-hidden="true">
              <p className="cc-why-now-date">{t("whyNow.date")}</p>
              <p className="cc-why-now-date-label">{t("whyNow.dateLabel")}</p>
            </div>
          </a>
        </Container>
      </div>
    </section>
  );
}
