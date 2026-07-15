import Image from "next/image";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { StickySubnav } from "@/components/layout/StickySubnav";
import { Container } from "@/components/ui/Container";
import { CompanyExploreBand } from "@/components/sections/company/CompanyExploreBand";
import {
  FaArrowRight,
  FaChevronRight,
  FaEarthAmericas,
  FaHeartPulse,
  MdOutlineDescription,
  MdOutlineGroups,
  MdOutlineStorage,
} from "@/components/ui/icons";
import { companySubnavLinks } from "@/lib/navigation";

const MISSION_SOURCES = [
  { Icon: MdOutlineStorage, label: "Systems" },
  { Icon: MdOutlineDescription, label: "Documents" },
  { Icon: MdOutlineGroups, label: "People" },
];

export function MissionVisionContent() {
  return (
    <>
      <StickySubnav links={companySubnavLinks} category="Company" navLabel="Company pages" />
      <PageHero
        title={
          <>
            We Believe Compliance Intelligence Should Be Continuous.{" "}
            <span className="text-teal">Not Periodic.</span>
          </>
        }
        subtitle="Mission defines what we are building. Vision defines the future we believe should exist. Together, they shape every decision behind Suricat."
        measure="max-w-4xl"
      />

      <section id="mission-vision" className="bg-white pb-6 pt-8">
        <Container>
          <div
            className="company-page-section grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16"
            style={{ paddingTop: 0, marginTop: 0, borderTop: "none" }}
          >
            <div>
              <div className="company-page-number">01</div>
              <div className="company-page-number-line" />
              <p className="company-page-label">Mission</p>
              <h2 className="mb-5 text-xl font-bold leading-tight text-navy sm:text-2xl lg:text-[28px]">
                Transform Regulatory Compliance Through Continuous Intelligence.
              </h2>
              <div className="space-y-5 text-base leading-relaxed text-navy sm:text-lg lg:text-[20px] lg:leading-[28px]">
                <p>
                  Regulatory compliance has long depended on periodic reviews,
                  manual reconciliation, and the experience of the people
                  responsible for maintaining it.
                </p>
                <p>
                  As documentation grows, regulations evolve, and organizations
                  become more complex, <strong>preserving alignment</strong>{" "}
                  becomes increasingly difficult.
                </p>
                <p>
                  <strong>Our mission is to change that.</strong>
                </p>
                <p>
                  We are building the Compliance Intelligence Layer that allows
                  organizations to continuously understand the relationships
                  across their{" "}
                  <strong>compliance-critical documentation.</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center lg:pt-8">
              <div className="w-full max-w-md">
                <div className="company-page-mission-sources">
                  {MISSION_SOURCES.map(({ Icon, label }, i) => (
                    <div key={label} className="contents">
                      {i > 0 ? (
                        <span className="company-page-mission-plus" aria-hidden="true">
                          +
                        </span>
                      ) : null}
                      <div className="company-page-mission-source">
                        <div className="company-page-mission-source-icon">
                          <span className="text-teal">
                            <Icon className="h-8 w-8" aria-hidden="true" />
                          </span>
                        </div>
                        <span className="text-base font-semibold text-navy">
                          {label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="company-page-mission-bracket">
                  <svg viewBox="0 0 200 40" fill="none" aria-hidden="true">
                    <path
                      d="M10 4 H190 M10 4 V28 M190 4 V28 M100 4 V40"
                      stroke="#19D3C5"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="company-page-mission-center">
                  <div className="company-page-mission-center-icon">
                    <Image
                      src="/assets/images/Suricat-logo-dark.svg"
                      alt="Suricat"
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-navy">
                      Compliance Intelligence
                    </p>
                    <p className="mt-1 text-base text-navy">
                      Continuous alignment.
                    </p>
                    <p className="text-base text-navy">
                      Inspection-defensible decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="company-page-section grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="company-page-number">02</div>
              <div className="company-page-number-line" />
              <p className="company-page-label">Vision</p>
              <h2 className="mb-5 text-xl font-bold leading-tight text-navy sm:text-2xl lg:text-[28px]">
                Establish The Compliance Intelligence Platform As The Global
                Standard.
              </h2>
              <div className="mb-8 space-y-5 text-base leading-relaxed text-navy sm:text-lg lg:text-[20px] lg:leading-[28px]">
                <p>
                  Every major enterprise technology category has evolved beyond
                  systems that simply store information.
                </p>
                <p>
                  Data gained intelligence. Cybersecurity gained intelligence.
                  Operations gained intelligence.
                </p>
                <p>
                  <strong>Compliance is next.</strong>
                </p>
                <p>
                  We envision a future where organizations no longer wait for
                  audits, inspections, or investigations to understand the
                  condition of their documentation.
                </p>
              </div>
              <div className="space-y-0">
                <p className="company-page-vision-statement text-base sm:text-lg lg:text-[20px]">
                  Documentation alignment becomes continuously visible.
                </p>
                <p className="company-page-vision-statement text-base sm:text-lg lg:text-[20px]">
                  Evidence becomes continuously connected.
                </p>
                <p className="company-page-vision-statement text-base sm:text-lg lg:text-[20px] pt-4">
                  Compliance becomes continuously understood.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center lg:pt-8">
              <div className="company-page-vision-flow w-full max-w-lg">
                <div className="company-page-vision-node">
                  <div className="company-page-vision-node-icon">
                    <span className="text-teal">
                      <FaHeartPulse className="h-7 w-7" aria-hidden="true" />
                    </span>
                  </div>
                  <p className="mb-1 text-sm font-bold text-navy">
                    Medical Devices
                  </p>
                  <p className="text-xs text-navy">Where We Begin</p>
                </div>
                <div className="company-page-vision-connector" aria-hidden="true" />
                <div className="company-page-vision-node">
                  <div className="company-page-vision-node-icon is-center">
                    <Image
                      src="/assets/images/Suricat-logo-dark.svg"
                      alt="Suricat"
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                  <p className="mb-1 text-xl font-bold text-navy">
                    Compliance Intelligence Platform
                  </p>
                  <p className="text-base leading-relaxed text-navy">
                    Continuous alignment. Unified intelligence. Trusted
                    decisions.
                  </p>
                </div>
                <div className="company-page-vision-connector" aria-hidden="true" />
                <div className="company-page-vision-node">
                  <div className="company-page-vision-node-icon">
                    <span className="text-teal">
                      <FaEarthAmericas className="h-7 w-7" aria-hidden="true" />
                    </span>
                  </div>
                  <p className="mb-1 text-sm font-bold text-navy">
                    Every Regulated Industry
                  </p>
                  <p className="text-xs text-navy">Where We Will Go</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CompanyExploreBand
        titleLead="The Future Starts With"
        titleAccent="A Different Layer."
        description="Discover how the Compliance Intelligence Layer continuously maintains documentation alignment without replacing the systems your organization already trusts."
      />

      <CtaBand />
    </>
  );
}
