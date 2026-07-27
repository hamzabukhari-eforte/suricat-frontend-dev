

"use client";

import { FaArrowRight, FaCalendarDays, FaClipboardCheck, FaClock, FaCrosshairs, FaFileImport, FaFileLines, FaGlobe, FaLock, FaShareNodes, FaShieldHalved, FaTriangleExclamation, FaUser, FaUsers } from "@/components/ui/icons";
import { HomeSectionTabNav } from "@/components/sections/home/HomeSectionTabNav";
import {
  HOME_HASH_EVENT,
  parseWhyTabIndex,
} from "@/components/layout/SmoothHashScroll";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { animatedTabPaneClass } from "@/lib/animatedTabPane";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";

/** Designs index.html WHY_DESC_LIMIT — truncate long tab descriptions with Read more/less. */
const WHY_DESC_LIMIT = 250;

function WhyTabDescription({ paragraphs }: { paragraphs: string[] }) {
  const t = useTranslations("home.why");
  const [expanded, setExpanded] = useState(false);
  const [animating, setAnimating] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const startHeightRef = useRef<number | null>(null);

  const normalized = paragraphs.map((p) => p.replace(/\s+/g, " ").trim());
  const combined = normalized.join(" ").trim();
  const needsToggle = combined.length > WHY_DESC_LIMIT;
  const truncated =
    combined.slice(0, WHY_DESC_LIMIT).replace(/\s+\S*$/, "") + "…";

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const startH = startHeightRef.current;
    if (!wrap || startH === null) return;
    startHeightRef.current = null;
    const endH = wrap.offsetHeight;
    if (startH === endH) {
      setAnimating(false);
      return;
    }
    wrap.style.transition = "none";
    wrap.style.height = `${startH}px`;
    void wrap.offsetHeight;
    wrap.style.transition = "height 0.45s ease";
    wrap.style.height = `${endH}px`;
    const done = () => {
      wrap.style.transition = "";
      wrap.style.height = "";
      setAnimating(false);
      wrap.removeEventListener("transitionend", done);
    };
    wrap.addEventListener("transitionend", done);
    return () => wrap.removeEventListener("transitionend", done);
  }, [expanded]);

  const toggle = () => {
    if (!needsToggle || animating || !wrapRef.current) return;
    startHeightRef.current = wrapRef.current.offsetHeight;
    setAnimating(true);
    setExpanded((v) => !v);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  const readMoreControl = (
    <span
      role="button"
      tabIndex={0}
      className="why-readmore cursor-pointer font-semibold text-teal hover:underline"
      onClick={toggle}
      onKeyDown={onKeyDown}
    >
      {expanded ? t("readLess") : t("readMore")}
    </span>
  );

  if (!needsToggle) {
    return (
      <>
        {normalized.map((text, i) => (
          <p
            key={text.slice(0, 40)}
            className={`text-navy leading-relaxed ${
              i === normalized.length - 1 ? "mb-6" : "mb-4"
            }`}
          >
            {text}
          </p>
        ))}
      </>
    );
  }

  return (
    <div ref={wrapRef} className="why-desc-wrap overflow-hidden">
      {expanded ? (
        normalized.map((text, i) => {
          const isLast = i === normalized.length - 1;
          return (
            <p
              key={text.slice(0, 40)}
              className={`text-navy leading-relaxed ${
                isLast ? "mb-6" : "mb-4"
              }`}
            >
              {text} {isLast ? readMoreControl : null}
            </p>
          );
        })
      ) : (
        <p className="mb-6 text-navy leading-relaxed">
          {truncated} {readMoreControl}
        </p>
      )}
    </div>
  );
}

