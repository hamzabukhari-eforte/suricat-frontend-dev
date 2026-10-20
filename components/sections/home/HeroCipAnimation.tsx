"use client";

import { useTranslations } from "@/components/i18n/LocaleProvider";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

/* Faster tour; still enough hold to read card text */
const POP_STEP_MS = 1200;
const STUB_STEP_MS = 360;
const CONN_STEP_MS = 560;
const TOUR_START_MS = 200;
const TRUST_START_MS = 180;
const TRUST_STAGGER_MS = 420;
const TRUST_ITEM_COUNT = 4;

type CipGlow = "teal" | "violet" | "orange";
type CipStage = "input" | "regulatory" | "engine" | "output";
type ConnId =
  | "stub-input-1"
  | "stub-input-2"
  | "stub-input-3"
  | "stub-input-4"
  | "in-bus"
  | "to-engine"
  | "to-regulatory"
  | "to-outputs";

type TourCardMeta = {
  id: string;
  stage: CipStage;
};

type TourStep =
  | { kind: "card"; id: string }
  | { kind: "conn"; ids: ConnId[] };

const TOUR_CARDS: TourCardMeta[] = [
  { id: "input-1", stage: "input" },
  { id: "input-2", stage: "input" },
  { id: "input-3", stage: "input" },
  { id: "input-4", stage: "input" },
  { id: "engine", stage: "engine" },
  { id: "regulatory", stage: "regulatory" },
  { id: "output-1", stage: "output" },
  { id: "output-2", stage: "output" },
  { id: "output-3", stage: "output" },
  { id: "output-4", stage: "output" },
];

/* Card → stub; Suricat; then bus+into-Suricat together; Regulatory → Outputs */
const TOUR_STEPS: TourStep[] = [
  { kind: "card", id: "input-1" },
  { kind: "conn", ids: ["stub-input-1"] },
  { kind: "card", id: "input-2" },
  { kind: "conn", ids: ["stub-input-2"] },
  { kind: "card", id: "input-3" },
  { kind: "conn", ids: ["stub-input-3"] },
  { kind: "card", id: "input-4" },
  { kind: "conn", ids: ["stub-input-4"] },
  { kind: "card", id: "engine" },
  { kind: "conn", ids: ["in-bus", "to-engine"] },
  { kind: "conn", ids: ["to-regulatory"] },
  { kind: "card", id: "regulatory" },
  { kind: "conn", ids: ["to-outputs"] },
  { kind: "card", id: "output-1" },
  { kind: "card", id: "output-2" },
  { kind: "card", id: "output-3" },
  { kind: "card", id: "output-4" },
];

const ALL_CONN_IDS: ConnId[] = [
  "stub-input-1",
  "stub-input-2",
  "stub-input-3",
  "stub-input-4",
  "in-bus",
  "to-engine",
  "to-regulatory",
  "to-outputs",
];

type CipCardProps = {
  id: string;
  stagger: number;
  glow: CipGlow;
  forcedVisible: ReadonlySet<string>;
  hit: { x: number; y: number; w: number; h: number };
  children: ReactNode;
};

