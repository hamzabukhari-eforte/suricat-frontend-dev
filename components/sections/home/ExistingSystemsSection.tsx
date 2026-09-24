"use client";

import {
  HomeNarrativeHeader,
  HomeNarrativeText,
} from "@/components/sections/home/HomeNarrativeHeader";
import {
  FaClipboardCheck,
  FaDatabase,
  FaFileLines,
  FaLayerGroup,
} from "@/components/ui/icons";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import Image from "next/image";
import { useState } from "react";
import type { IconType } from "react-icons";

const SYSTEMS: {
  id: "qms" | "rim" | "plm" | "documents";
  icon: IconType;
}[] = [
  { id: "qms", icon: FaClipboardCheck },
  { id: "rim", icon: FaDatabase },
  { id: "plm", icon: FaLayerGroup },
  { id: "documents", icon: FaFileLines },
];

const RELATIONS = [
  "requirements",
  "procedures",
  "risks",
  "capas",
  "evidence",
] as const;

const HUB_CX = 124;
const HUB_CY = 84;
const HUB_RING = 44;

const HUB_NODES: {
  id: "qms" | "rim" | "plm" | "documents";
  x: number;
  y: number;
  anchor: "start" | "end";
}[] = [
  { id: "qms", x: 32, y: 26, anchor: "start" },
  { id: "plm", x: 216, y: 26, anchor: "end" },
  { id: "rim", x: 32, y: 142, anchor: "start" },
  { id: "documents", x: 216, y: 142, anchor: "end" },
];

function hubLineStart(x: number, y: number) {
  const dx = x - HUB_CX;
  const dy = y - HUB_CY;
  const length = Math.hypot(dx, dy);
  return {
    x: HUB_CX + (dx / length) * HUB_RING,
    y: HUB_CY + (dy / length) * HUB_RING,
  };
}

function SystemsHub({
  labels,
  descriptions,
}: {
  labels: Record<(typeof HUB_NODES)[number]["id"], string>;
  descriptions: Record<(typeof HUB_NODES)[number]["id"], string>;
}) {
  const [openId, setOpenId] = useState<(typeof HUB_NODES)[number]["id"] | null>(
    null,
  );

  return (
    <div className="existing-systems-hub">
      <svg
        className="existing-systems-hub-svg"
        viewBox="0 0 248 168"
        fill="none"
        aria-hidden="true"
      >
        <circle
          className="existing-systems-hub-ring"
          cx={HUB_CX}
          cy={HUB_CY}
          r={HUB_RING}
        />
        {HUB_NODES.map(({ id, x, y }) => {
          const start = hubLineStart(x, y);
          return (
            <line
              key={id}
              className="existing-systems-hub-line"
              x1={start.x}
              y1={start.y}
              x2={x}
              y2={y}
            />
          );
        })}
        <circle className="existing-systems-hub-traveler" r="3.5" />
      </svg>
      <Image
        src="/assets/images/suricat-logo-mark.png"
        alt=""
        width={72}
        height={72}
        className="existing-systems-hub-logo"
      />
      {HUB_NODES.map(({ id, x, y, anchor }) => (
        <button
          key={id}
          type="button"
          className={`existing-systems-hub-hotspot existing-systems-hub-hotspot-${id} existing-systems-hub-hotspot-${anchor}${openId === id ? " is-open" : ""}`}
          style={{ left: `${(x / 248) * 100}%`, top: `${(y / 168) * 100}%` }}
          onMouseEnter={() => setOpenId(id)}
          onMouseLeave={() => setOpenId(null)}
          onFocus={() => setOpenId(id)}
          onBlur={() => setOpenId(null)}
        >
          <span className="existing-systems-hub-node" />
          <span className="existing-systems-hub-caption">{labels[id]}</span>
          <span className="existing-systems-hub-tooltip" role="tooltip">
            {descriptions[id]}
          </span>
        </button>
      ))}
    </div>
  );
}

export function ExistingSystemsSection() {
  const t = useTranslations("home.existingSystems");

  return (
    <section id="platform" className="bg-surface-muted px-6 pt-12 pb-10">
      <div className="mx-auto max-w-7xl">
        <HomeNarrativeHeader eyebrow={t("sectionTitle")} title={t("headline")}>
          <HomeNarrativeText>{t("p1")}</HomeNarrativeText>
          <HomeNarrativeText>{t("p2")}</HomeNarrativeText>
          <HomeNarrativeText>{t("p3")}</HomeNarrativeText>
          <HomeNarrativeText>{t("p4")}</HomeNarrativeText>
        </HomeNarrativeHeader>

        <div className="existing-systems-story">
          <p className="existing-systems-silos-label">{t("silosLabel")}</p>
          <div className="existing-systems-silos">
            {SYSTEMS.map(({ id, icon: Icon }) => (
              <article key={id} className="existing-systems-silo">
                <div className="existing-systems-silo-icon">
                  <Icon aria-hidden="true" />
                </div>
                <p className="existing-systems-silo-name">{t(`systems.${id}`)}</p>
              </article>
            ))}
          </div>

          <div className="existing-systems-bridge" aria-hidden="true">
            <span className="existing-systems-bridge-stems">
              <span />
              <span />
              <span />
              <span />
            </span>
            <span className="existing-systems-bridge-line" />
          </div>

          <div className="existing-systems-closer">
            <div className="existing-systems-closer-copy">
              <p className="existing-systems-layer-label">{t("layerLabel")}</p>
              <p className="existing-systems-closer-text">{t("closer")}</p>
              <ul className="existing-systems-chips">
                {RELATIONS.map((id) => (
                  <li key={id} className="existing-systems-chip">
                    {t(`relations.${id}`)}
                  </li>
                ))}
              </ul>
            </div>
            <SystemsHub
              labels={{
                qms: t("systems.qms"),
                rim: t("systems.rim"),
                plm: t("systems.plm"),
                documents: t("hub.documents"),
              }}
              descriptions={{
                qms: t("tooltips.qms"),
                rim: t("tooltips.rim"),
                plm: t("tooltips.plm"),
                documents: t("tooltips.documents"),
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
