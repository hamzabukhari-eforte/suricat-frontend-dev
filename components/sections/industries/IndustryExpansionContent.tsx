import Link from "next/link";
import type { IconType } from "react-icons";
import { CtaBand } from "@/components/sections/CtaBand";
import { StickySubnav } from "@/components/layout/StickySubnav";
import { SolutionSectionPills } from "@/components/sections/solutions/SolutionSectionPills";
import { industrySubnavLinks } from "@/lib/navigation";
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

const PILLS = [
  { id: "available-today", label: "Available Today" },
  { id: "where-it-extends", label: "Where It Can Extend" },
  { id: "future-industries", label: "Future Extension" },
  { id: "structural-challenge", label: "One Structural Challenge" },
];

type ExtensionCard = {
  title: string;
  body: string;
  Icon: IconType;
  badge: "Planned" | "Future" | "Available";
};

const CURRENT_EXTENSIONS: ExtensionCard[] = [
  {
    title: "Biotechnology",
    body: "Scientific research evolves continuously. Experimental protocols, laboratory documentation, and supporting evidence require continuous alignment throughout regulated development.",
    Icon: FaDna,
    badge: "Planned",
  },
  {
    title: "Biopharma",
    body: "Manufacturing validation, batch records, process deviations, and quality documentation require continuous traceability across regulated production.",
    Icon: FaPills,
    badge: "Planned",
  },
  {
    title: "Diagnostics & IVD",
    body: "Analytical validation, clinical performance studies, labeling, and regulatory documentation must remain aligned throughout the product lifecycle.",
    Icon: FaMicroscope,
    badge: "Planned",
  },
  {
    title: "Clinical Research",
    body: "Study protocols, investigator documentation, patient records, and regulatory evidence require continuous alignment throughout the clinical trial lifecycle.",
    Icon: FaUserDoctor,
    badge: "Planned",
  },
];

const FUTURE_EXTENSIONS: ExtensionCard[] = [
  {
    title: "Aerospace & Defense",
    body: "Engineering changes, certification records, configuration management, and safety documentation must remain aligned across complex development programs.",
    Icon: FaPlane,
    badge: "Future",
  },
  {
    title: "Energy & Utilities",
    body: "Operational procedures, asset documentation, regulatory inspections, and safety records must remain aligned across critical infrastructure.",
    Icon: MdOutlineBolt,
    badge: "Future",
  },
  {
    title: "Financial Services",
    body: "Policies, internal controls, audit evidence, risk documentation, and regulatory obligations must remain aligned across governance programs.",
    Icon: MdOutlineAccountBalance,
    badge: "Future",
  },
];

function ExtensionCardItem({ title, body, Icon, badge }: ExtensionCard) {
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
        className="relative flex min-h-0 w-full items-center justify-center overflow-hidden bg-navy py-8 text-white max-lg:items-start max-lg:justify-start max-lg:overflow-visible md:py-10 lg:min-h-[500px] lg:py-12"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)]"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-4 text-center sm:px-6">
          <h1 className="mb-4 max-w-5xl text-2xl font-bold tracking-tight !leading-[32px] sm:mb-6 sm:text-3xl sm:!leading-[44px] lg:text-[36px]">
            The Industry Changes.
            <br />
            <span className="text-teal">
              The Documentation Challenge Does Not.
            </span>
          </h1>
          <div className="mb-5 h-1 w-16 rounded-full bg-teal sm:mb-6" />
          <p className="mx-auto max-w-5xl text-base font-normal !leading-[32px] text-white sm:text-lg lg:text-[22px]">
            Every regulated industry operates within its own regulatory
            framework, terminology, documentation, and operating processes. The
            structural challenge, however, remains the same. Documentation
            evolves. Relationships weaken. Evidence becomes disconnected. The
            Compliance Intelligence Layer was designed to continuously evaluate
            those relationships regardless of industry.
          </p>
        </div>
      </section>

      <SolutionSectionPills pills={PILLS} />

      {/* Available today + where it can extend + future */}
      <section className="relative overflow-hidden bg-gray-50 px-4 py-8 text-navy sm:px-6">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div id="available-today" className="scroll-mt-40">
            <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-teal">
              Available Today
            </span>
            <h2 className="mb-4 max-w-3xl text-2xl font-bold leading-tight text-navy sm:text-3xl lg:text-[28px] lg:leading-[36px]">
              Medical Devices Are Where We Begin
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <ExtensionCardItem
                title="Medical Devices"
                badge="Available"
                Icon={FaHeartPulse}
                body="The Compliance Intelligence Layer was first developed for one of the world's most demanding documentation environments—medical devices. Built to simplify complex regulatory documentation, it provides the foundation for compliant, traceable, and scalable processes. Explore how this proven approach can extend across additional regulated industries."
              />
            </div>
          </div>

          <div id="where-it-extends" className="mt-10 scroll-mt-40">
            <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-teal">
              Where It Can Extend
            </span>
            <h2 className="mb-4 max-w-3xl text-2xl font-bold leading-tight text-navy sm:text-3xl lg:text-[28px] lg:leading-[36px]">
              Where The Compliance Intelligence Layer Can Extend
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {CURRENT_EXTENSIONS.map((card) => (
                <ExtensionCardItem key={card.title} {...card} />
              ))}
            </div>
          </div>

          <div id="future-industries" className="mt-10 scroll-mt-40">
            <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-teal">
              Future Roadmap
            </span>
            <h2 className="mb-4 max-w-3xl text-2xl font-bold leading-tight text-navy sm:text-3xl lg:text-[28px] lg:leading-[36px]">
              Future Extensions
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {FUTURE_EXTENSIONS.map((card) => (
                <ExtensionCardItem key={card.title} {...card} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Structural challenge banner */}
      <section id="structural-challenge" className="bg-white px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 lg:flex-row">
          <div className="max-w-2xl flex-1">
            <h2 className="mb-4 max-w-3xl text-2xl font-bold leading-tight text-navy sm:text-3xl lg:text-[28px] lg:leading-[36px]">
              One Structural Challenge.{" "}
              <span className="text-teal">One Compliance Intelligence Layer.</span>
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-navy sm:text-lg lg:text-[20px] lg:leading-[28px]">
              Although every regulated industry operates differently, the need to
              preserve documentation alignment, evidence traceability, and
              regulatory confidence remains consistent.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              href="/#platform-intelligence-section"
              className="suricat-teal-btn group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full px-6 py-3 text-sm font-bold transition-all sm:px-8 sm:py-3.5"
            >
              Explore The Platform
              <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
