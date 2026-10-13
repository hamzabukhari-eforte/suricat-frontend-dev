"use client";

import {
  FaCompassDrafting,
  FaRotate,
  FaSitemap,
  FaTableCells,
  FaUserGraduate,
} from "@/components/ui/icons";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import type { ReactNode } from "react";
import { PlatformIqHubChrome } from "./PlatformIqHubChrome";

const DOCS: {
  key: "sop" | "capa" | "risk" | "design" | "training";
  icon: ReactNode;
  status: "ready" | "review";
}[] = [
  { key: "sop", icon: <FaSitemap />, status: "ready" },
  { key: "capa", icon: <FaRotate />, status: "review" },
  { key: "risk", icon: <FaTableCells />, status: "ready" },
  { key: "design", icon: <FaCompassDrafting />, status: "review" },
  { key: "training", icon: <FaUserGraduate />, status: "ready" },
];

const SIGNALS = ["complete", "clear", "strong", "usable"] as const;

/** Document + quality seal — outline Quality Intelligence */
function QualityHubIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      {/* Document */}
      <path
        d="M10 6h16.5L34 13.5V40a2.5 2.5 0 0 1-2.5 2.5H10A2.5 2.5 0 0 1 7.5 40V8.5A2.5 2.5 0 0 1 10 6z"
        stroke="#fff"
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
      <path
        d="M26.5 6v7.5H34"
        stroke="#fff"
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
      {/* Text lines */}
      <path
        d="M13.5 20h12M13.5 25.5h12M13.5 31h8"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Quality seal circle */}
      <circle
        cx="34.5"
        cy="33.5"
        r="9.2"
        stroke="#fff"
        strokeWidth="2.1"
      />
      {/* Inner ring */}
      <circle
        cx="34.5"
        cy="33.5"
        r="6.2"
        stroke="#fff"
        strokeWidth="1.5"
        strokeDasharray="2.2 2.4"
      />
      {/* Check */}
      <path
        d="M30.8 33.4l2.4 2.4 5-5.2"
        stroke="#fff"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlatformQualityDiagram() {
  const t = useTranslations("platformPage.qualityDiagram");

  return (
    <div className="platform-doc-diagram platform-q-diagram">
      <div className="platform-doc-diagram-grid">
        <div className="platform-doc-col">
          <p className="platform-doc-col-label">{t("leftLabel")}</p>
          <div className="platform-doc-files-block">
            <ul className="platform-doc-files platform-q-docs">
              {DOCS.map(({ key, icon }) => (
                <li key={key} className="platform-doc-file platform-q-doc">
                  <span className="platform-q-doc-icon" aria-hidden="true">
                    {icon}
                  </span>
                  <span className="platform-doc-file-name">{t(`docs.${key}`)}</span>
                  <span className="platform-doc-file-stub" aria-hidden="true" />
                </li>
              ))}
            </ul>
            <span className="platform-doc-files-spine" aria-hidden="true" />
          </div>
        </div>

        <PlatformIqHubChrome
          step="03"
          stepLabel={t("stepPill")}
          hubTitle={t("hubTitle")}
          hubIcon={<QualityHubIcon />}
          stageClassName="platform-q-hub-stage-signals"
          belowHub={
            <div className="platform-q-signals-below">
              {SIGNALS.map((s) => (
                <span key={s} className="platform-q-signal-tag">
                  {t(`signals.${s}`)}
                </span>
              ))}
            </div>
          }
        />

        <div className="platform-doc-col">
          <p className="platform-doc-col-label platform-doc-col-label-right platform-q-label-right">
            {t("rightLabel")}
          </p>
          <div className="platform-doc-identified platform-q-identified">
            <ul className="platform-doc-identified-list">
              {DOCS.map(({ key, status }) => (
                <li
                  key={key}
                  className="platform-doc-identified-card platform-q-ready-card"
                >
                  <span className="platform-doc-type-name">{t(`docs.${key}`)}</span>
                  <span className="platform-doc-type-divider" aria-hidden="true" />
                  <span
                    className={
                      status === "review"
                        ? "platform-q-status is-review"
                        : "platform-q-status is-ready"
                    }
                  >
                    {status === "review" ? t("closerReview") : t("appearsReady")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
