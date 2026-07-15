import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import { CtaBand } from "@/components/sections/CtaBand";
import { LifecycleReveal } from "@/components/sections/industries/LifecycleReveal";
import { StickySubnav } from "@/components/layout/StickySubnav";
import { SolutionSectionPills } from "@/components/sections/solutions/SolutionSectionPills";
import { industrySubnavLinks } from "@/lib/navigation";
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

const PILLS = [
  { id: "lifecycle-diagram-section", label: "The Documentation Lifecycle" },
  { id: "challenges-2", label: "Industries" },
  { id: "capabilities", label: "What Suricat Enables" },
  { id: "industry-expansion", label: "Explore Industry Expansion" },
];

const LIFECYCLE_STAGES: { label: string; Icon: IconType }[] = [
  { label: "Design Controls", Icon: FaCompassDrafting },
  { label: "Risk Management", Icon: FaShieldHalved },
  { label: "Verification & Validation", Icon: FaClipboardCheck },
  { label: "Manufacturing", Icon: FaIndustry },
  { label: "Complaint Handling", Icon: FaHeadset },
  { label: "Post-Market Surveillance", Icon: FaChartLine },
  { label: "CAPA", Icon: FaScrewdriverWrench },
  { label: "Inspection Readiness", Icon: FaMagnifyingGlassChart },
];

const ENABLES: { title: string; body: string; Icon: IconType }[] = [
  {
    Icon: FaFileLines,
    title: "Documentation Alignment",
    body: "Continuously evaluate relationships across compliance-critical documentation.",
  },
  {
    Icon: FaFlask,
    title: "Evidence Traceability",
    body: "Surface supporting evidence across connected documentation.",
  },
  {
    Icon: FaShieldHalved,
    title: "Change Impact Assessment",
    body: "Understand how documentation changes affect downstream compliance.",
  },
  {
    Icon: FaLayerGroup,
    title: "Documentation Confidence",
    body: "Provide greater visibility into documentation quality before inspections.",
  },
  {
    Icon: FaClipboardList,
    title: "Inspection Readiness",
    body: "Maintain continuous readiness instead of preparing immediately before inspections.",
  },
  {
    Icon: FaChartColumn,
    title: "Inspection-Defensible Findings",
    body: "Produce explainable findings supported by traceable evidence.",
  },
];

