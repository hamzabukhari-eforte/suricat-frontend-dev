"use client";

import { CtaBand } from "@/components/sections/CtaBand";
import { StickySubnav } from "@/components/layout/StickySubnav";
import { SolutionSectionPills } from "@/components/sections/solutions/SolutionSectionPills";
import { FaArrowRight, resolveFaIcon } from "@/components/ui/icons";
import type { SolutionPageData } from "@/lib/content/solutions";
import type { MaxWidth } from "@/lib/layout/measure";
import {
  DEFAULT_DESCRIPTION_MAX,
  DEFAULT_HERO_SUBTITLE_MAX,
  DEFAULT_SECTION_MAX,
  DEFAULT_TITLE_MAX,
} from "@/lib/layout/measure";
import { solutionNavLinks } from "@/lib/navigation";
import Link from "next/link";
import type { IconType } from "react-icons";

type SolutionPageContentProps = {
  data: SolutionPageData;
};

const DEFAULT_HERO_MEASURE: MaxWidth = "max-w-4xl";
const DEFAULT_HERO_TITLE: MaxWidth = "max-w-full";
const DEFAULT_BODY_MEASURE: MaxWidth = DEFAULT_TITLE_MAX;

function ChallengeCard({
  title,
  body,
  icon,
}: {
  title: string;
  body: string;
  icon: string;
}) {
  const Icon: IconType = resolveFaIcon(icon);
  return (
    <div className="rounded-[4px] border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[4px] border border-teal bg-teal/10 text-teal">
        <Icon className="text-lg" aria-hidden="true" />
      </div>
      <h4 className="mb-2 text-base font-bold text-navy">{title}</h4>
      <p className="text-sm leading-relaxed text-navy">{body}</p>
    </div>
  );
}

function HelpRow({
  title,
  body,
  icon,
}: {
  title: string;
  body: string;
  icon: string;
}) {
  const Icon: IconType = resolveFaIcon(icon);
  return (
    <div className="flex items-start gap-5 rounded-[4px] border border-white/10 bg-white/5 p-6 transition-colors hover:border-teal/50">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-teal/60 text-white">
        <Icon aria-hidden="true" />
      </div>
      <div>
        <h4 className="mb-1 font-bold text-white">{title}</h4>
        <p className="text-sm leading-relaxed text-gray-300">{body}</p>
      </div>
    </div>
  );
}

function OutcomeCard({
  index,
  label,
  title,
  body,
  icon,
}: {
  index: string;
  label: string;
  title: string;
  body: string;
  icon: string;
}) {
  const Icon: IconType = resolveFaIcon(icon);
  return (
    <div className="compliance-cost-card outcomes-card">
      <div className="compliance-cost-card-header outcomes-card-header">
        <div className="compliance-cost-card-icon outcomes-card-icon">
          <Icon className="relative z-[1] h-4 w-4" aria-hidden="true" />
        </div>
        <span className="compliance-cost-card-index outcomes-card-index" aria-hidden="true">
          {index}
        </span>
      </div>
      <p className="compliance-cost-card-label outcomes-card-label">{label}</p>
      <p className="compliance-cost-card-title outcomes-card-title">{title}</p>
      <p className="compliance-cost-card-body outcomes-card-body">{body}</p>
    </div>
  );
}

