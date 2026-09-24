"use client";

import {
  FaCircleCheck,
  FaClipboardCheck,
  FaDatabase,
  FaFileLines,
  FaFileShield,
  FaMagnifyingGlass,
  FaShieldHalved,
  FaTriangleExclamation,
  FaUsers,
  FaXmark,
} from "@/components/ui/icons";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import type { IconType } from "react-icons";

const VB = { w: 1476, h: 800 };

type CardSide = "left" | "right";
type CardKind = "input" | "engine" | "output";
type CardVAlign = "top" | "bottom";

type HeroCardDef = {
  id: string;
  kind: CardKind;
  side: CardSide;
  /** Prefer bottom for lower-row cards so the popover opens upward and stays visible */
  vAlign: CardVAlign;
  stageKey: "stageInput" | "stageEngine" | "stageOutput";
  titleKey: string;
  subtitleKey: string;
  bodyKey: string;
  icon: IconType;
  /** SVG viewBox coords */
  x: number;
  y: number;
  w: number;
  h: number;
};

const CARDS: HeroCardDef[] = [
  {
    id: "procedures",
    kind: "input",
    side: "right",
    vAlign: "top",
    stageKey: "stageInput",
    titleKey: "proceduresTitle",
    subtitleKey: "proceduresSubtitle",
    bodyKey: "proceduresBody",
    icon: FaFileLines,
    x: 11.27,
    y: 76.46,
    w: 373.79,
    h: 131.64,
  },
  {
    id: "records",
    kind: "input",
    side: "right",
    vAlign: "top",
    stageKey: "stageInput",
    titleKey: "recordsTitle",
    subtitleKey: "recordsSubtitle",
    bodyKey: "recordsBody",
    icon: FaDatabase,
    x: 11.27,
    y: 220.36,
    w: 373.79,
    h: 131.64,
  },
  {
    id: "riskFiles",
    kind: "input",
    side: "right",
    vAlign: "top",
    stageKey: "stageInput",
    titleKey: "riskFilesTitle",
    subtitleKey: "riskFilesSubtitle",
    bodyKey: "riskFilesBody",
    icon: FaShieldHalved,
    x: 11.27,
    y: 364.25,
    w: 373.79,
    h: 131.64,
  },
  {
    id: "capas",
    kind: "input",
    side: "right",
    vAlign: "bottom",
    stageKey: "stageInput",
    titleKey: "capasTitle",
    subtitleKey: "capasSubtitle",
    bodyKey: "capasBody",
    icon: FaClipboardCheck,
    x: 11.27,
    y: 508.15,
    w: 373.79,
    h: 131.64,
  },
  {
    id: "evidence",
    kind: "input",
    side: "right",
    vAlign: "bottom",
    stageKey: "stageInput",
    titleKey: "evidenceTitle",
    subtitleKey: "evidenceSubtitle",
    bodyKey: "evidenceBody",
    icon: FaMagnifyingGlass,
    x: 11.27,
    y: 652.04,
    w: 373.79,
    h: 131.64,
  },
  {
    id: "engine",
    kind: "engine",
    side: "left",
    vAlign: "top",
    stageKey: "stageEngine",
    titleKey: "engineTitle",
    subtitleKey: "engineSubtitle",
    bodyKey: "engineBody",
    icon: FaFileShield,
    x: 496.06,
    y: 84.69,
    w: 483.89,
    h: 483.89,
  },
  {
    id: "review",
    kind: "engine",
    side: "left",
    vAlign: "bottom",
    stageKey: "stageEngine",
    titleKey: "reviewTitle",
    subtitleKey: "reviewSubtitle",
    bodyKey: "reviewBody",
    icon: FaUsers,
    x: 496.06,
    y: 652.04,
    w: 483.89,
    h: 131.64,
  },
  {
    id: "misalignments",
    kind: "output",
    side: "left",
    vAlign: "top",
    stageKey: "stageOutput",
    titleKey: "misalignmentsTitle",
    subtitleKey: "misalignmentsSubtitle",
    bodyKey: "misalignmentsBody",
    icon: FaTriangleExclamation,
    x: 1090.94,
    y: 76.46,
    w: 373.79,
    h: 186.08,
  },
  {
    id: "traceable",
    kind: "output",
    side: "left",
    vAlign: "top",
    stageKey: "stageOutput",
    titleKey: "traceableTitle",
    subtitleKey: "traceableSubtitle",
    bodyKey: "traceableBody",
    icon: FaShieldHalved,
    x: 1090.94,
    y: 337.04,
    w: 373.79,
    h: 186.08,
  },
  {
    id: "readiness",
    kind: "output",
    side: "left",
    vAlign: "bottom",
    stageKey: "stageOutput",
    titleKey: "readinessTitle",
    subtitleKey: "readinessSubtitle",
    bodyKey: "readinessBody",
    icon: FaCircleCheck,
    x: 1090.94,
    y: 597.61,
    w: 373.79,
    h: 186.08,
  },
];

