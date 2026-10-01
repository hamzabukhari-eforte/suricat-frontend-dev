"use client";

import {
  HomeNarrativeHeader,
  HomeNarrativeText,
} from "@/components/sections/home/HomeNarrativeHeader";
import {
  FaBuildingColumns,
  FaClipboardList,
  FaCopy,
  FaCube,
  FaFileLines,
  FaFolderOpen,
  FaMagnifyingGlass,
  FaUsers,
} from "@/components/ui/icons";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import Image from "next/image";
import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { Container } from "@/components/ui/Container";

const TODAY_NODES: {
  id: "qms" | "plm" | "rim" | "documents";
  Icon: IconType;
  slot: "qms" | "plm" | "rim" | "documents";
}[] = [
  { id: "qms", Icon: FaClipboardList, slot: "qms" },
  { id: "plm", Icon: FaCube, slot: "plm" },
  { id: "rim", Icon: FaFolderOpen, slot: "rim" },
  { id: "documents", Icon: FaFileLines, slot: "documents" },
];

const MANUAL_PILLS = ["spreadsheets", "crossRef", "email"] as const;

function SystemChip({
  label,
  Icon,
  tone,
}: {
  label: string;
  Icon: IconType;
  tone: "today" | "suricat";
}) {
  return (
    <div className={`es-chip es-chip-${tone}`}>
      <Icon aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

function TodayPanel({ t }: { t: (key: string) => string }) {
  return (
    <article className="es-panel es-panel-today">
      <p className="es-panel-label">{t("todayLabel")}</p>

      <div className="es-diagram" aria-hidden="true">
        <svg className="es-diagram-svg" viewBox="0 0 360 280" fill="none">
          <line className="es-line-today es-line-today-slow" x1="180" y1="40" x2="180" y2="105" />
          <line className="es-line-today es-line-today-slow" x1="54" y1="78" x2="145" y2="120" />
          <line className="es-line-today es-line-today-slow" x1="306" y1="78" x2="215" y2="120" />
          <line className="es-line-today es-line-today-slow" x1="54" y1="170" x2="145" y2="140" />
          <line className="es-line-today es-line-today-slow" x1="306" y1="170" x2="215" y2="140" />
        </svg>

        <div className="es-node es-node-regs">
          <FaBuildingColumns aria-hidden="true" />
          <span>{t("regulations")}</span>
        </div>

        {TODAY_NODES.map(({ id, Icon, slot }) => (
          <div key={id} className={`es-node es-node-${slot}`}>
            <SystemChip label={t(`systems.${id}`)} Icon={Icon} tone="today" />
          </div>
        ))}

        <div className="es-node es-node-team">
          <div className="es-team-circle es-team-circle-today es-team-slow">
            <FaUsers aria-hidden="true" />
            <span>{t("yourTeam")}</span>
          </div>
        </div>

        <div className="es-node es-node-manual">
          {MANUAL_PILLS.map((id) => (
            <span key={id} className="es-manual-pill es-manual-slow">
              {t(`manual.${id}`)}
            </span>
          ))}
        </div>
      </div>

      <p className="es-panel-caption">{t("todayCaption")}</p>
    </article>
  );
}

function FlowDocIcon() {
  return (
    <g filter="url(#es-glow-teal)" transform="scale(0.72)">
      <rect
        x="-9"
        y="-11"
        width="18"
        height="22"
        rx="2.5"
        fill="#071022"
        stroke="#19d3c5"
        strokeWidth="1.5"
      />
      <path
        d="M2 -11 V-5 H8"
        fill="none"
        stroke="#19d3c5"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M2 -11 L8 -5" stroke="#19d3c5" strokeWidth="1.5" />
      <line x1="-5" y1="0" x2="4" y2="0" stroke="#19d3c5" strokeWidth="1.25" />
      <line x1="-5" y1="3.5" x2="4" y2="3.5" stroke="#19d3c5" strokeWidth="1.25" />
      <line x1="-5" y1="7" x2="1" y2="7" stroke="#19d3c5" strokeWidth="1.25" />
    </g>
  );
}

function FlowingDoc({
  pathId,
  dur,
  begin,
}: {
  pathId: string;
  dur: string;
  begin: string;
}) {
  return (
    <g className="es-flow-doc">
      <FlowDocIcon />
      <animateMotion
        dur={dur}
        begin={begin}
        repeatCount="indefinite"
        rotate="0"
        keyPoints="0;1"
        keyTimes="0;1"
        calcMode="linear"
      >
        <mpath href={`#${pathId}`} />
      </animateMotion>
      <animate
        attributeName="opacity"
        values="0;1;1;0"
        keyTimes="0;0.12;0.82;1"
        dur={dur}
        begin={begin}
        repeatCount="indefinite"
      />
    </g>
  );
}

function SuricatChip({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="es-chip es-chip-suricat">
      <span className="es-chip-icon" aria-hidden="true">
        {children}
      </span>
      <span>{label}</span>
    </div>
  );
}

function SuricatPanel({ t }: { t: (key: string) => string }) {
  return (
    <article className="es-panel es-panel-suricat">
      <p className="es-panel-label es-panel-label-suricat">{t("suricatLabel")}</p>

      <div className="es-diagram es-diagram-suricat" aria-hidden="true">
        <svg className="es-diagram-svg" viewBox="0 0 400 280" fill="none">
          <defs>
            <marker
              id="es-arr-teal"
              viewBox="0 0 12 12"
              refX="9"
              refY="6"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path
                d="M1.5 2 L10 6 L1.5 10"
                fill="none"
                stroke="#19d3c5"
                strokeWidth="1.6"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </marker>
            <marker
              id="es-arr-violet"
              viewBox="0 0 12 12"
              refX="9"
              refY="6"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path
                d="M1.5 2 L10 6 L1.5 10"
                fill="none"
                stroke="#5c3d8f"
                strokeWidth="1.6"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </marker>
            <filter id="es-glow-teal" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="1.4"
                floodColor="#19d3c5"
                floodOpacity="0.65"
              />
            </filter>
          </defs>

          {/* Motion paths: systems → Suricat */}
          <path id="es-path-qms" d="M95 72 L168 108" fill="none" />
          <path id="es-path-rim" d="M305 72 L232 108" fill="none" />
          <path id="es-path-plm" d="M95 165 L168 130" fill="none" />
          <path id="es-path-docs" d="M305 165 L232 130" fill="none" />
          <path id="es-path-regs" d="M200 38 L200 88" fill="none" />
          {/* Hub → Potential misalignments */}
          <path id="es-path-hub-misalign" d="M200 135 L200 158" fill="none" />
          {/* Potential misalignments → Your Team — stop short of the circle */}
          <path id="es-path-misalign-team" d="M200 178 L200 215" fill="none" />

          {/* Visible connectors */}
          <use href="#es-path-regs" stroke="#5c3d8f" strokeWidth="2" markerEnd="url(#es-arr-violet)" />
          <use
            href="#es-path-qms"
            stroke="#19d3c5"
            strokeWidth="2"
            filter="url(#es-glow-teal)"
            markerEnd="url(#es-arr-teal)"
          />
          <use
            href="#es-path-rim"
            stroke="#19d3c5"
            strokeWidth="2"
            filter="url(#es-glow-teal)"
            markerEnd="url(#es-arr-teal)"
          />
          <use
            href="#es-path-plm"
            stroke="#19d3c5"
            strokeWidth="2"
            filter="url(#es-glow-teal)"
            markerEnd="url(#es-arr-teal)"
          />
          <use
            href="#es-path-docs"
            stroke="#19d3c5"
            strokeWidth="2"
            filter="url(#es-glow-teal)"
            markerEnd="url(#es-arr-teal)"
          />
          <use
            href="#es-path-hub-misalign"
            stroke="#19d3c5"
            strokeWidth="2.25"
            filter="url(#es-glow-teal)"
            markerEnd="url(#es-arr-teal)"
          />
          <use
            href="#es-path-misalign-team"
            stroke="#19d3c5"
            strokeWidth="2.25"
            filter="url(#es-glow-teal)"
          />

          {/* Docs leave each system and fly into Suricat */}
          <FlowingDoc pathId="es-path-qms" dur="3.2s" begin="0.4s" />
          <FlowingDoc pathId="es-path-qms" dur="3.2s" begin="2s" />
          <FlowingDoc pathId="es-path-rim" dur="3.2s" begin="0.85s" />
          <FlowingDoc pathId="es-path-rim" dur="3.2s" begin="2.45s" />
          <FlowingDoc pathId="es-path-plm" dur="3.2s" begin="1.3s" />
          <FlowingDoc pathId="es-path-plm" dur="3.2s" begin="2.9s" />
          <FlowingDoc pathId="es-path-docs" dur="3.2s" begin="1.75s" />
          <FlowingDoc pathId="es-path-docs" dur="3.2s" begin="3.35s" />
        </svg>

        <div className="es-node es-node-regs es-node-regs-suricat">
          <FaBuildingColumns aria-hidden="true" />
          <span>{t("regulations")}</span>
        </div>

        <div className="es-node es-node-qms es-node-suricat-qms">
          <SuricatChip label={t("systems.qms")}>
            <FaClipboardList />
          </SuricatChip>
        </div>

        <div className="es-node es-node-rim es-node-suricat-rim">
          <SuricatChip label={t("systems.rim")}>
            <span className="es-rim-icon">
              <FaFileLines />
              <FaMagnifyingGlass className="es-rim-glass" />
            </span>
          </SuricatChip>
        </div>

        <div className="es-node es-node-plm es-node-suricat-plm">
          <SuricatChip label={t("systems.plm")}>
            <FaCube />
          </SuricatChip>
        </div>

        <div className="es-node es-node-documents es-node-suricat-docs">
          <SuricatChip label={t("systems.documents")}>
            <FaCopy />
          </SuricatChip>
        </div>

        <div className="es-node es-node-hub">
          <div className="es-suricat-hub es-suricat-hub-pulse">
            <Image
              src="/assets/images/suricat-logo-mark-center.svg"
              alt=""
              width={36}
              height={36}
              className="es-suricat-hub-logo"
            />
            <span>{t("suricatName")}</span>
          </div>
        </div>

        <div className="es-node es-node-misalign">
          <span className="es-misalign-pill es-misalign-pill-outline es-misalign-fast">
            <span className="es-misalign-dot" />
            {t("misalignments")}
          </span>
        </div>

        {/* Explicit HTML connector so the line stays visible above the diagram */}
        <div className="es-link-misalign-team" aria-hidden="true">
          <span className="es-link-misalign-team-arrow" />
        </div>

        <div className="es-node es-node-team-bottom">
          <div className="es-team-circle es-team-circle-suricat es-team-fast">
            <FaUsers aria-hidden="true" />
            <span>{t("yourTeam")}</span>
          </div>
        </div>
      </div>

      <p className="es-panel-note">{t("suricatNote")}</p>
      <div className="es-panel-divider" aria-hidden="true" />
      <p className="es-panel-caption es-panel-caption-suricat">
        <span>{t("suricatCaptionLead")}</span>{" "}
        <span className="es-caption-accent">{t("suricatCaptionAccent")}</span>
      </p>
    </article>
  );
}

export function ExistingSystemsSection() {
  const t = useTranslations("home.existingSystems");

  return (
    <section id="existing-systems" className="bg-surface-muted pt-12 pb-10">
      <Container>
        <HomeNarrativeHeader eyebrow={t("sectionTitle")} title={t("headline")}>
          <HomeNarrativeText fullWidth>{t("p1")}</HomeNarrativeText>
          <HomeNarrativeText fullWidth>{t("p2")}</HomeNarrativeText>
          <HomeNarrativeText fullWidth>{t("p3")}</HomeNarrativeText>
          <p className="mb-0 max-w-none text-base font-semibold leading-relaxed text-navy sm:text-lg lg:text-[20px] lg:leading-[28px]">
            {t("p4")}
          </p>
        </HomeNarrativeHeader>

        <div className="existing-systems-story es-compare">
          <TodayPanel t={t} />
          <SuricatPanel t={t} />
        </div>
      </Container>
    </section>
  );
}
