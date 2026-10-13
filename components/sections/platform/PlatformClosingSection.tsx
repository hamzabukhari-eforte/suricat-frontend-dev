"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FaEye, FaHandshake } from "@/components/ui/icons";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import Link from "next/link";
import type { ReactNode } from "react";

function IconApplies() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4.5 7.5h15M6 11.5h12M7.5 15.5h9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M5 5.2h14a1 1 0 0 1 1 1v11.6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6.2a1 1 0 0 1 1-1z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconExists() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 3.5h7.2L17.5 8V19.2A1.3 1.3 0 0 1 16.2 20.5H6A1.3 1.3 0 0 1 4.7 19.2V4.8A1.3 1.3 0 0 1 6 3.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M13.2 3.5V8H17.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12.2" cy="14.2" r="2.6" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M14.1 16.1 16.4 18.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconQuality() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5.2 3.8h8.8L17.5 7.3V19a1.2 1.2 0 0 1-1.2 1.2H5.2A1.2 1.2 0 0 1 4 19V5a1.2 1.2 0 0 1 1.2-1.2z"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinejoin="round"
      />
      <path d="M14 3.8V7.3h3.5" stroke="currentColor" strokeWidth="1.55" />
      <circle cx="16.4" cy="16.2" r="4.1" stroke="currentColor" strokeWidth="1.55" />
      <path
        d="M14.7 16.2l1.2 1.2 2.3-2.5"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMissing() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 3.5h7.2L17.5 8V19.2A1.3 1.3 0 0 1 16.2 20.5H6A1.3 1.3 0 0 1 4.7 19.2V4.8A1.3 1.3 0 0 1 6 3.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M13.2 3.5V8H17.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="15.6" cy="15.8" r="3.4" stroke="currentColor" strokeWidth="1.55" />
      <path
        d="M15.6 14.2v1.7M15.6 17.5h.01"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconAlign() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3.2 4.5h5.2L10.2 6.3V17a1 1 0 0 1-1 1H3.2A1 1 0 0 1 2.2 17V5.5a1 1 0 0 1 1-1z"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinejoin="round"
      />
      <path
        d="M13.8 4.5h5.2L20.8 6.3V17a1 1 0 0 1-1 1h-5.2a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1z"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinejoin="round"
      />
      <path
        d="M10.8 10.2h2.4M13.2 14.8H10.8"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconHappened() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 3.8h6a1.2 1.2 0 0 1 1.2 1.2v1H7.8V5A1.2 1.2 0 0 1 9 3.8z"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinejoin="round"
      />
      <path
        d="M8 5.2H6.5A1.5 1.5 0 0 0 5 6.7v12.3A1.5 1.5 0 0 0 6.5 20.5h11a1.5 1.5 0 0 0 1.5-1.5V6.7a1.5 1.5 0 0 0-1.5-1.5H16"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinejoin="round"
      />
      <path
        d="M8.8 11.2l1.6 1.6 3.4-3.5M8.8 16.2h6.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const FOUNDATION = [
  { num: "01", key: "applies" as const, icon: <IconApplies /> },
  { num: "02", key: "exists" as const, icon: <IconExists /> },
];

const INTELLIGENCE = [
  { num: "03", key: "quality" as const, icon: <IconQuality /> },
  { num: "04", key: "missing" as const, icon: <IconMissing /> },
  { num: "05", key: "align" as const, icon: <IconAlign /> },
  { num: "06", key: "happened" as const, icon: <IconHappened /> },
];

function StepNode({
  num,
  theme,
  title,
  body,
  icon,
  index,
}: {
  num: string;
  theme: "violet" | "teal";
  title: string;
  body: string;
  icon: ReactNode;
  index: number;
}) {
  return (
    <article
      className={`platform-closing-node is-${theme}`}
      style={{ ["--node-i" as string]: index }}
    >
      <span className="platform-closing-node-watermark" aria-hidden="true">
        {num}
      </span>
      <div className="platform-closing-node-rail" aria-hidden="true">
        <span className="platform-closing-node-orb">
          <span className="platform-closing-node-icon">{icon}</span>
        </span>
        <span className="platform-closing-node-stem" />
      </div>
      <div className="platform-closing-node-body">
        <span className="platform-closing-node-num">{num}</span>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </article>
  );
}

