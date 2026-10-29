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

        <span className="platform-doc-in-arrow" aria-hidden="true" />

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

        <div className="platform-doc-out-arrow" aria-hidden="true">
          <span className="platform-doc-out-arrow-shaft" />
          <svg
            className="platform-doc-out-arrow-head"
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
          >
            <path
              d="M2 2l14 6-14 6"
              stroke="#19D3C5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
