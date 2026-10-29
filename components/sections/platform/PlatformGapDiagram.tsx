"use client";

import { FaLink, FaUsers } from "@/components/ui/icons";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { useLayoutEffect, useRef } from "react";
import { PlatformIqHubChrome } from "./PlatformIqHubChrome";

const REQUIREMENTS = ["r1", "r2", "r3", "r4"] as const;

const COVERAGE = [
  { key: "c1", status: "supported" as const },
  { key: "c2", status: "supported" as const },
  { key: "c3", status: "missing" as const, sourceKey: "sourceC3" as const },
  { key: "c4", status: "insufficient" as const, sourceKey: "sourceC4" as const },
] as const;

/**
 * Document + search — Gap Intelligence
 * Exact concept: rounded doc with TOP-RIGHT corner cut out;
 * magnifier sits in that cut (partly inside doc), handle SE.
 */
function GapHubIcon() {
  return (
    <svg
      className="platform-gap-hub-icon"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M11.85 4.9H6.45A1.5 1.5 0 0 0 4.95 6.4v11.15A1.5 1.5 0 0 0 6.45 19.05h9.2A1.5 1.5 0 0 0 17.15 17.55V10.85"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.4 12.4h5M7.4 14.85h3.5"
        stroke="#fff"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="15.2" cy="7.4" r="3.4" stroke="#fff" strokeWidth="1.5" />
      <path
        d="M17.65 9.85L20.45 12.65"
        stroke="#fff"
        strokeWidth="1.55"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Outline documents — stack of pages */
function DocsOutlineIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 7.2h5.8L15.5 9.9V17.5A1.2 1.2 0 0 1 14.3 18.7H7A1.2 1.2 0 0 1 5.8 17.5V8.4A1.2 1.2 0 0 1 7 7.2z"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinejoin="round"
      />
      <path
        d="M12.8 7.2V9.9H15.5"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinejoin="round"
      />
      <path
        d="M9 5.2h6.2L18 7.8V15.8"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 12h4.2M8.5 14.3h3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RequirementLabel({ text }: { text: string }) {
  const [code, ...rest] = text.split(" · ");
  return (
    <>
      <strong>{code}</strong>
      {rest.length > 0 ? <span> · {rest.join(" · ")}</span> : null}
    </>
  );
}

function HundredsLabel({ text }: { text: string }) {
  const parts = text.split(" ");
  const first = parts[0] ?? text;
  const rest = parts.slice(1).join(" ");
  return (
    <>
      <strong>{first}</strong>
      {rest ? <span>{rest}</span> : null}
    </>
  );
}

export function PlatformGapDiagram() {
  const t = useTranslations("platformPage.gapDiagram");
  const railRef = useRef<HTMLDivElement>(null);

  /* Spine only between the two stub centers — no tails above/below */
  useLayoutEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const syncSpine = () => {
      const cards = rail.querySelectorAll<HTMLElement>(".platform-q-stack-card");
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
      .querySelectorAll(".platform-q-stack-card")
      .forEach((card) => ro.observe(card));
    window.addEventListener("resize", syncSpine);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", syncSpine);
    };
  }, []);

  return (
    <div className="platform-doc-diagram platform-q-diagram platform-gap-diagram">
      <div className="platform-doc-diagram-grid">
        {/* LEFT */}
        <div className="platform-doc-col">
          <p className="platform-doc-col-label">{t("leftLabel")}</p>
          <div
            ref={railRef}
            className="platform-doc-files-block platform-gap-rail"
          >
            <div className="platform-q-stack-card">
              <div className="platform-gap-req-box">
                <div className="platform-gap-req-head">
                  <span className="platform-gap-req-title">
                    {t("applicableTitle")}
                  </span>
                  <span className="platform-gap-from">{t("from01")}</span>
                </div>
                <ul className="platform-gap-req-list">
                  {REQUIREMENTS.map((r) => (
                    <li
                      key={r}
                      className={
                        r === "r1" || r === "r2"
                          ? "platform-gap-req-item is-teal"
                          : "platform-gap-req-item"
                      }
                    >
                      <RequirementLabel text={t(`requirements.${r}`)} />
                    </li>
                  ))}
                </ul>
              </div>
              <span className="platform-doc-file-stub" aria-hidden="true" />
            </div>

            <div className="platform-q-stack-card">
              <div className="platform-gap-docs-stack">
                <span className="platform-gap-docs-stack-icon" aria-hidden="true">
                  <DocsOutlineIcon />
                </span>
                <span className="platform-gap-docs-stack-text">
                  <HundredsLabel text={t("hundredsDocs")} />
                </span>
              </div>
              <span className="platform-doc-file-stub" aria-hidden="true" />
            </div>

            <span className="platform-doc-files-spine" aria-hidden="true" />
          </div>
        </div>

        {/* CENTER */}
        <PlatformIqHubChrome
          step="04"
          stepLabel={t("stepPill")}
          hubTitle={t("hubTitle")}
          hubIcon={<GapHubIcon />}
        />

        {/* RIGHT */}
        <div className="platform-doc-col">
          <p className="platform-doc-col-label platform-doc-col-label-right platform-q-label-right">
            {t("rightLabel")}
          </p>
          <div className="platform-doc-identified platform-q-identified platform-gap-panel">
            {COVERAGE.map((item) => (
              <div
                key={item.key}
                className={
                  item.status === "supported"
                    ? "platform-gap-cov"
                    : "platform-gap-cov is-gap"
                }
              >
                <div className="platform-gap-cov-top">
                  <span className="platform-gap-cov-title">
                    {t(`coverage.${item.key}.title`)}
                  </span>
                  <span
                    className={
                      item.status === "supported"
                        ? "platform-q-status is-ready"
                        : "platform-q-status is-review"
                    }
                  >
                    {t(`coverage.${item.key}.badge`)}
                  </span>
                </div>
                {item.status !== "supported" && (
                  <>
                    <p className="platform-gap-cov-detail">
                      {t(`coverage.${item.key}.detail`)}
                    </p>
                    <div className="platform-gap-cov-actions">
                      <span className="platform-gap-cov-source">
                        <FaLink aria-hidden="true" /> {t(item.sourceKey)}
                      </span>
                      <span className="platform-gap-cov-review">
                        <FaUsers aria-hidden="true" /> {t("forReview")}
                      </span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
