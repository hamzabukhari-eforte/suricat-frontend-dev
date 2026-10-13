"use client";

import { Container } from "@/components/ui/Container";
import { useTranslations } from "@/components/i18n/LocaleProvider";

/** Focused attention mark — scan + iris */
function AttentionIcon() {
  return (
    <svg
      className="platform-closing-hub-svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="14" cy="14" r="10.5" stroke="#0D1B3E" strokeWidth="1.5" opacity="0.2" />
      <path
        d="M3.5 14c2.4-4.2 5.7-6.4 10.5-6.4S22.1 9.8 24.5 14c-2.4 4.2-5.7 6.4-10.5 6.4S5.9 18.2 3.5 14z"
        stroke="#0D1B3E"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="14" cy="14" r="3.6" stroke="#0D1B3E" strokeWidth="1.6" />
      <circle cx="14" cy="14" r="1.55" fill="#0D1B3E" />
      <path
        d="M14 4.2v2.1M14 21.7v2.1M4.2 14h2.1M21.7 14h2.1"
        stroke="#0D1B3E"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

const STEPS = [
  { num: "01", key: "applies" as const, theme: "violet" as const },
  { num: "02", key: "exists" as const, theme: "violet" as const },
  { num: "03", key: "quality" as const, theme: "teal" as const },
  { num: "04", key: "missing" as const, theme: "teal" as const },
  { num: "05", key: "align" as const, theme: "teal" as const },
  { num: "06", key: "happened" as const, theme: "teal" as const },
] as const;

export function PlatformClosingSection() {
  const t = useTranslations("platformPage");
  const tc = useTranslations("platformPage.closingDiagram");

  const foundation = STEPS.slice(0, 2);
  const intelligence = STEPS.slice(2);

  return (
    <section className="platform-closing">
      <div className="platform-closing-glow" aria-hidden="true" />

      <Container>
        <div className="platform-closing-head">
          <h2 className="platform-closing-title platform-reg-title">
            {t("closeTitleLine1")}{" "}
            <span className="text-teal">{t("closeTitleLine2")}</span>
          </h2>
        </div>

        <div className="platform-closing-diagram">
          {/* Foundation panel */}
          <div className="platform-closing-panel is-violet">
            <p className="platform-closing-panel-label">{tc("foundation")}</p>
            <div className="platform-closing-panel-frame">
              <div className="platform-closing-panel-cards is-stack">
                {foundation.map((step, i) => (
                  <article
                    key={step.key}
                    className={`platform-closing-card is-${step.theme} is-row`}
                    style={{ ["--i" as string]: i }}
                  >
                    <span className="platform-closing-card-num">{step.num}</span>
                    <div className="platform-closing-card-copy">
                      <h3>{tc(`cards.${step.key}.title`)}</h3>
                      <p>{tc(`cards.${step.key}.body`)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="platform-closing-stem is-left" aria-hidden="true">
            <svg
              className="platform-closing-stem-svg"
              viewBox="0 0 48 24"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 12 H36"
                stroke="#19D3C5"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M32 6 L42 12 L32 18"
                stroke="#19D3C5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>

          {/* Hub */}
          <div className="platform-closing-hub">
            <span className="platform-closing-hub-eye" aria-hidden="true">
              <span className="platform-closing-hub-eye-ring" />
              <AttentionIcon />
            </span>
            <span className="platform-closing-hub-label">
              {tc("whatNeedsAttention")}
            </span>
          </div>

          <div className="platform-closing-stem is-right" aria-hidden="true">
            <svg
              className="platform-closing-stem-svg"
              viewBox="0 0 48 24"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M48 12 H12"
                stroke="#19D3C5"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M16 6 L6 12 L16 18"
                stroke="#19D3C5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>

          {/* Intelligence panel */}
          <div className="platform-closing-panel is-teal">
            <p className="platform-closing-panel-label">{tc("intelligence")}</p>
            <div className="platform-closing-panel-frame">
              <div className="platform-closing-panel-cards is-intel-grid">
                {intelligence.map((step, i) => (
                  <article
                    key={step.key}
                    className={`platform-closing-card is-${step.theme} is-row`}
                    style={{ ["--i" as string]: i + 2 }}
                  >
                    <span className="platform-closing-card-num">{step.num}</span>
                    <div className="platform-closing-card-copy">
                      <h3>{tc(`cards.${step.key}.title`)}</h3>
                      <p>{tc(`cards.${step.key}.body`)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="platform-closing-body">{t("closeBody")}</p>
      </Container>
    </section>
  );
}
