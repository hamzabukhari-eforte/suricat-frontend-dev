"use client";

import {
  HomeNarrativeHeader,
  HomeNarrativeText,
} from "@/components/sections/home/HomeNarrativeHeader";
import {
  FaClipboardCheck,
  FaClipboardList,
  FaCompassDrafting,
  FaFileLines,
  FaMagnifyingGlass,
  FaRegFileLines,
  FaTriangleExclamation,
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

type BlueLeg = {
  x: number;
  yTop: number;
  height: number;
};

function AlignmentDiagram({ t }: { t: (key: string) => string }) {
  const visualRef = useRef<HTMLDivElement>(null);
  const recordsBoxRef = useRef<HTMLDivElement>(null);
  const procCardRef = useRef<HTMLDivElement>(null);
  const capaCardRef = useRef<HTMLDivElement>(null);
  const riskCardRef = useRef<HTMLDivElement>(null);
  const designCardRef = useRef<HTMLDivElement>(null);
  const branchRef = useRef<HTMLDivElement>(null);
  const [blueLegs, setBlueLegs] = useState<BlueLeg[]>([]);
  const [branchBar, setBranchBar] = useState<{ left: number; width: number } | null>(
    null,
  );
  const [wiRiskLink, setWiRiskLink] = useState<{
    left: number;
    top: number;
    width: number;
  } | null>(null);

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
          // Hide WI↔Risk link until cards settle — prevents wrong-position flash
          setWiRiskLink(null);
          el.classList.remove("is-agv-play");
          void el.offsetWidth;
          el.classList.add("is-agv-play");
          kickMeasure();
          window.setTimeout(kickMeasure, 600);
          window.setTimeout(kickMeasure, 1500);
          window.setTimeout(kickMeasure, 1600);
          window.setTimeout(kickMeasure, 2400);
        } else {
          el.classList.remove("is-agv-play");
          setWiRiskLink(null);
        }
      },
      { threshold: 0.28 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const visual = visualRef.current;
    if (!visual) return;

    const measure = () => {
      const v = visual.getBoundingClientRect();
      const borderLeft = visual.clientLeft;
      const borderTop = visual.clientTop;

      const recordsBox = recordsBoxRef.current;
      const cards = [
        procCardRef.current,
        capaCardRef.current,
        riskCardRef.current,
        designCardRef.current,
      ];
      if (recordsBox && cards.every(Boolean)) {
        const rb = recordsBox.getBoundingClientRect();
        const yEnd = rb.top - v.top - borderTop - 14;
        setBlueLegs(
          cards.map((card) => {
            const c = card!.getBoundingClientRect();
            const x = c.left + c.width / 2 - v.left - borderLeft;
            const yTop = c.bottom - v.top - borderTop;
            return { x, yTop, height: Math.max(0, yEnd - yTop) };
          }),
        );
      }

      const branch = branchRef.current;
      if (branch) {
        const br = branch.getBoundingClientRect();
        // Measure from actual vertical legs so H-bar meets outer drops flush
        const legs = branch.querySelectorAll<HTMLElement>(
          ".agv-branch-leg-group > span",
        );
        if (legs.length >= 2) {
          const first = legs[0]!.getBoundingClientRect();
          const last = legs[legs.length - 1]!.getBoundingClientRect();
          const xFirst = first.left + first.width / 2 - br.left;
          const xLast = last.left + last.width / 2 - br.left;
          // Half-stroke pad so bar visually covers leg tops at both ends
          const pad = 1.25;
          setBranchBar({
            left: xFirst - pad,
            width: Math.max(0, xLast - xFirst + pad * 2),
          });
        }
      }

      const wiCard = capaCardRef.current;
      const riskCard = riskCardRef.current;
      if (wiCard && riskCard) {
        const wi = wiCard.getBoundingClientRect();
        const risk = riskCard.getBoundingClientRect();
        // Only draw when cards sit side-by-side (desktop groups row)
        if (risk.left > wi.right - 2) {
          setWiRiskLink({
            left: wi.right - v.left - borderLeft,
            top:
              (wi.top + wi.height / 2 + risk.top + risk.height / 2) / 2 -
              v.top -
              borderTop,
            width: Math.max(0, risk.left - wi.right),
          });
        } else {
          setWiRiskLink(null);
        }
      }
    };

    measureLinksRef.current = measure;
    measure();
    const ro = new ResizeObserver(() => measure());
    ro.observe(visual);
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
          className={`agv-branch-bar${branchBar ? " is-agv-measured" : ""}`}
          style={
            branchBar
              ? {
                  left: branchBar.left,
                  width: branchBar.width,
                  right: "auto",
                }
              : { width: 0, opacity: 0 }
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
              badge={t("badges.notYetReflected")}
              badgeTone="orange"
              iconTone="teal"
              orangeDrop
              step={2}
              cardRef={procCardRef}
            />
            <span className="agv-pair-link" aria-hidden="true" />
            <MidCard
              title={t("nodes.workInstructions")}
              Icon={FaClipboardCheck}
              badge={t("badges.affectedQ")}
              badgeTone="blue"
              iconTone="teal"
              step={3}
              cardRef={capaCardRef}
            />
          </div>
          <p className="agv-group-label">{t("groups.qms")}</p>
        </div>

        <span className="agv-groups-gutter" aria-hidden="true" />

        <div className="agv-group agv-step agv-step-4">
          <div className="agv-group-cards">
            <MidCard
              title={t("nodes.risk")}
              Icon={FaTriangleExclamation}
              badge={t("badges.notYetReflected")}
              badgeTone="orange"
              iconTone="teal"
              orangeDrop
              step={4}
              cardRef={riskCardRef}
            />
            <span className="agv-pair-link" aria-hidden="true" />
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

      {wiRiskLink ? (
        <span
          className="agv-wi-risk-link is-agv-measured"
          style={{
            left: wiRiskLink.left,
            top: wiRiskLink.top,
            width: wiRiskLink.width,
          }}
          aria-hidden="true"
        />
      ) : null}

      {/* Spacer so records stay clear of blue drops */}
      <div className="agv-gap agv-step agv-step-6" aria-hidden="true" />

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
                  {/* 30 icons — ~25% gray (8) · ~75% orange (22) */}
                  <div className="agv-docs-muted">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <span key={`g-${i}`} className="agv-doc-icon is-muted">
                        <FaRegFileLines />
                      </span>
                    ))}
                  </div>
                  <div className="agv-records-sep" aria-hidden="true">
                    <span className="agv-records-sep-bar" />
                  </div>
                  <div className="agv-docs-alert">
                    <span className="agv-records-revised-label">
                      {t("requirementRevised")}
                    </span>
                    <div className="agv-docs-alert-row">
                      {Array.from({ length: 22 }).map((_, i) => (
                        <span key={`o-${i}`} className="agv-doc-icon is-alert">
                          <FaRegFileLines />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span className="agv-flow-drop agv-flow-drop-records" aria-hidden="true" />
      </div>

      <div className="agv-outcome agv-step agv-step-7">
        <p className="agv-misalignment">
          <span className="agv-misalignment-dot" aria-hidden="true" />
          {t("misalignment")}
        </p>
        <span className="agv-flow-drop agv-flow-drop-misalign" aria-hidden="true" />
        <div className="agv-audits">
          <span className="agv-audits-icon" aria-hidden="true">
            <FaMagnifyingGlass />
          </span>
          <div className="agv-audits-copy">
            <p className="agv-audits-title">{t("nodes.audits")}</p>
            <span className="agv-audits-badge">{t("badges.observations")}</span>
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