export function PlatformClosingSection() {
  const t = useTranslations("platformPage");
  const tCta = useTranslations("cta");
  const tc = useTranslations("platformPage.closingDiagram");

  return (
    <section className="platform-closing">
      <div className="platform-closing-atmosphere" aria-hidden="true">
        <span className="platform-closing-mesh" />
        <span className="platform-closing-orb is-violet" />
        <span className="platform-closing-orb is-teal" />
        <span className="platform-closing-orb is-navy" />
      </div>

      <Container>
        <div className="platform-closing-head">
          <h2 className="platform-closing-title">
            <span>{t("closeTitleLine1")}</span>
            <span className="text-teal">{t("closeTitleLine2")}</span>
          </h2>
        </div>

        <div className="platform-closing-pipeline">
          {/* Foundation stack */}
          <div className="platform-closing-lane is-violet">
            <div className="platform-closing-lane-badge">
              <span className="platform-closing-lane-pulse" aria-hidden="true" />
              {tc("foundation")}
            </div>
            <div className="platform-closing-lane-stack">
              {FOUNDATION.map((step, i) => (
                <StepNode
                  key={step.key}
                  num={step.num}
                  theme="violet"
                  title={tc(`cards.${step.key}.title`)}
                  body={tc(`cards.${step.key}.body`)}
                  icon={step.icon}
                  index={i}
                />
              ))}
            </div>
          </div>

          {/* Merge hub */}
          <div className="platform-closing-merge" aria-hidden="true">
            <svg viewBox="0 0 80 220" className="platform-closing-merge-svg" fill="none">
              <path
                d="M8 40 C40 40 40 110 72 110"
                stroke="#5C3D8F"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M8 180 C40 180 40 110 72 110"
                stroke="#5C3D8F"
                strokeWidth="2.2"
                strokeLinecap="round"
                opacity="0.45"
              />
              <path
                d="M72 110 H40"
                stroke="url(#closingMergeGrad)"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="closingMergeGrad" x1="72" y1="110" x2="40" y2="110">
                  <stop stopColor="#5C3D8F" />
                  <stop offset="1" stopColor="#19D3C5" />
                </linearGradient>
              </defs>
              <circle cx="72" cy="110" r="5" fill="#19D3C5" />
              <circle cx="72" cy="110" r="10" stroke="#19D3C5" strokeOpacity="0.35" />
            </svg>
            <div className="platform-closing-merge-mobile">
              <span className="is-violet" />
              <span className="is-mid" />
              <span className="is-teal" />
            </div>
          </div>

          {/* Intelligence constellation */}
          <div className="platform-closing-lane is-teal">
            <div className="platform-closing-lane-badge">
              <span className="platform-closing-lane-pulse" aria-hidden="true" />
              {tc("intelligence")}
            </div>
            <div className="platform-closing-lane-grid">
              {INTELLIGENCE.map((step, i) => (
                <StepNode
                  key={step.key}
                  num={step.num}
                  theme="teal"
                  title={tc(`cards.${step.key}.title`)}
                  body={tc(`cards.${step.key}.body`)}
                  icon={step.icon}
                  index={i + 2}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="platform-closing-converge" aria-hidden="true">
          <svg viewBox="0 0 600 90" className="platform-closing-converge-svg" fill="none">
            <path d="M90 8 C90 42 270 58 300 82" stroke="#5C3D8F" strokeWidth="2" />
            <path d="M210 8 C210 36 285 58 300 82" stroke="#5C3D8F" strokeWidth="2" opacity="0.55" />
            <path d="M300 8 C300 34 300 58 300 82" stroke="#19D3C5" strokeWidth="2" />
            <path d="M390 8 C390 36 315 58 300 82" stroke="#19D3C5" strokeWidth="2" />
            <path d="M480 8 C480 42 330 58 300 82" stroke="#19D3C5" strokeWidth="2" />
            <path d="M292 74 l8 12 8-12" stroke="#19D3C5" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="platform-closing-attention">
          <span className="platform-closing-attention-ring" aria-hidden="true" />
          <span className="platform-closing-attention-icon">
            <FaEye />
          </span>
          <span className="platform-closing-attention-rule" />
          <span className="platform-closing-attention-label">
            {tc("whatNeedsAttention")}
          </span>
        </div>

        <p className="platform-closing-body">{t("closeBody")}</p>
        <div className="platform-closing-rule" aria-hidden="true" />
        <h3 className="platform-closing-cta-title">{tc("readyTitle")}</h3>
        <div className="platform-closing-actions">
          <Button
            variant="teal"
            href="/design-partners/apply"
            className="group shrink-0 gap-2 whitespace-nowrap"
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
            className="group shrink-0 whitespace-nowrap"
          >
            {tCta("requestFreePilot")}
          </Button>
        </div>
        <Link href="/contact" className="platform-closing-questions">
          {tCta("gotQuestions")}
        </Link>
      </Container>
    </section>
  );
}
