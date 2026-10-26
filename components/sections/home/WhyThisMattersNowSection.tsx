"use client";

import {
  FaBrain,
  FaFileLines,
  FaMagnifyingGlass,
  FaUpRightFromSquare,
} from "@/components/ui/icons";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { Container } from "@/components/ui/Container";
import type { IconType } from "react-icons";

type MattersCard = {
  id: "fdaRule" | "fdaAi" | "euNotifiedBody";
  Icon: IconType;
  sources: { labelKey: string; href: string }[];
};

const CARDS: MattersCard[] = [
  {
    id: "fdaRule",
    Icon: FaFileLines,
    sources: [
      {
        labelKey: "cards.fdaRule.source1",
        href: "https://www.fda.gov/media/191961/download",
      },
    ],
  },
  {
    id: "fdaAi",
    Icon: FaBrain,
    sources: [
      {
        labelKey: "cards.fdaAi.source1",
        href: "https://www.fda.gov/news-events/press-announcements/fda-expands-artificial-intelligence-capabilities-agentic-ai-deployment",
      },
      {
        labelKey: "cards.fdaAi.source2",
        href: "https://www.fda.gov/news-events/press-announcements/fda-launches-agency-wide-ai-tool-optimize-performance-american-people",
      },
    ],
  },
  {
    id: "euNotifiedBody",
    Icon: FaMagnifyingGlass,
    sources: [
      {
        labelKey: "cards.euNotifiedBody.source1",
        href: "https://www.raps.org/resource/euro-convergence-experts-share-insights-on-ai-for-submissions-conformity-assessments.html",
      },
    ],
  },
];

export function WhyThisMattersNowSection() {
  const t = useTranslations("home.whyThisMattersNow");

  return (
    <section id="why-this-matters-now" className="wtmn-section">
      <Container>
        <div className="wtmn-header">
          <p className="wtmn-eyebrow">{t("eyebrow")}</p>
          <h2 className="wtmn-title">{t("title")}</h2>
          <p className="wtmn-body">
            {t("bodyLine1")}
            <br />
            {t("bodyLine2")}
          </p>
        </div>

        <div className="wtmn-grid">
          {CARDS.map((card) => {
            const Icon = card.Icon;
            return (
              <article key={card.id} className="wtmn-card">
                <div className="wtmn-card-meta">
                  <span className="wtmn-card-tag">
                    {t(`cards.${card.id}.tag`)}
                  </span>
                  <span className="wtmn-card-divider" aria-hidden="true" />
                  <span className="wtmn-card-date">
                    {t(`cards.${card.id}.date`)}
                  </span>
                </div>

                <span className="wtmn-card-icon" aria-hidden="true">
                  <Icon />
                </span>

                <h3 className="wtmn-card-title">{t(`cards.${card.id}.title`)}</h3>
                <p className="wtmn-card-body">{t(`cards.${card.id}.body`)}</p>

                <div className="wtmn-card-sources">
                  <span className="wtmn-source-label">{t("sourceLabel")}</span>
                  {card.sources.map((source, index) => (
                    <span key={source.href} className="wtmn-source-item">
                      {index > 0 ? (
                        <span className="wtmn-source-sep" aria-hidden="true">
                          {" "}
                          ·{" "}
                        </span>
                      ) : null}
                      <a
                        href={source.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="wtmn-source-link"
                      >
                        <span>{t(source.labelKey)}</span>
                        <FaUpRightFromSquare
                          className="wtmn-source-icon"
                          aria-hidden="true"
                          size={12}
                        />
                      </a>
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
