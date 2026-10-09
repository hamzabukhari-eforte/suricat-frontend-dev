"use client";

import { FaUpRightFromSquare } from "@/components/ui/icons";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { Container } from "@/components/ui/Container";

const STAT_CARDS = [
  {
    id: "failures" as const,
    href: "https://www.mckinsey.com/industries/life-sciences/our-insights/capturing-the-value-of-good-quality-in-medical-devices",
  },
  {
    id: "exposure" as const,
    href: "https://www.mckinsey.com/industries/life-sciences/our-insights/capturing-the-value-of-good-quality-in-medical-devices",
  },
  {
    id: "remediation" as const,
    href: "https://www.mckinsey.com/industries/life-sciences/our-insights/capturing-the-value-of-good-quality-in-medical-devices",
  },
  {
    id: "design" as const,
    href: "https://www2.deloitte.com/us/en/pages/life-sciences-and-health-care/articles/medtech-quality-costs.html",
  },
];

const STORY_CARDS = [
  {
    id: "zoll" as const,
    href: "https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/zoll-medical-corporation-711320-04302026",
  },
  {
    id: "medline" as const,
    href: "https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/medline-industries-lp-723866-03252026",
  },
  {
    id: "bd" as const,
    href: "https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/becton-dickinson-and-companycarefusion-303-inc-691601-11222024",
  },
  {
    id: "meridian" as const,
    href: "https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/meridian-bioscience-inc-720826-12222025",
  },
];

const MEDTRONIC_HREF =
  "https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/medtronic-inc-617539-12092021";

const COST_OF_QUALITY_HREF =
  "https://www.mckinsey.com/industries/life-sciences/our-insights/capturing-the-value-of-good-quality-in-medical-devices";

export function ComplianceCostSection() {
  const t = useTranslations("home.complianceCost");

  return (
    <section id="compliance-cost-section">
      {/* Cost of Misalignment — gray band like Alignment Gap */}
      <div className="cc-cost-band bg-surface-muted pt-12 pb-14 lg:pb-16">
        <Container>
          <div className="mb-8 lg:mb-10">
            <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-orange">
              {t("eyebrow")}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] leading-tight font-bold mb-4 max-w-4xl text-navy">
              {t("title")}
            </h2>
            <p className="text-base sm:text-lg lg:text-[20px] leading-relaxed lg:leading-[28px] text-navy max-w-4xl">
              {t("body")}
            </p>
          </div>

          <div className="cc-stats-layout">
            <a
              href={COST_OF_QUALITY_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="cc-featured-stat"
            >
              <p className="cc-featured-stat-label">{t("stats.costOfQuality.label")}</p>
              <p className="cc-featured-stat-value">{t("stats.costOfQuality.stat")}</p>
              <p className="cc-featured-stat-body">{t("stats.costOfQuality.body")}</p>
              <div className="cc-featured-stat-split">
                <div>
                  <p className="cc-featured-stat-split-value">
                    {t("stats.costOfQuality.thirdTitle")}
                  </p>
                  <p className="cc-featured-stat-split-text">
                    {t("stats.costOfQuality.thirdBody")}
                  </p>
                </div>
                <div>
                  <p className="cc-featured-stat-split-value">
                    {t("stats.costOfQuality.twoThirdsTitle")}
                  </p>
                  <p className="cc-featured-stat-split-text">
                    {t("stats.costOfQuality.twoThirdsBody")}
                  </p>
                </div>
              </div>
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
                  <p className="cc-stat-card-label">{t(`stats.${card.id}.label`)}</p>
                  <p className="cc-stat-card-value">{t(`stats.${card.id}.stat`)}</p>
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

          <p className="cc-punchline">
            <span className="cc-punchline-line1">{t("punchline.line1")}</span>{" "}
            <span className="cc-punchline-line2">{t("punchline.line2")}</span>
          </p>
        </Container>
      </div>

      {/* Explore the Evidence — white band, clear gap after Cost */}
      <div className="cc-evidence-band bg-white pt-20 pb-12 lg:pt-24 lg:pb-14">
        <Container>
          <div className="cc-evidence">
            <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-orange">
              {t("evidence.eyebrow")}
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-[28px] leading-tight font-bold mb-4 max-w-4xl text-navy">
              {t("evidence.title")}
            </h3>
            <p className="text-base sm:text-lg lg:text-[18px] leading-relaxed text-navy/80 max-w-4xl mb-8">
              {t("evidence.intro")}
            </p>

            <div className="cc-evidence-layout">
              <a
                href={MEDTRONIC_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="cc-story-featured"
              >
                <p className="cc-story-meta">{t("stories.medtronic.meta")}</p>
                <p className="cc-story-question">{t("stories.medtronic.question")}</p>
                <div className="cc-story-featured-stats">
                  <div>
                    <p className="cc-story-stat">{t("stories.medtronic.stat1")}</p>
                    <p className="cc-story-stat-body">{t("stories.medtronic.stat1Body")}</p>
                  </div>
                  <div>
                    <p className="cc-story-stat-md">{t("stories.medtronic.stat2")}</p>
                    <p className="cc-story-stat-body">{t("stories.medtronic.stat2Body")}</p>
                  </div>
                  <div>
                    <p className="cc-story-stat-md">{t("stories.medtronic.stat3")}</p>
                    <p className="cc-story-stat-body">{t("stories.medtronic.stat3Body")}</p>
                  </div>
                </div>
                <span className="cc-story-link">
                  {t("evidence.readStory")}
                  <FaUpRightFromSquare className="text-xs" aria-hidden="true" />
                </span>
              </a>

              <div className="cc-story-grid">
                {STORY_CARDS.map((card) => (
                  <a
                    key={card.id}
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cc-story-card"
                  >
                    <p className="cc-story-card-meta">
                      {t(`stories.${card.id}.meta`)}
                    </p>
                    <p className="cc-story-card-question">
                      {t(`stories.${card.id}.question`)}
                    </p>
                    <p className="cc-story-card-stat">{t(`stories.${card.id}.stat`)}</p>
                    <p className="cc-story-card-stat-note">
                      {t(`stories.${card.id}.statNote`)}
                    </p>
                    <p className="cc-story-card-body">{t(`stories.${card.id}.body`)}</p>
                    <span className="cc-story-card-link">
                      {t("evidence.readStory")}
                      <FaUpRightFromSquare className="text-xs" aria-hidden="true" />
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <p className="cc-evidence-disclaimer">
              <span>{t("evidence.disclaimerLine1")}</span>
              <span>{t("evidence.disclaimerLine2")}</span>
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}
