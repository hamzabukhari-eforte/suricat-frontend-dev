"use client";

import type { ReactNode } from "react";

type PlatformIqHubChromeProps = {
  step: string;
  stepLabel: string;
  hubTitle: string;
  hubIcon?: ReactNode;
  hubExtra?: ReactNode;
  belowHub?: ReactNode;
  stageClassName?: string;
};

/** Shared 01/02-style hub chrome for Intelligence steps 03–06 (teal). */
export function PlatformIqHubChrome({
  step,
  stepLabel,
  hubTitle,
  hubIcon,
  hubExtra,
  belowHub,
  stageClassName,
}: PlatformIqHubChromeProps) {
  return (
    <div className="platform-doc-center">
      <div
        className={
          stageClassName
            ? `platform-doc-hub-stage ${stageClassName}`
            : "platform-doc-hub-stage"
        }
      >
        <div className="platform-doc-step-pill platform-q-step-pill">
          <span className="platform-doc-step-num platform-q-step-num">{step}</span>
          <span className="platform-doc-step-text">{stepLabel}</span>
        </div>
        <span
          className="platform-doc-pill-connector platform-q-pill-connector"
          aria-hidden="true"
        />

        <svg
          className="platform-doc-in-arrow"
          viewBox="0 0 120 28"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 14H120"
            stroke="#19D3C5"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>

        <div className="platform-doc-orbit platform-q-orbit" aria-hidden="true" />
        <div className="platform-doc-hub platform-q-hub">
          {hubIcon ? (
            <span className="platform-q-hub-icon" aria-hidden="true">
              {hubIcon}
            </span>
          ) : null}
          <p className="platform-doc-hub-title">{hubTitle}</p>
          {hubExtra}
        </div>

        {belowHub}

        <svg
          className="platform-doc-out-arrow"
          viewBox="0 0 120 28"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M2 14H106"
            stroke="#19D3C5"
            strokeWidth="1.7"
            strokeLinecap="butt"
          />
          <path
            d="M102 7.5l16 6.5-16 6.5"
            stroke="#19D3C5"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
}
