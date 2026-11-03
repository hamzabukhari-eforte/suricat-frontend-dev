"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Single, sitewide scroll-reveal — mounted once in the marketing layout so every
 * page animates identically (mirrors Designs/*.html IntersectionObserver):
 *
 * - Every <section> in <main> gets `.section-transition`.
 * - Every top-level card / panel / article gets `.reveal-transition`.
 * - Content already in the first viewport is shown immediately (no blank gap
 *   under the hero). Content further down reveals as it scrolls into view.
 *
 * Nested card elements (e.g. `.compliance-cost-card-header` inside
 * `.compliance-cost-card`) are skipped so only the outermost card animates,
 * keeping motion consistent across every page.
 */
const CARD_SELECTOR = [
  "main section .evolve-card",
  'main section [class*="card"]',
  "main section article",
  "main section .rounded-\\[4px\\]",
  "main section .shadow-lg",
  "main section .shadow-sm",
].join(", ");

const EXCLUDED = [
  "platform-tab-pane",
  "tab-pane",
  "animated-tab-pane",
  "change-impact-infographic",
  "existing-systems-story",
  "practitioners-story",
  "regulated-register",
  "why-attention",
];

// Sections that run their own bespoke reveal choreography and must not be
// double-driven by the generic observer.
const EXCLUDED_SCOPES = [
  "#lifecycle-diagram-section",
  ".pricing-plans-scope",
  "#alignment-gap",
];

function isExcluded(el: Element): boolean {
  return (
    EXCLUDED.some((cls) => el.closest(`.${cls}`)) ||
    EXCLUDED_SCOPES.some((sel) => el.closest(sel))
  );
}

export function MarketingReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section"),
    ).filter((el) => !isExcluded(el));

    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(CARD_SELECTOR),
    ).filter((el) => !isExcluded(el));

    // Keep only the outermost card in any nested card stack so a single,
    // consistent fade plays per card (not one per nested child).
    const topLevelCards = cards.filter(
      (el) => !cards.some((other) => other !== el && other.contains(el)),
    );

    const revealTargets = Array.from(new Set([...sections, ...topLevelCards]));

    const classFor = (el: Element) =>
      el.tagName.toLowerCase() === "section"
        ? "section-transition"
        : "reveal-transition";

    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach((el) => el.classList.add(classFor(el), "is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      // Reveal as the section enters view while scrolling (mild inset, not 1/3 blank)
      { threshold: 0.08, rootMargin: "0px 0px -12% 0px" },
    );

    const isInFirstView = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      // Already on the first screen — show immediately so the page looks complete
      return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
    };

    // Wait a frame so layout/paint settles after a route change.
    const frame = requestAnimationFrame(() => {
      revealTargets.forEach((el) => {
        el.classList.add(classFor(el));
        if (isInFirstView(el)) {
          el.classList.add("is-visible");
          return;
        }
        observer.observe(el);
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
