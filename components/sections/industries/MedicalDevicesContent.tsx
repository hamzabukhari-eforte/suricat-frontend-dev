"use client";

import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import { CtaBand } from "@/components/sections/CtaBand";
import { LifecycleReveal } from "@/components/sections/industries/LifecycleReveal";
import { StickySubnav } from "@/components/layout/StickySubnav";
import { SolutionSectionPills } from "@/components/sections/solutions/SolutionSectionPills";
import { useIndustrySubnavLinks } from "@/lib/i18n/use-nav-links";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import {
  FaArrowRight,
  FaChartColumn,
  FaChartLine,
  FaClipboardCheck,
  FaClipboardList,
  FaCompassDrafting,
  FaFileLines,
  FaFlask,
  FaHeadset,
  FaIndustry,
  FaLayerGroup,
  FaMagnifyingGlassChart,
  FaScrewdriverWrench,
  FaShieldHalved,
} from "@/components/ui/icons";

const STAGE_KEYS: { key: string; Icon: IconType }[] = [
  { key: "design", Icon: FaCompassDrafting },
  { key: "risk", Icon: FaShieldHalved },
  { key: "vv", Icon: FaClipboardCheck },
  { key: "mfg", Icon: FaIndustry },
  { key: "complaint", Icon: FaHeadset },
  { key: "pms", Icon: FaChartLine },
  { key: "capa", Icon: FaScrewdriverWrench },
  { key: "inspection", Icon: FaMagnifyingGlassChart },
];

const ENABLE_KEYS: { key: string; Icon: IconType }[] = [
  { key: "alignment", Icon: FaFileLines },
  { key: "traceability", Icon: FaFlask },
  { key: "change", Icon: FaShieldHalved },
  { key: "confidence", Icon: FaLayerGroup },
  { key: "readiness", Icon: FaClipboardList },
  { key: "findings", Icon: FaChartColumn },
];

