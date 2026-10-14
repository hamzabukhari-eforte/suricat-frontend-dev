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
} from "@/components/ui/icons";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import type { IconType } from "react-icons";
import { Container } from "@/components/ui/Container";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

function MidCard({
  title,
  Icon,
  badge,
  badgeTone = "purple",
  iconTone,
  orangeDrop = false,
  step,
  badgeRef,
  cardRef,
}: {
  title: string;
  Icon: IconType;
  badge?: string;
  badgeTone?: "purple" | "orange" | "blue";
  iconTone?: "purple" | "orange" | "teal";
  orangeDrop?: boolean;
  step: number;
  badgeRef?: RefObject<HTMLSpanElement | null>;
  cardRef?: RefObject<HTMLDivElement | null>;
}) {
  const tone = iconTone ?? (badgeTone === "blue" ? "teal" : badgeTone);
  return (
    <div
      ref={cardRef}
      className={`agv-mid-card agv-mid-card-${tone}${orangeDrop ? " agv-mid-card-drop" : ""} agv-step agv-step-${step}`}
    >
      <div className="agv-mid-head">
        <span className={`agv-mid-icon agv-mid-icon-${tone}`} aria-hidden="true">
          <Icon />
        </span>
        <p className="agv-mid-title">{title}</p>
      </div>
      {badge ? (
        <span
          ref={badgeRef}
          className={`agv-mid-badge agv-mid-badge-${badgeTone}`}
        >
          {badge}
        </span>
      ) : null}
    </div>
  );
}

type OrangeLink = {
  x1: number;
  x2: number;
  yTop1: number;
  yTop2: number;
  yBand: number;
  pillX: number;
  pillY: number;
  pillW: number;
  pillH: number;
};

type BlueLeg = {
  x: number;
  yTop: number;
  height: number;
};

