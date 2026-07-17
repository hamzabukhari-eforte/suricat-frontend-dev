

"use client";

import { FaArrowRight, FaCalendarDays, FaClipboardCheck, FaClock, FaCrosshairs, FaFileImport, FaFileLines, FaGlobe, FaLock, FaShareNodes, FaShieldHalved, FaTriangleExclamation, FaUser, FaUsers } from "@/components/ui/icons";
import { HomeSectionTabNav } from "@/components/sections/home/HomeSectionTabNav";
import {
  HOME_HASH_EVENT,
  parseWhyTabIndex,
} from "@/components/layout/SmoothHashScroll";
import { animatedTabPaneClass } from "@/lib/animatedTabPane";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";

const WHY_TABS = ["Suricat's Mission", 'Built by Practitioners', 'The Structural Problem', 'Why Existing Systems Fall Short', 'How Suricat Works', 'Designed for Regulated Environments', 'What Suricat Enables'];

/** Designs index.html WHY_DESC_LIMIT — truncate long tab descriptions with Read more/less. */
const WHY_DESC_LIMIT = 250;

function WhyTabDescription({ paragraphs }: { paragraphs: string[] }) {
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
      {expanded ? "Read less" : "Read more"}
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
  }, []);

  const continueTab = () => {
    selectTab((active + 1) % WHY_TABS.length);
  };

  return (
<section id="why-suricat-section" className="bg-surface-muted px-6 pt-8">
      <div id="itrkn2" className="max-w-7xl mx-auto">
        <div className="mb-12">
          <span
            className="text-teal font-bold text-sm uppercase tracking-widest mb-4 block"
            >Why Suricat</span
          >
          <h2
            id="ipde2x"
            className="text-2xl sm:text-3xl lg:text-[32px] font-semibold mb-4 sm:mb-6 leading-tight lg:leading-[36px]"
          >
          The Systems Are in Place. The Alignment Between Them is Not.
          </h2>
          <p
            id="i0r66h"
            className="text-navy max-w-4xl w-full text-base sm:text-lg lg:text-[20px] leading-relaxed lg:leading-[28px]"
          >
          Requirements change. Documents evolve. Evidence accumulates. Over time, demonstrating that critical quality and regulatory documentation remains aligned becomes increasingly difficult.
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
                  Continuous Alignment
                </p>
                <div className="w-10 h-1 bg-teal rounded-full mb-6"></div>
                <div className="divide-y divide-white/10">
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaCrosshairs aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      Detects misalignment before inspection.
                    </p>
                  </div>
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaUser aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      Preserves human accountability.
                    </p>
                  </div>
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaShieldHalved aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      Enables inspection-ready decisions.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="xl:w-1/2 p-10 lg:p-12 flex flex-col justify-center bg-white"
              >
                <h3 className="text-navy text-2xl lg:text-[32px] font-bold mb-4">
                  Suricat&apos;s Mission
                </h3>
                <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                <WhyTabDescription
                  paragraphs={[
                    "Transform regulatory compliance through explainable intelligence that detects misalignment earlier, preserves human accountability, and enables inspection-ready decisions.",
                  ]}
                />
                <button type="button" onClick={continueTab} className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-semibold transition-all group">
                      Continue
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
                  Built by Practitioners
                </p>
                <div className="w-10 h-1 bg-teal rounded-full mb-6"></div>
                <div className="divide-y divide-white/10">
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaUsers aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      Decades across Quality, Regulatory Affairs, and
                      Compliance.
                    </p>
                  </div>
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaClipboardCheck aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      Built inside regulated environments.
                    </p>
                  </div>
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaShieldHalved aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      Deep FDA inspection and CAPA experience.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="xl:w-1/2 p-10 lg:p-12 flex flex-col justify-center bg-white"
              >
                <h3 className="text-navy text-2xl lg:text-[32px] font-bold mb-4">
                  Built by Practitioners
                </h3>
                <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                <WhyTabDescription
                  paragraphs={[
                    "Suricat was built from lived regulatory and operational experience.",
                    "The founding team brings decades of experience across Quality, Regulatory Affairs, FDA inspections, CAPA investigations, and MDR transitions.",
                    "We built the intelligence layer we wished existed to make compliance evaluation continuous, not episodic.",
                  ]}
                />
                <button type="button" onClick={continueTab} className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-semibold transition-all group">
                      Continue
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
                  Episodic Compliance
                </p>
                <div className="w-10 h-1 bg-teal rounded-full mb-6"></div>
                <div className="divide-y divide-white/10">
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaCalendarDays aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      Organizations reconcile documents periodically, not
                      continuously.
                    </p>
                  </div>
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaShareNodes aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      Requirements are mapped manually across fragmented systems.
                    </p>
                  </div>
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaUser aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      Institutional knowledge lives in individuals, not in
                      systems.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="xl:w-1/2 p-10 lg:p-12 flex flex-col justify-center bg-white"
              >
                <h3 className="text-navy text-2xl lg:text-[32px] font-bold mb-4">
                  The Structural Problem
                </h3>
                <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                <WhyTabDescription
                  paragraphs={[
                    "Despite decades of enterprise digitization, compliance remains episodic. Organizations are always catching up.",
                    "Regulated organizations manage documentation ecosystems spanning quality, risk, regulatory, operational, financial, and governance records across multiple environments and jurisdictions.",
                    "As requirements change, previously compliant evidence becomes insufficient. Systems of record preserve data integrity—they do not evaluate alignment across it.",
                    "Misalignment is detected late, when remediation is costly and regulatory exposure is already material.",
                    "This is not a gap a better workflow tool closes. It is a structural condition that requires a different class of infrastructure entirely.",
                  ]}
                />
                <button type="button" onClick={continueTab} className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-semibold transition-all group">
                      Continue
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
                  System Gaps
                </p>
                <div className="w-10 h-1 bg-teal rounded-full mb-6"></div>
                <div className="divide-y divide-white/10">
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaFileLines aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      Small changes across documents create invisible divergence.
                    </p>
                  </div>
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaClock aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      Periodic reconciliation is reactive, redundant, and
                      resource intensive.
                    </p>
                  </div>
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaTriangleExclamation aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      Misalignment discovered during inspection leads to delays,
                      exposure, and higher cost.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="xl:w-1/2 p-10 lg:p-12 flex flex-col justify-center bg-white"
              >
                <h3 className="text-navy text-2xl lg:text-[32px] font-bold mb-4">
                  Why Existing Systems Fall Short
                </h3>
                <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                <WhyTabDescription
                  paragraphs={[
                    "Complexity does not announce its consequences. A design revision here. An updated procedure there. A requirement that shifted without triggering coordinated updates across every artifact it touched. Each change is individually defensible. Together they produce a documentation ecosystem that no longer holds together under scrutiny.",
                    "Organizations invest heavily in periodic reconciliation—assembling evidence, cross-referencing records, reconstructing rationale. This effort is largely reactive and preventable.",
                    "When misalignment surfaces during inspection rather than before it, remediation extends and exposure intensifies. The solution is not more process—it is continuous alignment embedded within operations.",
                  ]}
                />
                <button type="button" onClick={continueTab} className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-semibold transition-all group">
                      Continue
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
                  Continuous Intelligence Cycle
                </p>
                <div className="w-10 h-1 bg-teal rounded-full mb-6"></div>
                <div className="divide-y divide-white/10">
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaFileImport aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      Ingests documents and metadata continuously.
                    </p>
                  </div>
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaShareNodes aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      Maps requirements to evidence across systems.
                    </p>
                  </div>
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaShieldHalved aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      Surfaces findings with full source traceability.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="xl:w-1/2 p-10 lg:p-12 flex flex-col justify-center bg-white"
              >
                <h3 className="text-navy text-2xl lg:text-[32px] font-bold mb-4">
                  How Suricat Works
                </h3>
                <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                <WhyTabDescription
                  paragraphs={[
                    "Suricat operates in a continuous cycle that turns fragmented documentation into inspection-ready confidence.",
                    "It connects disparate systems and content, maps requirements to evidence, and applies regulatory reasoning to evaluate alignment, consistency, and risk—continuously, not periodically.",
                    "Teams act on findings within existing workflows. Suricat learns from outcomes to continuously improve accuracy, reduce false positives, and strengthen inspection readiness.",
                  ]}
                />
                <button type="button" onClick={continueTab} className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-semibold transition-all group">
                      Continue
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
                  Built for Regulated Reality
                </p>
                <div className="w-10 h-1 bg-teal rounded-full mb-6"></div>
                <div className="divide-y divide-white/10">
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaShieldHalved aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      Regulatory Grade.
                    </p>
                  </div>
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaLock aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      Security by Design.
                    </p>
                  </div>
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaGlobe aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      Global &amp; Scalable.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="xl:w-1/2 p-10 lg:p-12 flex flex-col justify-center bg-white"
              >
                <h3 className="text-navy text-2xl lg:text-[32px] font-bold mb-4">
                  Designed for Regulated Environments
                </h3>
                <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                <WhyTabDescription
                  paragraphs={[
                    "Suricat is purpose-built for organizations operating under complex and evolving regulatory obligations. Every capability is designed to meet the expectations of regulators and the needs of regulated teams.",
                    "We embed security, privacy, and access controls at every layer. Data is protected, evidence is traceable, and every output is explainable and defensible.",
                    "Suricat supports global operations across industries and jurisdictions. Our platform adapts to your requirements, scales with your growth, and stays aligned as regulations and standards evolve.",
                    "You get a compliance infrastructure you can trust—built to operate in the real world of regulated environments.",
                  ]}
                />
                <button type="button" onClick={continueTab} className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-semibold transition-all group">
                      Continue
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
                  Outcomes That Matter
                </p>
                <div className="w-10 h-1 bg-teal rounded-full mb-6"></div>
                <div className="divide-y divide-white/10">
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaShieldHalved aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      Inspection Readiness.
                    </p>
                  </div>
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaCrosshairs aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      Risk Reduction.
                    </p>
                  </div>
                  <div className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center text-teal text-xl shrink-0">
                      <FaClock aria-hidden="true" />
                    </div>
                    <p className="text-white text-lg leading-snug">
                      Operational Efficiency.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="xl:w-1/2 p-10 lg:p-12 flex flex-col justify-center bg-white"
              >
                <h3 className="text-navy text-2xl lg:text-[32px] font-bold mb-4">
                  What Suricat Enables
                </h3>
                <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                <WhyTabDescription
                  paragraphs={[
                    "Suricat transforms compliance from a periodic, manual effort into a continuous intelligence capability embedded across daily operations.",
                    "Organizations move beyond assembling evidence after the fact. Instead, they continuously evaluate alignment across documentation, requirements, and operational reality as conditions evolve.",
                    "Quality, regulatory, and compliance teams gain earlier visibility into emerging risk, stronger inspection readiness, and greater confidence in decision making through explainable findings and traceable evidence.",
                    "This is not simply faster compliance work. It enables a more resilient operating model designed to scale with products, regulations, and organizational growth.",
                  ]}
                />
                <button type="button" onClick={continueTab} className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-semibold transition-all group">
                      Continue
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
    