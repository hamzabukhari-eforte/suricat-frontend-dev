"use client";

import { useEffect, useState } from "react";

export type SectionPill = { id: string; label: string };

const DEFAULT_PILLS: SectionPill[] = [
  { id: "challenge", label: "The Challenge" },
  { id: "how-suricat-helps", label: "How Suricat Helps" },
  { id: "outcomes", label: "Outcomes" },
];

type SolutionSectionPillsProps = {
  /** Override the pills. Defaults to the solution page sections. */
  pills?: SectionPill[];
};

/** Sticky in-page section pills (Designs #solution-nav). */
export function SolutionSectionPills({
  pills = DEFAULT_PILLS,
}: SolutionSectionPillsProps) {
  const [active, setActive] = useState<string>(pills[0]?.id ?? "");

  useEffect(() => {
    const ids = pills.map((p) => p.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0.15, 0.35, 0.6] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pills]);

  return (
    <div
      id="solution-nav"
      className="sticky top-16 z-40 border-b border-gray-100 bg-white shadow-sm lg:top-24"
    >
      <div className="mx-auto max-w-7xl overflow-x-auto">
        <div className="flex w-max min-w-full justify-center gap-1 py-3 lg:justify-start">
          {pills.map((pill) => (
            <a
              key={pill.id}
              href={`#${pill.id}`}
              data-section={pill.id}
              className={`solution-nav-pill whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold${
                active === pill.id ? " is-active" : ""
              }`}
            >
              {pill.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
