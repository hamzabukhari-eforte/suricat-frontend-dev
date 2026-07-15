"use client";

import { FaArrowRight, FaChevronDown, FaChevronLeft, FaChevronRight } from "@/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const PLATFORM_TABS = ['Intelligence Layer', 'Read Only by Design', 'No Rip and Replace', 'Human Accountability', 'Deployment', 'Regulatory Ontology', 'Canonical Intelligence Schema', 'Quality Validation Rating', 'Bounded Reasoning'];

export function PlatformIntelligenceSection() {
  const [active, setActive] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const updateIndicator = useCallback(() => {
    const btn = tabRefs.current[active];
    const indicator = indicatorRef.current;
    if (!btn || !indicator) return;
    indicator.style.width = `${btn.offsetWidth}px`;
    indicator.style.left = `${btn.offsetLeft}px`;
  }, [active]);

  const updateCarouselButtons = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const maxScroll = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
    const hasOverflow = maxScroll > 2;
    setCanScrollLeft(hasOverflow && carousel.scrollLeft > 2);
    setCanScrollRight(hasOverflow && carousel.scrollLeft < maxScroll - 2);
  }, []);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    updateCarouselButtons();
    carousel.addEventListener("scroll", updateCarouselButtons, { passive: true });
    window.addEventListener("resize", updateCarouselButtons);
    return () => {
      carousel.removeEventListener("scroll", updateCarouselButtons);
      window.removeEventListener("resize", updateCarouselButtons);
    };
  }, [updateCarouselButtons]);

  const scrollCarousel = (direction: "left" | "right") => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const delta = carousel.clientWidth * 0.6;
    carousel.scrollBy({
      left: direction === "right" ? delta : -delta,
      behavior: "smooth",
    });
  };

  const selectTab = (index: number, scrollTabIntoView = true) => {
    setActive(index);
    setDropdownOpen(false);
    const btn = tabRefs.current[index];
    const carousel = carouselRef.current;
    if (btn && carousel && scrollTabIntoView) {
      const targetLeft =
        btn.offsetLeft - (carousel.clientWidth - btn.offsetWidth) / 2;
      const maxLeft = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
      carousel.scrollTo({
        left: Math.max(0, Math.min(maxLeft, targetLeft)),
        behavior: "smooth",
      });
    }
  };

  const selectTabRef = useRef(selectTab);

  useEffect(() => {
    selectTabRef.current = selectTab;
  });

  useEffect(() => {
    const activateFromHash = () => {
      const match = (window.location.hash || "").match(/platform-tab-(\d+)/);
      if (!match) return;
      const index = Number.parseInt(match[1], 10);
      if (Number.isNaN(index) || index < 0 || index >= PLATFORM_TABS.length) {
        return;
      }
      selectTabRef.current(index, false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          selectTabRef.current(index, true);
        });
      });
    };

    // setTimeout(0) avoids sync setState-in-effect lint; 200ms covers layout after SmoothHashScroll
    const immediate = window.setTimeout(activateFromHash, 0);
    const timer = window.setTimeout(activateFromHash, 200);
    window.addEventListener("hashchange", activateFromHash);
    return () => {
      window.clearTimeout(immediate);
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", activateFromHash);
    };
  }, []);

  const continueTab = () => {
    // Designs Continue still centers the next tab in the carousel (carousel-only scroll)
    selectTab((active + 1) % PLATFORM_TABS.length, true);
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
            <div className="mb-6 w-full lg:hidden relative">
              <button
                type="button"
                id="platform-dropdown-trigger"
                className="flex w-full cursor-pointer items-center justify-between rounded-[4px] border-2 border-gray-200 bg-white px-4 py-3 text-lg font-semibold text-[#413cc3] shadow-sm sm:text-xl"
                aria-expanded={dropdownOpen}
                aria-controls="platform-dropdown-menu"
                onClick={() => setDropdownOpen((o) => !o)}
              >
                <span id="platform-dropdown-label" className="truncate pr-3 text-left">{PLATFORM_TABS[active]}</span>
                <FaChevronDown
                  id="platform-dropdown-icon"
                  className={`text-base transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              <div
                id="platform-dropdown-menu"
                className={`${dropdownOpen ? "" : "hidden "}absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-[4px] shadow-xl overflow-hidden max-h-[50vh] overflow-y-auto`}
              >
                      {PLATFORM_TABS.map((label, index) => (
                        <button
                          key={label}
                          type="button"
                          className={`platform-dropdown-option w-full cursor-pointer border-b border-gray-100 px-4 py-3 text-left text-lg font-semibold leading-tight transition-colors last:border-b-0 sm:text-xl ${
                            index === active
                              ? "bg-[#5555f9] text-white hover:bg-[#5555f9]"
                              : "text-[#413cc3] hover:bg-[#f5f4ff]"
                          }`}
                          onClick={() => selectTab(index)}
                        >
                          {label}
                        </button>
                      ))}
</div>
            </div>
            {/* Desktop Tabs Carousel */}
            <div className="mb-6 relative items-center hidden lg:flex">
              <button
                type="button"
                id="platform-tabs-prev-btn"
                      onClick={() => scrollCarousel("left")}
                aria-label="Scroll tabs left"
                disabled={!canScrollLeft}
                className="platform-tabs-arrow absolute -left-10 z-10 hidden cursor-pointer items-center justify-center text-[#0D1B3E] hover:text-[#19D3C5] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-30 lg:flex"
              >
                <FaChevronLeft className="text-3xl" aria-hidden="true" />
              </button>
              <button
                type="button"
                id="platform-tabs-next-btn"
                      onClick={() => scrollCarousel("right")}
                aria-label="Scroll tabs right"
                disabled={!canScrollRight}
                className="platform-tabs-arrow absolute -right-10 z-10 hidden cursor-pointer items-center justify-center text-[#0D1B3E] hover:text-[#19D3C5] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-30 lg:flex"
              >
                <FaChevronRight className="text-3xl" aria-hidden="true" />
              </button>
              <div
                id="platform-tabs-carousel" ref={carouselRef}
                className="tabs-carousel overflow-x-auto w-full"
              >
                <div
                  className="flex flex-nowrap border-b-4 border-gray-200 text-sm font-normal uppercase tracking-wider w-max min-w-full gap-[60px] relative"
                >
                  <div
                    id="platform-tab-indicator"
                        ref={indicatorRef}
                        className="absolute bottom-[-4px] left-0 h-[4px] bg-teal transition-all duration-300 ease-in-out"
                  ></div>
                  {PLATFORM_TABS.map((label, index) => (
                          <button
                            key={label}
                            ref={(el) => {
                              tabRefs.current[index] = el;
                            }}
                            type="button"
                            className={`platform-nav-btn relative cursor-pointer whitespace-nowrap pb-3 text-left text-xl font-semibold leading-tight tracking-normal ${
                              index === active ? "is-active text-navy" : "text-navy"
                            }`}
                            onClick={() => selectTab(index)}
                          >
                            {label}
                          </button>
                        ))}
</div>
              </div>
            </div>

            {/* Tab Card */}
            <div
              id="platform-card"
              className="bg-white rounded-[4px] overflow-hidden shadow-sm"
            >
              {/* Content Panes */}
              <div
                id="platform-pane-0"
                  className={`platform-pane flex-col xl:flex-row xl:min-h-[240px] ${active === 0 ? "flex" : "hidden"}`}
              >
                <div
                  className="xl:w-1/2 bg-[#000F2B] flex items-center justify-center min-h-[240px]"
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
                  className={`platform-pane flex-col xl:flex-row xl:min-h-[240px] ${active === 1 ? "flex" : "hidden"}`}
              >
                <div
                  className="xl:w-1/2 bg-[#000F2B] flex items-center justify-center min-h-[240px]"
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
                  className={`platform-pane flex-col xl:flex-row xl:min-h-[240px] ${active === 2 ? "flex" : "hidden"}`}
              >
                <div
                  className="xl:w-1/2 bg-[#000F2B] flex items-center justify-center min-h-[240px]"
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
                  className={`platform-pane flex-col xl:flex-row xl:min-h-[240px] ${active === 3 ? "flex" : "hidden"}`}
              >
                <div
                  className="xl:w-1/2 bg-[#000F2B] flex items-center justify-center min-h-[240px]"
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
                  className={`platform-pane flex-col xl:flex-row xl:min-h-[240px] ${active === 4 ? "flex" : "hidden"}`}
              >
                <div
                  className="xl:w-1/2 bg-[#000F2B] flex items-center justify-center min-h-[240px]"
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
                  className={`platform-pane flex-col xl:flex-row xl:min-h-[240px] ${active === 5 ? "flex" : "hidden"}`}
              >
                <div
                  className="xl:w-1/2 bg-[#000F2B] flex items-center justify-center min-h-[240px]"
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
                  className={`platform-pane flex-col xl:flex-row xl:min-h-[240px] ${active === 6 ? "flex" : "hidden"}`}
              >
                <div
                  className="xl:w-1/2 bg-[#000F2B] flex items-center justify-center min-h-[240px]"
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
                  className={`platform-pane flex-col xl:flex-row xl:min-h-[240px] ${active === 7 ? "flex" : "hidden"}`}
              >
                <div
                  className="xl:w-1/2 bg-[#000F2B] flex items-center justify-center min-h-[240px]"
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
                  className={`platform-pane flex-col xl:flex-row xl:min-h-[240px] ${active === 8 ? "flex" : "hidden"}`}
              >
                <div
                  className="xl:w-1/2 bg-[#000F2B] flex items-center justify-center min-h-[240px]"
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
    </section>
  );
}
