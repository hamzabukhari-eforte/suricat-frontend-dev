"use client";

import { Container } from "@/components/ui/Container";
import { FaEye } from "@/components/ui/icons";
import { useTranslations } from "@/components/i18n/LocaleProvider";

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
          <h2 className="platform-closing-title">
            <span>{t("closeTitleLine1")}</span>
            <span className="text-teal">{t("closeTitleLine2")}</span>
          </h2>
        </div>

        <div className="platform-closing-constellation">
          {/* Left: Foundation signals */}
          <div className="platform-closing-wing is-left">
            <p className="platform-closing-phase is-violet">{tc("foundation")}</p>
            <div className="platform-closing-signals">
              {foundation.map((step, i) => (
                <article
                  key={step.key}
                  className={`platform-closing-signal is-${step.theme}`}
                  style={{ ["--i" as string]: i }}
                >
                  <span className="platform-closing-signal-num">{step.num}</span>
                  <div>
                    <h3>{tc(`cards.${step.key}.title`)}</h3>
                    <p>{tc(`cards.${step.key}.body`)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Center hub */}
          <div className="platform-closing-hub">
            <div className="platform-closing-hub-rays" aria-hidden="true">
              <span className="is-v" />
              <span className="is-v" />
              <span className="is-t" />
              <span className="is-t" />
              <span className="is-t" />
              <span className="is-t" />
            </div>
            <div className="platform-closing-hub-core">
              <span className="platform-closing-hub-pulse" aria-hidden="true" />
              <span className="platform-closing-hub-eye" aria-hidden="true">
                <FaEye />
              </span>
              <span className="platform-closing-hub-label">
                {tc("whatNeedsAttention")}
              </span>
            </div>
          </div>

          {/* Right: Intelligence signals */}
          <div className="platform-closing-wing is-right">
            <p className="platform-closing-phase is-teal">{tc("intelligence")}</p>
            <div className="platform-closing-signals">
              {intelligence.map((step, i) => (
                <article
                  key={step.key}
                  className={`platform-closing-signal is-${step.theme}`}
                  style={{ ["--i" as string]: i + 2 }}
                >
                  <span className="platform-closing-signal-num">{step.num}</span>
                  <div>
                    <h3>{tc(`cards.${step.key}.title`)}</h3>
                    <p>{tc(`cards.${step.key}.body`)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <p className="platform-closing-body">{t("closeBody")}</p>
      </Container>
    </section>
  );
}
