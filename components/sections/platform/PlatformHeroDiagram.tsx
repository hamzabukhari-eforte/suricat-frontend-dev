"use client";

import { useEffect, useRef } from "react";

/** Survives remounts — platform hero must never replay on scroll-up */
let platformHeroHasPlayed = false;

/** Vector SVG recreation of the Platform hero screenshot. */
export function PlatformHeroDiagram() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;

    const freeze = () => {
      platformHeroHasPlayed = true;
      el.classList.remove("ph-reset");
      el.classList.add("ph-anim", "ph-static");
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches || platformHeroHasPlayed) {
      freeze();
      return;
    }

    const play = () => {
      if (platformHeroHasPlayed) return;
      platformHeroHasPlayed = true;
      el.classList.remove("ph-reset", "ph-static");
      el.classList.remove("ph-anim");
      void el.getBoundingClientRect();
      requestAnimationFrame(() => {
        el.classList.add("ph-anim");
      });
    };

    if (!("IntersectionObserver" in window)) {
      play();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          if (platformHeroHasPlayed) {
            freeze();
            return;
          }
          play();
          return;
        }
        // Left viewport: keep final frame — never hide / replay on scroll-up
        if (platformHeroHasPlayed) freeze();
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
      viewBox="-130 0 1380 620"
      width={1380}
      height={620}
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
        <marker
          id="ph-arr-p"
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
            stroke="#b8a4e8"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>

      {/* Left: Compliance Evidence — pushed left, enlarged */}
      <g className="ph-evidence" transform="translate(-125 -28) scale(1.2)">
        <text
          className="ph-reveal"
          style={{ ["--ph-i" as string]: 0 }}
          x="115.5"
          y="48"
          textAnchor="middle"
          fill="#b8a4e8"
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
              fs: 14,
              icon: "sop" as const,
            },
            {
              y: 140,
              label: "CAPA",
              lines: null,
              fs: 14,
              icon: "capa" as const,
            },
            {
              y: 214,
              label: "Risk File",
              lines: null,
              fs: 14,
              icon: "risk" as const,
            },
            {
              y: 288,
              label: "Design Control Documentation",
              lines: ["Design Control", "Documentation"],
              fs: 14,
              icon: "design" as const,
            },
            {
              y: 362,
              label: "Work Instructions",
              lines: ["Work", "Instructions"],
              fs: 14,
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
              width="175"
              height="58"
              rx="8"
              fill="#121c38"
              stroke="rgba(255,255,255,0.12)"
            />
            <g
              transform={`translate(40 ${y + 16}) scale(1.22)`}
              stroke="#b8a4e8"
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
                  <circle cx="10" cy="15.2" r="0.9" fill="#b8a4e8" stroke="none" />
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
                x="80"
                y={y + 29}
                fill="#fff"
                fontSize={fs}
                fontWeight="600"
                dominantBaseline="middle"
              >
                <tspan x="80" dy="-9">
                  {lines[0]}
                </tspan>
                <tspan x="80" dy="18">
                  {lines[1]}
                </tspan>
              </text>
            ) : (
              <text
                x="80"
                y={y + 29}
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
            width="175"
            height="58"
            rx="8"
            fill="#121c38"
            stroke="rgba(255,255,255,0.12)"
          />
          <g
            transform="translate(40 452) scale(1.22)"
            stroke="#b8a4e8"
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
            x="80"
            y="465"
            fill="#fff"
            fontSize="14"
            fontWeight="600"
            dominantBaseline="middle"
          >
            Records
          </text>
        </g>

        {/* Many-to-one: stubs + vertical spine as one path (no junction gaps) */}
        <path
          className="ph-reveal ph-spine"
          style={{ ["--ph-i" as string]: 7 }}
          d={[
            // vertical spine
            `M221 ${66 + 29}V${436 + 29}`,
            // stubs: gap after box (203), stop at spine (no overshoot)
            ...([66, 140, 214, 288, 362, 436] as const).map(
              (y) => `M206 ${y + 29}H220.5`,
            ),
          ].join("")}
          stroke="#b8a4e8"
          strokeWidth="1.25"
          fill="none"
          opacity="0.85"
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
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

        {/* Outer circle — 6 segments; rotate(-30) = purple block on LEFT */}
        <g transform="rotate(-30)">
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
        </g>

        {/* Logo only — outer decorative circle removed */}
        <g className="ph-reveal ph-core" style={{ ["--ph-i" as string]: 16 }}>
          <image
            href="/assets/images/suricat-logo-mark-center.svg"
            x={-48}
            y={-70}
            width={96}
            height={96}
            preserveAspectRatio="xMidYMid meet"
          />
          <text
            y="52"
            textAnchor="middle"
            fill="#fff"
            fontSize="21"
            fontWeight="800"
            letterSpacing="2"
          >
            SURICAT
          </text>
          <text
            y="70"
            textAnchor="middle"
            fill="#19d3c5"
            fontSize="9"
            fontWeight="700"
            letterSpacing="1.3"
          >
            COMPLIANCE INTELLIGENCE
          </text>
        </g>

        {/* Evidence spine → stop 4px before outer ring (r≈128) */}
        <path
          className="ph-reveal ph-feed"
          style={{ ["--ph-i" as string]: 8.5 }}
          d="M-317 0H-132"
          stroke="#b8a4e8"
          strokeWidth="1.4"
          fill="none"
          opacity="0.9"
          markerEnd="url(#ph-arr-p)"
        />

        {/* Left column label — above What applies / What actually happened */}
        <text
          className="ph-reveal"
          style={{ ["--ph-i" as string]: 17 }}
          x="-215"
          y="-210"
          textAnchor="middle"
          fill="#b8a4e8"
          fontSize="18"
          fontWeight="800"
          letterSpacing="2.6"
        >
          FOUNDATION
        </text>
        {/* Right column label — above How good it is / What is missing */}
        <text
          className="ph-reveal"
          style={{ ["--ph-i" as string]: 17 }}
          x="232"
          y="-210"
          textAnchor="middle"
          fill="#19d3c5"
          fontSize="18"
          fontWeight="800"
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
              sub: "ORGANIZATIONAL CONTEXT",
              color: "#b8a4e8",
              hx: -100,
              hy: -68,
              x: -288,
              y: -128,
              side: "left" as const,
              w: 158,
            },
            {
              num: "02",
              title: "What exists",
              titleLines: null,
              sub: "DOCUMENT INTELLIGENCE",
              color: "#b8a4e8",
              hx: 0,
              hy: -120,
              // Card box centered on vertical connector (width 168+12=180 → x=-90)
              x: -90,
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
              x: 148,
              y: -128,
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
              x: 148,
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
              // Card box centered on vertical connector (width 196+12=208 → x=-104)
              x: -104,
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
              x: -268,
              y: 80,
              side: "left" as const,
              w: 148,
            },
          ] as const
        ).map((s, si) => {
          const numCx = s.x + 20;
          const numCy = s.y + (s.titleLines ? 28 : 24);
          const boxW = s.w + 12;
          const boxCenterX = s.x + boxW / 2;
          const isRight = s.side === "right";
          const isTop = s.side === "top";
          const isBottom = s.side === "bottom";
          const boxH = s.titleLines ? 58 : 48;
          // Top/bottom cards: keep connector vertical into card center edge
          const lineX2 = isTop || isBottom ? boxCenterX : numCx;
          const lineY2 = isTop ? s.y : isBottom ? s.y : numCy;
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
                x2={lineX2}
                y2={lineY2}
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
                rx="8"
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
                fontSize={isRight ? 9.5 : 8.25}
                fontWeight="700"
                letterSpacing={s.num === "01" ? "0.15" : "0.4"}
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
        d="M603 292H822"
        stroke="#19d3c5"
        strokeWidth="2.4"
        fill="none"
        markerEnd="url(#ph-arr-t)"
      />

      {/* Right panel — shifted left */}
      <g className="ph-right" transform="translate(12 -36) scale(1.2)">
        <text
          className="ph-reveal"
          style={{ ["--ph-i" as string]: 25 }}
          x="803"
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
            width="250"
            height="468"
            rx="8"
            fill="#121c38"
            stroke="rgba(25,211,197,0.45)"
            strokeWidth="1.6"
          />

          <g transform="translate(698 76)">
            {/* Light teal badge + smaller outlined eye */}
            <rect
              x="0"
              y="0"
              width="18"
              height="18"
              rx="8"
              fill="rgba(25, 211, 197, 0.22)"
            />
            <g transform="translate(9 9) scale(0.72)">
              <path
                d="M-8.5 0C-6.2 -3.8 -3.4 -5.8 0 -5.8S6.2 -3.8 8.5 0C6.2 3.8 3.4 5.8 0 5.8S-6.2 3.8 -8.5 0z"
                stroke="#19d3c5"
                strokeWidth="1.7"
                fill="none"
                strokeLinejoin="round"
              />
              <circle
                cx="0"
                cy="0"
                r="3.1"
                stroke="#19d3c5"
                strokeWidth="1.55"
                fill="none"
              />
              <circle cx="0" cy="0" r="1.35" fill="#19d3c5" stroke="none" />
            </g>
            <text x="26" y="13" fill="#fff" fontSize="13.5" fontWeight="700">
              What Needs Attention
            </text>
          </g>
        </g>

        {(
          [
            {
              y: 104,
              title: "Document Quality",
              issue: "Potential quality issue",
            },
            {
              y: 190,
              title: "Potential Gaps",
              issue: "Missing or insufficient",
            },
            {
              y: 276,
              title: "Relationships",
              issue: "Potential misalignment",
            },
            {
              y: 362,
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
              width="220"
              height="74"
              rx="8"
              fill="#0a1530"
              stroke="rgba(255,255,255,0.08)"
            />
            <text
              x="712"
              y={y + 22}
              fill="#fff"
              fontSize="14"
              fontWeight="700"
            >
              {title}
            </text>
            <circle cx="718" cy={y + 40} r="3.2" fill="#ff6b35" />
            <text
              x="728"
              y={y + 44}
              fill="#fff"
              fontSize="13"
            >
              {issue}
            </text>
            <text
              x="712"
              y={y + 60}
              fill="#19d3c5"
              fontSize="12.5"
              fontWeight="600"
            >
              Source evidence linked
            </text>
          </g>
        ))}

        <g className="ph-reveal" style={{ ["--ph-i" as string]: 30 }}>
          <rect
            x="696"
            y="448"
            width="220"
            height="52"
            rx="8"
            fill="none"
            stroke="#19d3c5"
            strokeWidth="1.5"
          />
          {/* Vertically centered icon + copy inside the outline box */}
          <g transform="translate(714 465)" fill="#19d3c5">
            <circle cx="5" cy="7" r="4" />
            <circle cx="14" cy="7" r="4" />
            <path d="M0 18c.3-3.2 2.4-5 5-5s4.7 1.8 5 5M9 18c.3-3.2 2.4-5 5-5s4.7 1.8 5 5" />
          </g>
          <text
            x="742"
            y="470"
            fill="#19d3c5"
            fontSize="14"
            fontWeight="800"
            letterSpacing="1.4"
          >
            <tspan x="742" dy="0">
              QA and RA teams
            </tspan>
            <tspan x="742" dy="17">
              verify and decide.
            </tspan>
          </text>
        </g>
      </g>
    </svg>
  );
}
