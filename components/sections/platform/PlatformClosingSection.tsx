"use client";

import { Container } from "@/components/ui/Container";
import {
  FaAward,
  FaCircleCheck,
  FaDatabase,
  FaFileLines,
  FaLinkSlash,
  FaMagnifyingGlass,
  FaTriangleExclamation,
  FaUsers,
} from "@/components/ui/icons";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const PROCESS_KEYS = [
  "sourceEvidence",
  "qaRaReview",
  "humanDecision",
] as const;

const PROCESS_ICONS = [
  <FaFileLines key="src" />,
  <FaUsers key="qa" />,
  <FaCircleCheck key="dec" />,
] as const;

const STEPS = [
  {
    num: "01",
    key: "applies" as const,
    theme: "violet" as const,
    icon: <FaFileLines />,
  },
  {
    num: "02",
    key: "exists" as const,
    theme: "violet" as const,
    icon: <FaMagnifyingGlass />,
  },
  {
    num: "03",
    key: "quality" as const,
    theme: "teal" as const,
    icon: <FaAward />,
  },
  {
    num: "04",
    key: "missing" as const,
    theme: "teal" as const,
    icon: <FaTriangleExclamation />,
  },
  {
    num: "05",
    key: "align" as const,
    theme: "teal" as const,
    icon: <FaLinkSlash />,
  },
  {
    num: "06",
    key: "happened" as const,
    theme: "teal" as const,
    icon: <FaDatabase />,
  },
] as const;

type FanPath = {
  d: string;
  theme: "violet" | "teal";
};

function buildFanPath(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
): string {
  const dy = Math.max(y1 - y0, 1);
  const midY = y0 + dy * 0.48;
  // Soft S-curve: leave card vertically, bend toward hub, arrive vertically
  return `M ${x0} ${y0} C ${x0} ${midY}, ${x1} ${midY}, ${x1} ${y1}`;
}

