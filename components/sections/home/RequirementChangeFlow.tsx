"use client";

import { useTranslations } from "@/components/i18n/LocaleProvider";
import { useEffect, useRef, type ReactNode } from "react";

const TEAL = "#19d3c5";
const ORANGE = "#ff6b35";

/** Client flowchart - full section width (matches Existing Systems / With Suricat). */
export function RequirementChangeFlow() {
  const t = useTranslations("home.alignmentGap");
  const stageRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    const play = () => {
      stage.classList.remove("is-rcf-play");
      void stage.offsetWidth;
      stage.classList.add("is-rcf-play");
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      stage.classList.add("is-rcf-play");
      return;
    }

    if (!("IntersectionObserver" in window)) {
      play();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) play();
        else stage.classList.remove("is-rcf-play");
      },
      { threshold: 0.28 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="rcf-root"
      aria-label={`${t("visual.kicker")} - ${t("visual.example")}`}
    >
      <div className="rcf-viewport">
        <div className="rcf-stage" ref={stageRef} id="requirement-change-stage">
          {/* Inner capped width; canvas keeps design coords, stage pads equally */}
          <div className="rcf-stage-inner">
          <div className="rcf-stage-canvas">
          <div className="rcf-header rcf-step rcf-step-0">
            <span>{t("visual.kicker")}</span>
          </div>

          <svg
            className="rcf-lines"
            viewBox="0 0 905 574"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              {/* Same open-chevron markers as HeroCipAnimation */}
              <marker
                id="rcf-arr-teal"
                viewBox="0 0 10 12"
                refX={8.5}
                refY={6}
                markerWidth={8}
                markerHeight={10}
                markerUnits="userSpaceOnUse"
                orient="auto-start-reverse"
              >
                <path
                  d="M1.5 1 L8.5 6 L1.5 11"
                  fill="none"
                  stroke={TEAL}
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </marker>
              <marker
                id="rcf-arr-orange"
                viewBox="0 0 10 12"
                refX={8.5}
                refY={6}
                markerWidth={8}
                markerHeight={10}
                markerUnits="userSpaceOnUse"
                orient="auto-start-reverse"
              >
                <path
                  d="M1.5 1 L8.5 6 L1.5 11"
                  fill="none"
                  stroke={ORANGE}
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </marker>
            </defs>

            <path className="rcf-blue rcf-draw rcf-draw-2" d="M454,80 V100 H232 V123" />
            <path className="rcf-blue rcf-draw rcf-draw-2" d="M454,100 H676 V123" />

            <path
              className="rcf-teal rcf-draw rcf-draw-4"
              d="M232,157 V183"
              markerEnd="url(#rcf-arr-teal)"
            />
            <path
              className="rcf-orange rcf-draw rcf-draw-4"
              d="M676,157 V183"
              markerEnd="url(#rcf-arr-orange)"
            />

            <path
              className="rcf-teal rcf-draw rcf-draw-5"
              d="M229,293 V326"
              markerEnd="url(#rcf-arr-teal)"
            />
            <path
              className="rcf-orange rcf-draw rcf-draw-5"
              d="M676,293 V326"
              markerEnd="url(#rcf-arr-orange)"
            />

            <path
              className="rcf-teal rcf-draw rcf-draw-6"
              d="M229,393 V426"
              markerEnd="url(#rcf-arr-teal)"
            />
            <path
              className="rcf-orange rcf-draw rcf-draw-6"
              d="M676,393 V426"
              markerEnd="url(#rcf-arr-orange)"
            />

            <path
              className="rcf-teal rcf-draw rcf-draw-7"
              d="M276,462 H300"
              markerEnd="url(#rcf-arr-teal)"
            />
            <path
              className="rcf-orange rcf-draw rcf-draw-7"
              d="M627,462 H605"
              markerEnd="url(#rcf-arr-orange)"
            />
          </svg>

          <div className="rcf-box rcf-purple rcf-top rcf-step rcf-step-1">
            <div className="rcf-ico">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7c6bf2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M9 13h6M9 17h6" />
              </svg>
            </div>
            <div className="rcf-label">{t("nodes.requirement")}</div>
            <div className="rcf-badge">{t("badges.revised")}</div>
          </div>

          <div className="rcf-pill rcf-teal rcf-pill-good rcf-step rcf-step-3">
            {t("paths.incorporated")}
          </div>
          <div className="rcf-pill rcf-orange rcf-pill-bad rcf-step rcf-step-3">
            {t("paths.notIncorporated")}
          </div>

          <div className="rcf-box rcf-teal rcf-group rcf-group-good rcf-step rcf-step-4">
            <div className="rcf-group-title">{t("paths.updateDocs")}</div>
            <div className="rcf-cards">
              <DocCard tone="teal" size="procedure" label={t("nodes.procedure")} kind="list" />
              <CardArrow tone="teal" />
              <DocCard
                tone="teal"
                size="md"
                label={
                  <>
                    Work
                    <br />
                    Instructions
                  </>
                }
                kind="clipboard"
              />
              <CardArrow tone="teal" />
              <DocCard tone="teal" size="sm" label={t("nodes.risk")} kind="risk" />
              <CardArrow tone="teal" />
              <DocCard
                tone="teal"
                size="wide"
                label={
                  <>
                    Design Control
                    <br />
                    Documentation
                  </>
                }
                kind="chart"
              />
            </div>
          </div>

          <div className="rcf-box rcf-orange rcf-group rcf-group-bad rcf-step rcf-step-4">
            <div className="rcf-group-title">{t("paths.doNotUpdate")}</div>
            <div className="rcf-cards">
              <DocCard tone="orange" size="procedure" label={t("nodes.procedure")} kind="list" />
              <CardArrow tone="orange" />
              <DocCard
                tone="orange"
                size="md"
                label={
                  <>
                    Work
                    <br />
                    Instructions
                  </>
                }
                kind="clipboard"
              />
              <CardArrow tone="orange" />
              <DocCard tone="orange" size="sm" label={t("nodes.risk")} kind="risk" />
              <CardArrow tone="orange" />
              <DocCard
                tone="orange"
                size="wide"
                label={
                  <>
                    Design Control
                    <br />
                    Documentation
                  </>
                }
                kind="chart"
              />
            </div>
          </div>

          <div className="rcf-box rcf-teal rcf-status rcf-status-good rcf-step rcf-step-5">
            <div className="rcf-round">
              <DocsSvg color={TEAL} />
            </div>
            <div className="rcf-status-label">{t("paths.remainAligned")}</div>
          </div>
          <div className="rcf-box rcf-orange rcf-status rcf-status-bad rcf-step rcf-step-5">
            <div className="rcf-round">
              <DocsSvg color={ORANGE} />
            </div>
            <div className="rcf-status-label">{t("paths.moreMisaligned")}</div>
          </div>

          <div className="rcf-box rcf-teal rcf-risk rcf-risk-good rcf-step rcf-step-6">
            <div className="rcf-round rcf-round-lg">
              <ShieldSvg />
            </div>
            <div className="rcf-risk-label">{t("paths.minimizedRisk")}</div>
          </div>

          <div className="rcf-box rcf-orange rcf-risk rcf-risk-bad rcf-step rcf-step-6">
            <div className="rcf-round rcf-round-lg">
              <WarnSvg />
            </div>
            <div className="rcf-risk-label">{t("paths.increasedRisk")}</div>
          </div>

          <div className="rcf-box rcf-purple rcf-outcome rcf-step rcf-step-7">
            <div className="rcf-outcome-ico">
              <SearchSvg />
            </div>
            <div className="rcf-outcome-label">
              <span className="rcf-outcome-line">
                Audit Findings, Submission/Approval Delays,
              </span>
              <span className="rcf-outcome-line">Remediation Actions</span>
            </div>
          </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardArrow({ tone }: { tone: "teal" | "orange" }) {
  const stroke = tone === "teal" ? TEAL : ORANGE;
  return (
    <div className={`rcf-carrow rcf-carrow-${tone}`} aria-hidden="true">
      <svg
        className="rcf-carrow-svg"
        viewBox="0 0 24 14"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <path
          d="M0 7 H15"
          stroke={stroke}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <path
          d="M11 1.5 L21 7 L11 12.5"
          stroke={stroke}
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function DocCard({
  tone,
  label,
  kind,
  size = "sm",
}: {
  tone: "teal" | "orange";
  label: ReactNode;
  kind: "list" | "clipboard" | "risk" | "chart";
  size?: "sm" | "md" | "wide" | "procedure";
}) {
  const stroke = tone === "teal" ? TEAL : ORANGE;
  const sizeClass =
    size === "wide"
      ? " rcf-card-wide"
      : size === "md"
        ? " rcf-card-md"
        : size === "procedure"
          ? " rcf-card-procedure"
          : " rcf-card-sm";
  return (
    <div className={`rcf-card${sizeClass}`}>
      <div className={`rcf-ci rcf-ci-${tone}`}>
        {kind === "list" ? <ListSvg stroke={stroke} /> : null}
        {kind === "clipboard" ? <ClipboardSvg stroke={stroke} /> : null}
        {kind === "risk" ? <RiskSvg stroke={stroke} /> : null}
        {kind === "chart" ? <ChartSvg stroke={stroke} /> : null}
      </div>
      <div className="rcf-cl">{label}</div>
    </div>
  );
}

function ListSvg({ stroke }: { stroke: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
      <path d="M9 6h12M9 12h12M9 18h12" />
      <circle cx="4" cy="6" r="1" fill={stroke} />
      <circle cx="4" cy="12" r="1" fill={stroke} />
      <circle cx="4" cy="18" r="1" fill={stroke} />
    </svg>
  );
}

function ClipboardSvg({ stroke }: { stroke: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 2h6v4H9z" />
      <path d="M9 12h6M9 16h4" />
    </svg>
  );
}

function RiskSvg({ stroke }: { stroke: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 2 20h20L12 3z" />
      <path d="M12 10v5" />
      <circle cx="12" cy="17.5" r=".8" fill={stroke} />
    </svg>
  );
}

function ChartSvg({ stroke }: { stroke: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4v16h16" />
      <path d="M7 15l4-5 3 3 5-6" />
    </svg>
  );
}

function DocsSvg({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 7V4a1 1 0 0 1 1-1h7l4 4v10a1 1 0 0 1-1 1h-3" />
      <path d="M16 3v4h4" />
      <rect x="4" y="7" width="12" height="14" rx="1" />
      <path d="M7 12h6M7 16h6" />
    </svg>
  );
}

function ShieldSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2l8 3v6c0 5-3.5 9.5-8 11-4.5-1.5-8-6-8-11V5l8-3z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </svg>
  );
}

function WarnSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 2 20h20L12 3z" />
      <path d="M12 10v5" />
      <circle cx="12" cy="17.5" r=".9" fill={ORANGE} />
    </svg>
  );
}

function SearchSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c6bf2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5L21 21" />
    </svg>
  );
}
