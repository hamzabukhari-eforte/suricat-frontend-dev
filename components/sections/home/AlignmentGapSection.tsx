"use client";

import {
  HomeNarrativeHeader,
  HomeNarrativeText,
} from "@/components/sections/home/HomeNarrativeHeader";
import {
  FaClipboardList,
  FaCompassDrafting,
  FaFileLines,
  FaFileShield,
  FaRegFileLines,
  FaRotate,
  FaUserGraduate,
} from "@/components/ui/icons";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import type { IconType } from "react-icons";
import { Container } from "@/components/ui/Container";
import { useEffect, useRef } from "react";

function MidCard({
  title,
  Icon,
  badge,
  badgeTone = "purple",
  iconTone,
  orangeDrop = false,
  step,
}: {
  title: string;
  Icon: IconType;
  badge?: string;
  badgeTone?: "purple" | "orange" | "blue";
  iconTone?: "purple" | "orange" | "teal";
  orangeDrop?: boolean;
  step: number;
}) {
  const tone = iconTone ?? (badgeTone === "blue" ? "teal" : badgeTone);
  return (
    <div
      className={`agv-mid-card agv-mid-card-${tone}${orangeDrop ? " agv-mid-card-drop" : ""} agv-step agv-step-${step}`}
    >
      <div className="agv-mid-head">
        <span className={`agv-mid-icon agv-mid-icon-${tone}`} aria-hidden="true">
          <Icon />
        </span>
        <p className="agv-mid-title">{title}</p>
      </div>
      {badge ? (
        <span className={`agv-mid-badge agv-mid-badge-${badgeTone}`}>{badge}</span>
      ) : null}
    </div>
  );
}

function AlignmentDiagram({ t }: { t: (key: string) => string }) {
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = visualRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-agv-play");
      return;
    }

    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-agv-play");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          // Restart sequence every time the diagram re-enters view
          el.classList.remove("is-agv-play");
          void el.offsetWidth;
          el.classList.add("is-agv-play");
        } else {
          el.classList.remove("is-agv-play");
        }
      },
      { threshold: 0.28 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={visualRef}
      className="agv-visual"
      aria-label={t("visual.kicker")}
    >
      <p className="agv-header agv-step agv-step-0">{t("visual.kicker")}</p>

      <div className="agv-req agv-step agv-step-1">
        <span className="agv-req-icon" aria-hidden="true">
          <FaFileLines />
        </span>
        <div className="agv-req-copy">
          <p className="agv-req-title">{t("nodes.requirement")}</p>
          <p className="agv-req-sub">{t("nodes.requirementSub")}</p>
        </div>
        <span className="agv-req-badge">{t("badges.revised")}</span>
        <span className="agv-req-drop" aria-hidden="true" />
      </div>

      <div className="agv-branch agv-step agv-step-2" aria-hidden="true">
        <span className="agv-branch-bar" />
        <div className="agv-branch-legs">
          <div className="agv-branch-leg-group">
            <span />
            <span />
          </div>
          <div className="agv-branch-leg-group">
            <span />
            <span />
          </div>
          <div className="agv-branch-leg-group agv-branch-leg-single">
            <span />
          </div>
        </div>
      </div>

      <div className="agv-groups">
        <div className="agv-group agv-step agv-step-2">
          <div className="agv-group-cards">
            <MidCard
              title={t("nodes.procedure")}
              Icon={FaClipboardList}
              badge={t("badges.updatedRevD")}
              badgeTone="purple"
              iconTone="purple"
              orangeDrop
              step={2}
            />
            <MidCard
              title={t("nodes.capa")}
              Icon={FaRotate}
              badge={t("badges.affectedQ")}
              badgeTone="blue"
              iconTone="teal"
              step={3}
            />
          </div>
          <p className="agv-group-label">{t("groups.qms")}</p>
        </div>

        <div className="agv-group agv-step agv-step-4">
          <div className="agv-group-cards">
            <MidCard
              title={t("nodes.risk")}
              Icon={FaFileShield}
              badge={t("badges.affectedQ")}
              badgeTone="blue"
              iconTone="teal"
              step={4}
            />
            <MidCard
              title={t("nodes.design")}
              Icon={FaCompassDrafting}
              badge={t("badges.affectedQ")}
              badgeTone="blue"
              iconTone="teal"
              step={5}
            />
          </div>
          <p className="agv-group-label">{t("groups.design")}</p>
        </div>

        <div className="agv-group agv-group-single agv-step agv-step-6">
          <div className="agv-group-cards">
            <MidCard
              title={t("nodes.training")}
              Icon={FaUserGraduate}
              badge={t("badges.trainedRevC")}
              badgeTone="orange"
              iconTone="orange"
              orangeDrop
              step={6}
            />
          </div>
          <p className="agv-group-label">{t("groups.training")}</p>
        </div>
      </div>

      <div className="agv-gap agv-step agv-step-7" aria-hidden="true">
        <div className="agv-gap-legs">
          <div className="agv-gap-leg-group">
            <span className="agv-gap-leg agv-gap-leg-on" />
            <span className="agv-gap-leg" />
          </div>
          <div className="agv-gap-leg-group">
            <span className="agv-gap-leg" />
            <span className="agv-gap-leg" />
          </div>
          <div className="agv-gap-leg-group agv-gap-leg-single">
            <span className="agv-gap-leg agv-gap-leg-on" />
          </div>
        </div>
        <span className="agv-gap-line" />
        <span className="agv-gap-pill">
          <span className="agv-gap-pill-rev">{t("gap.rev")}</span>
          <span className="agv-gap-pill-sep" />
          <span className="agv-gap-pill-text">{t("gap.label")}</span>
        </span>
      </div>

      <div className="agv-records agv-step agv-step-8">
        {/* 5 legs from each inner mid-card down to Records & Evidence */}
        <div className="agv-records-connectors" aria-hidden="true">
          <div className="agv-records-leg-group">
            <span className="agv-records-leg" />
            <span className="agv-records-leg" />
          </div>
          <div className="agv-records-leg-group">
            <span className="agv-records-leg" />
            <span className="agv-records-leg" />
          </div>
          <div className="agv-records-leg-group agv-records-leg-single">
            <span className="agv-records-leg" />
          </div>
        </div>

        <div className="agv-records-box">
          <div className="agv-records-row">
            <p className="agv-records-label">{t("recordsLabel")}</p>
            <div className="agv-records-rail" aria-hidden="true">
              <div className="agv-records-docs">
                <div className="agv-docs-spaced">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <span key={`s-${i}`} className="agv-doc-icon">
                      <FaRegFileLines />
                    </span>
                  ))}
                </div>
              </div>
              <span className="agv-records-arrow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AlignmentGapSection() {
  const t = useTranslations("home.alignmentGap");

  return (
    <section id="alignment-gap" className="bg-surface-muted pt-12 pb-10">
      <Container>
        <HomeNarrativeHeader eyebrow={t("sectionTitle")} title={t("headline")}>
          <HomeNarrativeText fullWidth>{t("lead")}</HomeNarrativeText>
          <HomeNarrativeText fullWidth>{t("p1")}</HomeNarrativeText>
          <p className="ag-emphasis-line">{t("p2")}</p>
        </HomeNarrativeHeader>

        <AlignmentDiagram t={t} />
      </Container>
    </section>
  );
}