function StepCard({
  num,
  theme,
  icon,
  title,
  body,
  index,
  cardRef,
}: {
  num: string;
  theme: "violet" | "teal";
  icon: ReactNode;
  title: string;
  body: string;
  index: number;
  cardRef: (el: HTMLElement | null) => void;
}) {
  return (
    <article
      ref={cardRef}
      className={`platform-closing-step is-${theme}`}
      style={{ ["--i" as string]: index }}
      data-closing-step={index}
    >
      <div className="platform-closing-step-icon-wrap">
        <span className="platform-closing-step-icon" aria-hidden="true">
          {icon}
        </span>
        <span className="platform-closing-step-num">{num}</span>
      </div>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

export function PlatformClosingSection() {
  const t = useTranslations("platformPage");
  const tc = useTranslations("platformPage.closingDiagram");

  const flowRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const processPlayedRef = useRef(false);
  const processTimersRef = useRef<number[]>([]);
  const cardRefs = useRef<(HTMLElement | null)[]>(Array(6).fill(null));
  const [paths, setPaths] = useState<FanPath[]>([]);
  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });
  const [activeProcess, setActiveProcess] = useState<number | null>(null);

  const setCardRef = useCallback((index: number, el: HTMLElement | null) => {
    cardRefs.current[index] = el;
  }, []);

  const syncFan = useCallback(() => {
    const flow = flowRef.current;
    const hub = hubRef.current;
    if (!flow || !hub) return;

    const flowRect = flow.getBoundingClientRect();
    const hubRect = hub.getBoundingClientRect();
    const cards = cardRefs.current;
    if (!cards.every(Boolean)) return;

    const w = flowRect.width;
    const h = flowRect.height;
    setSvgSize({ w, h });

    const hubTop = hubRect.top - flowRect.top;
    const hubLeft = hubRect.left - flowRect.left;
    const hubWidth = hubRect.width;
    // Landing points spread across hub top (inset from edges)
    const inset = Math.min(28, hubWidth * 0.12);
    const usable = Math.max(hubWidth - inset * 2, 1);
    const n = cards.length;

    const next: FanPath[] = cards.map((card, i) => {
      const r = card!.getBoundingClientRect();
      const x0 = r.left - flowRect.left + r.width / 2;
      const y0 = r.bottom - flowRect.top;
      const tFrac = n === 1 ? 0.5 : i / (n - 1);
      const x1 = hubLeft + inset + usable * tFrac;
      // 6px gap between connection tip and hub card
      const y1 = hubTop - 6;
      const theme = i < 2 ? "violet" : "teal";
      return {
        d: buildFanPath(x0, y0, x1, y1),
        theme,
      };
    });

    setPaths(next);
  }, []);

  useLayoutEffect(() => {
    syncFan();
    const flow = flowRef.current;
    if (!flow) return;

    const ro = new ResizeObserver(() => syncFan());
    ro.observe(flow);
    cardRefs.current.forEach((el) => el && ro.observe(el));
    if (hubRef.current) ro.observe(hubRef.current);

    window.addEventListener("resize", syncFan);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", syncFan);
    };
  }, [syncFan]);

  useEffect(() => {
    const el = processRef.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      return;
    }

    const playOnce = () => {
      if (processPlayedRef.current) return;
      processPlayedRef.current = true;
      // Smooth one-shot: 0 → 1 → 2 → clear (no leftover highlight)
      setActiveProcess(0);
      processTimersRef.current.push(
        window.setTimeout(() => setActiveProcess(1), 900),
      );
      processTimersRef.current.push(
        window.setTimeout(() => setActiveProcess(2), 1800),
      );
      processTimersRef.current.push(
        window.setTimeout(() => setActiveProcess(null), 2700),
      );
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          playOnce();
          io.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      processTimersRef.current.forEach((id) => window.clearTimeout(id));
      processTimersRef.current = [];
    };
  }, []);

  const foundation = STEPS.slice(0, 2);
  const intelligence = STEPS.slice(2);

  return (
    <section className="platform-closing bg-surface-muted">
      <Container>
        <div className="platform-closing-head">
          <p className="platform-reg-eyebrow is-teal">{t("closeEyebrow")}</p>
          <h2 className="platform-closing-title">
            <span className="platform-closing-title-lead">
              {t("closeTitleLine1")}
            </span>{" "}
            <span>{t("closeTitleLine2")}</span>
          </h2>
          <p className="platform-closing-body">{t("closeBody")}</p>
        </div>

        <div className="platform-closing-flow" ref={flowRef}>
          <div className="platform-closing-groups">
            <div className="platform-closing-group is-violet">
              <p className="platform-closing-group-label">
                {tc("foundation")}
              </p>
              <div className="platform-closing-group-cards">
                {foundation.map((step, i) => (
                  <StepCard
                    key={step.key}
                    num={step.num}
                    theme={step.theme}
                    icon={step.icon}
                    title={tc(`cards.${step.key}.title`)}
                    body={tc(`cards.${step.key}.body`)}
                    index={i}
                    cardRef={(el) => setCardRef(i, el)}
                  />
                ))}
              </div>
            </div>

            <div className="platform-closing-group is-teal">
              <p className="platform-closing-group-label">
                {tc("intelligence")}
              </p>
              <div className="platform-closing-group-cards is-intel">
                {intelligence.map((step, i) => (
                  <StepCard
                    key={step.key}
                    num={step.num}
                    theme={step.theme}
                    icon={step.icon}
                    title={tc(`cards.${step.key}.title`)}
                    body={tc(`cards.${step.key}.body`)}
                    index={i + 2}
                    cardRef={(el) => setCardRef(i + 2, el)}
                  />
                ))}
              </div>
            </div>
          </div>

          <svg
            className="platform-closing-fan"
            aria-hidden="true"
            width={svgSize.w || "100%"}
            height={svgSize.h || "100%"}
            viewBox={`0 0 ${Math.max(svgSize.w, 1)} ${Math.max(svgSize.h, 1)}`}
          >
            <defs>
              <marker
                id="closing-fan-arrow-violet"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="8"
                markerHeight="8"
                orient="auto"
                markerUnits="userSpaceOnUse"
              >
                <path d="M1 1.5 L9 5 L1 8.5 Z" fill="#5C3D8F" />
              </marker>
              <marker
                id="closing-fan-arrow-teal"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="8"
                markerHeight="8"
                orient="auto"
                markerUnits="userSpaceOnUse"
              >
                <path d="M1 1.5 L9 5 L1 8.5 Z" fill="#19D3C5" />
              </marker>
            </defs>
            {paths.map((p, i) => (
              <path
                key={i}
                d={p.d}
                className={`platform-closing-fan-path is-${p.theme}`}
                fill="none"
                markerEnd={`url(#closing-fan-arrow-${p.theme})`}
              />
            ))}
          </svg>

          <div
            className="platform-closing-hub-bar"
            ref={hubRef}
            role="status"
            aria-label={tc("whatNeedsAttention")}
          >
            <span className="platform-closing-hub-eyebrow">
              {tc("outcome")}
            </span>
            <p className="platform-closing-hub-label">
              <span className="platform-closing-hub-mark" aria-hidden="true">
                <FaMagnifyingGlass />
              </span>
              {tc("whatNeedsAttention")}
            </p>
          </div>
        </div>

        <div className="platform-closing-process" ref={processRef}>
          {PROCESS_KEYS.map((key, i) => (
            <Fragment key={key}>
              {i > 0 ? (
                <span
                  className="platform-closing-process-arrow"
                  aria-hidden="true"
                />
              ) : null}
              <div
                className={
                  activeProcess === i
                    ? "platform-closing-process-item is-active"
                    : "platform-closing-process-item"
                }
              >
                <span
                  className="platform-closing-process-icon"
                  aria-hidden="true"
                >
                  {PROCESS_ICONS[i]}
                </span>
                <span>{tc(`process.${key}`)}</span>
              </div>
            </Fragment>
          ))}
        </div>
      </Container>
    </section>
  );
}
