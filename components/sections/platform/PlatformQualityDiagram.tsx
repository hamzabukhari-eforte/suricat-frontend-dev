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

/** Signal waves — upright (no rotate), Suricat Quality Signals */
function QualityHubIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="18" r="1.6" fill="#fff" />
      <path
        d="M8.2 14.8a5.4 5.4 0 0 1 7.6 0"
        stroke="#fff"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M5.6 11.8a9.2 9.2 0 0 1 12.8 0"
        stroke="#fff"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M3.2 8.8a13 13 0 0 1 17.6 0"
        stroke="#fff"
        strokeWidth="1.25"
        strokeLinecap="round"
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
