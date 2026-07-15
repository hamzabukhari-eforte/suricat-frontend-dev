"use client";

import { useEffect } from "react";

/**
 * Drives the Documentation Lifecycle card reveal (mirrors
 * Designs/medical-devices.html initLifecycleTimeline):
 * - On the section entering view, fade the card in (`is-in-view`).
 * - Stagger each timeline item (`is-visible`) by 130ms, growing the progress
 *   line as it goes.
 * - After the last item, reveal the intelligence panel + pulse the logo
 *   (`lifecycle-reveal-complete` / `is-pulsing`).
 */
const STAGGER_MS = 130;

export function LifecycleReveal() {
  useEffect(() => {
    const section = document.getElementById("lifecycle-diagram-section");
    if (!section) return;

    const items = Array.from(
      section.querySelectorAll<HTMLElement>(".lifecycle-timeline-item"),
    );
    const progressLine = section.querySelector<HTMLElement>(
      ".lifecycle-timeline-line-progress",
    );
    const logoWrap = section.querySelector<HTMLElement>(".lifecycle-logo-wrap");

    let animated = false;
    const timeouts: number[] = [];

    const updateProgress = (index: number) => {
      if (!progressLine || !items.length) return;
      progressLine.style.height = `${((index + 1) / items.length) * 100}%`;
    };

    const completeReveal = () => {
      section.classList.add("lifecycle-reveal-complete");
      logoWrap?.classList.add("is-pulsing");
    };

    const reveal = () => {
      if (animated) return;
      animated = true;
      section.classList.add("is-in-view");

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        items.forEach((item) => item.classList.add("is-visible"));
        updateProgress(items.length - 1);
        completeReveal();
        return;
      }

      items.forEach((item, index) => {
        const id = window.setTimeout(() => {
          item.classList.add("is-visible");
          updateProgress(index);
          if (index === items.length - 1) {
            const done = window.setTimeout(completeReveal, 280);
            timeouts.push(done);
          }
        }, index * STAGGER_MS);
        timeouts.push(id);
      });
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
      { threshold: 0.2 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return null;
}
