"use client";

import { FaLink, FaUsers } from "@/components/ui/icons";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { useLayoutEffect, useRef } from "react";
import { PlatformIqHubChrome } from "./PlatformIqHubChrome";

const CLAUSES = ["c1", "c2", "c3"] as const;

const STEPS = [
  { key: "s1", num: "1", status: "ok" as const },
  { key: "s2", num: "2", status: "gap" as const },
  { key: "s3", num: "3", status: "ok" as const },
] as const;

/** Procedure vs record — outline Record Intelligence */
function RecordHubIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 6.5h10a2 2 0 0 1 2 2v2.2H14V8.5a2 2 0 0 1 2-2z"
        stroke="#fff"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M14 9.2H11.8A2.3 2.3 0 0 0 9.5 11.5v26A2.3 2.3 0 0 0 11.8 39.8h18.4a2.3 2.3 0 0 0 2.3-2.3v-14"
        stroke="#fff"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 18h10M15.5 23.5h10M15.5 29h7"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M28.5 22.5h11.5L43 25.8V41a2 2 0 0 1-2 2H28.5a2 2 0 0 1-2-2V24.5a2 2 0 0 1 2-2z"
        stroke="#fff"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M40 22.5V25.8H43"
        stroke="#fff"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M31.5 32.5h8M31.5 37h5.5"
        stroke="#fff"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M38.2 30.2l3.2 3.2M41.4 30.2l-3.2 3.2"
        stroke="#fff"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Outline documents stack — hundreds of records */
function RecordsStackIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

function ClauseLabel({ text }: { text: string }) {
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

export function PlatformRecordDiagram() {
  const t = useTranslations("platformPage.recordDiagram");
  const railRef = useRef<HTMLDivElement>(null);

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

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="platform-doc-diagram platform-q-diagram platform-rec-diagram">
      <div className="platform-doc-diagram-grid">
        {/* LEFT — Gap-style layout, Record text */}
        <div className="platform-doc-col">
          <p className="platform-doc-col-label">{t("leftLabel")}</p>
          <div
            ref={railRef}
            className="platform-doc-files-block platform-rec-rail"
          >
            <div className="platform-q-stack-card">
              <div className="platform-gap-req-box">
                <div className="platform-gap-req-head">
                  <span className="platform-gap-req-title">{t("sopId")}</span>
                  <span className="platform-gap-from">{t("sopMeta")}</span>
                </div>
                <ul className="platform-gap-req-list">
                  {CLAUSES.map((c) => (
                    <li key={c}>
                      <ClauseLabel text={t(`clauses.${c}`)} />
                    </li>
                  ))}
                </ul>
              </div>
              <span className="platform-doc-file-stub" aria-hidden="true" />
            </div>

            <div className="platform-q-stack-card">
              <div className="platform-gap-docs-stack">
                <span className="platform-gap-docs-stack-icon" aria-hidden="true">
                  <RecordsStackIcon />
                </span>
                <span className="platform-gap-docs-stack-text">
                  <HundredsLabel text={t("hundredsRecords")} />
                </span>
              </div>
              <span className="platform-doc-file-stub" aria-hidden="true" />
            </div>

            <span className="platform-doc-files-spine" aria-hidden="true" />
          </div>
        </div>

        {/* CENTER */}
        <PlatformIqHubChrome
          step="06"
          stepLabel={t("stepPill")}
          hubTitle={t("hubTitle")}
          hubIcon={<RecordHubIcon />}
        />

        {/* RIGHT — Expected vs. Documented Execution */}
        <div className="platform-doc-col">
          <p className="platform-doc-col-label platform-doc-col-label-right platform-q-label-right">
            {t("rightLabel")}
          </p>
          <div className="platform-doc-identified platform-q-identified platform-rec-panel">
            <div className="platform-rec-cols-head">
              <span className="platform-rec-cols-sop">{t("sopHeader")}</span>
              <span className="platform-rec-cols-lot">{t("lotHeader")}</span>
            </div>

            {STEPS.map(({ key, num, status }) => {
              const isGap = status === "gap";
              return (
                <div
                  key={key}
                  className={
                    isGap
                      ? "platform-rec-compare is-gap"
                      : "platform-rec-compare is-ok"
                  }
                >
                  <div className="platform-rec-compare-main">
                    <div className="platform-rec-expected">
                      <span className="platform-rec-step-num" aria-hidden="true">
                        {num}
                      </span>
                      <span className="platform-rec-expected-text">
                        <strong>{t(`rows.${key}.title`)}</strong>
                        <small>{t(`rows.${key}.required`)}</small>
                      </span>
                    </div>

                    <div
                      className={
                        isGap
                          ? "platform-rec-bridge is-gap"
                          : "platform-rec-bridge is-ok"
                      }
                      aria-hidden="true"
                    >
                      <span className="platform-rec-bridge-line" />
                      <span className="platform-rec-bridge-dot" />
                      <span className="platform-rec-bridge-line" />
                    </div>

                    <div
                      className={
                        isGap
                          ? "platform-rec-actual is-gap"
                          : "platform-rec-actual is-ok"
                      }
                    >
                      <strong className="platform-rec-actual-result">
                        {t(`rows.${key}.result`)}
                      </strong>
                      <span
                        className={
                          isGap
                            ? "platform-rec-badge is-gap"
                            : "platform-rec-badge is-ok"
                        }
                      >
                        <span
                          className="platform-rec-badge-dot"
                          aria-hidden="true"
                        />
                        {t(`rows.${key}.badge`)}
                      </span>
                    </div>
                  </div>

                  {isGap && (
                    <div className="platform-rec-compare-foot">
                      <span className="platform-rec-source">
                        <FaLink aria-hidden="true" /> {t("reviewed")}
                      </span>
                      <span className="platform-rec-review">
                        <FaUsers aria-hidden="true" /> {t("forReview")}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
