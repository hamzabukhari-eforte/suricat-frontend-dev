"use client";

import { useEffect, useRef } from "react";

/**
 * Staggered entrance for a `.pricing-plans-scope` section, mirroring the
 * Designs `initPricingSection` choreography:
 * - `.pricing-stagger-item` cards reveal 120ms apart
 * - `.pricing-compare-header` +100ms, then `.pricing-compare-row`s +40ms each,
 *   then `.pricing-compare-legend`
 *
 * Reveal fires when the scope enters the viewport (with a load fallback), so
 * content is never left permanently hidden.
 */
const CARD_STEP = 120;
const HEADER_STEP = 100;
const ROW_STEP = 40;

export function PricingStaggerReveal() {
  const markerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const scope = markerRef.current?.closest(".pricing-plans-scope");
    if (!scope) return;

    const items = Array.from(
      scope.querySelectorAll<HTMLElement>(".pricing-stagger-item"),
    );
    const header = scope.querySelector<HTMLElement>(".pricing-compare-header");
    const rows = Array.from(
      scope.querySelectorAll<HTMLElement>(".pricing-compare-row"),
    );
    const legend = scope.querySelector<HTMLElement>(".pricing-compare-legend");

    if (!items.length && !header && !rows.length && !legend) return;

    let done = false;
    const timers: number[] = [];
    const schedule = (el: HTMLElement | null, delay: number) => {
      if (!el) return;
      timers.push(window.setTimeout(() => el.classList.add("is-visible"), delay));
    };

    const reveal = () => {
      if (done) return;
      done = true;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        [...items, header, ...rows, legend].forEach((el) =>
          el?.classList.add("is-visible"),
        );
        return;
      }

      let delay = 0;
      items.forEach((el) => {
        schedule(el, delay);
        delay += CARD_STEP;
      });
      if (header) {
        schedule(header, delay);
        delay += HEADER_STEP;
      }
      rows.forEach((el) => {
        schedule(el, delay);
        delay += ROW_STEP;
      });
      schedule(legend, delay);
    };

    if (!("IntersectionObserver" in window)) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(scope);

    return () => {
      observer.disconnect();
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return <span ref={markerRef} aria-hidden="true" className="hidden" />;
}
