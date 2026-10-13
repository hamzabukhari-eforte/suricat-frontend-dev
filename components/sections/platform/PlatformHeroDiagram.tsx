"use client";

import { useEffect, useRef } from "react";

/** Vector SVG recreation of the Platform hero screenshot. */
export function PlatformHeroDiagram() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      el.classList.add("ph-anim", "ph-static");
      return;
    }

    const play = () => {
      el.classList.add("ph-reset");
      el.classList.remove("ph-anim");
      void el.getBoundingClientRect();
      el.classList.remove("ph-reset");
      requestAnimationFrame(() => {
        el.classList.add("ph-anim");
      });
    };

    const reset = () => {
      el.classList.add("ph-reset");
      el.classList.remove("ph-anim");
    };

    if (!("IntersectionObserver" in window)) {
      play();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          play();
        } else {
          reset();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      className="platform-hero-diagram"
      viewBox="-130 0 1380 580"
      width={1380}
      height={580}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Suricat platform: from compliance evidence through six intelligence steps to what needs attention"
    >
      <defs>
        <marker
          id="ph-arr-w"
          markerWidth="12"
          markerHeight="12"
          refX="10"
          refY="6"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path
            d="M1.5 1.5L10 6L1.5 10.5"
            fill="none"
            stroke="rgba(200,210,230,0.85)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
        <marker
          id="ph-arr-t"
          markerWidth="12"
          markerHeight="12"
          refX="10"
          refY="6"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path
            d="M1.5 1.5L10 6L1.5 10.5"
            fill="none"
            stroke="#19d3c5"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>

      {/* Left: Compliance Evidence — pushed left, enlarged */}
      <g className="ph-evidence" transform="translate(-148 -28) scale(1.2)">
        <text
          className="ph-reveal"
          style={{ ["--ph-i" as string]: 0 }}
          x="128"
          y="48"
          textAnchor="middle"
          fill="#fff"
          fontSize="14"
          fontWeight="700"
          letterSpacing="1.8"
        >
          COMPLIANCE EVIDENCE
        </text>

        {(
          [
            {
              y: 66,
              label: "SOP",
              lines: null as string[] | null,
              fs: 16,
              icon: "sop" as const,
            },
            {
              y: 140,
              label: "CAPA",
              lines: null,
              fs: 16,
              icon: "capa" as const,
            },
            {
              y: 214,
              label: "Risk File",
              lines: null,
              fs: 16,
              icon: "risk" as const,
            },
            {
              y: 288,
              label: "Design Control Documentation",
              lines: ["Design Control", "Documentation"],
              fs: 16,
              icon: "design" as const,
            },
            {
              y: 362,
              label: "Training Document",
              lines: ["Training", "Document"],
              fs: 16,
              icon: "training" as const,
            },
          ] as const
        ).map(({ y, label, lines, fs, icon }, i) => (
          <g
            key={label}
            className="ph-reveal"
            style={{ ["--ph-i" as string]: 1 + i }}
          >
            <rect
              x="28"
              y={y}
              width="200"
              height="64"
              rx="8"
              fill="#121c38"
              stroke="rgba(255,255,255,0.12)"
            />
            <g
              transform={`translate(40 ${y + 19}) scale(1.22)`}
              stroke="#19d3c5"
              strokeWidth="1.45"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {icon === "sop" && (
                <>
                  {/* Clipboard / SOP */}
                  <rect x="4" y="2" width="12" height="16" rx="1.5" />
                  <rect x="7" y="0.5" width="6" height="3" rx="1" />
                  <path d="M7 8h6M7 11.5h6M7 15h4" />
                </>
              )}
              {icon === "capa" && (
                <>
                  {/* Checklist with check — CAPA */}
                  <rect x="2" y="1" width="16" height="18" rx="2" />
                  <path d="M6 7.5l2 2 4.5-4.5" />
                  <path d="M6 13h8" />
                  <path d="M6 16.5h5" />
                </>
              )}
              {icon === "risk" && (
                <>
                  {/* Warning triangle — Risk */}
                  <path d="M10 2.5L18.5 17.5H1.5L10 2.5z" />
                  <path d="M10 8v4.5" />
                  <circle cx="10" cy="15.2" r="0.9" fill="#19d3c5" stroke="none" />
                </>
              )}
              {icon === "design" && (
                <>
                  {/* Layers / design control */}
                  <path d="M10 2L18 6.5L10 11L2 6.5L10 2z" />
                  <path d="M2 10l8 4.5L18 10" />
                  <path d="M2 13.5l8 4.5L18 13.5" />
                </>
              )}
              {icon === "training" && (
                <>
                  {/* Graduation cap — Training */}
                  <path d="M10 3L19 7.5L10 12L1 7.5L10 3z" />
                  <path d="M5 9.5v4.2c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V9.5" />
                  <path d="M19 7.5v5" />
                </>
              )}
            </g>
            {lines ? (
              <text
                x="88"
                y={y + 32}
                fill="#fff"
                fontSize={fs}
                fontWeight="600"
                dominantBaseline="middle"
              >
                <tspan x="88" dy="-9">
                  {lines[0]}
                </tspan>
                <tspan x="88" dy="18">
                  {lines[1]}
                </tspan>
              </text>
            ) : (
              <text
                x="88"
                y={y + 32}
                fill="#fff"
                fontSize={fs}
                fontWeight="600"
                dominantBaseline="middle"
              >
                {label}
              </text>
            )}
          </g>
        ))}

        <g className="ph-reveal" style={{ ["--ph-i" as string]: 6 }}>
          <rect
            x="28"
            y="436"
            width="200"
            height="64"
            rx="8"
            fill="#121c38"
            stroke="rgba(255,255,255,0.12)"
          />
          <g
            transform="translate(40 455) scale(1.22)"
            stroke="#19d3c5"
            strokeWidth="1.45"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Database — Records */}
            <ellipse cx="10" cy="4" rx="8" ry="3.2" />
            <path d="M2 4v12c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2V4" />
            <path d="M2 10c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2" />
          </g>
          <text
            x="88"
            y="468"
            fill="#fff"
            fontSize="16"
            fontWeight="600"
            dominantBaseline="middle"
          >
            Records
          </text>
        </g>

        {/* Many-to-one: stub from each pill → vertical spine → dashed to hub */}
        <g
          className="ph-reveal ph-spine"
          style={{ ["--ph-i" as string]: 7 }}
          stroke="rgba(200,210,230,0.55)"
          strokeWidth="1.25"
          fill="none"
        >
          {(
            [
              66 + 32, // SOP
              140 + 32, // CAPA
              214 + 32, // Risk File
              288 + 32, // Design Control
              362 + 32, // Training
              436 + 32, // Records
            ] as const
          ).map((cy) => (
            <line key={cy} x1="228" y1={cy} x2="246" y2={cy} />
          ))}
          <line x1="246" y1={66 + 32} x2="246" y2={436 + 32} />
        </g>
      </g>

      {/* Center hub — professional donut / pie ring */}
      {/* Hub Y=292 centers the ring+steps against the Compliance Intelligence card */}
      <g className="ph-hub" transform="translate(470 292) scale(1.04)">
        {/* Soft track under outer circle */}
        <circle
          className="ph-reveal"
          style={{ ["--ph-i" as string]: 8 }}
          r="120"
          stroke="rgba(90,110,150,0.16)"
          strokeWidth="22"
          fill="none"
        />

        {/* Outer circle — screenshot: 6 equal segments, 2 lavender top + 4 teal */}
        <path
          className="ph-reveal ph-ring"
          style={{ ["--ph-i" as string]: 9 }}
          d="M-99.48 -67.10 A120 120 0 0 1 -8.37 -119.71"
          stroke="#b8a4e8"
          strokeWidth="16"
          strokeLinecap="butt"
          fill="none"
        />
        <path
          className="ph-reveal ph-ring"
          style={{ ["--ph-i" as string]: 10 }}
          d="M8.37 -119.71 A120 120 0 0 1 99.48 -67.10"
          stroke="#b8a4e8"
          strokeWidth="16"
          strokeLinecap="butt"
          fill="none"
        />
        <path
          className="ph-reveal ph-ring"
          style={{ ["--ph-i" as string]: 11 }}
          d="M107.86 -52.60 A120 120 0 0 1 107.86 52.60"
          stroke="#19d3c5"
          strokeWidth="16"
          strokeLinecap="butt"
          fill="none"
        />
        <path
          className="ph-reveal ph-ring"
          style={{ ["--ph-i" as string]: 12 }}
          d="M99.48 67.10 A120 120 0 0 1 8.37 119.71"
          stroke="#19d3c5"
          strokeWidth="16"
          strokeLinecap="butt"
          fill="none"
        />
        <path
          className="ph-reveal ph-ring"
          style={{ ["--ph-i" as string]: 13 }}
          d="M-8.37 119.71 A120 120 0 0 1 -99.48 67.10"
          stroke="#19d3c5"
          strokeWidth="16"
          strokeLinecap="butt"
          fill="none"
        />
        <path
          className="ph-reveal ph-ring"
          style={{ ["--ph-i" as string]: 14 }}
          d="M-107.86 52.60 A120 120 0 0 1 -107.86 -52.60"
          stroke="#19d3c5"
          strokeWidth="16"
          strokeLinecap="butt"
          fill="none"
        />

        {/* Faint dashed orbit outside (screenshot tech detail) */}
        <circle
          className="ph-reveal ph-orbit"
          style={{ ["--ph-i" as string]: 15 }}
          r="138"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          strokeDasharray="2 4"
          fill="none"
        />

        {/* Core disk */}
        <g className="ph-reveal ph-core" style={{ ["--ph-i" as string]: 16 }}>
          <circle r="84" fill="#0d1b3e" />
          <circle
            r="84"
            fill="none"
            stroke="rgba(25,211,197,0.22)"
            strokeWidth="1.25"
          />
          {/* Official Suricat logo mark */}
          <image
            href="/assets/images/suricat-logo-mark-center.svg"
            x={-50}
            y={-72}
            width={100}
            height={100}
            preserveAspectRatio="xMidYMid meet"
          />
          <text
            y="46"
            textAnchor="middle"
            fill="#fff"
            fontSize="20"
            fontWeight="800"
            letterSpacing="2"
          >
            SURICAT
          </text>
          <text
            y="62"
            textAnchor="middle"
            fill="#19d3c5"
            fontSize="5.5"
            fontWeight="700"
            letterSpacing="1.2"
          >
            COMPLIANCE INTELLIGENCE
          </text>
        </g>

        {/* Evidence spine → inner circle (tip on core edge) */}
        <path
          className="ph-reveal ph-feed"
          style={{ ["--ph-i" as string]: 8.5 }}
          d="M-310 0H-84"
          stroke="rgba(200,210,230,0.65)"
          strokeWidth="1.4"
          strokeDasharray="4 3.5"
          fill="none"
          markerEnd="url(#ph-arr-w)"
        />

        <text
          className="ph-reveal"
          style={{ ["--ph-i" as string]: 17 }}
          x="52"
          y="-148"
          textAnchor="middle"
          fill="rgba(255,255,255,0.7)"
          fontSize="9"
          fontWeight="700"
          letterSpacing="2.6"
        >
          FOUNDATION
        </text>
        <text
          className="ph-reveal"
          style={{ ["--ph-i" as string]: 17 }}
          x="52"
          y="162"
          textAnchor="middle"
          fill="rgba(255,255,255,0.7)"
          fontSize="9"
          fontWeight="700"
          letterSpacing="2.6"
        >
          INTELLIGENCE
        </text>

        {(
          [
            {
              num: "01",
              title: "What applies",
              titleLines: null as string[] | null,
              sub: "REGULATORY CONTEXT",
              color: "#b8a4e8",
              hx: -100,
              hy: -68,
              x: -290,
              y: -108,
              side: "left" as const,
              w: 142,
            },
            {
              num: "02",
              title: "What exists",
              titleLines: null,
              sub: "DOCUMENT INTELLIGENCE",
              color: "#b8a4e8",
              hx: 0,
              hy: -120,
              x: -88,
              y: -224,
              side: "top" as const,
              w: 168,
            },
            {
              num: "03",
              title: "How good it is",
              titleLines: null,
              sub: "QUALITY INTELLIGENCE",
              color: "#19d3c5",
              hx: 108,
              hy: -40,
              x: 172,
              y: -108,
              side: "right" as const,
              w: 160,
            },
            {
              num: "04",
              title: "What is missing",
              titleLines: null,
              sub: "GAP INTELLIGENCE",
              color: "#19d3c5",
              hx: 108,
              hy: 40,
              x: 172,
              y: 64,
              side: "right" as const,
              w: 148,
            },
            {
              num: "05",
              title: "What does not align",
              titleLines: null,
              sub: "CROSS DOCUMENT INTELLIGENCE",
              color: "#19d3c5",
              hx: 0,
              hy: 120,
              x: -48,
              y: 182,
              side: "bottom" as const,
              w: 196,
            },
            {
              num: "06",
              title: "What actually happened",
              titleLines: ["What actually", "happened"],
              sub: "RECORD INTELLIGENCE",
              color: "#19d3c5",
              hx: -108,
              hy: 48,
              x: -278,
              y: 142,
              side: "left" as const,
              w: 148,
            },
          ] as const
        ).map((s, si) => {
          const numCx = s.x + 20;
          const numCy = s.y + (s.titleLines ? 28 : 24);
          const isRight = s.side === "right";
          const boxH = s.titleLines ? 58 : 48;
          return (
            <g
              key={s.num}
              className="ph-reveal ph-step"
              style={{ ["--ph-i" as string]: 18 + si }}
            >
              {/* Connector: solid line from ring into number badge (screenshot style) */}
              <line
                x1={s.hx}
                y1={s.hy}
                x2={numCx}
                y2={numCy}
                stroke={s.color}
                strokeWidth={isRight ? 1.35 : 1.15}
                strokeLinecap="round"
              />
              <circle cx={s.hx} cy={s.hy} r="3" fill={s.color} />

              <rect
                x={s.x}
                y={s.y}
                width={s.w + 12}
                height={boxH}
                rx="10"
                fill="#121c38"
                stroke={
                  isRight ? "rgba(25,211,197,0.22)" : `${s.color}55`
                }
                strokeWidth="1"
              />
              <circle cx={numCx} cy={numCy} r="12.5" fill={s.color} />
              <text
                x={numCx}
                y={numCy + 4}
                textAnchor="middle"
                fill="#0d1b3e"
                fontSize="11.5"
                fontWeight="800"
              >
                {s.num}
              </text>
              {s.titleLines ? (
                <text
                  x={s.x + 40}
                  y={s.y + 18}
                  fill="#fff"
                  fontSize="13"
                  fontWeight="700"
                >
                  <tspan x={s.x + 40} dy="0">
                    {s.titleLines[0]}
                  </tspan>
                  <tspan x={s.x + 40} dy="14">
                    {s.titleLines[1]}
                  </tspan>
                </text>
              ) : (
                <text
                  x={s.x + 40}
                  y={s.y + 20}
                  fill="#fff"
                  fontSize={isRight ? 14 : 13}
                  fontWeight="700"
                >
                  {s.title}
                </text>
              )}
              <text
                x={s.x + 40}
                y={s.y + (s.titleLines ? 48 : 36)}
                fill={s.color}
                fontSize={isRight ? 9.5 : 8.5}
                fontWeight="700"
                letterSpacing="0.4"
              >
                {s.sub}
              </text>
            </g>
          );
        })}
      </g>

      {/* Arrow through ring gap → Compliance Intelligence panel */}
      <path
        className="ph-reveal ph-out-arrow"
        style={{ ["--ph-i" as string]: 24 }}
        d="M603 292H838"
        stroke="#19d3c5"
        strokeWidth="2.4"
        fill="none"
        markerEnd="url(#ph-arr-t)"
      />

      {/* Right panel — pushed further right, enlarged */}
      <g className="ph-right" transform="translate(48 -36) scale(1.2)">
        <text
          className="ph-reveal"
          style={{ ["--ph-i" as string]: 25 }}
          x="828"
          y="42"
          textAnchor="middle"
          fill="#19d3c5"
          fontSize="14"
          fontWeight="700"
          letterSpacing="1.6"
        >
          COMPLIANCE INTELLIGENCE
        </text>

        <g className="ph-reveal" style={{ ["--ph-i" as string]: 25 }}>
          <rect
            x="678"
            y="56"
            width="300"
            height="448"
            rx="12"
            fill="#121c38"
            stroke="rgba(25,211,197,0.3)"
            strokeWidth="1.4"
          />

          <g transform="translate(698 78)">
            <ellipse
              cx="10"
              cy="7"
              rx="11"
              ry="7"
              stroke="#19d3c5"
              strokeWidth="1.5"
              fill="none"
            />
            <circle cx="10" cy="7" r="2.8" fill="#19d3c5" />
            <text x="28" y="11" fill="#fff" fontSize="13.5" fontWeight="700">
              What Needs Attention
            </text>
          </g>
        </g>

        {(
          [
            {
              y: 106,
              title: "Document Quality",
              issue: "Potential quality issue",
            },
            {
              y: 192,
              title: "Potential Gaps",
              issue: "Missing or insufficient",
            },
            {
              y: 278,
              title: "Relationships",
              issue: "Potential misalignment",
            },
            {
              y: 364,
              title: "Records",
              issue: "Potential discrepancy",
            },
          ] as const
        ).map(({ y, title, issue }, ri) => (
          <g
            key={title}
            className="ph-reveal"
            style={{ ["--ph-i" as string]: 26 + ri }}
          >
            <rect
              x="696"
              y={y}
              width="264"
              height="78"
              rx="8"
              fill="#0a1530"
              stroke="rgba(255,255,255,0.08)"
            />
            <text
              x="712"
              y={y + 24}
              fill="#fff"
              fontSize="14.5"
              fontWeight="700"
            >
              {title}
            </text>
            <circle cx="718" cy={y + 42} r="3.2" fill="#ff6b35" />
            <text
              x="728"
              y={y + 46}
              fill="#fff"
              fontSize="13"
            >
              {issue}
            </text>
            <text
              x="712"
              y={y + 64}
              fill="#19d3c5"
              fontSize="12.5"
              fontWeight="600"
            >
              Source evidence linked
            </text>
          </g>
        ))}

        <g className="ph-reveal" style={{ ["--ph-i" as string]: 30 }}>
          <rect x="696" y="452" width="264" height="40" rx="8" fill="#19d3c5" />
          <g transform="translate(714 462)" fill="#0d1b3e">
            <circle cx="5" cy="7" r="4" />
            <circle cx="14" cy="7" r="4" />
            <path d="M0 18c.3-3.2 2.4-5 5-5s4.7 1.8 5 5M9 18c.3-3.2 2.4-5 5-5s4.7 1.8 5 5" />
          </g>
          <text x="742" y="477" fill="#0d1b3e" fontSize="12" fontWeight="800">
            QA and RA teams verify and decide.
          </text>
        </g>
      </g>
    </svg>
  );
}
