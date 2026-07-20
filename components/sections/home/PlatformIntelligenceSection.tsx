"use client";

import { FaArrowRight } from "@/components/ui/icons";
import { HomeSectionTabNav } from "@/components/sections/home/HomeSectionTabNav";
import {
  HOME_HASH_EVENT,
  parsePlatformTabIndex,
} from "@/components/layout/SmoothHashScroll";
import { animatedTabPaneClass } from "@/lib/animatedTabPane";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const PLATFORM_TABS = ['Intelligence Layer', 'Read Only by Design', 'No Rip and Replace', 'Human Accountability', 'Deployment', 'Regulatory Ontology', 'Canonical Intelligence Schema', 'Quality Validation Rating', 'Bounded Reasoning'];

export function PlatformIntelligenceSection() {
  const [active, setActive] = useState(0);

  const selectTab = useCallback((index: number) => {
    setActive(index);
  }, []);

  useEffect(() => {
    const activateFromHash = (hash = window.location.hash) => {
      const index = parsePlatformTabIndex(hash || "");
      if (index === null || index < 0 || index >= PLATFORM_TABS.length) return;
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
    selectTab((active + 1) % PLATFORM_TABS.length);
  };

  return (
    <section
      id="platform-intelligence-section"
      className="bg-white pt-8 px-6"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div
        id="immaak"
        className="relative mx-auto w-full max-w-7xl text-left"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="relative z-10">
          <span
            className="mb-4 block text-sm font-bold uppercase tracking-widest text-teal"
          >
            Platform
          </span>
          <h2
            className="mb-4 text-2xl font-semibold leading-tight text-navy sm:mb-6 sm:text-3xl lg:text-[32px] lg:leading-[36px]"
          >
            The Systems Remain. The Intelligence Layer Sits Above Them.
          </h2>
          <p
            id="i7axkf"
            className="mb-12 w-full max-w-5xl text-base leading-relaxed text-navy sm:text-lg lg:text-[20px] lg:leading-[28px]"
          >
            Suricat is a read-only Compliance Intelligence Layer that continuously
            evaluates alignment across quality and regulatory documentation without
            changing the systems organizations already depend on.
          </p>

          <div className="max-w-7xl mx-auto text-left">
            <HomeSectionTabNav
              tabs={PLATFORM_TABS}
              active={active}
              onSelect={selectTab}
              carouselId="platform-tabs-carousel"
              prevBtnId="platform-tabs-prev-btn"
              nextBtnId="platform-tabs-next-btn"
              indicatorId="platform-tab-indicator"
              dropdownTriggerId="platform-dropdown-trigger"
              dropdownMenuId="platform-dropdown-menu"
              tabBtnClass="platform-nav-btn"
              arrowClass="text-[#0D1B3E] hover:text-[#19D3C5]"
            />

            {/* Tab Card */}
            <div
              id="platform-card"
              className="bg-white rounded-[4px] overflow-hidden shadow-sm"
            >
              <div className="tab-panel-stack">
              <div
                id="platform-pane-0"
                className={animatedTabPaneClass(
                  active === 0,
                  "platform-pane",
                  "flex-col xl:flex-row xl:min-h-[240px]",
                )}
                aria-hidden={active !== 0}
              >
                <div
                  className="xl:w-1/2 bg-[#001741] flex items-center justify-center min-h-[240px]"
                >
                  <Image
                    src="/assets/images/intelligence-layer.png"
                    alt="Intelligence Layer"
                    width={1650}
                    height={1050}
                    className="h-auto w-full max-h-[400px] object-contain"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div
                  className="xl:w-1/2 p-10 lg:p-12 flex flex-col justify-center bg-[#EDEFEF]"
                >
                  <h3 className="text-navy text-2xl lg:text-[32px] font-bold mb-4">
                    Intelligence Layer
                  </h3>
                  <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                  <p className="text-navy mb-6 leading-relaxed">
                    Suricat operates as a neutral, read-only intelligence layer
                    above existing systems of record. It does not replace
                    validated infrastructure or alter system boundaries.
                  </p>
                  <button type="button" onClick={continueTab} className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-semibold transition-all group">
                      Continue
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div
                id="platform-pane-1"
                className={animatedTabPaneClass(
                  active === 1,
                  "platform-pane",
                  "flex-col xl:flex-row xl:min-h-[240px]",
                )}
                aria-hidden={active !== 1}
              >
                <div
                  className="xl:w-1/2 bg-[#001741] flex items-center justify-center min-h-[240px]"
                >
                  <Image
                    src="/assets/images/read-only-by-design.png"
                    alt="Read Only by Design"
                    width={1650}
                    height={1050}
                    className="h-auto w-full max-h-[400px] object-contain"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div
                  className="xl:w-1/2 p-10 lg:p-12 flex flex-col justify-center bg-[#EDEFEF]"
                >
                  <h3 className="text-navy text-2xl lg:text-[32px] font-bold mb-4">
                    Read Only by Design
                  </h3>
                  <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                  <p className="text-navy mb-6 leading-relaxed">
                    Suricat integrates across enterprise systems without
                    modifying a single record.
                  </p>
                  <button type="button" onClick={continueTab} className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-semibold transition-all group">
                      Continue
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div
                id="platform-pane-2"
                className={animatedTabPaneClass(
                  active === 2,
                  "platform-pane",
                  "flex-col xl:flex-row xl:min-h-[240px]",
                )}
                aria-hidden={active !== 2}
              >
                <div
                  className="xl:w-1/2 bg-[#001741] flex items-center justify-center min-h-[240px]"
                >
                  <Image
                    src="/assets/images/no-rip-and-replace.png"
                    alt="No Rip and Replace"
                    width={1650}
                    height={1050}
                    className="h-auto w-full max-h-[400px] object-contain"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div
                  className="xl:w-1/2 p-10 lg:p-12 flex flex-col justify-center bg-[#EDEFEF]"
                >
                  <h3 className="text-navy text-2xl lg:text-[32px] font-bold mb-4">
                    No Rip and Replace
                  </h3>
                  <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                  <p className="text-navy mb-6 leading-relaxed">
                    Your QMS, RIM platforms, document control systems, and
                    validation infrastructure remain exactly as they are.
                  </p>
                  <button type="button" onClick={continueTab} className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-semibold transition-all group">
                      Continue
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div
                id="platform-pane-3"
                className={animatedTabPaneClass(
                  active === 3,
                  "platform-pane",
                  "flex-col xl:flex-row xl:min-h-[240px]",
                )}
                aria-hidden={active !== 3}
              >
                <div
                  className="xl:w-1/2 bg-[#001741] flex items-center justify-center min-h-[240px]"
                >
                  <Image
                    src="/assets/images/human-accountability.png"
                    alt="Human Accountability"
                    width={1650}
                    height={1050}
                    className="h-auto w-full max-h-[400px] object-contain"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div
                  className="xl:w-1/2 p-10 lg:p-12 flex flex-col justify-center bg-[#EDEFEF]"
                >
                  <h3 className="text-navy text-2xl lg:text-[32px] font-bold mb-4">
                    Human Accountability
                  </h3>
                  <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                  <p className="text-navy mb-6 leading-relaxed">
                    Suricat surfaces intelligence. Qualified professionals make
                    every decision.
                  </p>
                  <button type="button" onClick={continueTab} className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-semibold transition-all group">
                      Continue
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div
                id="platform-pane-4"
                className={animatedTabPaneClass(
                  active === 4,
                  "platform-pane",
                  "flex-col xl:flex-row xl:min-h-[240px]",
                )}
                aria-hidden={active !== 4}
              >
                <div
                  className="xl:w-1/2 bg-[#001741] flex items-center justify-center min-h-[240px]"
                >
                  <Image
                    src="/assets/images/deployment.png"
                    alt="Deployment"
                    width={1650}
                    height={1050}
                    className="h-auto w-full max-h-[400px] object-contain"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div
                  className="xl:w-1/2 p-10 lg:p-12 flex flex-col justify-center bg-[#EDEFEF]"
                >
                  <h3 className="text-navy text-2xl lg:text-[32px] font-bold mb-4">
                    Deployment
                  </h3>
                  <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                  <p className="text-navy mb-6 leading-relaxed">
                    Suricat is delivered as a secure SaaS platform, enabling
                    rapid adoption without disrupting validated environments.
                  </p>
                  <button type="button" onClick={continueTab} className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-semibold transition-all group">
                      Continue
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div
                id="platform-pane-5"
                className={animatedTabPaneClass(
                  active === 5,
                  "platform-pane",
                  "flex-col xl:flex-row xl:min-h-[240px]",
                )}
                aria-hidden={active !== 5}
              >
                <div
                  className="xl:w-1/2 bg-[#001741] flex items-center justify-center min-h-[240px]"
                >
                  <Image
                    src="/assets/images/regulatory-ontology.png"
                    alt="Regulatory Ontology"
                    width={1650}
                    height={1050}
                    className="h-auto w-full max-h-[400px] object-contain"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div
                  className="xl:w-1/2 p-10 lg:p-12 flex flex-col justify-center bg-[#EDEFEF]"
                >
                  <h3 className="text-navy text-2xl lg:text-[32px] font-bold mb-4">
                    Regulatory Ontology
                  </h3>
                  <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                  <p className="text-navy mb-6 leading-relaxed">
                    At the core of Suricat is a proprietary knowledge framework
                    encoding how regulations are interpreted in practice.
                  </p>
                  <button type="button" onClick={continueTab} className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-semibold transition-all group">
                      Continue
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div
                id="platform-pane-6"
                className={animatedTabPaneClass(
                  active === 6,
                  "platform-pane",
                  "flex-col xl:flex-row xl:min-h-[240px]",
                )}
                aria-hidden={active !== 6}
              >
                <div
                  className="xl:w-1/2 bg-[#001741] flex items-center justify-center min-h-[240px]"
                >
                  <Image
                    src="/assets/images/canonical-intelligence-schema.png"
                    alt="Canonical Intelligence Schema"
                    width={1650}
                    height={1050}
                    className="h-auto w-full max-h-[400px] object-contain"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div
                  className="xl:w-1/2 p-10 lg:p-12 flex flex-col justify-center bg-[#EDEFEF]"
                >
                  <h3 className="text-navy text-2xl lg:text-[32px] font-bold mb-4">
                    Canonical Intelligence Schema
                  </h3>
                  <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                  <p className="text-navy mb-6 leading-relaxed">
                    Every document entering Suricat is transformed into
                    structured, traceable evidence that reflects how experienced
                    regulatory professionals evaluate artifacts during
                    inspections.
                  </p>
                  <button type="button" onClick={continueTab} className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-semibold transition-all group">
                      Continue
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div
                id="platform-pane-7"
                className={animatedTabPaneClass(
                  active === 7,
                  "platform-pane",
                  "flex-col xl:flex-row xl:min-h-[240px]",
                )}
                aria-hidden={active !== 7}
              >
                <div
                  className="xl:w-1/2 bg-[#001741] flex items-center justify-center min-h-[240px]"
                >
                  <Image
                    src="/assets/images/quality-validation-rating.png"
                    alt="Quality Validation Rating"
                    width={1650}
                    height={1050}
                    className="h-auto w-full max-h-[400px] object-contain"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div
                  className="xl:w-1/2 p-10 lg:p-12 flex flex-col justify-center bg-[#EDEFEF]"
                >
                  <h3 className="text-navy text-2xl lg:text-[32px] font-bold mb-4">
                    Quality Validation Rating
                  </h3>
                  <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                  <p className="text-navy mb-6 leading-relaxed">
                    Suricat continuously evaluates documentation through a
                    confidence scoring system that determines inspection
                    readiness.
                  </p>
                  <button type="button" onClick={continueTab} className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-semibold transition-all group">
                      Continue
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div
                id="platform-pane-8"
                className={animatedTabPaneClass(
                  active === 8,
                  "platform-pane",
                  "flex-col xl:flex-row xl:min-h-[240px]",
                )}
                aria-hidden={active !== 8}
              >
                <div
                  className="xl:w-1/2 bg-[#001741] flex items-center justify-center min-h-[240px]"
                >
                  <Image
                    src="/assets/images/bonded-reasoning.png"
                    alt="Bounded Reasoning"
                    width={1650}
                    height={1050}
                    className="h-auto w-full max-h-[400px] object-contain"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div
                  className="xl:w-1/2 p-10 lg:p-12 flex flex-col justify-center bg-[#EDEFEF]"
                >
                  <h3 className="text-navy text-2xl lg:text-[32px] font-bold mb-4">
                    Bounded Reasoning
                  </h3>
                  <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                  <p className="text-navy mb-6 leading-relaxed">
                    Suricat&apos;s bounded reasoning engine is a proprietary
                    architecture purpose-built for regulated environments where
                    an incorrect output is not an inconvenience.
                  </p>
                  <Link
                    href="/readiness"
                    className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-semibold transition-all group"
                  >
                    Check Your Readiness
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                  </Link>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
