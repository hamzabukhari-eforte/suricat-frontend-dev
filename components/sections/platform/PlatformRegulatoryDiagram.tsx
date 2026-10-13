"use client";

import {
  FaBuildingColumns,
  FaCheck,
  FaFileLines,
  FaLayerGroup,
} from "@/components/ui/icons";
import { useTranslations } from "@/components/i18n/LocaleProvider";

type Tag = { label: string; active: boolean };

type UniverseCard = {
  key: "regulations" | "standards" | "guidance";
  Icon: typeof FaBuildingColumns;
  tags: Tag[];
};

const UNIVERSE: UniverseCard[] = [
  {
    key: "regulations",
    Icon: FaBuildingColumns,
    tags: [
      { label: "FDA QMSR", active: true },
      { label: "EU MDR", active: true },
      { label: "EU IVDR", active: false },
    ],
  },
  {
    key: "standards",
    Icon: FaLayerGroup,
    tags: [
      { label: "ISO 13485", active: true },
      { label: "ISO 14971", active: true },
      { label: "ISO 15189", active: false },
    ],
  },
  {
    key: "guidance",
    Icon: FaFileLines,
    tags: [
      { label: "FDA guidance", active: true },
      { label: "MDCG", active: true },
      { label: "Other guidance", active: false },
    ],
  },
];

const APPLIES = [
  { key: "regulations" as const, detail: "FDA QMSR · EU MDR" },
  { key: "standards" as const, detail: "ISO 13485 · ISO 14971" },
  { key: "guidance" as const, detail: "FDA guidance · MDCG" },
];

function FunnelIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 5h16l-6 7.5V18l-4 2v-7.5L4 5z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function PlatformRegulatoryDiagram() {
  const t = useTranslations("platformPage.regulatoryDiagram");

  return (
    <div className="platform-reg-diagram">
      <div className="platform-reg-diagram-grid">
        {/* Left: universe */}
        <div className="platform-reg-col">
          <p className="platform-reg-col-label">{t("universeLabel")}</p>
          <ul className="platform-reg-universe">
            {UNIVERSE.map(({ key, Icon, tags }) => (
              <li key={key} className="platform-reg-universe-card">
                <div className="platform-reg-universe-head">
                  <span className="platform-reg-icon-wrap" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="platform-reg-universe-title">
                    {t(`cards.${key}`)}
                  </span>
                </div>
                <div className="platform-reg-tags">
                  {tags.map((tag) => (
                    <span
                      key={tag.label}
                      className={
                        tag.active
                          ? "platform-reg-tag platform-reg-tag-active"
                          : "platform-reg-tag platform-reg-tag-inactive"
                      }
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Center: organizational context */}
        <div className="platform-reg-center">
          <div className="platform-reg-hub-wrap">
            <div className="platform-reg-step-pill">
              <span className="platform-reg-step-num">01</span>
              <span>{t("stepPill")}</span>
            </div>
            <span className="platform-reg-pill-connector" aria-hidden="true" />

            <svg
              className="platform-reg-curves"
              viewBox="0 0 160 280"
              fill="none"
              aria-hidden="true"
            >
              {/* Stub from each card vertical center → spine */}
              <path
                d="M0 22H30"
                stroke="#5C3D8F"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M0 140H30"
                stroke="#5C3D8F"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M0 258H30"
                stroke="#5C3D8F"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              {/* Vertical spine */}
              <path
                d="M30 22V258"
                stroke="#5C3D8F"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              {/* Solid line from spine mid → circle center */}
              <path
                d="M30 140H140"
                stroke="#5C3D8F"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
              {/* Open outline arrowhead toward circle center */}
              <path
                d="M132 131.5l14 8.5-14 8.5"
                stroke="#5C3D8F"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>

            <div className="platform-reg-hub-orbit" aria-hidden="true" />
            <div className="platform-reg-hub">
              <span className="platform-reg-hub-icon">
                <FunnelIcon />
              </span>
              <p className="platform-reg-hub-title">{t("hubTitle")}</p>
              <ul className="platform-reg-hub-list">
                <li>
                  {t("hubProducts")} · {t("hubMarkets")}
                </li>
                <li>{t("hubOperations")}</li>
              </ul>
            </div>

            <svg
              className="platform-reg-out-arrow"
              viewBox="0 0 120 28"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* Foundation outbound: solid line + open arrow */}
              <path
                d="M2 14H100"
                stroke="#5C3D8F"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
              <path
                d="M96 6.5l16 7.5-16 7.5"
                stroke="#5C3D8F"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* Right: what applies */}
        <div className="platform-reg-col">
          <p className="platform-reg-col-label platform-reg-col-label-right">
            {t("appliesLabel")}
          </p>
          <div className="platform-reg-applies">
            <div className="platform-reg-applies-head">
              <span className="platform-reg-applies-icon" aria-hidden="true">
                <FaFileLines />
              </span>
              <span>{t("appliesTitle")}</span>
            </div>
            <ul className="platform-reg-applies-list">
              {APPLIES.map(({ key, detail }) => (
                <li key={key} className="platform-reg-applies-card">
                  <span className="platform-reg-check" aria-hidden="true">
                    <FaCheck />
                  </span>
                  <div>
                    <p className="platform-reg-applies-card-title">
                      {t(`cards.${key}`)}
                    </p>
                    <p className="platform-reg-applies-card-detail">{detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
