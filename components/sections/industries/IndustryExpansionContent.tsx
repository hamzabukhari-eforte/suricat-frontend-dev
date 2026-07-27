"use client";

import Link from "next/link";
import type { IconType } from "react-icons";
import { CtaBand } from "@/components/sections/CtaBand";
import { StickySubnav } from "@/components/layout/StickySubnav";
import { SolutionSectionPills } from "@/components/sections/solutions/SolutionSectionPills";
import { useIndustrySubnavLinks } from "@/lib/i18n/use-nav-links";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import {
  FaArrowRight,
  FaDna,
  FaHeartPulse,
  FaMicroscope,
  FaPills,
  FaPlane,
  FaUserDoctor,
  MdOutlineAccountBalance,
  MdOutlineBolt,
} from "@/components/ui/icons";

type BadgeKey = "planned" | "future" | "available";

function ExtensionCardItem({
  title,
  body,
  Icon,
  badge,
}: {
  title: string;
  body: string;
  Icon: IconType;
  badge: string;
}) {
  return (
    <div className="industry-expansion-card flex flex-col gap-4 rounded-[4px] border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[12px] border border-teal/25 bg-teal/12 text-[1.125rem] text-teal">
          <Icon aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-xl font-bold leading-snug text-navy">{title}</h3>
          <span className="mt-1 inline-block rounded-full border border-teal/30 bg-teal/12 px-2.5 py-0.5 text-xs font-semibold text-teal">
            {badge}
          </span>
        </div>
      </div>
      <p className="text-base leading-relaxed text-navy">{body}</p>
    </div>
  );
}

export function IndustryExpansionContent() {
  const t = useTranslations();
  const te = useTranslations("industries.expansion");
  const industrySubnavLinks = useIndustrySubnavLinks();

  const pills = [
    { id: "available-today", label: te("pills.available") },
    { id: "where-it-extends", label: te("pills.extends") },
    { id: "future-industries", label: te("pills.future") },
    { id: "structural-challenge", label: te("pills.structural") },
  ];

  const current: { key: string; Icon: IconType; badge: BadgeKey }[] = [
    { key: "biotech", Icon: FaDna, badge: "planned" },
    { key: "biopharma", Icon: FaPills, badge: "planned" },
    { key: "diagnostics", Icon: FaMicroscope, badge: "planned" },
    { key: "clinical", Icon: FaUserDoctor, badge: "planned" },
  ];

  const future: { key: string; Icon: IconType; badge: BadgeKey }[] = [
    { key: "aerospace", Icon: FaPlane, badge: "future" },
    { key: "energy", Icon: MdOutlineBolt, badge: "future" },
    { key: "finance", Icon: MdOutlineAccountBalance, badge: "future" },
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
            {te("heroTitle1")}
            <br />
            <span className="text-teal">{te("heroTitleAccent")}</span>
          </h1>
          <div className="mb-5 h-1 w-16 rounded-full bg-teal sm:mb-6" />
          <p className="mx-auto max-w-5xl text-base font-normal !leading-[32px] text-white sm:text-lg lg:text-[22px]">
            {te("heroSubtitle")}
          </p>
        </div>
      </section>

      <SolutionSectionPills pills={pills} />

      <section className="relative overflow-hidden bg-gray-50 px-4 py-8 text-navy sm:px-6">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div id="available-today" className="scroll-mt-40">
            <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-teal">
              {te("availableEyebrow")}
            </span>
            <h2 className="mb-4 max-w-3xl text-2xl font-bold leading-tight text-navy sm:text-3xl lg:text-[28px] lg:leading-[36px]">
              {te("availableTitle")}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <ExtensionCardItem
                title={te("mdCard.title")}
                badge={te("badges.available")}
                Icon={FaHeartPulse}
                body={te("mdCard.body")}
              />
            </div>
          </div>

          <div id="where-it-extends" className="mt-10 scroll-mt-40">
            <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-teal">
              {te("extendsEyebrow")}
            </span>
            <h2 className="mb-4 max-w-3xl text-2xl font-bold leading-tight text-navy sm:text-3xl lg:text-[28px] lg:leading-[36px]">
              {te("extendsTitle")}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {current.map(({ key, Icon, badge }) => (
                <ExtensionCardItem
                  key={key}
                  title={te(`current.${key}.title`)}
                  body={te(`current.${key}.body`)}
                  Icon={Icon}
                  badge={te(`badges.${badge}`)}
                />
              ))}
            </div>
          </div>

          <div id="future-industries" className="mt-10 scroll-mt-40">
            <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-teal">
              {te("futureEyebrow")}
            </span>
            <h2 className="mb-4 max-w-3xl text-2xl font-bold leading-tight text-navy sm:text-3xl lg:text-[28px] lg:leading-[36px]">
              {te("futureTitle")}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {future.map(({ key, Icon, badge }) => (
                <ExtensionCardItem
                  key={key}
                  title={te(`futureCards.${key}.title`)}
                  body={te(`futureCards.${key}.body`)}
                  Icon={Icon}
                  badge={te(`badges.${badge}`)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="structural-challenge" className="bg-white px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 lg:flex-row">
          <div className="max-w-2xl flex-1">
            <h2 className="mb-4 max-w-3xl text-2xl font-bold leading-tight text-navy sm:text-3xl lg:text-[28px] lg:leading-[36px]">
              {te("structuralTitleBefore")}{" "}
              <span className="text-teal">{te("structuralTitleAccent")}</span>
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-navy sm:text-lg lg:text-[20px] lg:leading-[28px]">
              {te("structuralBody")}
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              href="/#platform"
              className="suricat-teal-btn group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full px-6 py-3 text-sm font-bold transition-all sm:px-8 sm:py-3.5"
            >
              {te("structuralCta")}
              <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
