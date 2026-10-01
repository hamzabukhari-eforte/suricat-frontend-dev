"use client";

import { useTranslations } from "@/components/i18n/LocaleProvider";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";

const CIP_VB = { w: 1400, h: 830 };
const TOUR_DWELL_MS = 2200;
const TOUR_START_MS = 550;

type CipGlow = "teal" | "violet" | "orange";
type PopoverSide = "left" | "right" | "bottom";

type TourCardMeta = {
  id: string;
  titleKey: string;
  bodyKey: string;
  x: number;
  y: number;
  w: number;
  h: number;
  side: PopoverSide;
};

const TOUR_CARDS: TourCardMeta[] = [
  {
    id: "input-1",
    titleKey: "policiesTitle",
    bodyKey: "policiesBody",
    x: 40,
    y: 102,
    w: 380,
    h: 112,
    side: "right",
  },
  {
    id: "input-2",
    titleKey: "technicalTitle",
    bodyKey: "technicalBody",
    x: 40,
    y: 236,
    w: 380,
    h: 112,
    side: "right",
  },
  {
    id: "input-3",
    titleKey: "recordsTitle",
    bodyKey: "recordsBody",
    x: 40,
    y: 370,
    w: 380,
    h: 112,
    side: "right",
  },
  {
    id: "input-4",
    titleKey: "submissionsTitle",
    bodyKey: "submissionsBody",
    x: 40,
    y: 504,
    w: 380,
    h: 112,
    side: "right",
  },
  {
    id: "regulatory",
    titleKey: "regulatoryTitle",
    bodyKey: "regulatoryBody",
    x: 510,
    y: 42,
    w: 380,
    h: 112,
    side: "bottom",
  },
  {
    id: "output-1",
    titleKey: "gapsTitle",
    bodyKey: "gapsBody",
    x: 980,
    y: 102,
    w: 380,
    h: 112,
    side: "left",
  },
  {
    id: "output-2",
    titleKey: "docQualityTitle",
    bodyKey: "docQualityBody",
    x: 980,
    y: 236,
    w: 380,
    h: 112,
    side: "left",
  },
  {
    id: "output-3",
    titleKey: "recQualityTitle",
    bodyKey: "recQualityBody",
    x: 980,
    y: 370,
    w: 380,
    h: 112,
    side: "left",
  },
  {
    id: "output-4",
    titleKey: "crossDocTitle",
    bodyKey: "crossDocBody",
    x: 980,
    y: 504,
    w: 380,
    h: 112,
    side: "left",
  },
];

type CipCardProps = {
  id: string;
  stagger: number;
  glow: CipGlow;
  readingId: string | null;
  forcedVisible: ReadonlySet<string>;
  onActivate: (id: string) => void;
  hit: { x: number; y: number; w: number; h: number };
  children: ReactNode;
};

function CipCard({
  id,
  stagger,
  glow,
  readingId,
  forcedVisible,
  onActivate,
  hit,
  children,
}: CipCardProps) {
  const isReading = readingId === id;
  const isForced = forcedVisible.has(id);

  const activate = useCallback(
    (event: MouseEvent | KeyboardEvent) => {
      event.stopPropagation();
      onActivate(id);
    },
    [id, onActivate],
  );

  return (
    <g
      className={[
        "hero-cip-anim-card",
        `hero-cip-glow-${glow}`,
        isReading ? "is-reading" : "",
        isForced ? "is-forced-visible" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ ["--cip-stagger" as string]: String(stagger) }}
      data-cip-card={id}
      role="button"
      tabIndex={0}
      aria-pressed={isReading}
      onClick={activate}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate(event);
        }
      }}
    >
      {children}
      <rect
        className="hero-cip-card-hit"
        x={hit.x}
        y={hit.y}
        width={hit.w}
        height={hit.h}
        rx={10}
        fill="transparent"
      />
    </g>
  );
}

/**
 * Hero CIP diagram — staggered card animation, auto description tour,
 * and click/touch reading-mode freeze.
 */
