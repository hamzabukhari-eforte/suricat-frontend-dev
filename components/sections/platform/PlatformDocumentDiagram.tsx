"use client";

import {
  FaClipboardCheck,
  FaClipboardList,
  FaFileLines,
  FaRotate,
  FaSitemap,
  FaTableCells,
  FaTriangleExclamation,
  FaUserGraduate,
} from "@/components/ui/icons";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import type { ReactNode } from "react";

function DesignControlIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 20V4l16 16H4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M8 20h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const FILES: { name: string; icon: ReactNode }[] = [
  { name: "SOP 05 Design Control", icon: <FaClipboardList /> },
  { name: "CAPA-00123", icon: <FaClipboardCheck /> },
  { name: "RSK0054 FMEA", icon: <FaTriangleExclamation /> },
  { name: "DHF 2504 Design History File", icon: <DesignControlIcon /> },
  { name: "Log 0343 Training Records", icon: <FaUserGraduate /> },
  {
    name: "Cleanroom Cleaning Record 5-05-2024",
    icon: <FaFileLines />,
  },
];

const IDENTIFIED: {
  key: "sop" | "capa" | "risk" | "design" | "training" | "records";
  icon: ReactNode;
}[] = [
  { key: "sop", icon: <FaSitemap /> },
  { key: "capa", icon: <FaRotate /> },
  { key: "risk", icon: <FaTableCells /> },
  { key: "design", icon: <DesignControlIcon /> },
  { key: "training", icon: <FaUserGraduate /> },
  { key: "records", icon: <FaFileLines /> },
];

function DocSearchIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6.5 3h7.4L19 8.1V19.2A1.3 1.3 0 0 1 17.7 20.5H6.5A1.3 1.3 0 0 1 5.2 19.2V4.3A1.3 1.3 0 0 1 6.5 3z"
        stroke="#fff"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path d="M13.7 3v5.1H19" stroke="#fff" strokeWidth="1.25" />
      <path
        d="M8.2 10.2h5.2M8.2 12.6h3.6"
        stroke="#fff"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <circle cx="13.6" cy="15.4" r="2.55" stroke="#fff" strokeWidth="1.25" />
      <path
        d="M15.4 17.2L17.6 19.4"
        stroke="#fff"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PlatformDocumentDiagram() {
  const t = useTranslations("platformPage.documentDiagram");

  return (
    <div className="platform-doc-diagram">
      <div className="platform-doc-diagram-grid">
        {/* LEFT */}
        <div className="platform-doc-col">
          <p className="platform-doc-col-label">{t("filesLabel")}</p>
          <div className="platform-doc-files-block">
            <ul className="platform-doc-files">
              {FILES.map(({ name, icon }) => (
                <li key={name} className="platform-doc-file">
                  <span className="platform-doc-file-icon" aria-hidden="true">
                    {icon}
                  </span>
                  <span className="platform-doc-file-name">{name}</span>
                  <span className="platform-doc-file-stub" aria-hidden="true" />
                </li>
              ))}
            </ul>
            <span className="platform-doc-files-spine" aria-hidden="true" />
          </div>
        </div>

        {/* CENTER */}
        <div className="platform-doc-center">
          <div className="platform-doc-hub-stage">
            <div className="platform-doc-step-pill">
              <span className="platform-doc-step-num">02</span>
              <span className="platform-doc-step-text">{t("stepPill")}</span>
            </div>
            <span className="platform-doc-pill-connector" aria-hidden="true" />

            {/* CSS line — length grows; no SVG stretch/distortion */}
            <span className="platform-doc-in-arrow" aria-hidden="true" />

            <div className="platform-doc-orbit" aria-hidden="true" />
            <div className="platform-doc-hub">
              <DocSearchIcon />
              <p className="platform-doc-hub-title">{t("hubTitle")}</p>
              <p className="platform-doc-hub-sub">{t("hubSub")}</p>
            </div>
            {/* Shaft stretches; arrowhead stays fixed (no SVG stretch) */}
            <div className="platform-doc-out-arrow" aria-hidden="true">
              <span className="platform-doc-out-arrow-shaft" />
              <svg
                className="platform-doc-out-arrow-head"
                width="18"
                height="16"
                viewBox="0 0 18 16"
                fill="none"
              >
                <path
                  d="M2 2l14 6-14 6"
                  stroke="#5C3D8F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="platform-doc-col">
          <p className="platform-doc-col-label platform-doc-col-label-right">
            {t("identifiedLabel")}
          </p>
          <div className="platform-doc-identified">
            <ul className="platform-doc-identified-list">
              {IDENTIFIED.map(({ key, icon }) => (
                <li key={key} className="platform-doc-identified-card">
                  <span className="platform-doc-type-icon" aria-hidden="true">
                    {icon}
                  </span>
                  <span className="platform-doc-type-name">
                    {t(`types.${key}.name`)}
                  </span>
                  <span className="platform-doc-type-divider" aria-hidden="true" />
                  <span className="platform-doc-type-role">
                    {t(`types.${key}.role`)}
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