export function MedicalDevicesContent() {
  const t = useTranslations();
  const tm = useTranslations("industries.medicalDevices");
  const industrySubnavLinks = useIndustrySubnavLinks();

  const pills = [
    { id: "lifecycle-diagram-section", label: tm("pills.lifecycle") },
    { id: "challenges-2", label: tm("pills.industries") },
    { id: "capabilities", label: tm("pills.enables") },
    { id: "industry-expansion", label: tm("pills.expansion") },
  ];

  return (
    <>
      <StickySubnav
        links={industrySubnavLinks}
        category={t("nav.menus.industry.label")}
        navLabel={t("nav.menus.industry.label")}
      />
      <section
        id="overview"
        className="relative flex min-h-0 w-full items-center justify-center overflow-hidden bg-navy py-8 text-white max-lg:items-start max-lg:justify-start max-lg:overflow-visible md:py-10 lg:min-h-[500px] lg:py-12"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)]"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-4 text-center sm:px-6">
          <h1 className="mb-4 max-w-5xl text-2xl font-bold tracking-tight !leading-[32px] sm:mb-6 sm:text-3xl sm:!leading-[44px] lg:text-[36px]">
            {tm("heroTitleBefore")}{" "}
            <span className="text-teal">{tm("heroTitleAccent")}</span>
          </h1>
          <div className="mb-5 h-1 w-16 rounded-full bg-teal sm:mb-6" />
          <p className="mx-auto mb-6 max-w-5xl text-base font-normal !leading-[32px] text-white sm:mb-8 sm:text-lg lg:text-[22px]">
            {tm("heroSubtitle")}
          </p>
          <div className="flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
            <Link
              href="/readiness"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full border-2 border-teal px-6 py-3 text-sm font-bold text-teal transition-all hover:bg-teal hover:text-navy sm:w-auto sm:px-8 sm:py-3.5"
            >
              {tm("checkReadiness")}
              <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <SolutionSectionPills pills={pills} />

      <section
        id="lifecycle-diagram-section"
        className="bg-[#f8f9fa] px-4 pb-3 pt-8 sm:px-6"
      >
        <LifecycleReveal />
        <div className="mx-auto max-w-7xl">
          <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-teal">
            {tm("lifecycleEyebrow")}
          </span>
          <h2 className="mb-4 max-w-3xl text-2xl font-bold leading-tight text-navy sm:text-3xl lg:text-[28px] lg:leading-[36px]">
            {tm("lifecycleTitle")}
          </h2>
          <div className="mb-6 h-1 w-12 rounded-full bg-teal" />

          <div className="lifecycle-diagram-card mx-auto flex max-w-6xl flex-col overflow-hidden rounded-[4px] border border-gray-200 bg-white shadow-[0_8px_30px_rgba(13,27,62,0.06)] lg:flex-row">
            <div className="relative flex w-full flex-col justify-center p-6 lg:w-[58%] lg:p-7">
              <div className="mb-5 flex items-center justify-between gap-4">
                <h3 className="text-base font-bold text-navy">
                  {tm("lifecycleStagesLabel")}
                </h3>
              </div>
              <div className="relative pl-[11px]">
                <div className="lifecycle-timeline-track" aria-hidden="true">
                  <div className="lifecycle-timeline-line-bg" />
                  <div className="lifecycle-timeline-line-progress" />
                </div>
                <ul className="relative z-10 space-y-2 text-sm font-medium text-navy">
                  {STAGE_KEYS.map(({ key, Icon }) => (
                    <li
                      key={key}
                      className="lifecycle-timeline-item -mx-3 flex items-center gap-4 rounded-[4px] px-3 py-1.5"
                    >
                      <div className="lifecycle-timeline-dot relative z-10 h-[10px] w-[10px] flex-shrink-0 rounded-full bg-teal outline outline-[4px] outline-white" />
                      <div className="lifecycle-timeline-icon flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[10px] border border-teal/35 bg-teal/10 text-teal">
                        <Icon className="text-sm" aria-hidden="true" />
                      </div>
                      <span className="lifecycle-timeline-label text-[15px] leading-snug">
                        {tm(`stages.${key}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex w-full items-center bg-gradient-to-br from-[#0D1B3E] via-[#0f2249] to-[#111f45] p-6 lg:w-[42%] lg:p-7">
              <div className="lifecycle-intelligence-panel flex w-full flex-col items-center text-center">
                <div className="lifecycle-logo-wrap mb-5 flex h-[92px] w-[92px] items-center justify-center rounded-full border border-teal/35 bg-teal/10">
                  <Image
                    src="/assets/images/Suricat-logo-light.svg"
                    alt="Suricat"
                    width={120}
                    height={122}
                    className="h-auto w-[72px]"
                    style={{ height: "auto" }}
                  />
                </div>
                <h3 className="mb-2.5 text-lg font-bold text-white sm:text-xl">
                  {tm("layerTitle")}
                </h3>
                <p className="max-w-[300px] text-sm leading-relaxed text-white/80 sm:text-base">
                  {tm("layerBody")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="challenges-2" className="bg-white px-4 pb-6 pt-8 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-2 lg:gap-20">
            <div>
              <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-teal">
                {tm("whyMdEyebrow")}
              </span>
              <h2 className="mb-4 max-w-3xl text-2xl font-bold leading-tight text-navy sm:text-3xl lg:text-[28px] lg:leading-[36px]">
                {tm("whyMdTitle")}
              </h2>
              <p className="mb-5 text-base leading-relaxed text-navy sm:text-lg lg:text-[20px] lg:leading-[28px]">
                {tm("whyMdP1")}
              </p>
              <p className="mb-5 text-base leading-relaxed text-navy sm:text-lg lg:text-[20px] lg:leading-[28px]">
                {tm("whyMdP2")}
              </p>
              <div className="my-4 rounded-r-[4px] border-l-4 border-teal bg-gray-50 px-6 py-4">
                <p className="mb-2 text-base text-navy">{tm("whyMdCallout1")}</p>
                <p className="text-base text-navy">{tm("whyMdCallout2")}</p>
              </div>
              <p className="text-base font-bold text-teal">{tm("whyMdClose")}</p>
            </div>
            <div>
              <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-teal">
                {tm("whyFirstEyebrow")}
              </span>
              <h2 className="mb-4 max-w-3xl text-2xl font-bold leading-tight text-navy sm:text-3xl lg:text-[28px] lg:leading-[36px]">
                {tm("whyFirstTitle")}
              </h2>
              <p className="mb-5 text-base leading-relaxed text-navy sm:text-lg lg:text-[20px] lg:leading-[28px]">
                {tm("whyFirstP1")}
              </p>
              <p className="mb-5 text-base leading-relaxed text-navy sm:text-lg lg:text-[20px] lg:leading-[28px]">
                {tm("whyFirstP2")}
              </p>
              <div className="my-4 rounded-r-[4px] border-l-4 border-teal bg-gray-50 px-6 py-4">
                <p className="text-base text-navy">{tm("whyFirstCallout")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="capabilities"
        className="w-full scroll-mt-24 bg-navy pb-3 pt-8"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-teal">
                {tm("capabilitiesEyebrow")}
              </span>
              <h2 className="max-w-3xl text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-[28px] lg:leading-[36px]">
                {tm("capabilitiesTitle")}
              </h2>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ENABLE_KEYS.map(({ key, Icon }) => (
              <article
                key={key}
                className="flex flex-col rounded-[4px] border border-white/10 bg-[#111f45] p-5 transition-all hover:scale-[1.02] hover:border-teal"
              >
                <div className="mb-3.5">
                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-teal bg-[color-mix(in_srgb,#19D3C5_12%,#0D1B3E)] text-base text-teal">
                    <Icon className="relative z-10" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="mb-1 text-xl font-bold text-white">
                  {tm(`enables.${key}.title`)}
                </h3>
                <p className="text-base leading-relaxed text-white">
                  {tm(`enables.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="industry-expansion" className="bg-white px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 lg:flex-row">
          <div className="max-w-2xl flex-1">
            <h2 className="mb-4 max-w-3xl text-2xl font-bold leading-tight text-navy sm:text-3xl lg:text-[28px] lg:leading-[36px]">
              {tm("bannerTitleBefore")}{" "}
              <span className="text-teal">{tm("bannerTitleAccent")}</span>
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-navy sm:text-lg lg:text-[20px] lg:leading-[28px]">
              {tm("bannerBody")}
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              href="/industries/expansion"
              className="suricat-teal-btn group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full px-6 py-3 text-sm font-bold transition-all sm:px-8 sm:py-3.5"
            >
              {tm("bannerCta")}
              <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