export function HeroCipAnimation() {
  const t = useTranslations("home.hero.diagram");
  const [readingId, setReadingId] = useState<string | null>(null);
  const [forcedVisible, setForcedVisible] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const [tourActive, setTourActive] = useState(true);
  const [tourPaused, setTourPaused] = useState(false);
  const tourIndexRef = useRef(0);

  const activateCard = useCallback((id: string) => {
    setTourPaused(true);
    setReadingId(id);
    setForcedVisible((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const clearReading = useCallback(() => {
    setReadingId(null);
    if (tourActive) setTourPaused(false);
  }, [tourActive]);

  useEffect(() => {
    if (!tourActive || tourPaused) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTourActive(false);
      return;
    }

    let cancelled = false;
    let timeoutId = 0;

    const step = () => {
      if (cancelled) return;
      const index = tourIndexRef.current;
      if (index >= TOUR_CARDS.length) {
        setReadingId(null);
        setTourActive(false);
        return;
      }
      const card = TOUR_CARDS[index];
      setReadingId(card.id);
      setForcedVisible((prev) => {
        if (prev.has(card.id)) return prev;
        const next = new Set(prev);
        next.add(card.id);
        return next;
      });
      tourIndexRef.current = index + 1;
      timeoutId = window.setTimeout(step, TOUR_DWELL_MS);
    };

    timeoutId = window.setTimeout(step, TOUR_START_MS);
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [tourActive, tourPaused]);

  const activeMeta = useMemo(
    () => TOUR_CARDS.find((card) => card.id === readingId) ?? null,
    [readingId],
  );

  const popoverStyle = useMemo(() => {
    if (!activeMeta) return undefined;
    const topPct = (activeMeta.y / CIP_VB.h) * 100;
    if (activeMeta.side === "right") {
      return {
        left: `${((activeMeta.x + activeMeta.w) / CIP_VB.w) * 100}%`,
        top: `${topPct}%`,
      };
    }
    if (activeMeta.side === "left") {
      return {
        right: `${((CIP_VB.w - activeMeta.x) / CIP_VB.w) * 100}%`,
        left: "auto" as const,
        top: `${topPct}%`,
      };
    }
    return {
      left: `${((activeMeta.x + activeMeta.w / 2) / CIP_VB.w) * 100}%`,
      top: `${((activeMeta.y + activeMeta.h) / CIP_VB.h) * 100}%`,
    };
  }, [activeMeta]);

  return (
    <div
      className={`hero-cip${readingId ? " is-reading-mode" : ""}`}
      onClick={clearReading}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1400 830"
        fill="none"
        className="hero-cip-visual-img"
        role="img"
        aria-label={t("visualAria")}
      >
        <defs>
          <marker
            id="cipArrowTeal"
            viewBox="0 0 14 14"
            refX={11.5}
            refY={7}
            markerWidth={14}
            markerHeight={14}
            markerUnits="userSpaceOnUse"
            orient="auto-start-reverse"
          >
            <path
              d="M2.5 2.5 L11.5 7 L2.5 11.5"
              fill="none"
              stroke="#19D3C5"
              strokeWidth={1.7}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
          <marker
            id="cipArrowViolet"
            viewBox="0 0 14 14"
            refX={11.5}
            refY={7}
            markerWidth={14}
            markerHeight={14}
            markerUnits="userSpaceOnUse"
            orient="auto-start-reverse"
          >
            <path
              d="M2.5 2.5 L11.5 7 L2.5 11.5"
              fill="none"
              stroke="#5C3D8F"
              strokeWidth={1.7}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
        </defs>

        <rect width="1400" height="830" fill="#0D1B3E" />

        {/* Connectors — static (no flow dots) */}
        <g strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M420 158 H455" stroke="#19D3C5" strokeWidth={4} />
          <path d="M420 292 H455" stroke="#19D3C5" strokeWidth={4} />
          <path d="M420 426 H455" stroke="#19D3C5" strokeWidth={4} />
          <path d="M420 560 H455" stroke="#19D3C5" strokeWidth={4} />
          <path d="M455 158 V560" stroke="#19D3C5" strokeWidth={4} />
          <path
            d="M455 359 H498"
            stroke="#19D3C5"
            strokeWidth={4}
            markerEnd="url(#cipArrowTeal)"
          />
          <path
            d="M700 160 V232"
            stroke="#5C3D8F"
            strokeWidth={4}
            markerEnd="url(#cipArrowViolet)"
          />
          <path d="M902 359 H945" stroke="#19D3C5" strokeWidth={4} />
          <path d="M945 158 V560" stroke="#19D3C5" strokeWidth={4} />
          <path
            d="M945 158 H968"
            stroke="#19D3C5"
            strokeWidth={4}
            markerEnd="url(#cipArrowTeal)"
          />
          <path
            d="M945 292 H968"
            stroke="#19D3C5"
            strokeWidth={4}
            markerEnd="url(#cipArrowTeal)"
          />
          <path
            d="M945 426 H968"
            stroke="#19D3C5"
            strokeWidth={4}
            markerEnd="url(#cipArrowTeal)"
          />
          <path
            d="M945 560 H968"
            stroke="#19D3C5"
            strokeWidth={4}
            markerEnd="url(#cipArrowTeal)"
          />
        </g>

        {/* Inputs */}
        <g style={{ fontFamily: '"Plus Jakarta Sans", "Segoe UI", system-ui, sans-serif' }}>
          <text
            x={230}
            y={40}
            textAnchor="middle"
            fill="#19D3C5"
            fontSize={28}
            fontWeight={800}
            letterSpacing="0.14em"
          >
            INPUT
          </text>
          <text
            x={230}
            y={66}
            textAnchor="middle"
            fill="#19D3C5"
            fontSize={20}
            fontWeight={700}
            letterSpacing="0.04em"
          >
            WHAT YOU ALREADY HAVE
          </text>

          <CipCard
            id="input-1"
            stagger={0}
            glow="teal"
            readingId={readingId}
            forcedVisible={forcedVisible}
            onActivate={activateCard}
            hit={{ x: 40, y: 102, w: 380, h: 112 }}
          >
            <rect
              className="hero-cip-card-border"
              x={40}
              y={102}
              width={380}
              height={112}
              rx={10}
              stroke="#19D3C5"
              strokeWidth={4}
              fill="#0D1B3E"
            />
            <circle cx={88} cy={158} r={32} stroke="#19D3C5" strokeWidth={1.6} fill="#19D3C5" fillOpacity={0.1} />
            <g
              className="hero-cip-card-icon"
              transform="translate(88 158) scale(1.28) translate(-12 -12)"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x={5} y={2} width={14} height={20} rx={2} stroke="#FFFFFF" strokeWidth={1.5} />
              <rect x={8} y={0.8} width={8} height={3.6} rx={1} fill="#19D3C5" stroke="none" />
              <path d="M8.5 10 h7M8.5 14 h7M8.5 18 h4.5" stroke="#FFFFFF" strokeWidth={1.35} />
              <path d="M8.2 9.8 l1.5 1.5 2.6-2.8" stroke="#19D3C5" strokeWidth={1.6} />
            </g>
            <text x={136} y={136} fill="#FFFFFF" fontSize={18} fontWeight={800}>
              POLICIES &amp; PROCEDURES
            </text>
            <text x={136} y={168} fill="#FFFFFF" fontSize={17} opacity={0.92}>
              <tspan x={136} dy={0}>
                Quality manuals, SOPs, work
              </tspan>
              <tspan x={136} dy={22}>
                instructions
              </tspan>
            </text>
          </CipCard>

          <CipCard
            id="input-2"
            stagger={1}
            glow="teal"
            readingId={readingId}
            forcedVisible={forcedVisible}
            onActivate={activateCard}
            hit={{ x: 40, y: 236, w: 380, h: 112 }}
          >
            <rect
              className="hero-cip-card-border"
              x={40}
              y={236}
              width={380}
              height={112}
              rx={10}
              stroke="#19D3C5"
              strokeWidth={4}
              fill="#0D1B3E"
            />
            <circle cx={88} cy={292} r={32} stroke="#19D3C5" strokeWidth={1.6} fill="#19D3C5" fillOpacity={0.1} />
            <g
              className="hero-cip-card-icon"
              transform="translate(88 292) scale(1.28) translate(-12 -12)"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 2.5 h9 l5 5 V21.5 H5 Z" stroke="#FFFFFF" strokeWidth={1.5} />
              <path d="M14 2.5 v5 h5" stroke="#FFFFFF" strokeWidth={1.5} />
              <path d="M8 12 h7.5M8 15.5 h5.5" stroke="#FFFFFF" strokeWidth={1.3} />
              <circle cx={16.2} cy={17.8} r={3.4} stroke="#19D3C5" strokeWidth={1.45} />
              <path d="M16.2 15.4 v1M16.2 19.2 v1M14 17.8 h1M17.4 17.8 h1" stroke="#19D3C5" strokeWidth={1.2} />
            </g>
            <text x={136} y={270} fill="#FFFFFF" fontSize={18} fontWeight={800}>
              TECHNICAL DOCUMENTS
            </text>
            <text x={136} y={302} fill="#FFFFFF" fontSize={17} opacity={0.92}>
              <tspan x={136} dy={0}>
                Plans, protocols, specifications,
              </tspan>
              <tspan x={136} dy={22}>
                risk files
              </tspan>
            </text>
          </CipCard>

          <CipCard
            id="input-3"
            stagger={2}
            glow="teal"
            readingId={readingId}
            forcedVisible={forcedVisible}
            onActivate={activateCard}
            hit={{ x: 40, y: 370, w: 380, h: 112 }}
          >
            <rect
              className="hero-cip-card-border"
              x={40}
              y={370}
              width={380}
              height={112}
              rx={10}
              stroke="#19D3C5"
              strokeWidth={4}
              fill="#0D1B3E"
            />
            <circle cx={88} cy={426} r={32} stroke="#19D3C5" strokeWidth={1.6} fill="#19D3C5" fillOpacity={0.1} />
            <g
              className="hero-cip-card-icon"
              transform="translate(88 426) scale(1.28) translate(-12 -12)"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <ellipse cx={12} cy={5.5} rx={8} ry={3.2} stroke="#FFFFFF" strokeWidth={1.5} />
              <path d="M4 5.5 v5.2 c0 1.8 3.6 3.2 8 3.2 s8-1.4 8-3.2 V5.5" stroke="#FFFFFF" strokeWidth={1.5} />
              <path d="M4 10.7 v5.2 c0 1.8 3.6 3.2 8 3.2 s8-1.4 8-3.2 V10.7" stroke="#FFFFFF" strokeWidth={1.5} />
              <path d="M4 10.7 c0 1.8 3.6 3.2 8 3.2 s8-1.4 8-3.2" stroke="#19D3C5" strokeWidth={1.45} />
              <path d="M4 15.9 c0 1.8 3.6 3.2 8 3.2 s8-1.4 8-3.2" stroke="#19D3C5" strokeWidth={1.45} />
            </g>
            <text x={136} y={404} fill="#FFFFFF" fontSize={18} fontWeight={800}>
              RECORDS &amp; LOGS
            </text>
            <text x={136} y={436} fill="#FFFFFF" fontSize={17} opacity={0.92}>
              <tspan x={136} dy={0}>
                Executed records, CAPAs,
              </tspan>
              <tspan x={136} dy={22}>
                complaints, registers
              </tspan>
            </text>
          </CipCard>

          <CipCard
            id="input-4"
            stagger={3}
            glow="teal"
            readingId={readingId}
            forcedVisible={forcedVisible}
            onActivate={activateCard}
            hit={{ x: 40, y: 504, w: 380, h: 112 }}
          >
            <rect
              className="hero-cip-card-border"
              x={40}
              y={504}
              width={380}
              height={112}
              rx={10}
              stroke="#19D3C5"
              strokeWidth={4}
              fill="#0D1B3E"
            />
            <circle cx={88} cy={560} r={32} stroke="#19D3C5" strokeWidth={1.6} fill="#19D3C5" fillOpacity={0.1} />
            <g
              className="hero-cip-card-icon"
              transform="translate(88 560) scale(1.28) translate(-12 -12)"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 11 L11 3 h9 v9 L12 21 Z" stroke="#FFFFFF" strokeWidth={1.5} />
              <circle cx={15.5} cy={8.5} r={2.1} fill="#19D3C5" stroke="none" />
              <path d="M6.2 14.8 L11.5 9.5" stroke="#19D3C5" strokeWidth={1.5} />
            </g>
            <text x={136} y={538} fill="#FFFFFF" fontSize={18} fontWeight={800}>
              SUBMISSIONS &amp; LABELING
            </text>
            <text x={136} y={570} fill="#FFFFFF" fontSize={17} opacity={0.92}>
              <tspan x={136} dy={0}>
                Regulatory dossiers, IFUs,
              </tspan>
              <tspan x={136} dy={22}>
                user-facing content
              </tspan>
            </text>
          </CipCard>
        </g>

        {/* Regulatory */}
        <g style={{ fontFamily: '"Plus Jakarta Sans", "Segoe UI", system-ui, sans-serif' }}>
          <CipCard
            id="regulatory"
            stagger={4}
            glow="violet"
            readingId={readingId}
            forcedVisible={forcedVisible}
            onActivate={activateCard}
            hit={{ x: 510, y: 42, w: 380, h: 112 }}
          >
            <rect
              className="hero-cip-card-border"
              x={510}
              y={42}
              width={380}
              height={112}
              rx={10}
              stroke="#5C3D8F"
              strokeWidth={4}
              fill="#0D1B3E"
            />
            <circle cx={558} cy={98} r={32} stroke="#5C3D8F" strokeWidth={1.6} fill="#5C3D8F" fillOpacity={0.18} />
            <g
              className="hero-cip-card-icon"
              transform="translate(558 98) scale(1.65) translate(-12 -12)"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3.2 V18.5" stroke="#FFFFFF" strokeWidth={1.55} />
              <path d="M7.5 21 h9" stroke="#FFFFFF" strokeWidth={1.55} />
              <path d="M9.5 21 V18.5 h5 V21" stroke="#FFFFFF" strokeWidth={1.4} />
              <path d="M3.2 7.2 H20.8" stroke="#FFFFFF" strokeWidth={1.55} />
              <path d="M5 7.2 L2.4 14.2 H7.6 Z" stroke="#5C3D8F" strokeWidth={1.45} />
              <path d="M19 7.2 L16.4 14.2 H21.6 Z" stroke="#5C3D8F" strokeWidth={1.45} />
              <circle cx={12} cy={7.2} r={1.55} fill="#5C3D8F" stroke="none" />
            </g>
            <text x={606} y={88} fill="#FFFFFF" fontSize={18} fontWeight={800}>
              REGULATORY REQUIREMENTS
            </text>
            <text x={606} y={116} fill="#FFFFFF" fontSize={17} opacity={0.92}>
              <tspan x={606} dy={0}>
                Laws, regulations, standards,
              </tspan>
              <tspan x={606} dy={22}>
                and guidance
              </tspan>
            </text>
          </CipCard>
        </g>

        {/* Engine — no entrance animation */}
        <g style={{ fontFamily: '"Plus Jakarta Sans", "Segoe UI", system-ui, sans-serif' }}>
          <rect x={510} y={244} width={380} height={230} rx={10} stroke="#19D3C5" strokeWidth={4} fill="#0D1B3E" />
          <g transform="translate(700 359)">
            <image
              href="/assets/images/suricat-logo-mark-center.svg"
              x={-58}
              y={-102}
              width={116}
              height={116}
              preserveAspectRatio="xMidYMid meet"
            />
            <text
              x={0}
              y={62}
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize={32}
              fontWeight={800}
              letterSpacing="0.12em"
            >
              SURICAT
            </text>
            <text
              x={0}
              y={88}
              textAnchor="middle"
              fill="#19D3C5"
              fontSize={15}
              fontWeight={700}
              letterSpacing="0.08em"
            >
              COMPLIANCE INTELLIGENCE PLATFORM
            </text>
          </g>
        </g>

        {/* Outputs */}
        <g style={{ fontFamily: '"Plus Jakarta Sans", "Segoe UI", system-ui, sans-serif' }}>
          <text
            x={1170}
            y={40}
            textAnchor="middle"
            fill="#19D3C5"
            fontSize={28}
            fontWeight={800}
            letterSpacing="0.14em"
          >
            OUTPUT
          </text>
          <text
            x={1170}
            y={66}
            textAnchor="middle"
            fill="#19D3C5"
            fontSize={20}
            fontWeight={700}
            letterSpacing="0.04em"
          >
            WHAT NEEDS YOUR ATTENTION
          </text>

          <CipCard
            id="output-1"
            stagger={5}
            glow="orange"
            readingId={readingId}
            forcedVisible={forcedVisible}
            onActivate={activateCard}
            hit={{ x: 980, y: 102, w: 380, h: 112 }}
          >
            <rect
              className="hero-cip-card-border"
              x={980}
              y={102}
              width={380}
              height={112}
              rx={10}
              stroke="#FF6B35"
              strokeWidth={4}
              fill="#0D1B3E"
            />
            <circle cx={1028} cy={158} r={32} stroke="#FF6B35" strokeWidth={1.6} fill="#FF6B35" fillOpacity={0.12} />
            <g
              className="hero-cip-card-icon"
              transform="translate(1028 158) scale(1.28) translate(-12 -12)"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2.2 L22.2 20.8 H1.8 Z" stroke="#FF6B35" strokeWidth={1.7} />
              <path d="M12 9 v5.2" stroke="#FFFFFF" strokeWidth={1.7} />
              <circle cx={12} cy={17.5} r={1.15} fill="#FFFFFF" stroke="none" />
            </g>
            <text x={1076} y={136} fill="#FFFFFF" fontSize={18} fontWeight={800}>
              COMPLIANCE GAPS
            </text>
            <text x={1076} y={168} fill="#FFFFFF" fontSize={17} opacity={0.92}>
              <tspan x={1076} dy={0}>
                Documents vs. Regulatory
              </tspan>
              <tspan x={1076} dy={22}>
                Requirements
              </tspan>
            </text>
          </CipCard>

          <CipCard
            id="output-2"
            stagger={6}
            glow="teal"
            readingId={readingId}
            forcedVisible={forcedVisible}
            onActivate={activateCard}
            hit={{ x: 980, y: 236, w: 380, h: 112 }}
          >
            <rect
              className="hero-cip-card-border"
              x={980}
              y={236}
              width={380}
              height={112}
              rx={10}
              stroke="#19D3C5"
              strokeWidth={4}
              fill="#0D1B3E"
            />
            <circle cx={1028} cy={292} r={32} stroke="#19D3C5" strokeWidth={1.6} fill="#19D3C5" fillOpacity={0.1} />
            <g
              className="hero-cip-card-icon"
              transform="translate(1028 292) scale(1.28) translate(-12 -12)"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 2.5 h9 l5 5 V21.5 H4 Z" stroke="#FFFFFF" strokeWidth={1.5} />
              <path d="M13 2.5 v5 h5" stroke="#FFFFFF" strokeWidth={1.5} />
              <path d="M7.5 12 h7M7.5 15.5 h5" stroke="#FFFFFF" strokeWidth={1.3} />
              <circle cx={17} cy={16.8} r={4} fill="#19D3C5" stroke="none" />
              <path d="M17 14.7 v2.3" stroke="#0D1B3E" strokeWidth={1.5} />
              <circle cx={17} cy={18.7} r={0.7} fill="#0D1B3E" stroke="none" />
            </g>
            <text x={1076} y={282} fill="#FFFFFF" fontSize={18} fontWeight={800}>
              DOCUMENT QUALITY ISSUES
            </text>
            <text x={1076} y={310} fill="#FFFFFF" fontSize={17} opacity={0.92}>
              Documents vs. Readiness Criteria
            </text>
          </CipCard>

          <CipCard
            id="output-3"
            stagger={7}
            glow="teal"
            readingId={readingId}
            forcedVisible={forcedVisible}
            onActivate={activateCard}
            hit={{ x: 980, y: 370, w: 380, h: 112 }}
          >
            <rect
              className="hero-cip-card-border"
              x={980}
              y={370}
              width={380}
              height={112}
              rx={10}
              stroke="#19D3C5"
              strokeWidth={4}
              fill="#0D1B3E"
            />
            <circle cx={1028} cy={426} r={32} stroke="#19D3C5" strokeWidth={1.6} fill="#19D3C5" fillOpacity={0.1} />
            <g
              className="hero-cip-card-icon"
              transform="translate(1028 426) scale(1.28) translate(-12 -12)"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x={4} y={3} width={15} height={18} rx={2} stroke="#FFFFFF" strokeWidth={1.5} />
              <rect x={7.5} y={1.4} width={8} height={3.5} rx={1} fill="#19D3C5" stroke="none" />
              <path d="M8 10.5 h8M8 14 h6" stroke="#FFFFFF" strokeWidth={1.3} />
              <circle cx={16.5} cy={17.2} r={3.5} fill="#FF6B35" stroke="none" />
              <path d="M16.5 15.4 v2" stroke="#FFFFFF" strokeWidth={1.4} />
              <circle cx={16.5} cy={18.8} r={0.65} fill="#FFFFFF" stroke="none" />
            </g>
            <text x={1076} y={404} fill="#FFFFFF" fontSize={18} fontWeight={800}>
              RECORD QUALITY ISSUES
            </text>
            <text x={1076} y={436} fill="#FFFFFF" fontSize={17} opacity={0.92}>
              <tspan x={1076} dy={0}>
                Records vs. Governing
              </tspan>
              <tspan x={1076} dy={22}>
                Procedures
              </tspan>
            </text>
          </CipCard>

          <CipCard
            id="output-4"
            stagger={8}
            glow="teal"
            readingId={readingId}
            forcedVisible={forcedVisible}
            onActivate={activateCard}
            hit={{ x: 980, y: 504, w: 380, h: 112 }}
          >
            <rect
              className="hero-cip-card-border"
              x={980}
              y={504}
              width={380}
              height={112}
              rx={10}
              stroke="#19D3C5"
              strokeWidth={4}
              fill="#0D1B3E"
            />
            <circle cx={1028} cy={560} r={32} stroke="#19D3C5" strokeWidth={1.6} fill="#19D3C5" fillOpacity={0.1} />
            <g
              className="hero-cip-card-icon"
              transform="translate(1028 560) scale(1.28) translate(-12 -12)"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x={1.5} y={4} width={11} height={14} rx={1.5} stroke="#FFFFFF" strokeWidth={1.4} />
              <rect x={11.5} y={6} width={11} height={14} rx={1.5} stroke="#FFFFFF" strokeWidth={1.4} />
              <path d="M4 9 h5.5M4 12 h4.5" stroke="#FFFFFF" strokeWidth={1.15} />
              <path d="M14.5 11.5 h5M14.5 14.5 h4" stroke="#FFFFFF" strokeWidth={1.15} />
              <path d="M8.2 16.8 h3M12.8 16.8 h2.8" stroke="#19D3C5" strokeWidth={1.6} />
              <circle cx={8.2} cy={16.8} r={1.25} fill="#19D3C5" stroke="none" />
              <circle cx={15.6} cy={16.8} r={1.25} fill="#19D3C5" stroke="none" />
            </g>
            <text x={1076} y={550} fill="#FFFFFF" fontSize={18} fontWeight={800}>
              CROSS-DOCUMENT ISSUES
            </text>
            <text x={1076} y={578} fill="#FFFFFF" fontSize={17} opacity={0.92}>
              Documents vs. Each Other
            </text>
          </CipCard>
        </g>

        {/* Trust footer */}
        <g style={{ fontFamily: '"Plus Jakarta Sans", "Segoe UI", system-ui, sans-serif' }}>
          <line x1={40} y1={684} x2={1360} y2={684} stroke="#19D3C5" strokeWidth={1} opacity={0.55} />

          <g transform="translate(92 734)">
            <g transform="translate(0 -22)" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <g transform="translate(0 4) scale(1.25)">
                <path d="M3 2 h10 l4 4 v14 H3 Z" stroke="#FFFFFF" strokeWidth={1.5} />
                <path d="M13 2 v4 h4" stroke="#FFFFFF" strokeWidth={1.5} />
                <path d="M7 11 h6M7 14.5 h4" stroke="#FFFFFF" strokeWidth={1.25} />
                <circle cx={20} cy={18} r={4.5} stroke="#19D3C5" strokeWidth={1.5} />
                <path d="M18.2 18 h3.6M20 16.2 v3.6" stroke="#19D3C5" strokeWidth={1.35} />
              </g>
              <text x={54} y={16} fill="#FFFFFF" fontSize={18} fontWeight={800} letterSpacing="0.05em">
                TRACEABILITY
              </text>
              <text x={54} y={40} fill="#FFFFFF" fontSize={16} opacity={0.88}>
                Every finding traced to source
              </text>
            </g>
          </g>
          <line x1={382} y1={704} x2={382} y2={764} stroke="#19D3C5" strokeWidth={1} opacity={0.45} />

          <g transform="translate(408 734)">
            <g transform="translate(0 -22)" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <g transform="translate(0 2) scale(1.25)">
                <path
                  d="M12 2.5 a7 7 0 0 1 4.2 12.6 v2.4 H7.8 v-2.4 A7 7 0 0 1 12 2.5 Z"
                  stroke="#FFFFFF"
                  strokeWidth={1.5}
                />
                <path d="M8.5 20.5 h7M9.5 23.2 h5" stroke="#FFFFFF" strokeWidth={1.4} />
                <path d="M12 8.5 v4M10 10.5 h4" stroke="#19D3C5" strokeWidth={1.4} />
              </g>
              <text x={54} y={16} fill="#FFFFFF" fontSize={18} fontWeight={800} letterSpacing="0.05em">
                EXPLAINABILITY
              </text>
              <text x={54} y={40} fill="#FFFFFF" fontSize={16} opacity={0.88}>
                Clear reasoning and context
              </text>
            </g>
          </g>
          <line x1={688} y1={704} x2={688} y2={764} stroke="#19D3C5" strokeWidth={1} opacity={0.45} />

          <g transform="translate(714 734)">
            <g transform="translate(0 -22)" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <g transform="translate(0 4) scale(1.25)">
                <circle cx={9} cy={7} r={4} stroke="#FFFFFF" strokeWidth={1.5} />
                <path d="M1.5 20 c0-4.2 3.2-7 7.5-7 s7.5 2.8 7.5 7" stroke="#FFFFFF" strokeWidth={1.5} />
                <circle cx={20} cy={16.5} r={4.2} fill="#19D3C5" stroke="none" />
                <path d="M17.8 16.5 l1.4 1.4 3-3.2" stroke="#0D1B3E" strokeWidth={1.4} />
              </g>
              <text x={54} y={16} fill="#FFFFFF" fontSize={18} fontWeight={800} letterSpacing="0.05em">
                HUMAN REVIEW
              </text>
              <text x={54} y={40} fill="#FFFFFF" fontSize={16} opacity={0.88}>
                Your team validates every finding
              </text>
            </g>
          </g>
          <line x1={1030} y1={704} x2={1030} y2={764} stroke="#19D3C5" strokeWidth={1} opacity={0.45} />

          <g transform="translate(1056 734)">
            <g transform="translate(0 -22)" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <g transform="translate(0 2) scale(1.25)">
                <rect x={3} y={11} width={16} height={12} rx={2.2} stroke="#FFFFFF" strokeWidth={1.5} />
                <path d="M7 11 V7.5 a4 4 0 0 1 8 0 V11" stroke="#19D3C5" strokeWidth={1.6} />
                <circle cx={11} cy={16.5} r={1.4} fill="#19D3C5" stroke="none" />
                <path d="M11 17.8 v2.2" stroke="#19D3C5" strokeWidth={1.4} />
              </g>
              <text x={54} y={16} fill="#FFFFFF" fontSize={18} fontWeight={800} letterSpacing="0.05em">
                READ-ONLY
              </text>
              <text x={54} y={40} fill="#FFFFFF" fontSize={16} opacity={0.88}>
                No changes to your systems
              </text>
            </g>
          </g>
        </g>
      </svg>

      {activeMeta ? (
        <div
          className={`hero-cip-popover hero-cip-popover-${activeMeta.side} is-open`}
          style={popoverStyle}
          role="dialog"
          aria-label={t(activeMeta.titleKey)}
          onClick={(event) => event.stopPropagation()}
        >
          <p className="hero-cip-popover-title">{t(activeMeta.titleKey)}</p>
          <p className="hero-cip-popover-body">{t(activeMeta.bodyKey)}</p>
        </div>
      ) : null}
    </div>
  );
}
