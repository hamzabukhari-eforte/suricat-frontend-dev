import Image from "next/image";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { StickySubnav } from "@/components/layout/StickySubnav";
import { Container } from "@/components/ui/Container";
import { CompanyExploreBand } from "@/components/sections/company/CompanyExploreBand";
import { companySubnavLinks } from "@/lib/navigation";

const TIMELINE = [
  {
    icon: "/assets/images/observation.png",
    title: "Observation",
    body: "Continuously scan for early signals.",
  },
  {
    icon: "/assets/images/hidden-relation.svg",
    title: "Hidden Relationships",
    body: "Understand how documentation, controls, and responsibilities connect.",
  },
  {
    icon: "/assets/images/continous-intelligence.svg",
    title: "Continuous Intelligence",
    body: "Surface misalignment before it becomes a compliance event.",
  },
];

export function OurStoryContent() {
  return (
    <>
      <StickySubnav links={companySubnavLinks} category="Company" navLabel="Company pages" />
      <PageHero
        title={
          <>
            The Sentinel Does Not Wait <span className="text-teal">For Danger.</span>
          </>
        }
        subtitle="The name Suricat comes from one of nature's most vigilant sentinels. Meerkats stand upright, scan continuously, and alert the group before danger becomes visible. They do not wait for consequences. They detect the earliest signs."
        measure="max-w-4xl"
      />

      <section id="our-story" className="bg-white pb-6 pt-8">
        <Container>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="company-page-section">
                <div className="company-page-number">01</div>
                <div className="company-page-number-line" />
                <h2 className="mb-5 text-xl font-bold leading-tight text-navy sm:text-2xl lg:text-[28px]">
                  That Simple Instinct Revealed A Much Larger Problem.
                </h2>
                <div className="space-y-5 text-base leading-relaxed text-navy sm:text-lg lg:text-[20px] lg:leading-[28px]">
                  <p>
                    Compliance risk rarely appears all at once. It develops
                    quietly as documents evolve, evidence accumulates, and
                    alignment across compliance-critical documentation gradually
                    weakens.
                  </p>
                  <p>
                    Organizations built systems to store records, manage
                    workflows, and control approvals.
                  </p>
                  <p>
                    No system was built to continuously understand the
                    relationships between them.
                  </p>
                </div>
              </div>

              <div className="company-page-section">
                <div className="company-page-number">02</div>
                <div className="company-page-number-line" />
                <h2 className="mb-5 text-xl font-bold leading-tight text-navy sm:text-2xl lg:text-[28px]">
                  The Problem Was Not Hypothetical. We Experienced It Firsthand.
                </h2>
                <div className="space-y-5 text-base leading-relaxed text-navy sm:text-lg lg:text-[20px] lg:leading-[28px]">
                  <p>
                    Suricat was not conceived from theory. It was shaped through
                    years of hands-on experience preparing for inspections,
                    managing CAPA investigations, and supporting product
                    development.
                  </p>
                  <p>
                    We experienced firsthand how difficult it becomes to preserve
                    alignment as documentation grows, regulations evolve, and
                    responsibilities span multiple teams.
                  </p>
                  <p>
                    That experience made one thing clear. The missing capability
                    was never another workflow.{" "}
                    <strong>It was continuous compliance intelligence.</strong>
                  </p>
                </div>
              </div>

              <div className="company-page-section">
                <div className="company-page-number">03</div>
                <div className="company-page-number-line" />
                <h2 className="mb-5 text-xl font-bold leading-tight text-navy sm:text-2xl lg:text-[28px]">
                  That Became The Foundation Of Suricat.
                </h2>
                <div className="space-y-5 text-base leading-relaxed text-navy sm:text-lg lg:text-[20px] lg:leading-[28px]">
                  <p>
                    We built the Compliance Intelligence Layer to operate above
                    the systems organizations already trust.
                  </p>
                  <p>Not to replace them.</p>
                  <p>
                    To continuously evaluate documentation alignment, surface
                    explainable findings, and identify potential misalignment{" "}
                    <strong>before it affects critical decisions.</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-28">
              <p className="mb-8 text-xs font-bold uppercase tracking-widest text-navy sm:text-sm">
                From Early Observation <br />
                <span className="text-teal">To Continuous Intelligence</span>
              </p>
              <div className="company-page-timeline">
                {TIMELINE.map((step) => (
                  <div key={step.title} className="company-page-timeline-step">
                    <div className="company-page-timeline-icon">
                      <Image
                        src={step.icon}
                        alt={step.title}
                        width={64}
                        height={64}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="mb-1 text-lg font-bold text-navy">
                        {step.title}
                      </h3>
                      <p className="text-base leading-relaxed text-navy">
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CompanyExploreBand
        titleLead="Explore The"
        titleAccent="Compliance Intelligence Layer."
        description="See how the Compliance Intelligence Layer operates above existing systems to continuously evaluate documentation alignment across your organization."
      />

      <CtaBand />
    </>
  );
}