export function SolutionPageContent({ data }: SolutionPageContentProps) {
  const {
    heroTitle,
    heroTitleAccent,
    heroSubtitle,
    readinessNote,
    problem,
    solution,
    enables,
    measures = {},
  } = data;

  const heroMeasure = measures.hero ?? DEFAULT_HERO_MEASURE;
  const heroTitleMax = measures.heroTitle ?? DEFAULT_HERO_TITLE;
  const heroSubtitleMax = measures.heroSubtitle ?? DEFAULT_HERO_SUBTITLE_MAX;
  const titleMax = measures.title ?? DEFAULT_TITLE_MAX;
  const descriptionMax = measures.description ?? DEFAULT_BODY_MEASURE;
  const outcomesIntroMax = measures.outcomesIntro ?? DEFAULT_DESCRIPTION_MAX;
  const readinessNoteMax = measures.readinessNote ?? DEFAULT_DESCRIPTION_MAX;

  return (
    <>
      <StickySubnav
        links={solutionNavLinks}
        category="Solutions"
        navLabel="Solutions pages"
      />

      {/* Hero */}
      <section
        id="hero-section"
        className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden bg-navy py-12 text-white max-[374px]:min-h-0 max-[374px]:items-start max-[374px]:justify-start max-[374px]:overflow-visible max-[374px]:py-6 lg:min-h-[500px] lg:py-12"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)]"
          aria-hidden="true"
        />
        <div
          className={`relative z-10 mx-auto flex w-full ${heroMeasure} flex-col items-center justify-center px-4 text-center sm:px-6`}
        >
          <h1
            className={`animate-fade-up-2 mb-4 ${heroTitleMax} text-2xl font-bold tracking-tight !leading-[32px] max-[374px]:mb-3 max-[374px]:text-[1.375rem] max-[374px]:!leading-[1.35] sm:mb-6 sm:text-3xl sm:!leading-[44px] lg:text-[36px]`}
          >
            <span>{heroTitle}</span>
            <br className="hidden sm:block" />
            <span className="text-teal"> {heroTitleAccent}</span>
          </h1>
          <div className="animate-fade-up-2 mb-5 h-1 w-16 rounded-full bg-teal max-[374px]:mb-3 sm:mb-6" />
          <p
            className={`animate-fade-up-3 mx-auto mb-6 ${heroSubtitleMax} text-base font-normal !leading-[32px] text-white max-[374px]:mb-4 max-[374px]:text-sm max-[374px]:!leading-normal sm:mb-8 sm:text-lg lg:text-[22px]`}
          >
            {heroSubtitle}
          </p>
          <div className="animate-fade-up-3 flex w-full justify-center sm:w-auto">
            <Link
              href="/readiness"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full border-2 border-teal px-6 py-3 text-sm font-bold text-teal transition-all hover:bg-teal hover:text-navy sm:w-auto sm:px-8 sm:py-3.5"
            >
              Check Your Readiness
              <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <SolutionSectionPills />

      {/* The Challenge */}
      <section
        id="challenge"
        className="bg-[#f8f9fa] px-4 pb-6 pt-8 sm:px-6"
      >
        <div className={`mx-auto ${DEFAULT_SECTION_MAX}`}>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-teal">
                The Challenge
              </span>
              <h2
                className={`mb-4 ${titleMax} text-2xl font-bold leading-tight text-navy sm:text-3xl lg:text-[28px] lg:leading-[36px]`}
              >
                {problem.title}
              </h2>
              <div className="mb-6 h-1 w-12 rounded-full bg-teal" />
              <div
                className={`${descriptionMax} space-y-5 text-base leading-relaxed text-navy sm:text-lg lg:text-[20px] lg:leading-[28px]`}
              >
                {problem.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {problem.cards.map((card) => (
                <ChallengeCard
                  key={card.title}
                  title={card.title}
                  body={card.body}
                  icon={card.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How Suricat Helps */}
      <section
        id="how-suricat-helps"
        className="relative overflow-hidden bg-navy px-4 pb-3 pt-8 text-white sm:px-6"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:44px_44px]"
          aria-hidden="true"
        />
        <div className={`relative z-10 mx-auto ${DEFAULT_SECTION_MAX}`}>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-teal">
                How Suricat Helps
              </span>
              <h2
                className={`mb-4 ${titleMax} text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-[28px] lg:leading-[36px]`}
              >
                {solution.title}
              </h2>
              <div className="mb-6 h-1 w-12 rounded-full bg-teal" />
              <div
                className={`${descriptionMax} space-y-5 text-base leading-relaxed text-gray-200 sm:text-lg lg:text-[20px] lg:leading-[28px]`}
              >
                {solution.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {solution.cards.map((card) => (
                <HelpRow
                  key={card.title}
                  title={card.title}
                  body={card.body}
                  icon={card.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes — match Designs #outcomes structure exactly */}
      <section id="outcomes" className="bg-white px-4 py-8 sm:px-6">
        <div className={`mx-auto ${DEFAULT_SECTION_MAX}`}>
          <div className="mb-6 lg:pt-0">
            <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-teal">
              Outcomes
            </span>
            <h2
              className={`mb-4 ${titleMax} text-2xl font-bold leading-tight text-navy sm:text-3xl lg:text-[28px] lg:leading-[36px]`}
            >
              {enables.title}
            </h2>
            <p
              className={`${outcomesIntroMax} text-base leading-relaxed text-navy sm:text-lg lg:text-[20px] lg:leading-[28px]`}
            >
              {enables.intro}
            </p>
          </div>
          <div className="relative mt-4">
            <div className="compliance-cost-banner-bg relative z-10 rounded-[4px] p-6 text-white lg:p-8">
              <div
                id="outcomes-cards-grid"
                className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5"
              >
                {enables.outcomes.map((outcome, i) => (
                  <OutcomeCard
                    key={outcome.label}
                    index={String(i + 1).padStart(2, "0")}
                    label={outcome.label}
                    title={outcome.title}
                    body={outcome.body}
                    icon={outcome.icon}
                  />
                ))}
              </div>

              <div className="mt-10 flex flex-col items-center gap-4 lg:mt-8">
                <Link
                  href="/readiness"
                  className="group inline-flex items-center gap-2 rounded-full border-2 border-[#19D3C5] px-8 py-2.5 text-base font-bold text-[#19d3c5] transition-all hover:bg-[#19D3C5] hover:text-[#0D1B3E]"
                >
                  Check Your Readiness
                  <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <p className={`${readinessNoteMax} text-center text-sm text-white/80`}>
                  {readinessNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
