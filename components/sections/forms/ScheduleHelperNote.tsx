"use client";

import { FaCircleExclamation, FaEnvelope } from "@/components/ui/icons";
import { useEffect, useRef, useState } from "react";

type ScheduleHelperNoteProps = {
  canSubmit: boolean;
};

const TIP_TEXT =
  "30-minute introductory discussion with a Suricat specialist. No preparation required—simply select a convenient time.";

export function ScheduleHelperNote({ canSubmit }: ScheduleHelperNoteProps) {
  const [tipOpen, setTipOpen] = useState(false);
  const tipRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!tipOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!tipRef.current?.contains(event.target as Node)) {
        setTipOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [tipOpen]);

  return (
    <p className="mt-3 flex w-full items-start gap-1.5 text-xs leading-snug text-navy md:items-center md:justify-center">
      {canSubmit ? (
        <FaEnvelope
          className="mt-[2px] shrink-0 text-[10px] text-teal md:mt-0"
          aria-hidden="true"
        />
      ) : (
        <span ref={tipRef} className="relative mt-[2px] inline-flex shrink-0 md:mt-0">
          <button
            type="button"
            className="inline-flex cursor-help p-0 text-[10px] text-gray-400"
            aria-label="Discussion details"
            aria-expanded={tipOpen}
            onClick={() => setTipOpen((open) => !open)}
            onMouseEnter={() => {
              if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
                setTipOpen(true);
              }
            }}
            onMouseLeave={() => {
              if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
                setTipOpen(false);
              }
            }}
          >
            <FaCircleExclamation aria-hidden="true" />
          </button>
          <span
            role="tooltip"
            className={`pointer-events-none absolute bottom-full left-0 z-20 mb-2 w-[min(14rem,calc(100vw-2rem))] rounded-[4px] bg-navy px-3 py-2 text-left text-[11px] leading-snug text-white shadow-lg transition-opacity md:left-1/2 md:-translate-x-1/2 ${
              tipOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            {TIP_TEXT}
          </span>
        </span>
      )}
      <span className="min-w-0 md:text-center">
        {canSubmit
          ? "Confirmation email on the way"
          : "Complete all required fields to schedule your discussion."}
      </span>
    </p>
  );
}
