"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { forwardRef, useEffect, useRef, useState } from "react";

type AppTurnstileProps = {
  siteKey: string;
  onSuccess: (token: string) => void;
  onError: () => void;
  onExpire: () => void;
  className?: string;
};

/** Single-row Turnstile native width (flexible/normal). */
const ROW_WIDTH = 300;
const ROW_HEIGHT = 65;
const MIN_SCALE = 0.55;

/**
 * Always keeps Turnstile in one row. When the container is narrower than
 * 300px, scales the single-row widget down instead of switching to compact
 * (which stacks into two rows).
 */
export const AppTurnstile = forwardRef<TurnstileInstance, AppTurnstileProps>(
  function AppTurnstile(
    { siteKey, onSuccess, onError, onExpire, className = "" },
    ref,
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const update = () => {
        const available = container.clientWidth;
        if (available <= 0) return;
        if (available < ROW_WIDTH) {
          setScale(Math.max(available / ROW_WIDTH, MIN_SCALE));
        } else {
          setScale(1);
        }
      };

      update();
      const observer = new ResizeObserver(update);
      observer.observe(container);
      return () => observer.disconnect();
    }, []);

    const isScaled = scale < 0.999;

    return (
      <div
        ref={containerRef}
        className={`relative w-full min-w-0 max-w-full ${className}`}
        style={
          isScaled
            ? { height: ROW_HEIGHT * scale, overflow: "hidden" }
            : { minHeight: ROW_HEIGHT }
        }
      >
        <div
          style={
            isScaled
              ? {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: ROW_WIDTH,
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }
              : { width: "100%" }
          }
        >
          <Turnstile
            key={isScaled ? "normal" : "flexible"}
            ref={ref}
            siteKey={siteKey}
            onSuccess={onSuccess}
            onError={onError}
            onExpire={onExpire}
            rerenderOnCallbackChange={false}
            options={{
              // Always single-row; never "compact" (2-row).
              size: isScaled ? "normal" : "flexible",
              theme: "light",
              retry: "auto",
            }}
          />
        </div>
      </div>
    );
  },
);