export function WhySuricatSection() {
  const t = useTranslations("home.why");
  const WHY_TABS = useMemo(
    () => [
      t("tabs.mission"),
      t("tabs.practitioners"),
      t("tabs.structural"),
      t("tabs.existingSystems"),
      t("tabs.howItWorks"),
      t("tabs.regulated"),
      t("tabs.enables"),
    ],
    [t],
  );
  const panes = useMemo(
    () => ({
      mission: {
        eyebrow: t("mission.eyebrow"),
        bullets: [t("mission.bullets.0"), t("mission.bullets.1"), t("mission.bullets.2")],
        title: t("mission.title"),
        paragraphs: [t("mission.paragraphs.0")],
      },
      practitioners: {
        eyebrow: t("practitioners.eyebrow"),
        bullets: [
          t("practitioners.bullets.0"),
          t("practitioners.bullets.1"),
          t("practitioners.bullets.2"),
        ],
        title: t("practitioners.title"),
        paragraphs: [
          t("practitioners.paragraphs.0"),
          t("practitioners.paragraphs.1"),
          t("practitioners.paragraphs.2"),
        ],
      },
      structural: {
        eyebrow: t("structural.eyebrow"),
        bullets: [
          t("structural.bullets.0"),
          t("structural.bullets.1"),
          t("structural.bullets.2"),
        ],
        title: t("structural.title"),
        paragraphs: [
          t("structural.paragraphs.0"),
          t("structural.paragraphs.1"),
          t("structural.paragraphs.2"),
          t("structural.paragraphs.3"),
          t("structural.paragraphs.4"),
        ],
      },
      existingSystems: {
        eyebrow: t("existingSystems.eyebrow"),
        bullets: [
          t("existingSystems.bullets.0"),
          t("existingSystems.bullets.1"),
          t("existingSystems.bullets.2"),
        ],
        title: t("existingSystems.title"),
        paragraphs: [
          t("existingSystems.paragraphs.0"),
          t("existingSystems.paragraphs.1"),
          t("existingSystems.paragraphs.2"),
        ],
      },
      howItWorks: {
        eyebrow: t("howItWorks.eyebrow"),
        bullets: [
          t("howItWorks.bullets.0"),
          t("howItWorks.bullets.1"),
          t("howItWorks.bullets.2"),
        ],
        title: t("howItWorks.title"),
        paragraphs: [
          t("howItWorks.paragraphs.0"),
          t("howItWorks.paragraphs.1"),
          t("howItWorks.paragraphs.2"),
        ],
      },
      regulated: {
        eyebrow: t("regulated.eyebrow"),
        bullets: [t("regulated.bullets.0"), t("regulated.bullets.1"), t("regulated.bullets.2")],
        title: t("regulated.title"),
        paragraphs: [
          t("regulated.paragraphs.0"),
          t("regulated.paragraphs.1"),
          t("regulated.paragraphs.2"),
          t("regulated.paragraphs.3"),
        ],
      },
      enables: {
        eyebrow: t("enables.eyebrow"),
        bullets: [t("enables.bullets.0"), t("enables.bullets.1"), t("enables.bullets.2")],
        title: t("enables.title"),
        paragraphs: [
          t("enables.paragraphs.0"),
          t("enables.paragraphs.1"),
          t("enables.paragraphs.2"),
          t("enables.paragraphs.3"),
        ],
      },
    }),
    [t],
  );
  const [active, setActive] = useState(0);

  const selectTab = useCallback((index: number) => {
    setActive(index);
  }, []);

  useEffect(() => {
    const activateFromHash = (hash = window.location.hash) => {
      const index = parseWhyTabIndex(hash || "");
      if (index === null || index < 0 || index >= WHY_TABS.length) return;
      setActive(index);
    };

    activateFromHash();

    const onHomeHash = (event: Event) => {
      const detail = (event as CustomEvent<{ hash?: string }>).detail;
      activateFromHash(detail?.hash ?? window.location.hash);
    };

    const onHashChange = () => activateFromHash();

    window.addEventListener(HOME_HASH_EVENT, onHomeHash);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener(HOME_HASH_EVENT, onHomeHash);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [WHY_TABS.length]);

  const continueTab = () => {
    selectTab((active + 1) % WHY_TABS.length);
  };

  return (
<section id="why-suricat" className="bg-surface-muted px-6 pt-8">
      <div id="itrkn2" className="max-w-7xl mx-auto">
        <div className="mb-12">
          <span
            className="text-teal font-bold text-sm uppercase tracking-widest mb-4 block"
            >{t("sectionTitle")}</span
          >
          <h2
            id="ipde2x"
            className="text-2xl sm:text-3xl lg:text-[32px] font-semibold mb-4 sm:mb-6 leading-tight lg:leading-[36px]"
          >
          {t("headline")}
          </h2>
          <p
            id="i0r66h"
            className="text-navy max-w-4xl w-full text-base sm:text-lg lg:text-[20px] leading-relaxed lg:leading-[28px]"
          >
          {t("intro")}
          </p>
        </div>
        <HomeSectionTabNav
          tabs={WHY_TABS}
          active={active}
          onSelect={selectTab}
          carouselId="tabs-carousel"
          prevBtnId="tabs-prev-btn"
          nextBtnId="tabs-next-btn"
          indicatorId="tab-indicator"
          dropdownTriggerId="why-tabs-dropdown-trigger"
          dropdownMenuId="why-tabs-dropdown-menu"
        />
        <div
          id="iye3pg"
          className="bg-white rounded-[4px] overflow-hidden shadow-sm"
        >
          <div className="tab-panel-stack">
            <div
              id="tab-content-0"
              className={animatedTabPaneClass(
                active === 0,
                "tab-pane",
                "flex-col xl:flex-row xl:min-h-[440px]",
              )}
              aria-hidden={active !== 0}
            >
              <div
                className="xl:w-1/2 bg-navy text-white p-10 lg:p-12 flex flex-col justify-start"
              >
                <p className="text-teal text-sm font-bold uppercase tracking-widest mb-3">
                  {panes.mission.eyebrow}
                </p>
                <div className="w-10 h-1 bg-teal rounded-full mb-6"></div>
                <div className="divide-y divide-white/10">
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaCrosshairs aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      {panes.mission.bullets[0]}
                    </p>
                  </div>
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaUser aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      {panes.mission.bullets[1]}
                    </p>
                  </div>
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaShieldHalved aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      {panes.mission.bullets[2]}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="xl:w-1/2 p-10 lg:p-12 flex flex-col justify-center bg-white"
              >
                <h3 className="text-navy text-2xl lg:text-[32px] font-bold mb-4">
                  {panes.mission.title}
                </h3>
                <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                <WhyTabDescription paragraphs={panes.mission.paragraphs} />
                <button type="button" onClick={continueTab} className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-bold transition-all group">
                      {t("continue")}
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div
              id="tab-content-1"
              className={animatedTabPaneClass(
                active === 1,
                "tab-pane",
                "flex-col xl:flex-row xl:min-h-[440px]",
              )}
              aria-hidden={active !== 1}
            >
              <div
                className="xl:w-1/2 bg-navy text-white p-10 lg:p-12 flex flex-col justify-start"
              >
                <p className="text-teal text-sm font-bold uppercase tracking-widest mb-3">
                  {panes.practitioners.eyebrow}
                </p>
                <div className="w-10 h-1 bg-teal rounded-full mb-6"></div>
                <div className="divide-y divide-white/10">
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaUsers aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      {panes.practitioners.bullets[0]}
                    </p>
                  </div>
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaClipboardCheck aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      {panes.practitioners.bullets[1]}
                    </p>
                  </div>
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaShieldHalved aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      {panes.practitioners.bullets[2]}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="xl:w-1/2 p-10 lg:p-12 flex flex-col justify-center bg-white"
              >
                <h3 className="text-navy text-2xl lg:text-[32px] font-bold mb-4">
                  {panes.practitioners.title}
                </h3>
                <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                <WhyTabDescription paragraphs={panes.practitioners.paragraphs} />
                <button type="button" onClick={continueTab} className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-bold transition-all group">
                      {t("continue")}
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div
              id="tab-content-2"
              className={animatedTabPaneClass(
                active === 2,
                "tab-pane",
                "flex-col xl:flex-row xl:min-h-[440px]",
              )}
              aria-hidden={active !== 2}
            >
              <div
                className="xl:w-1/2 bg-navy text-white p-10 lg:p-12 flex flex-col justify-start"
              >
                <p className="text-teal text-sm font-bold uppercase tracking-widest mb-3">
                  {panes.structural.eyebrow}
                </p>
                <div className="w-10 h-1 bg-teal rounded-full mb-6"></div>
                <div className="divide-y divide-white/10">
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaCalendarDays aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      {panes.structural.bullets[0]}
                    </p>
                  </div>
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaShareNodes aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      {panes.structural.bullets[1]}
                    </p>
                  </div>
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaUser aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      {panes.structural.bullets[2]}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="xl:w-1/2 p-10 lg:p-12 flex flex-col justify-center bg-white"
              >
                <h3 className="text-navy text-2xl lg:text-[32px] font-bold mb-4">
                  {panes.structural.title}
                </h3>
                <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                <WhyTabDescription paragraphs={panes.structural.paragraphs} />
                <button type="button" onClick={continueTab} className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-bold transition-all group">
                      {t("continue")}
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div
              id="tab-content-3"
              className={animatedTabPaneClass(
                active === 3,
                "tab-pane",
                "flex-col xl:flex-row xl:min-h-[440px]",
              )}
              aria-hidden={active !== 3}
            >
              <div
                className="xl:w-1/2 bg-navy text-white p-10 lg:p-12 flex flex-col justify-start"
              >
                <p className="text-teal text-sm font-bold uppercase tracking-widest mb-3">
                  {panes.existingSystems.eyebrow}
                </p>
                <div className="w-10 h-1 bg-teal rounded-full mb-6"></div>
                <div className="divide-y divide-white/10">
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaFileLines aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      {panes.existingSystems.bullets[0]}
                    </p>
                  </div>
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaClock aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      {panes.existingSystems.bullets[1]}
                    </p>
                  </div>
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaTriangleExclamation aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      {panes.existingSystems.bullets[2]}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="xl:w-1/2 p-10 lg:p-12 flex flex-col justify-center bg-white"
              >
                <h3 className="text-navy text-2xl lg:text-[32px] font-bold mb-4">
                  {panes.existingSystems.title}
                </h3>
                <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                <WhyTabDescription paragraphs={panes.existingSystems.paragraphs} />
                <button type="button" onClick={continueTab} className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-bold transition-all group">
                      {t("continue")}
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div
              id="tab-content-4"
              className={animatedTabPaneClass(
                active === 4,
                "tab-pane",
                "flex-col xl:flex-row xl:min-h-[440px]",
              )}
              aria-hidden={active !== 4}
            >
              <div
                className="xl:w-1/2 bg-navy text-white p-10 lg:p-12 flex flex-col justify-start"
              >
                <p className="text-teal text-sm font-bold uppercase tracking-widest mb-3">
                  {panes.howItWorks.eyebrow}
                </p>
                <div className="w-10 h-1 bg-teal rounded-full mb-6"></div>
                <div className="divide-y divide-white/10">
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaFileImport aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      {panes.howItWorks.bullets[0]}
                    </p>
                  </div>
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaShareNodes aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      {panes.howItWorks.bullets[1]}
                    </p>
                  </div>
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaShieldHalved aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      {panes.howItWorks.bullets[2]}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="xl:w-1/2 p-10 lg:p-12 flex flex-col justify-center bg-white"
              >
                <h3 className="text-navy text-2xl lg:text-[32px] font-bold mb-4">
                  {panes.howItWorks.title}
                </h3>
                <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                <WhyTabDescription paragraphs={panes.howItWorks.paragraphs} />
                <button type="button" onClick={continueTab} className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-bold transition-all group">
                      {t("continue")}
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div
              id="tab-content-5"
              className={animatedTabPaneClass(
                active === 5,
                "tab-pane",
                "flex-col xl:flex-row xl:min-h-[440px]",
              )}
              aria-hidden={active !== 5}
            >
              <div
                className="xl:w-1/2 bg-navy text-white p-10 lg:p-12 flex flex-col justify-start"
              >
                <p className="text-teal text-sm font-bold uppercase tracking-widest mb-3">
                  {panes.regulated.eyebrow}
                </p>
                <div className="w-10 h-1 bg-teal rounded-full mb-6"></div>
                <div className="divide-y divide-white/10">
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaShieldHalved aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      {panes.regulated.bullets[0]}
                    </p>
                  </div>
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaLock aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      {panes.regulated.bullets[1]}
                    </p>
                  </div>
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaGlobe aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      {panes.regulated.bullets[2]}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="xl:w-1/2 p-10 lg:p-12 flex flex-col justify-center bg-white"
              >
                <h3 className="text-navy text-2xl lg:text-[32px] font-bold mb-4">
                  {panes.regulated.title}
                </h3>
                <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                <WhyTabDescription paragraphs={panes.regulated.paragraphs} />
                <button type="button" onClick={continueTab} className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-bold transition-all group">
                      {t("continue")}
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div
              id="tab-content-6"
              className={animatedTabPaneClass(
                active === 6,
                "tab-pane",
                "flex-col xl:flex-row xl:min-h-[440px]",
              )}
              aria-hidden={active !== 6}
            >
              <div
                className="xl:w-1/2 bg-navy text-white p-10 lg:p-12 flex flex-col justify-start"
              >
                <p className="text-teal text-sm font-bold uppercase tracking-widest mb-3">
                  {panes.enables.eyebrow}
                </p>
                <div className="w-10 h-1 bg-teal rounded-full mb-6"></div>
                <div className="divide-y divide-white/10">
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaShieldHalved aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      {panes.enables.bullets[0]}
                    </p>
                  </div>
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaCrosshairs aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      {panes.enables.bullets[1]}
                    </p>
                  </div>
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaClock aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      {panes.enables.bullets[2]}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="xl:w-1/2 p-10 lg:p-12 flex flex-col justify-center bg-white"
              >
                <h3 className="text-navy text-2xl lg:text-[32px] font-bold mb-4">
                  {panes.enables.title}
                </h3>
                <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                <WhyTabDescription paragraphs={panes.enables.paragraphs} />
                <button type="button" onClick={continueTab} className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-bold transition-all group">
                      {t("continue")}
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
    