function pct(n: number, total: number) {
  return `${(n / total) * 100}%`;
}

type HeroDiagramInteractiveProps = {
  src: string;
  alt: string;
};

export function HeroDiagramInteractive({ src, alt }: HeroDiagramInteractiveProps) {
  const t = useTranslations("home.hero.diagram");
  const [openId, setOpenId] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const labelId = useId();

  const close = useCallback(() => setOpenId(null), []);

  useEffect(() => {
    if (!openId) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const root = rootRef.current;
      if (!root) return;
      const target = event.target as Node | null;
      if (target && !root.contains(target)) close();
    };

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openId, close]);

  const onHotspotKey = (event: KeyboardEvent<HTMLButtonElement>, id: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpenId((prev) => (prev === id ? null : id));
    }
  };

  return (
    <div
      ref={rootRef}
      className="hero-diagram-interactive relative z-10 w-full max-w-[280px] lg:max-w-none lg:w-[90%]"
      style={{ aspectRatio: `${VB.w} / ${VB.h}` }}
    >
      <img
        id="hero-animated-svg"
        src={src}
        alt={alt}
        width={900}
        height={520}
        className="absolute inset-0 h-full w-full object-contain"
        decoding="async"
        draggable={false}
      />

      {CARDS.map((card) => {
        const Icon = card.icon;
        const isOpen = openId === card.id;
        return (
          <div
            key={card.id}
            className="hero-diagram-hotspot"
            style={{
              left: pct(card.x, VB.w),
              top: pct(card.y, VB.h),
              width: pct(card.w, VB.w),
              height: pct(card.h, VB.h),
            }}
          >
            <button
              type="button"
              className={`hero-diagram-hotspot-btn${isOpen ? " is-open" : ""}`}
              aria-expanded={isOpen}
              aria-controls={isOpen ? `${labelId}-${card.id}` : undefined}
              onClick={() => setOpenId((prev) => (prev === card.id ? null : card.id))}
              onKeyDown={(e) => onHotspotKey(e, card.id)}
            >
              <span className="sr-only">
                {t(card.titleKey)} — {t("openHint")}
              </span>
            </button>

            <div
              id={`${labelId}-${card.id}`}
              role="dialog"
              aria-modal="false"
              aria-label={t(card.titleKey)}
              className={`hero-diagram-popover hero-diagram-popover-${card.side} hero-diagram-popover-${card.vAlign}${isOpen ? " is-open" : ""}`}
            >
              <button
                type="button"
                className="hero-diagram-popover-close"
                aria-label={t("close")}
                onClick={(e) => {
                  e.stopPropagation();
                  close();
                }}
              >
                <FaXmark aria-hidden="true" />
              </button>

              <span className="hero-diagram-popover-stage">{t(card.stageKey)}</span>

              <div className="hero-diagram-popover-head">
                <span className="hero-diagram-popover-icon" aria-hidden="true">
                  <Icon />
                </span>
                <div className="hero-diagram-popover-titles">
                  <p className="hero-diagram-popover-title">{t(card.titleKey)}</p>
                  <p className="hero-diagram-popover-subtitle">{t(card.subtitleKey)}</p>
                </div>
              </div>

              <div className="hero-diagram-popover-body">
                <p>{t(card.bodyKey)}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