function CipCard({
  id,
  stagger,
  glow,
  forcedVisible,
  hit,
  children,
}: CipCardProps) {
  const isForced = forcedVisible.has(id);

  return (
    <g
      className={[
        "hero-cip-anim-card",
        `hero-cip-glow-${glow}`,
        isForced ? "is-forced-visible" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ ["--cip-stagger" as string]: String(stagger) }}
      data-cip-hold="card"
      data-cip-card={id}
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
 * Hero CIP diagram — cards appear one-by-one with a short pop, then settle.
 */
export function HeroCipAnimation() {
  const t = useTranslations("home.hero.diagram");
  const rootRef = useRef<HTMLDivElement>(null);
  const [forcedVisible, setForcedVisible] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const [drawnConns, setDrawnConns] = useState<ReadonlySet<ConnId>>(
    () => new Set(),
  );
  const [tourActive, setTourActive] = useState(false);
  const [cardsComplete, setCardsComplete] = useState(false);
  const [trustCount, setTrustCount] = useState(0);
  const [playKey, setPlayKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const tourIndexRef = useRef(0);
  const isPausedRef = useRef(false);
  const holdPointerIdRef = useRef<number | null>(null);
  const tourTimeoutRef = useRef(0);
  const trustTimeoutRef = useRef(0);
  const tourDeadlineRef = useRef(0);
  const trustDeadlineRef = useRef(0);
  const tourRemainingRef = useRef(TOUR_START_MS);
  const trustRemainingRef = useRef(TRUST_START_MS);
  const trustCountRef = useRef(0);
  const cardsCompleteRef = useRef(false);
  const runTourStepRef = useRef<(() => void) | null>(null);
  const runTrustTickRef = useRef<(() => void) | null>(null);

  const clearTourTimeout = () => {
    if (tourTimeoutRef.current) {
      window.clearTimeout(tourTimeoutRef.current);
      tourTimeoutRef.current = 0;
    }
  };

  const clearTrustTimeout = () => {
    if (trustTimeoutRef.current) {
      window.clearTimeout(trustTimeoutRef.current);
      trustTimeoutRef.current = 0;
    }
  };

  const scheduleTour = (delay: number, fn: () => void) => {
    clearTourTimeout();
    tourDeadlineRef.current = performance.now() + delay;
    tourTimeoutRef.current = window.setTimeout(fn, delay);
  };

  const scheduleTrust = (delay: number, fn: () => void) => {
    clearTrustTimeout();
    trustDeadlineRef.current = performance.now() + delay;
    trustTimeoutRef.current = window.setTimeout(fn, delay);
  };

  const pauseHold = () => {
    if (isPausedRef.current) return;
    isPausedRef.current = true;
    setIsPaused(true);
    if (tourTimeoutRef.current) {
      tourRemainingRef.current = Math.max(
        80,
        tourDeadlineRef.current - performance.now(),
      );
      clearTourTimeout();
    }
    if (trustTimeoutRef.current) {
      trustRemainingRef.current = Math.max(
        40,
        trustDeadlineRef.current - performance.now(),
      );
      clearTrustTimeout();
    }
  };

  const resumeHold = () => {
    if (!isPausedRef.current) return;
    isPausedRef.current = false;
    setIsPaused(false);
    if (runTourStepRef.current && !cardsCompleteRef.current) {
      scheduleTour(tourRemainingRef.current, () => {
        if (isPausedRef.current) return;
        runTourStepRef.current?.();
      });
    } else if (
      runTrustTickRef.current &&
      cardsCompleteRef.current &&
      trustCountRef.current < TRUST_ITEM_COUNT
    ) {
      scheduleTrust(trustRemainingRef.current, () => {
        if (isPausedRef.current) return;
        runTrustTickRef.current?.();
      });
    }
  };

  const resetTour = () => {
    clearTourTimeout();
    clearTrustTimeout();
    isPausedRef.current = false;
    holdPointerIdRef.current = null;
    setIsPaused(false);
    setForcedVisible(new Set());
    setDrawnConns(new Set());
    setCardsComplete(false);
    cardsCompleteRef.current = false;
    setTrustCount(0);
    trustCountRef.current = 0;
    setTourActive(false);
    tourIndexRef.current = 0;
    tourRemainingRef.current = TOUR_START_MS;
    trustRemainingRef.current = TRUST_START_MS;
  };

  const isHoldTarget = (target: EventTarget | null) => {
    if (!(target instanceof Element)) return false;
    return Boolean(target.closest("[data-cip-hold]"));
  };

  const onRootPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    if (!isHoldTarget(event.target)) return;
    holdPointerIdRef.current = event.pointerId;
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      /* ignore */
    }
    pauseHold();
  };

  const onRootPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (holdPointerIdRef.current === null) return;
    if (event.pointerId !== holdPointerIdRef.current) return;
    holdPointerIdRef.current = null;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      /* ignore */
    }
    resumeHold();
  };

  // Replay full sequence whenever the diagram re-enters the viewport
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setForcedVisible(new Set(TOUR_CARDS.map((card) => card.id)));
      setDrawnConns(new Set(ALL_CONN_IDS));
      setCardsComplete(true);
      cardsCompleteRef.current = true;
      setTrustCount(TRUST_ITEM_COUNT);
      trustCountRef.current = TRUST_ITEM_COUNT;
      setTourActive(false);
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setTourActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          resetTour();
          setPlayKey((k) => k + 1);
          requestAnimationFrame(() => {
            setTourActive(true);
          });
        } else {
          resetTour();
        }
      },
      { threshold: 0.28 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!tourActive) return;
    if (typeof window === "undefined") return;

    let cancelled = false;

    const step = () => {
      if (cancelled || isPausedRef.current) return;
      const index = tourIndexRef.current;
      if (index >= TOUR_STEPS.length) {
        setCardsComplete(true);
        cardsCompleteRef.current = true;
        setTourActive(false);
        runTourStepRef.current = null;
        return;
      }
      const item = TOUR_STEPS[index];
      let delay = POP_STEP_MS;
      if (item.kind === "card") {
        setForcedVisible((prev) => {
          if (prev.has(item.id)) return prev;
          const next = new Set(prev);
          next.add(item.id);
          return next;
        });
        delay = POP_STEP_MS;
      } else {
        setDrawnConns((prev) => {
          const next = new Set(prev);
          let changed = false;
          for (const id of item.ids) {
            if (!next.has(id)) {
              next.add(id);
              changed = true;
            }
          }
          return changed ? next : prev;
        });
        delay = item.ids.some((id) => id.startsWith("stub-"))
          ? STUB_STEP_MS
          : CONN_STEP_MS;
      }
      tourIndexRef.current = index + 1;
      tourRemainingRef.current = delay;
      scheduleTour(delay, step);
    };

    runTourStepRef.current = step;
    tourRemainingRef.current = TOUR_START_MS;
    scheduleTour(TOUR_START_MS, step);

    return () => {
      cancelled = true;
      runTourStepRef.current = null;
      clearTourTimeout();
    };
  }, [tourActive, playKey]);

  // Trust footer loads after the full card tour finishes (separate so it isn't cancelled)
  useEffect(() => {
    if (!cardsComplete) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    trustCountRef.current = 0;
    setTrustCount(0);

    const tick = () => {
      if (cancelled || isPausedRef.current) return;
      const n = trustCountRef.current + 1;
      trustCountRef.current = n;
      setTrustCount(n);
      if (n < TRUST_ITEM_COUNT) {
        trustRemainingRef.current = TRUST_STAGGER_MS;
        scheduleTrust(TRUST_STAGGER_MS, tick);
      } else {
        runTrustTickRef.current = null;
      }
    };

    runTrustTickRef.current = tick;
    trustRemainingRef.current = TRUST_START_MS;
    scheduleTrust(TRUST_START_MS, tick);

    return () => {
      cancelled = true;
      runTrustTickRef.current = null;
      clearTrustTimeout();
    };
  }, [cardsComplete, playKey]);

  const showInputs = useMemo(
    () => TOUR_CARDS.some((card) => card.stage === "input" && forcedVisible.has(card.id)),
    [forcedVisible],
  );
  const showRegulatory = forcedVisible.has("regulatory");
  const showEngine = forcedVisible.has("engine");
  const showOutputs = useMemo(
    () => TOUR_CARDS.some((card) => card.stage === "output" && forcedVisible.has(card.id)),
    [forcedVisible],
  );
  const connClass = (id: ConnId) =>
    drawnConns.has(id) ? "hero-cip-conn is-drawn" : "hero-cip-conn";

  return (
    <div
      ref={rootRef}
      className={`hero-cip${isPaused ? " is-paused" : ""}`}
      onPointerDown={onRootPointerDown}
      onPointerUp={onRootPointerUp}
      onPointerCancel={onRootPointerUp}
      onLostPointerCapture={onRootPointerUp}
    >
      <svg
        key={playKey}
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

        {/* Connectors — draw smoothly in tour order */}
        <g strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Input stubs — after each card pops (not with the card) */}
          <path
            className={connClass("stub-input-1")}
            d="M420 158 H455"
            pathLength={1}
            stroke="#19D3C5"
            strokeWidth={4}
          />
          <path
            className={connClass("stub-input-2")}
            d="M420 295 H455"
            pathLength={1}
            stroke="#19D3C5"
            strokeWidth={4}
          />
          <path
            className={connClass("stub-input-3")}
            d="M420 432 H455"
            pathLength={1}
            stroke="#19D3C5"
            strokeWidth={4}
          />
          <path
            className={connClass("stub-input-4")}
            d="M420 569 H455"
            pathLength={1}
            stroke="#19D3C5"
            strokeWidth={4}
          />
          {/* Input vertical bus */}
          <path
            className={connClass("in-bus")}
            d="M455 158 V569"
            pathLength={1}
            stroke="#19D3C5"
            strokeWidth={4}
          />
          {/* Into Suricat */}
          <path
            className={connClass("to-engine")}
            d="M455 359 H493"
            pathLength={1}
            stroke="#19D3C5"
            strokeWidth={4}
            markerEnd={drawnConns.has("to-engine") ? "url(#cipArrowTeal)" : undefined}
          />
          {/* Suricat → up to Regulatory */}
          <path
            className={connClass("to-regulatory")}
            d="M700 232 V160"
            pathLength={1}
            stroke="#5C3D8F"
            strokeWidth={4}
            markerEnd={
              drawnConns.has("to-regulatory") ? "url(#cipArrowViolet)" : undefined
            }
          />
          {/* Suricat → right to Outputs */}
          <path
            className={connClass("to-outputs")}
            d="M907 359 H945"
            pathLength={1}
            stroke="#19D3C5"
            strokeWidth={4}
          />
          <path
            className={connClass("to-outputs")}
            d="M945 158 V569"
            pathLength={1}
            stroke="#19D3C5"
            strokeWidth={4}
          />
          <path
            className={connClass("to-outputs")}
            d="M945 158 H968"
            pathLength={1}
            stroke="#19D3C5"
            strokeWidth={4}
            markerEnd={drawnConns.has("to-outputs") ? "url(#cipArrowTeal)" : undefined}
          />
          <path
            className={connClass("to-outputs")}
            d="M945 295 H968"
            pathLength={1}
            stroke="#19D3C5"
            strokeWidth={4}
            markerEnd={drawnConns.has("to-outputs") ? "url(#cipArrowTeal)" : undefined}
          />
          <path
            className={connClass("to-outputs")}
            d="M945 432 H968"
            pathLength={1}
            stroke="#19D3C5"
            strokeWidth={4}
            markerEnd={drawnConns.has("to-outputs") ? "url(#cipArrowTeal)" : undefined}
          />
          <path
            className={connClass("to-outputs")}
            d="M945 569 H968"
            pathLength={1}
            stroke="#19D3C5"
            strokeWidth={4}
            markerEnd={drawnConns.has("to-outputs") ? "url(#cipArrowTeal)" : undefined}
          />
        </g>

        {/* Inputs */}
        <g
          className={showInputs ? undefined : "hero-cip-section-hidden"}
          style={{ fontFamily: '"Plus Jakarta Sans", "Segoe UI", system-ui, sans-serif' }}
        >
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
            y={80}
            textAnchor="middle"
            fill="#19D3C5"
            fontSize={21}
            fontWeight={700}
            letterSpacing="0.04em"
          >
            WHAT YOU ALREADY HAVE
          </text>

          <CipCard
            id="input-1"
            stagger={0}
            glow="teal"
            forcedVisible={forcedVisible}
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
            <text x={136} y={168} fill="#FFFFFF" fontSize={18} opacity={0.92}>
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
            stagger={0}
            glow="teal"
            forcedVisible={forcedVisible}
            hit={{ x: 40, y: 239, w: 380, h: 112 }}
          >
            <rect
              className="hero-cip-card-border"
              x={40}
              y={239}
              width={380}
              height={112}
              rx={10}
              stroke="#19D3C5"
              strokeWidth={4}
              fill="#0D1B3E"
            />
            <circle cx={88} cy={295} r={32} stroke="#19D3C5" strokeWidth={1.6} fill="#19D3C5" fillOpacity={0.1} />
            <g
              className="hero-cip-card-icon"
              transform="translate(88 295) scale(1.28) translate(-12 -12)"
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
            <text x={136} y={273} fill="#FFFFFF" fontSize={18} fontWeight={800}>
              TECHNICAL DOCUMENTS
            </text>
            <text x={136} y={305} fill="#FFFFFF" fontSize={18} opacity={0.92}>
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
            stagger={0}
            glow="teal"
            forcedVisible={forcedVisible}
            hit={{ x: 40, y: 376, w: 380, h: 112 }}
          >
            <rect
              className="hero-cip-card-border"
              x={40}
              y={376}
              width={380}
              height={112}
              rx={10}
              stroke="#19D3C5"
              strokeWidth={4}
              fill="#0D1B3E"
            />
            <circle cx={88} cy={432} r={32} stroke="#19D3C5" strokeWidth={1.6} fill="#19D3C5" fillOpacity={0.1} />
            <g
              className="hero-cip-card-icon"
              transform="translate(88 432) scale(1.28) translate(-12 -12)"
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
            <text x={136} y={410} fill="#FFFFFF" fontSize={18} fontWeight={800}>
              RECORDS &amp; LOGS
            </text>
            <text x={136} y={442} fill="#FFFFFF" fontSize={18} opacity={0.92}>
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
            stagger={0}
            glow="teal"
            forcedVisible={forcedVisible}
            hit={{ x: 40, y: 513, w: 380, h: 112 }}
          >
            <rect
              className="hero-cip-card-border"
              x={40}
              y={513}
              width={380}
              height={112}
              rx={10}
              stroke="#19D3C5"
              strokeWidth={4}
              fill="#0D1B3E"
            />
            <circle cx={88} cy={569} r={32} stroke="#19D3C5" strokeWidth={1.6} fill="#19D3C5" fillOpacity={0.1} />
            <g
              className="hero-cip-card-icon"
              transform="translate(88 569) scale(1.28) translate(-12 -12)"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 11 L11 3 h9 v9 L12 21 Z" stroke="#FFFFFF" strokeWidth={1.5} />
              <circle cx={15.5} cy={8.5} r={2.1} fill="#19D3C5" stroke="none" />
              <path d="M6.2 14.8 L11.5 9.5" stroke="#19D3C5" strokeWidth={1.5} />
            </g>
            <text x={136} y={547} fill="#FFFFFF" fontSize={18} fontWeight={800}>
              SUBMISSIONS &amp; LABELING
            </text>
            <text x={136} y={579} fill="#FFFFFF" fontSize={18} opacity={0.92}>
              <tspan x={136} dy={0}>
                Regulatory dossiers, IFUs,
              </tspan>
              <tspan x={136} dy={22}>
                user-facing content
              </tspan>
            </text>
          </CipCard>
        </g>

        {/* Regulatory — hidden until its turn */}
        <g
          className={showRegulatory ? undefined : "hero-cip-section-hidden"}
          style={{ fontFamily: '"Plus Jakarta Sans", "Segoe UI", system-ui, sans-serif' }}
        >
          <CipCard
            id="regulatory"
            stagger={0}
            glow="violet"
            forcedVisible={forcedVisible}
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
            <text x={606} y={116} fill="#FFFFFF" fontSize={18} opacity={0.92}>
              <tspan x={606} dy={0}>
                Laws, regulations, standards,
              </tspan>
              <tspan x={606} dy={22}>
                and guidance
              </tspan>
            </text>
          </CipCard>
        </g>

        {/* Engine — pops after Regulatory Requirements */}
        <g
          className={[
            "hero-cip-anim-card",
            "hero-cip-glow-teal",
            "hero-cip-engine",
            showEngine ? "is-forced-visible" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ fontFamily: '"Plus Jakarta Sans", "Segoe UI", system-ui, sans-serif' }}
          data-cip-hold="card"
          data-cip-card="engine"
        >
          <rect
            className="hero-cip-card-border"
            x={505}
            y={244}
            width={390}
            height={230}
            rx={10}
            stroke="#19D3C5"
            strokeWidth={4}
            fill="#0D1B3E"
          />
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
              fontSize={16}
              fontWeight={700}
              letterSpacing="0.06em"
            >
              COMPLIANCE INTELLIGENCE PLATFORM
            </text>
          </g>
        </g>

        {/* Outputs — hidden until first output card loads */}
        <g
          className={showOutputs ? undefined : "hero-cip-section-hidden"}
          style={{ fontFamily: '"Plus Jakarta Sans", "Segoe UI", system-ui, sans-serif' }}
        >
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
            y={80}
            textAnchor="middle"
            fill="#19D3C5"
            fontSize={21}
            fontWeight={700}
            letterSpacing="0.04em"
          >
            WHAT NEEDS YOUR ATTENTION
          </text>

          <CipCard
            id="output-1"
            stagger={0}
            glow="orange"
            forcedVisible={forcedVisible}
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
            <text x={1076} y={168} fill="#FFFFFF" fontSize={18} opacity={0.92}>
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
            stagger={0}
            glow="teal"
            forcedVisible={forcedVisible}
            hit={{ x: 980, y: 239, w: 380, h: 112 }}
          >
            <rect
              className="hero-cip-card-border"
              x={980}
              y={239}
              width={380}
              height={112}
              rx={10}
              stroke="#19D3C5"
              strokeWidth={4}
              fill="#0D1B3E"
            />
            <circle cx={1028} cy={295} r={32} stroke="#19D3C5" strokeWidth={1.6} fill="#19D3C5" fillOpacity={0.1} />
            <g
              className="hero-cip-card-icon"
              transform="translate(1028 295) scale(1.28) translate(-12 -12)"
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
            <text x={1076} y={285} fill="#FFFFFF" fontSize={18} fontWeight={800}>
              DOCUMENT QUALITY ISSUES
            </text>
            <text x={1076} y={313} fill="#FFFFFF" fontSize={18} opacity={0.92}>
              <tspan x={1076} dy={0}>
                Documents vs. Readiness
              </tspan>
              <tspan x={1076} dy={22}>
                Criteria
              </tspan>
            </text>
          </CipCard>

          <CipCard
            id="output-3"
            stagger={0}
            glow="teal"
            forcedVisible={forcedVisible}
            hit={{ x: 980, y: 376, w: 380, h: 112 }}
          >
            <rect
              className="hero-cip-card-border"
              x={980}
              y={376}
              width={380}
              height={112}
              rx={10}
              stroke="#19D3C5"
              strokeWidth={4}
              fill="#0D1B3E"
            />
            <circle cx={1028} cy={432} r={32} stroke="#19D3C5" strokeWidth={1.6} fill="#19D3C5" fillOpacity={0.1} />
            <g
              className="hero-cip-card-icon"
              transform="translate(1028 432) scale(1.28) translate(-12 -12)"
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
            <text x={1076} y={410} fill="#FFFFFF" fontSize={18} fontWeight={800}>
              RECORD QUALITY ISSUES
            </text>
            <text x={1076} y={442} fill="#FFFFFF" fontSize={18} opacity={0.92}>
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
            stagger={0}
            glow="teal"
            forcedVisible={forcedVisible}
            hit={{ x: 980, y: 513, w: 380, h: 112 }}
          >
            <rect
              className="hero-cip-card-border"
              x={980}
              y={513}
              width={380}
              height={112}
              rx={10}
              stroke="#19D3C5"
              strokeWidth={4}
              fill="#0D1B3E"
            />
            <circle cx={1028} cy={569} r={32} stroke="#19D3C5" strokeWidth={1.6} fill="#19D3C5" fillOpacity={0.1} />
            <g
              className="hero-cip-card-icon"
              transform="translate(1028 569) scale(1.28) translate(-12 -12)"
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
            <text x={1076} y={559} fill="#FFFFFF" fontSize={18} fontWeight={800}>
              CROSS-DOCUMENT ISSUES
            </text>
            <text x={1076} y={587} fill="#FFFFFF" fontSize={18} opacity={0.92}>
              Documents vs. Each Other
            </text>
          </CipCard>
        </g>

        {/* Trust footer — equal columns; seps centered between neighboring items */}
        <g style={{ fontFamily: '"Plus Jakarta Sans", "Segoe UI", system-ui, sans-serif' }}>
          <line
            className={trustCount >= 1 ? "hero-cip-trust-line is-in" : "hero-cip-trust-line"}
            x1={40}
            y1={678}
            x2={1360}
            y2={678}
            stroke="#19D3C5"
            strokeWidth={1.25}
          />

          {/* Spread across full top line; more gap between the four blocks */}
          <g transform="translate(48 748)">
            <g
              className={trustCount >= 1 ? "hero-cip-trust-item is-in" : "hero-cip-trust-item"}
            >
            <g transform="translate(0 -28)" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <g transform="translate(0 2) scale(1.5)">
                <path d="M3 2 h10 l4 4 v14 H3 Z" stroke="#FFFFFF" strokeWidth={1.5} />
                <path d="M13 2 v4 h4" stroke="#FFFFFF" strokeWidth={1.5} />
                <path d="M7 11 h6M7 14.5 h4" stroke="#FFFFFF" strokeWidth={1.25} />
                <circle cx={20} cy={18} r={4.5} stroke="#19D3C5" strokeWidth={1.5} />
                <path d="M18.2 18 h3.6M20 16.2 v3.6" stroke="#19D3C5" strokeWidth={1.35} />
              </g>
              <text x={58} y={16} fill="#FFFFFF" fontSize={18} fontWeight={800} letterSpacing="0.04em">
                TRACEABILITY
              </text>
              <text x={58} y={48} fill="#FFFFFF" fontSize={18} opacity={0.9}>
                <tspan x={58} dy={0}>
                  Every finding traced
                </tspan>
                <tspan x={58} dy={28}>
                  to source
                </tspan>
              </text>
            </g>
            </g>
          </g>
          <line
            className={trustCount >= 2 ? "hero-cip-trust-sep is-in" : "hero-cip-trust-sep"}
            x1={365}
            y1={712}
            x2={365}
            y2={800}
            stroke="#19D3C5"
            strokeWidth={1.25}
          />

          <g transform="translate(400 748)">
            <g
              className={trustCount >= 2 ? "hero-cip-trust-item is-in" : "hero-cip-trust-item"}
            >
            <g transform="translate(0 -28)" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <g transform="translate(0 0) scale(1.5)">
                <path
                  d="M12 2.5 a7 7 0 0 1 4.2 12.6 v2.4 H7.8 v-2.4 A7 7 0 0 1 12 2.5 Z"
                  stroke="#FFFFFF"
                  strokeWidth={1.5}
                />
                <path d="M8.5 20.5 h7M9.5 23.2 h5" stroke="#FFFFFF" strokeWidth={1.4} />
                <path d="M12 8.5 v4M10 10.5 h4" stroke="#19D3C5" strokeWidth={1.4} />
              </g>
              <text x={58} y={16} fill="#FFFFFF" fontSize={18} fontWeight={800} letterSpacing="0.04em">
                EXPLAINABILITY
              </text>
              <text x={58} y={48} fill="#FFFFFF" fontSize={18} opacity={0.9}>
                <tspan x={58} dy={0}>
                  Clear reasoning
                </tspan>
                <tspan x={58} dy={28}>
                  and context
                </tspan>
              </text>
            </g>
            </g>
          </g>
          <line
            className={trustCount >= 3 ? "hero-cip-trust-sep is-in" : "hero-cip-trust-sep"}
            x1={715}
            y1={712}
            x2={715}
            y2={800}
            stroke="#19D3C5"
            strokeWidth={1.25}
          />

          <g transform="translate(750 748)">
            <g
              className={trustCount >= 3 ? "hero-cip-trust-item is-in" : "hero-cip-trust-item"}
            >
            <g transform="translate(0 -28)" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <g transform="translate(0 2) scale(1.5)">
                <circle cx={9} cy={7} r={4} stroke="#FFFFFF" strokeWidth={1.5} />
                <path d="M1.5 20 c0-4.2 3.2-7 7.5-7 s7.5 2.8 7.5 7" stroke="#FFFFFF" strokeWidth={1.5} />
                <circle cx={20} cy={16.5} r={4.2} fill="#19D3C5" stroke="none" />
                <path d="M17.8 16.5 l1.4 1.4 3-3.2" stroke="#0D1B3E" strokeWidth={1.4} />
              </g>
              <text x={58} y={16} fill="#FFFFFF" fontSize={18} fontWeight={800} letterSpacing="0.04em">
                HUMAN REVIEW
              </text>
              <text x={58} y={48} fill="#FFFFFF" fontSize={18} opacity={0.9}>
                <tspan x={58} dy={0}>
                  Your team validates
                </tspan>
                <tspan x={58} dy={28}>
                  every finding
                </tspan>
              </text>
            </g>
            </g>
          </g>
          <line
            className={trustCount >= 4 ? "hero-cip-trust-sep is-in" : "hero-cip-trust-sep"}
            x1={1065}
            y1={712}
            x2={1065}
            y2={800}
            stroke="#19D3C5"
            strokeWidth={1.25}
          />

          <g transform="translate(1100 748)">
            <g
              className={trustCount >= 4 ? "hero-cip-trust-item is-in" : "hero-cip-trust-item"}
            >
            <g transform="translate(0 -28)" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <g transform="translate(0 0) scale(1.5)">
                <rect x={3} y={11} width={16} height={12} rx={2.2} stroke="#FFFFFF" strokeWidth={1.5} />
                <path d="M7 11 V7.5 a4 4 0 0 1 8 0 V11" stroke="#19D3C5" strokeWidth={1.6} />
                <circle cx={11} cy={16.5} r={1.4} fill="#19D3C5" stroke="none" />
                <path d="M11 17.8 v2.2" stroke="#19D3C5" strokeWidth={1.4} />
              </g>
              <text x={58} y={16} fill="#FFFFFF" fontSize={18} fontWeight={800} letterSpacing="0.04em">
                READ-ONLY
              </text>
              <text x={58} y={48} fill="#FFFFFF" fontSize={18} opacity={0.9}>
                <tspan x={58} dy={0}>
                  No changes to
                </tspan>
                <tspan x={58} dy={28}>
                  your systems
                </tspan>
              </text>
            </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
