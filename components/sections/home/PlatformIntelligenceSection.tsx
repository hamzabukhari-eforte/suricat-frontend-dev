"use client";

import { FaArrowRight } from "@/components/ui/icons";
import { HomeSectionTabNav } from "@/components/sections/home/HomeSectionTabNav";
import {
  HOME_HASH_EVENT,
  parsePlatformTabIndex,
} from "@/components/layout/SmoothHashScroll";
import { animatedTabPaneClass } from "@/lib/animatedTabPane";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

export function PlatformIntelligenceSection() {
  const t = useTranslations("home.platform");
  const PLATFORM_TABS = useMemo(
    () => [
      t("tabs.intelligenceLayer"),
      t("tabs.readOnly"),
      t("tabs.noRipReplace"),
      t("tabs.humanAccountability"),
      t("tabs.deployment"),
      t("tabs.regulatoryOntology"),
      t("tabs.canonicalSchema"),
      t("tabs.qvr"),
      t("tabs.boundedReasoning"),
    ],
    [t],
  );
  const panes = useMemo(
    () => ({
      intelligenceLayer: {
        title: t("panes.intelligenceLayer.title"),
        body: t("panes.intelligenceLayer.body"),
        imageAlt: t("panes.intelligenceLayer.imageAlt"),
      },
      readOnly: {
        title: t("panes.readOnly.title"),
        body: t("panes.readOnly.body"),
        imageAlt: t("panes.readOnly.imageAlt"),
      },
      noRipReplace: {
        title: t("panes.noRipReplace.title"),
        body: t("panes.noRipReplace.body"),
        imageAlt: t("panes.noRipReplace.imageAlt"),
      },
      humanAccountability: {
        title: t("panes.humanAccountability.title"),
        body: t("panes.humanAccountability.body"),
        imageAlt: t("panes.humanAccountability.imageAlt"),
      },
      deployment: {
        title: t("panes.deployment.title"),
        body: t("panes.deployment.body"),
        imageAlt: t("panes.deployment.imageAlt"),
      },
      regulatoryOntology: {
        title: t("panes.regulatoryOntology.title"),
        body: t("panes.regulatoryOntology.body"),
        imageAlt: t("panes.regulatoryOntology.imageAlt"),
      },
      canonicalSchema: {
        title: t("panes.canonicalSchema.title"),
        body: t("panes.canonicalSchema.body"),
        imageAlt: t("panes.canonicalSchema.imageAlt"),
      },
      qvr: {
        title: t("panes.qvr.title"),
        body: t("panes.qvr.body"),
        imageAlt: t("panes.qvr.imageAlt"),
      },
      boundedReasoning: {
        title: t("panes.boundedReasoning.title"),
        body: t("panes.boundedReasoning.body"),
        imageAlt: t("panes.boundedReasoning.imageAlt"),
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
  }, [PLATFORM_TABS.length]);

  const continueTab = () => {
    selectTab((active + 1) % PLATFORM_TABS.length);
  };

  return (
    <section
      id="platform"
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
            {t("sectionTitle")}
          </span>
          <h2
            className="mb-4 text-2xl font-semibold leading-tight text-navy sm:mb-6 sm:text-3xl lg:text-[32px] lg:leading-[36px]"
          >
            {t("headline")}
          </h2>
          <p
            id="i7axkf"
            className="mb-12 w-full max-w-5xl text-base leading-relaxed text-navy sm:text-lg lg:text-[20px] lg:leading-[28px]"
          >
            {t("intro")}
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
                    alt={panes.intelligenceLayer.imageAlt}
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
                    {panes.intelligenceLayer.title}
                  </h3>
                  <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                  <p className="text-navy mb-6 leading-relaxed">
                    {panes.intelligenceLayer.body}
                  </p>
                  <button type="button" onClick={continueTab} className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-bold transition-all group">
                      {t("continue")}
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
                    alt={panes.readOnly.imageAlt}
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
                    {panes.readOnly.title}
                  </h3>
                  <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                  <p className="text-navy mb-6 leading-relaxed">
                    {panes.readOnly.body}
                  </p>
                  <button type="button" onClick={continueTab} className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-bold transition-all group">
                      {t("continue")}
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
                    alt={panes.noRipReplace.imageAlt}
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
                    {panes.noRipReplace.title}
                  </h3>
                  <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                  <p className="text-navy mb-6 leading-relaxed">
                    {panes.noRipReplace.body}
                  </p>
                  <button type="button" onClick={continueTab} className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-bold transition-all group">
                      {t("continue")}
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
                    alt={panes.humanAccountability.imageAlt}
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
                    {panes.humanAccountability.title}
                  </h3>
                  <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                  <p className="text-navy mb-6 leading-relaxed">
                    {panes.humanAccountability.body}
                  </p>
                  <button type="button" onClick={continueTab} className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-bold transition-all group">
                      {t("continue")}
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
                    alt={panes.deployment.imageAlt}
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
                    {panes.deployment.title}
                  </h3>
                  <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                  <p className="text-navy mb-6 leading-relaxed">
                    {panes.deployment.body}
                  </p>
                  <button type="button" onClick={continueTab} className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-bold transition-all group">
                      {t("continue")}
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
                    alt={panes.regulatoryOntology.imageAlt}
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
                    {panes.regulatoryOntology.title}
                  </h3>
                  <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                  <p className="text-navy mb-6 leading-relaxed">
                    {panes.regulatoryOntology.body}
                  </p>
                  <button type="button" onClick={continueTab} className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-bold transition-all group">
                      {t("continue")}
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
                    alt={panes.canonicalSchema.imageAlt}
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
                    {panes.canonicalSchema.title}
                  </h3>
                  <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                  <p className="text-navy mb-6 leading-relaxed">
                    {panes.canonicalSchema.body}
                  </p>
                  <button type="button" onClick={continueTab} className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-bold transition-all group">
                      {t("continue")}
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
                    alt={panes.qvr.imageAlt}
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
                    {panes.qvr.title}
                  </h3>
                  <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                  <p className="text-navy mb-6 leading-relaxed">
                    {panes.qvr.body}
                  </p>
                  <button type="button" onClick={continueTab} className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-bold transition-all group">
                      {t("continue")}
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
                    alt={panes.boundedReasoning.imageAlt}
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
                    {panes.boundedReasoning.title}
                  </h3>
                  <div className="w-12 h-1 bg-teal rounded-full mb-6"></div>
                  <p className="text-navy mb-6 leading-relaxed">
                    {panes.boundedReasoning.body}
                  </p>
                  <Link
                    href="/readiness"
                    className="suricat-teal-btn mt-2 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full px-6 py-2.5 font-bold transition-all group"
                  >
                    {t("checkReadiness")}
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
