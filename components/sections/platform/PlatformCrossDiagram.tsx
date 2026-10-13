"use client";

import {
  FaLink,
  FaRotate,
  FaSitemap,
  FaTableCells,
  FaUserGraduate,
  FaUsers,
} from "@/components/ui/icons";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { useLayoutEffect, useRef } from "react";
import { PlatformIqHubChrome } from "./PlatformIqHubChrome";

const DOCS = [
  { id: "CAPA-0217", type: "capa" as const, Icon: FaRotate },
  { id: "RF-014", type: "risk" as const, Icon: FaTableCells },
  { id: "SOP-PRD-003", type: "sop" as const, Icon: FaSitemap },
  { id: "TRN-104", type: "training" as const, Icon: FaUserGraduate },
];

/** Outlined ≠ circle with dashed connectors — matches reference */
function MisalignBridgeIcon() {
  return (
    <svg
      className="platform-cross-neq-svg"
      width="88"
      height="34"
      viewBox="0 0 72 28"
      fill="none"
      aria-hidden="true"
    >
      {/* Left dashes — 3 short segments */}
      <path
        d="M2 14h5M10 14h5M18 14h5"
        stroke="#FF6B35"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Right dashes */}
      <path
        d="M49 14h5M57 14h5M65 14h5"
        stroke="#FF6B35"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Outline circle */}
      <circle
        cx="36"
        cy="14"
        r="9.25"
        stroke="#FF6B35"
        strokeWidth="1.7"
      />
      {/* ≠ bars */}
      <path
        d="M31.2 11.35h9.6M31.2 16.65h9.6"
        stroke="#FF6B35"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      {/* Diagonal slash */}
      <path
        d="M39.6 8.9L32.4 19.1"
        stroke="#FF6B35"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Interlocked boxes ✓ / ✕ — Cross Document Intelligence */
function CrossHubIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {/* Top-right linked square (check) — gap at bottom-left link */}
      <path
        d="M11.2 4.2h5.6a2 2 0 0 1 2 2v5.6a2 2 0 0 1-2 2h-1.4"
        stroke="#fff"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.2 11.8V6.2a2 2 0 0 1 2-2"
        stroke="#fff"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Check mark */}
      <path
        d="M12.6 8.6l1.5 1.5 2.8-2.9"
        stroke="#fff"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Bottom-left linked square (X) — gap at top-right link */}
      <path
        d="M12.8 19.8H7.2a2 2 0 0 1-2-2v-5.6a2 2 0 0 1 2-2h1.4"
        stroke="#fff"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.8 12.2v5.6a2 2 0 0 1-2 2"
        stroke="#fff"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* X mark */}
      <path
        d="M7.8 13.6l4 4M11.8 13.6l-4 4"
        stroke="#fff"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PlatformCrossDiagram() {
  const t = useTranslations("platformPage.crossDiagram");
  const railRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const syncSpine = () => {
      const cards = rail.querySelectorAll<HTMLElement>(".platform-doc-file");
      const spine = rail.querySelector<HTMLElement>(".platform-doc-files-spine");
      if (!spine || cards.length < 2) return;

      const railRect = rail.getBoundingClientRect();
      const firstRect = cards[0].getBoundingClientRect();
      const lastRect = cards[cards.length - 1].getBoundingClientRect();
      const top = firstRect.top + firstRect.height / 2 - railRect.top;
      const bottom = lastRect.top + lastRect.height / 2 - railRect.top;

      spine.style.display = "block";
      spine.style.top = `${top}px`;
      spine.style.height = `${Math.max(0, bottom - top)}px`;
      spine.style.bottom = "auto";
      spine.style.transform = "none";
    };

    syncSpine();
    const raf = requestAnimationFrame(syncSpine);

    const ro = new ResizeObserver(syncSpine);
    ro.observe(rail);
    rail
      .querySelectorAll(".platform-doc-file")
      .forEach((card) => ro.observe(card));

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="platform-doc-diagram platform-q-diagram platform-cross-diagram">
      <div className="platform-doc-diagram-grid">
        <div className="platform-doc-col">
          <p className="platform-doc-col-label">{t("leftLabel")}</p>
          <div ref={railRef} className="platform-doc-files-block">
            <ul className="platform-doc-files platform-q-docs">
              {DOCS.map(({ id, type, Icon }) => (
                <li key={id} className="platform-doc-file platform-q-doc">
                  <span className="platform-q-doc-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="platform-q-doc-meta">
                    <strong>{id}</strong>
                    <small>{t(`types.${type}`)}</small>
                  </span>
                  <span className="platform-doc-file-stub" aria-hidden="true" />
                </li>
              ))}
            </ul>
            <span className="platform-doc-files-spine" aria-hidden="true" />
          </div>
        </div>

        <PlatformIqHubChrome
          step="05"
          stepLabel={t("stepPill")}
          hubTitle={t("hubTitle")}
          hubIcon={<CrossHubIcon />}
        />

        <div className="platform-doc-col">
          <p className="platform-doc-col-label platform-doc-col-label-right platform-q-label-right">
            {t("rightLabel")}
          </p>
          <div className="platform-doc-identified platform-q-identified platform-cross-panel">
            {/* Pair 1 — misalignment */}
            <div className="platform-cross-block is-misalign">
              <div className="platform-cross-block-head">
                <span className="platform-cross-block-title">
                  {t("pair1.title")}
                </span>
                <span className="platform-cross-badge is-misalign">
                  <span className="platform-cross-badge-dot" aria-hidden="true" />
                  {t("pair1.badge")}
                </span>
              </div>

              <div className="platform-cross-compare">
                <div className="platform-cross-card">
                  <div className="platform-cross-card-idrow">
                    <strong className="platform-cross-card-id">
                      {t("pair1.left.id")}
                    </strong>
                    <span className="platform-cross-card-meta">
                      {t("pair1.left.meta")}
                    </span>
                  </div>
                  <span className="platform-cross-card-kind">
                    {t("pair1.left.kind")}
                  </span>
                  <p className="platform-cross-card-claim">
                    {t("pair1.left.claim")}
                  </p>
                  <span className="platform-cross-card-source">
                    <FaLink aria-hidden="true" /> {t("pair1.left.source")}
                  </span>
                </div>

                <div className="platform-cross-bridge is-misalign" aria-hidden="true">
                  <MisalignBridgeIcon />
                </div>

                <div className="platform-cross-card">
                  <div className="platform-cross-card-idrow">
                    <strong className="platform-cross-card-id">
                      {t("pair1.right.id")}
                    </strong>
                    <span className="platform-cross-card-meta">
                      {t("pair1.right.meta")}
                    </span>
                  </div>
                  <span className="platform-cross-card-kind">
                    {t("pair1.right.kind")}
                  </span>
                  <p className="platform-cross-card-claim">
                    {t("pair1.right.claim")}
                  </p>
                  <span className="platform-cross-card-source">
                    <FaLink aria-hidden="true" /> {t("pair1.right.source")}
                  </span>
                </div>
              </div>

              <div className="platform-cross-block-foot">
                <span className="platform-cross-review">
                  <FaUsers aria-hidden="true" /> {t("forReview")}
                </span>
              </div>
            </div>

            {/* Pair 2 — aligned */}
            <div className="platform-cross-block is-aligned">
              <div className="platform-cross-block-head">
                <span className="platform-cross-block-title">
                  {t("pair2.title")}
                </span>
                <span className="platform-cross-badge is-aligned">
                  <span className="platform-cross-badge-dot" aria-hidden="true" />
                  {t("pair2.badge")}
                </span>
              </div>

              <div className="platform-cross-compare is-compact">
                <div className="platform-cross-card is-compact">
                  <strong className="platform-cross-card-id">
                    {t("pair2.left.id")}
                  </strong>
                  <span className="platform-cross-card-meta">
                    {t("pair2.left.meta")}
                  </span>
                </div>

                <div className="platform-cross-bridge is-aligned" aria-hidden="true">
                  <span className="platform-cross-bridge-line" />
                  <span className="platform-cross-eq" />
                  <span className="platform-cross-bridge-line" />
                </div>

                <div className="platform-cross-card is-compact">
                  <strong className="platform-cross-card-id">
                    {t("pair2.right.id")}
                  </strong>
                  <span className="platform-cross-card-meta">
                    {t("pair2.right.meta")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
