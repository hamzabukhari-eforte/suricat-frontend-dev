"use client";

import { useEffect, useState } from "react";
import { CtaBand } from "@/components/sections/CtaBand";
import { StickySubnav } from "@/components/layout/StickySubnav";
import { FaArrowRight, FaChevronRight } from "@/components/ui/icons";
import { companySubnavLinks } from "@/lib/navigation";

type Leader = {
  id: string;
  name: string;
  title: string;
  linkedin: string;
  photo: string;
  modalPhoto: string;
  /** Matches Designs modal crop; defaults to center_5% */
  modalObjectClass?: string;
  bio: string[];
};

const LEADERS: Leader[] = [
  {
    id: "mj",
    name: "MJ Khan",
    title: "Founder & Chief Executive Officer",
    linkedin: "https://www.linkedin.com",
    photo:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/oHFNZPCWjUWdWffoVEYsWvg5ha93%2F90840d48-de94-4db3-a62f-07cfcfdac528.png",
    modalPhoto:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/oHFNZPCWjUWdWffoVEYsWvg5ha93%2F6b87aed5-6614-48a3-a440-7effc3ad48d6.png",
    bio: [
      "MJ Khan has spent more than two decades building enterprise sales and go to market strategies for some of the world's leading enterprise technology companies, including Google Cloud, and Splunk.",
      "Through years of working with organizations operating in highly regulated industries, he repeatedly observed the same structural limitation. Compliance systems could store documentation, manage workflows, and control approvals, but they could not understand the relationships between them.",
      "That insight became the foundation of Suricat.",
      "He founded the company to establish the Compliance Intelligence Layer as a new category and assembled a founding team that combines enterprise technology leadership with firsthand FDA quality and regulatory expertise to bring that vision to life.",
    ],
  },
  {
    id: "fahad",
    name: "Fahad Ehsan",
    title: "Co Founder & Chief Technology Officer",
    linkedin: "https://www.linkedin.com",
    photo:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/canvas-assets/oHFNZPCWjUWdWffoVEYsWvg5ha93/1777550966717_625cb318-74e5-4aba-beb8-561d65a51826.png",
    modalPhoto:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/canvas-assets/oHFNZPCWjUWdWffoVEYsWvg5ha93/1777544344748_b210ac02-be13-4cc9-8f41-6256ecad3e8d.png",
    bio: [
      "Fahad Ehsan has spent more than two decades building cloud, AI, and cybersecurity infrastructure for enterprises operating under demanding security and regulatory requirements. As founder of Silicon Valley based eForte Inc., he designed enterprise systems where trust, traceability, and data integrity were essential to every decision.",
      "That experience became the technical foundation of Suricat.",
      "As Co Founder and Chief Technology Officer, Fahad leads the architecture of the Compliance Intelligence Layer. He designed the foundational technologies that power the platform, including its private large language model for regulated compliance environments, the Canonical Intelligence Schema, the Regulatory Ontology, and the Quality Validation Rating framework. Together, these technologies ensure every compliance finding is traceable, explainable, and inspection defensible.",
    ],
  },
  {
    id: "matthew",
    name: "Matthew Fortson",
    title: "Co Founder",
    linkedin: "https://www.linkedin.com",
    photo:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/canvas-assets/oHFNZPCWjUWdWffoVEYsWvg5ha93/1777561540776_9100f72b-be2b-4c42-aa49-33bda02ea09f.png",
    modalPhoto:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/canvas-assets/oHFNZPCWjUWdWffoVEYsWvg5ha93/1777561805829_2c0ce225-0925-41d5-915a-2f54a260f0d6.png",
    bio: [
      "Matthew Fortson has spent more than two decades building Quality Management Systems, Design Control programs, and regulatory documentation for medical device manufacturers operating under FDA requirements. Through years of preparing for inspections, managing CAPA investigations, and supporting product development, he experienced firsthand how documentation alignment degrades as systems, teams, and regulations evolve.",
      "That experience became the operational foundation of Suricat.",
      "As Co Founder, Matthew helps ensure the Compliance Intelligence Layer reflects the realities of quality practice. His experience guides how the platform identifies documentation misalignment, evaluates evidence, and validates inspection defensible findings.",
    ],
  },
  {
    id: "kim",
    name: "Kim Tompkins",
    title: "Senior Advisor",
    linkedin: "https://www.linkedin.com",
    photo:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/canvas-assets/oHFNZPCWjUWdWffoVEYsWvg5ha93/1777561539326_c4f9c127-3420-4c90-8d7b-3765b51bec0f.png",
    modalPhoto:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/canvas-assets/oHFNZPCWjUWdWffoVEYsWvg5ha93/1777561789903_0ea7c960-9a24-4860-8de0-3ea8a71376c5.png",
    modalObjectClass: "object-[center_15%]",
    bio: [
      "Kim Tompkins has spent more than three decades leading regulatory strategy for medical device manufacturers operating under FDA requirements. Through years of securing regulatory clearances, leading FDA inspections, and guiding organizations through complex regulatory submissions, she developed a deep understanding of the standards that distinguish compliant documentation from inspection defensible evidence.",
      "That experience became the regulatory foundation of Suricat.",
      "As Senior Advisor, Kim helps ensure the Compliance Intelligence Layer reflects the expectations of regulators as well as the realities of industry. Her experience guides how the platform evaluates evidence, measures documentation quality, and validates findings against real regulatory standards. Throughout her career, she has secured more than fifteen FDA 510(k) clearances and led FDA inspections resulting in zero Form 483 observations.",
    ],
  },
];

