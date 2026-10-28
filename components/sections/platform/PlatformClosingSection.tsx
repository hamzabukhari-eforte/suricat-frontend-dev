"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  FaAward,
  FaCircleCheck,
  FaDatabase,
  FaFileLines,
  FaHandshake,
  FaLinkSlash,
  FaMagnifyingGlass,
  FaTriangleExclamation,
  FaUsers,
} from "@/components/ui/icons";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import Link from "next/link";
import type { ReactNode } from "react";

const STEPS = [
  {
    num: "01",
    key: "applies" as const,
    theme: "violet" as const,
    icon: <FaFileLines />,
  },
  {
    num: "02",
    key: "exists" as const,
    theme: "violet" as const,
    icon: <FaMagnifyingGlass />,
  },
  {
    num: "03",
    key: "quality" as const,
    theme: "teal" as const,
    icon: <FaAward />,
  },
  {
    num: "04",
    key: "missing" as const,
    theme: "teal" as const,
    icon: <FaTriangleExclamation />,
  },
  {
    num: "05",
    key: "align" as const,
    theme: "teal" as const,
    icon: <FaLinkSlash />,
  },
  {
    num: "06",
    key: "happened" as const,
    theme: "teal" as const,
    icon: <FaDatabase />,
  },
] as const;

function StepCard({
  num,
  theme,
  icon,
  title,
  body,
  index,
}: {
  num: string;
  theme: "violet" | "teal";
  icon: ReactNode;
  title: string;
  body: string;
  index: number;
}) {
  return (
    <article
      className={`platform-closing-step is-${theme}`}
      style={{ ["--i" as string]: index }}
    >
      <div className="platform-closing-step-icon-wrap">
        <span className="platform-closing-step-icon" aria-hidden="true">
          {icon}
        </span>
        <span className="platform-closing-step-num">{num}</span>
      </div>
      <h3>{title}</h3>
      <p>{body}</p>
      <span className="platform-closing-step-curve" aria-hidden="true" />
    </article>
  );
}

export function PlatformClosingSection() {
  const t = useTranslations("platformPage");
  const tc = useTranslations("platformPage.closingDiagram");
  const tCta = useTranslations("cta");

  const foundation = STEPS.slice(0, 2);
  const intelligence = STEPS.slice(2);

  return (
    <section className="platform-closing">
      <Container>
        <div className="platform-closing-head">
          <h2 className="platform-closing-title">
            {t("closeTitleLine1")}{" "}
            <span className="text-teal">{t("closeTitleLine2")}</span>
          </h2>
        </div>

        <div className="platform-closing-flow">
          <div className="platform-closing-groups">
            <div className="platform-closing-group is-violet">
              <p className="platform-closing-group-label">
                {tc("foundation")}
              </p>
              <div className="platform-closing-group-cards">
                {foundation.map((step, i) => (
                  <StepCard
                    key={step.key}
                    num={step.num}
                    theme={step.theme}
                    icon={step.icon}
                    title={tc(`cards.${step.key}.title`)}
                    body={tc(`cards.${step.key}.body`)}
                    index={i}
                  />
                ))}
              </div>
            </div>

            <div className="platform-closing-group is-teal">
              <p className="platform-closing-group-label">
                {tc("intelligence")}
              </p>
              <div className="platform-closing-group-cards is-intel">
                {intelligence.map((step, i) => (
                  <StepCard
                    key={step.key}
                    num={step.num}
                    theme={step.theme}
                    icon={step.icon}
                    title={tc(`cards.${step.key}.title`)}
                    body={tc(`cards.${step.key}.body`)}
                    index={i + 2}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="platform-closing-hub-bar">
            <span className="platform-closing-hub-search" aria-hidden="true">
              <FaMagnifyingGlass />
            </span>
            <span className="platform-closing-hub-label">
              {tc("whatNeedsAttention")}
            </span>
          </div>
        </div>

        <div className="platform-closing-process">
          <div className="platform-closing-process-item">
            <span className="platform-closing-process-icon" aria-hidden="true">
              <FaFileLines />
            </span>
            <span>{tc("process.sourceEvidence")}</span>
          </div>
          <span className="platform-closing-process-arrow" aria-hidden="true">
            →
          </span>
          <div className="platform-closing-process-item">
            <span className="platform-closing-process-icon" aria-hidden="true">
              <FaUsers />
            </span>
            <span>{tc("process.qaRaReview")}</span>
          </div>
          <span className="platform-closing-process-arrow" aria-hidden="true">
            →
          </span>
          <div className="platform-closing-process-item">
            <span className="platform-closing-process-icon" aria-hidden="true">
              <FaCircleCheck />
            </span>
            <span>{tc("process.humanDecision")}</span>
          </div>
        </div>

        <p className="platform-closing-body">{t("closeBody")}</p>

        <div className="platform-closing-cta">
          <h3 className="platform-closing-cta-title">{tc("readyTitle")}</h3>
          <div className="platform-closing-cta-actions">
            <Button
              variant="teal"
              href="/design-partners/apply"
              className="group gap-2 whitespace-nowrap"
            >
              <FaHandshake
                className="shrink-0 text-base text-navy"
                aria-hidden="true"
              />
              {tCta("becomeDesignPartner")}
            </Button>
            <Button
              variant="outline-navy"
              href="/get-started"
              className="whitespace-nowrap"
            >
              {tCta("requestFreePilot")}
            </Button>
            <Link
              href="/contact"
              className="platform-closing-cta-link"
            >
              {tCta("gotQuestions")}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