export function MedicalDevicesContent() {
  return (
    <>
      <StickySubnav
        links={industrySubnavLinks}
        category="Industry"
        navLabel="Industry pages"
      />
      {/* Hero */}
      <section
        id="overview"
        className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden bg-navy py-12 text-white lg:min-h-[500px] lg:py-12"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)]"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-4 text-center sm:px-6">
          <h1 className="mb-4 max-w-5xl text-2xl font-bold tracking-tight !leading-[32px] sm:mb-6 sm:text-3xl sm:!leading-[44px] lg:text-[36px]">
            Where Compliance <span className="text-teal">Intelligence Begins.</span>
          </h1>
          <div className="mb-5 h-1 w-16 rounded-full bg-teal sm:mb-6" />
          <p className="mx-auto mb-6 max-w-5xl text-base font-normal !leading-[32px] text-white sm:mb-8 sm:text-lg lg:text-[22px]">
            Medical device manufacturers operate within one of the world&apos;s
            most demanding regulatory environments, where documentation quality
            directly influences product quality, inspection readiness, and
            patient safety. Suricat was first developed for this environment
            because maintaining alignment across compliance-critical
            documentation becomes increasingly difficult as products,
            regulations, and organizations evolve.
          </p>
          <div className="flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
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

      <SolutionSectionPills pills={PILLS} />

      {/* Documentation Lifecycle vs Compliance Intelligence */}
      <section
        id="lifecycle-diagram-section"
        className="bg-[#f8f9fa] px-4 pb-3 pt-8 sm:px-6"
      >
        <LifecycleReveal />
        <div className="mx-auto max-w-7xl">
          <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-teal">
            The Documentation Lifecycle
          </span>
          <h2 className="mb-4 max-w-3xl text-2xl font-bold leading-tight text-navy sm:text-3xl lg:text-[28px] lg:leading-[36px]">
            Alignment Across Every Stage Of The Product Lifecycle
          </h2>
          <div className="mb-6 h-1 w-12 rounded-full bg-teal" />

          <div className="lifecycle-diagram-card mx-auto flex max-w-6xl flex-col overflow-hidden rounded-[4px] border border-gray-200 bg-white shadow-[0_8px_30px_rgba(13,27,62,0.06)] lg:flex-row">
            {/* Left: lifecycle timeline */}
            <div className="relative flex w-full flex-col justify-center p-6 lg:w-[58%] lg:p-7">
              <div className="mb-5 flex items-center justify-between gap-4">
                <h3 className="text-base font-bold text-navy">Lifecycle Stages</h3>
              </div>
              <div className="relative pl-[11px]">
                <div className="lifecycle-timeline-track" aria-hidden="true">
                  <div className="lifecycle-timeline-line-bg" />
                  <div className="lifecycle-timeline-line-progress" />
                </div>
                <ul className="relative z-10 space-y-2 text-sm font-medium text-navy">
                  {LIFECYCLE_STAGES.map(({ label, Icon }) => (
                    <li
                      key={label}
                      className="lifecycle-timeline-item -mx-3 flex items-center gap-4 rounded-[4px] px-3 py-1.5"
                    >
                      <div className="lifecycle-timeline-dot relative z-10 h-[10px] w-[10px] flex-shrink-0 rounded-full bg-teal outline outline-[4px] outline-white" />
                      <div className="lifecycle-timeline-icon flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[10px] border border-teal/35 bg-teal/10 text-teal">
                        <Icon className="text-sm" aria-hidden="true" />
                      </div>
                      <span className="lifecycle-timeline-label text-[15px] leading-snug">
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: compliance intelligence panel */}
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
                  Compliance Intelligence Layer
                </h3>
                <p className="max-w-[300px] text-sm leading-relaxed text-white/80 sm:text-base">
                  Continuously evaluates documentation alignment across every
                  stage of the product lifecycle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges — two columns */}
      <section id="challenges-2" className="bg-white px-4 pb-6 pt-8 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-2 lg:gap-20">
            <div>
              <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-teal">
                Why Medical Devices
              </span>
              <h2 className="mb-4 max-w-3xl text-2xl font-bold leading-tight text-navy sm:text-3xl lg:text-[28px] lg:leading-[36px]">
                Built For One Of The World&apos;s Most Demanding Regulatory
                Environments
              </h2>
              <p className="mb-5 text-base leading-relaxed text-navy sm:text-lg lg:text-[20px] lg:leading-[28px]">
                Medical device manufacturers continuously manage Design History
                Files, Risk Management documentation, verification and
                validation records, manufacturing evidence, quality records,
                CAPA, complaint handling, labeling, training, and post-market
                surveillance.
              </p>
              <p className="mb-5 text-base leading-relaxed text-navy sm:text-lg lg:text-[20px] lg:leading-[28px]">
                As documentation evolves across multiple systems and teams,
                maintaining alignment becomes increasingly difficult.
              </p>
              <div className="my-4 rounded-r-[4px] border-l-4 border-teal bg-gray-50 px-6 py-4">
                <p className="mb-2 text-base text-navy">
                  The challenge is rarely missing documentation.
                </p>
                <p className="text-base text-navy">
                  The challenge is preserving relationships between documentation
                  over time.
                </p>
              </div>
              <p className="text-base font-bold text-teal">
                That is where the Compliance Intelligence Layer begins.
              </p>
            </div>
            <div>
              <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-teal">
                Why This Industry First
              </span>
              <h2 className="mb-4 max-w-3xl text-2xl font-bold leading-tight text-navy sm:text-3xl lg:text-[28px] lg:leading-[36px]">
                A Foundation For Regulated Industries
              </h2>
              <p className="mb-5 text-base leading-relaxed text-navy sm:text-lg lg:text-[20px] lg:leading-[28px]">
                Medical devices combine complex engineering, rigorous quality
                systems, and continuous regulatory oversight within a single
                operating environment.
              </p>
              <p className="mb-5 text-base leading-relaxed text-navy sm:text-lg lg:text-[20px] lg:leading-[28px]">
                Organizations must demonstrate traceable evidence across the
                entire product lifecycle while preparing for inspections under
                FDA QMSR and ISO 13485.
              </p>
              <div className="my-4 rounded-r-[4px] border-l-4 border-teal bg-gray-50 px-6 py-4">
                <p className="text-base text-navy">
                  If the Compliance Intelligence Layer can earn trust here, it
                  establishes a strong foundation for expansion across other
                  regulated industries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section
        id="capabilities"
        className="w-full scroll-mt-24 bg-navy pb-3 pt-8"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-teal">
                Capabilities
              </span>
              <h2 className="max-w-3xl text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-[28px] lg:leading-[36px]">
                What Suricat Enables
              </h2>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ENABLES.map(({ title, body, Icon }) => (
              <article
                key={title}
                className="flex flex-col rounded-[4px] border border-white/10 bg-[#111f45] p-5 transition-all hover:scale-[1.02] hover:border-teal"
              >
                <div className="mb-3.5">
                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-teal bg-[color-mix(in_srgb,#19D3C5_12%,#0D1B3E)] text-base text-teal">
                    <Icon className="relative z-10" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="mb-1 text-xl font-bold text-white">{title}</h3>
                <p className="text-base leading-relaxed text-white">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Industry expansion banner */}
      <section id="industry-expansion" className="bg-white px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 lg:flex-row">
          <div className="max-w-2xl flex-1">
            <h2 className="mb-4 max-w-3xl text-2xl font-bold leading-tight text-navy sm:text-3xl lg:text-[28px] lg:leading-[36px]">
              Medical Devices Are <span className="text-teal">Where We Begin.</span>
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-navy sm:text-lg lg:text-[20px] lg:leading-[28px]">
              The Compliance Intelligence Layer was first developed for one of
              the world&apos;s most demanding documentation environments. Next,
              discover how the same approach extends across additional regulated
              industries.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              href="/industries/expansion"
              className="suricat-teal-btn group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full px-6 py-3 text-sm font-bold transition-all sm:px-8 sm:py-3.5"
            >
              Explore Industry Expansion
              <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
