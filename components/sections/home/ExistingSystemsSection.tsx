"use client";

import {
  HomeNarrativeHeader,
  HomeNarrativeText,
} from "@/components/sections/home/HomeNarrativeHeader";
import {
  FaClipboardCheck,
  FaCompassDrafting,
  FaFileCircleCheck,
  FaFileShield,
  FaPaperPlane,
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
  { id: "qms", Icon: FaClipboardCheck, slot: "qms" },
  { id: "plm", Icon: FaCompassDrafting, slot: "plm" },
  { id: "rim", Icon: FaPaperPlane, slot: "rim" },
  { id: "documents", Icon: FaFileCircleCheck, slot: "documents" },
];

const MANUAL_PILLS = ["spreadsheets", "crossRef", "email"] as const;

function TodayChip({
  label,
  detail,
  Icon,
}: {
  label: string;
  detail: string;
  Icon: IconType;
}) {
  return (
    <div className="es-chip es-chip-today">
      <span className="es-chip-today-icon" aria-hidden="true">
        <Icon />
      </span>
      <span className="es-chip-copy">
        <span className="es-chip-title es-chip-title-today">{label}</span>
        <span className="es-chip-detail es-chip-detail-today">{detail}</span>
      </span>
    </div>
  );
}

function TodayPanel({ t }: { t: (key: string) => string }) {
  return (
    <article className="es-panel es-panel-today">
      <p className="es-panel-label">{t("todayLabel")}</p>

      <div className="es-diagram es-diagram-today" aria-hidden="true">
        {/* Connectors use % coords so they always meet the HTML chips + circle */}
        <svg
          className="es-link-today-hub"
          viewBox="0 0 100 100"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line className="es-line-today es-line-today-slow" x1="50" y1="8" x2="50" y2="40" />
          <line className="es-line-today es-line-today-slow" x1="14" y1="24" x2="50" y2="40" />
          <line className="es-line-today es-line-today-slow" x1="86" y1="24" x2="50" y2="40" />
          <line className="es-line-today es-line-today-slow" x1="14" y1="56" x2="50" y2="40" />
          <line className="es-line-today es-line-today-slow" x1="86" y1="56" x2="50" y2="40" />
        </svg>

        <div className="es-node es-node-regs">
          <FaFileShield aria-hidden="true" />
          <span>{t("regulations")}</span>
        </div>

        {TODAY_NODES.map(({ id, Icon, slot }) => (
          <div key={id} className={`es-node es-node-${slot}`}>
            <TodayChip
              label={t(`systems.${id}`)}
              detail={t(`systems.${id}Detail`)}
              Icon={Icon}
            />
          </div>
        ))}

        <div className="es-node es-node-team">
          <div className="es-team-circle es-team-circle-today">
            <FaUsers aria-hidden="true" />
            <span>{t("qaRaTeams")}</span>
          </div>
        </div>

        <div className="es-node es-node-manual">
          <div className="es-manual-row">
            {MANUAL_PILLS.map((id) => (
              <span key={id} className="es-manual-pill">
                {t(`manual.${id}`)}
              </span>
            ))}
          </div>
          <span className="es-relationships-pill">
            <span className="es-relationships-dot" aria-hidden="true" />
            {t("relationshipsMissed")}
          </span>
        </div>
      </div>

      <div className="es-panel-divider es-panel-divider-today" aria-hidden="true" />
      <p className="es-panel-caption es-panel-caption-today">
        <span className="es-caption-lead-today">{t("todayCaptionLead")}</span>
        <span className="es-caption-accent-today">{t("todayCaptionAccent")}</span>
      </p>
    </article>
  );
}

function SuricatChip({
  label,
  detail,
  children,
}: {
  label: string;
  detail: string;
  children: ReactNode;
}) {
  return (
    <div className="es-chip es-chip-suricat">
      <span className="es-chip-suricat-icon" aria-hidden="true">
        {children}
      </span>
      <span className="es-chip-copy">
        <span className="es-chip-title">{label}</span>
        <span className="es-chip-detail">{detail}</span>
      </span>
    </div>
  );
}

