"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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

function getActiveSectionId(pillIds: string[]) {
  const nav = document.getElementById("solution-nav");
  const offset = (nav?.getBoundingClientRect().bottom ?? 96) + 4;

  let current = pillIds[0] ?? "";
  for (const id of pillIds) {
    const section = document.getElementById(id);
    if (section && section.getBoundingClientRect().top <= offset) {
      current = id;
    }
  }

  return current;
}

/** Sticky in-page section pills (Designs #solution-nav). */
export function SolutionSectionPills({
  pills = DEFAULT_PILLS,
}: SolutionSectionPillsProps) {
  const [active, setActive] = useState<string>(pills[0]?.id ?? "");
  const pillRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  /** Holds clicked pill id while smooth scroll is in flight — prevents intermediate sections from stealing active state. */
  const scrollLockRef = useRef<string | null>(null);
  const scrollUnlockTimerRef = useRef<number>(0);

  const syncActiveFromScroll = useCallback(() => {
    if (scrollLockRef.current) return;

    const next = getActiveSectionId(pills.map((pill) => pill.id));
    if (next) {
      setActive((current) => (current === next ? current : next));
    }
  }, [pills]);

  const unlockScrollSync = useCallback(() => {
    scrollLockRef.current = null;
    syncActiveFromScroll();
  }, [syncActiveFromScroll]);

  const lockScrollSync = useCallback(
    (pillId: string) => {
      scrollLockRef.current = pillId;
      window.clearTimeout(scrollUnlockTimerRef.current);

      const release = () => {
        window.removeEventListener("scrollend", release);
        window.clearTimeout(scrollUnlockTimerRef.current);
        unlockScrollSync();
      };

      window.addEventListener("scrollend", release, { once: true });
      scrollUnlockTimerRef.current = window.setTimeout(release, 900);
    },
    [unlockScrollSync],
  );

  const scrollPillIntoView = useCallback((pillId: string) => {
    const pillEl = pillRefs.current[pillId];
    if (!pillEl) return;

    pillEl.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, []);

  useEffect(() => {
    let frame = 0;

    const onScrollOrResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncActiveFromScroll);
    };

    onScrollOrResize();

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("hashchange", onScrollOrResize);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(scrollUnlockTimerRef.current);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("hashchange", onScrollOrResize);
    };
  }, [syncActiveFromScroll]);

  useEffect(() => {
    if (scrollLockRef.current) return;
    scrollPillIntoView(active);
  }, [active, scrollPillIntoView]);

  const handlePillClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    pillId: string,
  ) => {
    event.preventDefault();
    lockScrollSync(pillId);
    setActive(pillId);
    scrollPillIntoView(pillId);

    const section = document.getElementById(pillId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    window.history.pushState(null, "", `#${pillId}`);
  };

  return (
    <div
      id="solution-nav"
      className="sticky top-16 z-40 border-b border-gray-100 bg-white shadow-sm lg:top-24"
    >
      <div className="mx-auto max-w-7xl overflow-x-auto scroll-smooth">
        <div className="flex w-max min-w-full justify-center gap-1 py-3 lg:justify-start">
          {pills.map((pill) => (
            <a
              key={pill.id}
              ref={(el) => {
                pillRefs.current[pill.id] = el;
              }}
              href={`#${pill.id}`}
              data-section={pill.id}
              className={`solution-nav-pill whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold${
                active === pill.id ? " is-active" : ""
              }`}
              onClick={(event) => handlePillClick(event, pill.id)}
            >
              {pill.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