export function LeadershipContent() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = LEADERS.find((l) => l.id === activeId) ?? null;

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      <StickySubnav links={companySubnavLinks} category="Company" navLabel="Company pages" />
      <section className="mx-auto max-w-7xl px-4 pt-8">
        <div className="mb-6">
          <h1 className="mb-4 max-w-3xl text-[28px] font-bold leading-[36px] text-navy lg:text-[36px] lg:leading-[44px]">
            Built By The People Who Experienced{" "}
            <span className="text-teal">The Problem From Every Angle.</span>
          </h1>
          <p className="max-w-4xl text-base leading-relaxed text-navy lg:text-[22px] lg:leading-[30px]">
            Suricat was not founded by technologists alone. It was built by
            leaders in enterprise software, artificial intelligence, quality
            systems, and FDA regulatory affairs who each experienced the same
            structural gap through their own discipline.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-16 lg:flex-nowrap lg:justify-between lg:gap-x-8 xl:gap-x-20">
          {LEADERS.map((leader) => (
            <div
              key={leader.id}
              className="group flex cursor-pointer flex-col items-center text-center"
              onClick={() => setActiveId(leader.id)}
            >
              <div className="mb-6 h-56 w-56 overflow-hidden rounded-full border-8 border-gray-100 transition-colors duration-300 group-hover:border-teal xl:h-64 xl:w-64">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={leader.photo}
                  alt={leader.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mb-1 text-2xl font-bold text-navy">{leader.name}</h3>
              <p className="mb-4 text-sm text-navy">{leader.title}</p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveId(leader.id);
                }}
                className="inline-flex items-center gap-2 font-bold text-teal hover:underline"
              >
                Read Bio
                <FaChevronRight className="text-[10px]" aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {active ? (
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="leader-bio-title"
          onClick={() => setActiveId(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[4px] bg-[#f4f6f8] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex h-[400px] items-end justify-end overflow-hidden bg-navy p-8">
              <button
                type="button"
                onClick={() => setActiveId(null)}
                aria-label="Close modal"
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-xl text-white hover:bg-black/70"
              >
                &times;
              </button>
              <div className="absolute inset-0 z-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={active.photo}
                  alt={active.name}
                  className="h-full w-full object-cover md:hidden"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={active.modalPhoto}
                  alt=""
                  aria-hidden="true"
                  className={`hidden h-full w-full object-cover md:block ${active.modalObjectClass ?? "object-[center_5%]"}`}
                />
              </div>
              <div className="relative z-10 text-right text-white">
                <h2 id="leader-bio-title" className="mb-2 text-4xl font-bold">
                  {active.name}
                </h2>
                <p className="text-xl font-semibold">{active.title}</p>
              </div>
            </div>
            <div className="bg-[#f4f6f8] p-10">
              <div className="space-y-4 text-lg leading-relaxed text-gray-800">
                {active.bio.map((p) => (
                  <p
                    key={p.slice(0, 48)}
                    className={
                      /foundation of Suricat/.test(p)
                        ? "font-semibold text-navy"
                        : undefined
                    }
                  >
                    {p}
                  </p>
                ))}
                <a
                  href={active.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="suricat-teal-btn leadership-profile-btn group inline-flex w-fit items-center gap-3 rounded-full px-6 py-2.5 text-base font-semibold transition-all"
                >
                  Read Full Profile
                  <FaArrowRight
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <CtaBand />
    </>
  );
}