function SuricatPanel({ t }: { t: (key: string) => string }) {
  return (
    <article className="es-panel es-panel-suricat">
      <p className="es-panel-label es-panel-label-suricat">{t("suricatLabel")}</p>

      <div className="es-diagram es-diagram-suricat" aria-hidden="true">
        {/* Regulations → Suricat hub (solid + end arrow) */}
        <div className="es-link-regs-hub" aria-hidden="true">
          <svg
            className="es-link-regs-hub-arrow"
            viewBox="0 0 14 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 2.5 L7 9.5 L12 2.5"
              fill="none"
              stroke="#5c3d8f"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* QMS / RIM / PLM / Document Control → Suricat hub */}
        <svg
          className="es-link-systems-hub"
          viewBox="0 0 100 100"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Anchor on inward-facing side centers (not box corners) */}
          <path className="es-link-to-hub" d="M26 20 L50 36" />
          <path className="es-link-to-hub" d="M74 20 L50 36" />
          <path className="es-link-to-hub" d="M26 52 L50 36" />
          <path className="es-link-to-hub" d="M74 52 L50 36" />
        </svg>
        <span className="es-hub-doc es-hub-doc-qms" aria-hidden="true" />
        <span className="es-hub-doc es-hub-doc-rim" aria-hidden="true" />
        <span className="es-hub-doc es-hub-doc-plm" aria-hidden="true" />
        <span className="es-hub-doc es-hub-doc-docs" aria-hidden="true" />

        <div className="es-node es-node-regs es-node-regs-suricat">
          <FaFileShield aria-hidden="true" />
          <span>{t("regulations")}</span>
        </div>

        <div className="es-node es-node-qms es-node-suricat-qms">
          <SuricatChip label={t("systems.qms")} detail={t("systems.qmsDetail")}>
            <FaClipboardCheck />
          </SuricatChip>
        </div>

        <div className="es-node es-node-rim es-node-suricat-rim">
          <SuricatChip
            label={t("systems.regulatoryFiles")}
            detail={t("systems.rimDetail")}
          >
            <FaPaperPlane />
          </SuricatChip>
        </div>

        <div className="es-node es-node-plm es-node-suricat-plm">
          <SuricatChip
            label={t("systems.designDevFiles")}
            detail={t("systems.plmDetail")}
          >
            <FaCompassDrafting />
          </SuricatChip>
        </div>

        <div className="es-node es-node-documents es-node-suricat-docs">
          <SuricatChip
            label={t("systems.documents")}
            detail={t("systems.documentsDetail")}
          >
            <FaFileCircleCheck />
          </SuricatChip>
        </div>

        <div className="es-node es-node-hub">
          <div className="es-suricat-hub">
            <Image
              src="/assets/images/suricat-logo-mark-center.svg"
              alt=""
              width={42}
              height={42}
              className="es-suricat-hub-logo"
            />
            <span>{t("suricatName")}</span>
          </div>
        </div>

        {/* Suricat hub → orange pill — plain line, no arrowhead */}
        <div className="es-link-hub-misalign" aria-hidden="true" />

        <div className="es-node es-node-misalign">
          <span className="es-misalign-pill es-misalign-pill-outline">
            <span className="es-misalign-left">
              <span className="es-misalign-dot" />
              {t("misalignments")}
            </span>
            <span className="es-misalign-sep" aria-hidden="true" />
            <span className="es-misalign-right">{t("evidenceLinked")}</span>
          </span>
        </div>

        {/* Orange pill → team circle — plain line, no arrowhead */}
        <div className="es-link-misalign-team" aria-hidden="true" />

        <div className="es-node es-node-team-bottom">
          <div className="es-team-circle es-team-circle-suricat">
            <FaUsers aria-hidden="true" />
            <span>{t("qaRaTeams")}</span>
          </div>
        </div>
      </div>

      <p className="es-panel-caption es-panel-caption-suricat">
        <span className="es-caption-lead">{t("suricatCaptionLead")}</span>
        <span className="es-caption-accent">{t("suricatCaptionAccent")}</span>
      </p>
      <p className="es-panel-note">{t("suricatNote")}</p>
    </article>
  );
}

export function ExistingSystemsSection() {
  const t = useTranslations("home.existingSystems");

  return (
    <section id="existing-systems" className="bg-white pt-12 pb-10">
      <Container>
        <HomeNarrativeHeader eyebrow={t("sectionTitle")} title={t("headline")}>
          <HomeNarrativeText fullWidth>{t("p1")}</HomeNarrativeText>
          <HomeNarrativeText fullWidth>{t("p2")}</HomeNarrativeText>
          <p className="es-p3-emphasis">{t("p3")}</p>
        </HomeNarrativeHeader>

        <div className="existing-systems-story es-compare">
          <TodayPanel t={t} />
          <SuricatPanel t={t} />
        </div>
      </Container>
    </section>
  );
}