function AlignmentDiagram({ t }: { t: (key: string) => string }) {
  const visualRef = useRef<HTMLDivElement>(null);
  const procBadgeRef = useRef<HTMLSpanElement>(null);
  const riskBadgeRef = useRef<HTMLSpanElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const recordsBoxRef = useRef<HTMLDivElement>(null);
  const procCardRef = useRef<HTMLDivElement>(null);
  const capaCardRef = useRef<HTMLDivElement>(null);
  const riskCardRef = useRef<HTMLDivElement>(null);
  const designCardRef = useRef<HTMLDivElement>(null);
  const branchRef = useRef<HTMLDivElement>(null);
  const [link, setLink] = useState<OrangeLink | null>(null);
  const [blueLegs, setBlueLegs] = useState<BlueLeg[]>([]);
  const [branchBar, setBranchBar] = useState<{ left: number; width: number } | null>(
    null,
  );

  const measureLinksRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const el = visualRef.current;
    if (!el) return;

    const kickMeasure = () => {
      window.requestAnimationFrame(() => measureLinksRef.current?.());
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-agv-play");
      kickMeasure();
      return;
    }

    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-agv-play");
      kickMeasure();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          el.classList.remove("is-agv-play");
          void el.offsetWidth;
          el.classList.add("is-agv-play");
          kickMeasure();
          window.setTimeout(kickMeasure, 600);
          window.setTimeout(kickMeasure, 1600);
          window.setTimeout(kickMeasure, 2400);
        } else {
          el.classList.remove("is-agv-play");
        }
      },
      { threshold: 0.28 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const visual = visualRef.current;
    const procBadge = procBadgeRef.current;
    const riskBadge = riskBadgeRef.current;
    if (!visual || !procBadge || !riskBadge) return;

    const measure = () => {
      const v = visual.getBoundingClientRect();
      // Absolute children are positioned against the padding edge
      const borderLeft = visual.clientLeft;
      const borderTop = visual.clientTop;
      const p = procBadge.getBoundingClientRect();
      const r = riskBadge.getBoundingClientRect();
      const pill = pillRef.current?.getBoundingClientRect();

      const x1 = p.left + p.width / 2 - v.left - borderLeft;
      const x2 = r.left + r.width / 2 - v.left - borderLeft;
      const yTop1 = p.bottom - v.top - borderTop;
      const yTop2 = r.bottom - v.top - borderTop;

      // Horizontal band + pill sit below badges / group labels
      const yBand = Math.max(yTop1, yTop2) + 96;
      const pillW = pill?.width ?? 220;
      const pillH = pill?.height ?? 36;
      const pillX = (x1 + x2) / 2 - pillW / 2 - 88;
      const pillY = yBand - pillH / 2;

      setLink({ x1, x2, yTop1, yTop2, yBand, pillX, pillY, pillW, pillH });

      const recordsBox = recordsBoxRef.current;
      const cards = [
        procCardRef.current,
        capaCardRef.current,
        riskCardRef.current,
        designCardRef.current,
      ];
      if (recordsBox && cards.every(Boolean)) {
        const rb = recordsBox.getBoundingClientRect();
        // Stop a bit above Records so the tip is not stuck flush to the card
        const yEnd = rb.top - v.top - borderTop - 14;
        setBlueLegs(
          cards.map((card) => {
            const c = card!.getBoundingClientRect();
            const x = c.left + c.width / 2 - v.left - borderLeft;
            // Start at mid-card bottom so the line touches then leaves the card
            const yTop = c.bottom - v.top - borderTop;
            return { x, yTop, height: Math.max(0, yEnd - yTop) };
          }),
        );
      }

      // Purple bar ends exactly on first/last drop legs (no overhang)
      const branch = branchRef.current;
      const procCard = procCardRef.current;
      const designCard = designCardRef.current;
      if (branch && procCard && designCard) {
        const br = branch.getBoundingClientRect();
        const pc = procCard.getBoundingClientRect();
        const dc = designCard.getBoundingClientRect();
        const xFirst = pc.left + pc.width / 2 - br.left;
        const xLast = dc.left + dc.width / 2 - br.left;
        setBranchBar({
          left: xFirst,
          width: Math.max(0, xLast - xFirst),
        });
      }
    };

    measureLinksRef.current = measure;
    measure();
    const ro = new ResizeObserver(() => measure());
    ro.observe(visual);
    ro.observe(procBadge);
    ro.observe(riskBadge);
    if (recordsBoxRef.current) ro.observe(recordsBoxRef.current);
    for (const card of [
      procCardRef.current,
      capaCardRef.current,
      riskCardRef.current,
      designCardRef.current,
    ]) {
      if (card) ro.observe(card);
    }
    window.addEventListener("resize", measure);
    const t1 = window.setTimeout(measure, 100);
    const t2 = window.setTimeout(measure, 700);
    const t3 = window.setTimeout(measure, 2200);

    return () => {
      measureLinksRef.current = null;
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  const leftX = link ? Math.min(link.x1, link.x2) : 0;
  const rightX = link ? Math.max(link.x1, link.x2) : 0;
  const pillGap = 14;
  const hLeftW = link
    ? Math.max(0, link.pillX - pillGap - leftX)
    : 0;
  const hRightX = link ? link.pillX + link.pillW + pillGap : 0;
  const hRightW = link ? Math.max(0, rightX - hRightX) : 0;

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

      <div
        ref={branchRef}
        className="agv-branch agv-step agv-step-2"
        aria-hidden="true"
      >
        <span
          className="agv-branch-bar"
          style={
            branchBar
              ? {
                  left: branchBar.left,
                  width: branchBar.width,
                  right: "auto",
                }
              : undefined
          }
        />
        <div className="agv-branch-legs">
          <div className="agv-branch-leg-group">
            <span />
            <span />
          </div>
          <div className="agv-branch-leg-group">
            <span />
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
              badgeRef={procBadgeRef}
              cardRef={procCardRef}
            />
            <MidCard
              title={t("nodes.capa")}
              Icon={FaRotate}
              badge={t("badges.affectedQ")}
              badgeTone="blue"
              iconTone="teal"
              step={3}
              cardRef={capaCardRef}
            />
          </div>
          <p className="agv-group-label">{t("groups.qms")}</p>
        </div>

        <div className="agv-group agv-step agv-step-4">
          <div className="agv-group-cards">
            <MidCard
              title={t("nodes.risk")}
              Icon={FaFileShield}
              badge={t("badges.referencesRevC")}
              badgeTone="orange"
              iconTone="teal"
              orangeDrop
              step={4}
              badgeRef={riskBadgeRef}
              cardRef={riskCardRef}
            />
            <MidCard
              title={t("nodes.design")}
              Icon={FaCompassDrafting}
              badge={t("badges.affectedQ")}
              badgeTone="blue"
              iconTone="teal"
              step={5}
              cardRef={designCardRef}
            />
          </div>
          <p className="agv-group-label">{t("groups.design")}</p>
        </div>
      </div>

      {/* Spacer so records stay clear of the measured orange band + pill */}
      <div className="agv-gap agv-step agv-step-6" aria-hidden="true" />

      {link ? (
        <div className="agv-orange-link" aria-hidden="true">
          <span
            className="agv-orange-v"
            style={{
              left: link.x1,
              top: link.yTop1,
              height: Math.max(0, link.yBand - link.yTop1),
            }}
          />
          <span
            className="agv-orange-v"
            style={{
              left: link.x2,
              top: link.yTop2,
              height: Math.max(0, link.yBand - link.yTop2),
            }}
          />
          <span
            className="agv-orange-h"
            style={{
              left: leftX,
              top: link.yBand,
              width: hLeftW,
            }}
          />
          <span
            className="agv-orange-h"
            style={{
              left: hRightX,
              top: link.yBand,
              width: hRightW,
            }}
          />
          <span
            ref={pillRef}
            className="agv-gap-pill"
            style={{
              left: link.pillX,
              top: link.pillY,
            }}
          >
            <span className="agv-gap-pill-rev">{t("gap.rev")}</span>
            <span className="agv-gap-pill-sep" />
            <span className="agv-gap-pill-text">{t("gap.label")}</span>
          </span>
        </div>
      ) : (
        <span ref={pillRef} className="agv-gap-pill agv-gap-pill-measure">
          <span className="agv-gap-pill-rev">{t("gap.rev")}</span>
          <span className="agv-gap-pill-sep" />
          <span className="agv-gap-pill-text">{t("gap.label")}</span>
        </span>
      )}

      {blueLegs.length > 0 ? (
        <div className="agv-blue-link" aria-hidden="true">
          {blueLegs.map((leg, i) => (
            <span
              key={i}
              className="agv-blue-v"
              style={{
                left: leg.x,
                top: leg.yTop,
                height: leg.height,
                ["--agv-leg-delay" as string]: `${2.1 + i * 0.1}s`,
              }}
            />
          ))}
        </div>
      ) : null}

      <div className="agv-records agv-step agv-step-7">
        <div ref={recordsBoxRef} className="agv-records-box">
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
