import { FaArrowRight, FaBullseye, FaCodeFork, FaLayerGroup, FaLink, FaMagnifyingGlass, FaShieldHalved } from "@/components/ui/icons";
import { MobileAutoplayCardSlider } from "@/components/ui/MobileAutoplayCardSlider";
import Link from "next/link";

export function SolutionsSection() {
  return (
    <>
      <section id="solutions-section" className="pt-8 bg-surface-muted">
            <div className="max-w-7xl mx-auto">

            <div className="mb-6 lg:pt-0" >
              <span
                className="text-teal font-bold text-sm uppercase tracking-widest mb-4 block"
                >Solutions</span
              >
              <h2
                className="text-2xl sm:text-3xl lg:text-[28px] leading-tight lg:leading-[36px] font-bold mb-4 sm:mb-4 max-w-3xl"
              >
                No Single Document Tells The Full Story. <br /> The Connections Between Them Do.
              </h2>
              <p
                className="text-base sm:text-lg lg:text-[20px] leading-relaxed lg:leading-[28px] text-navy max-w-4xl"
              >
                Understand how the Compliance Intelligence Layer helps Quality and
                Regulatory teams identify potential concerns earlier, understand their
                impact, and maintain greater confidence across compliance-critical
                documentation.
              </p>
            </div>
            <div className="relative mt-4 pl-0 extend_top-left o-flow-vis">
              <div
                className="compliance-cost-banner-bg rounded-[4px] p-10 lg:p-6 relative z-10 text-white extend_top-left-base"
              >
                <div className="relative">
                  <MobileAutoplayCardSlider
                    id="solutions-cards-grid"
                    gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4 py-2"
                  >
                    <div className="compliance-cost-card">
                      <div className="compliance-cost-card-header">
                        <div className="compliance-cost-card-icon">
                          <FaShieldHalved aria-hidden="true" />
                        </div>
                        <span className="compliance-cost-card-index" aria-hidden="true">01</span>
                      </div>
                      <p className="compliance-cost-card-label">Documentation Confidence</p>
                      <p className="compliance-cost-card-title">
                        Confidence In The Evidence
                      </p>
                      <p className="compliance-cost-card-body">
                        Understand whether the evidence behind a quality or regulatory
                        decision is complete, traceable, and sufficient.
                      </p>
                      <div className="compliance-cost-card-footer">
                        <Link href="/solutions/documentation-confidence" className="solutions-card-btn">
                          View Solution
                          <FaArrowRight aria-hidden="true" />
                        </Link>
                      </div>
                    </div>

                    <div className="compliance-cost-card">
                      <div className="compliance-cost-card-header">
                        <div className="compliance-cost-card-icon">
                          <FaLink aria-hidden="true" />
                        </div>
                        <span className="compliance-cost-card-index" aria-hidden="true">02</span>
                      </div>
                      <p className="compliance-cost-card-label">Inspection-Defensible Findings</p>
                      <p className="compliance-cost-card-title">
                        Defensible Conclusions
                      </p>
                      <p className="compliance-cost-card-body">
                        Understand how a finding connects to the evidence, records, and
                        activities that produced it.
                      </p>
                      <div className="compliance-cost-card-footer">
                        <Link href="/solutions/inspection-findings" className="solutions-card-btn">
                          View Solution
                          <FaArrowRight aria-hidden="true" />
                        </Link>
                      </div>
                    </div>

                    <div className="compliance-cost-card">
                      <div className="compliance-cost-card-header">
                        <div className="compliance-cost-card-icon">
                          <FaLayerGroup aria-hidden="true" />
                        </div>
                        <span className="compliance-cost-card-index" aria-hidden="true">03</span>
                      </div>
                      <p className="compliance-cost-card-label">Inspection Readiness</p>
                      <p className="compliance-cost-card-title">
                        Readiness Before Preparation
                      </p>
                      <p className="compliance-cost-card-body">
                        Understand the current readiness of the quality system at any
                        time, not only once preparation begins.
                      </p>
                      <div className="compliance-cost-card-footer">
                        <Link href="/solutions/inspection-readiness" className="solutions-card-btn">
                          View Solution
                          <FaArrowRight aria-hidden="true" />
                        </Link>
                      </div>
                    </div>

                    <div className="compliance-cost-card">
                      <div className="compliance-cost-card-header">
                        <div className="compliance-cost-card-icon">
                          <FaBullseye aria-hidden="true" />
                        </div>
                        <span className="compliance-cost-card-index" aria-hidden="true">04</span>
                      </div>
                      <p className="compliance-cost-card-label">Continuous Compliance</p>
                      <p className="compliance-cost-card-title">
                        Visibility Between Reviews
                      </p>
                      <p className="compliance-cost-card-body">
                        Maintain awareness of compliance posture in the periods between
                        audits, inspections, and management reviews.
                      </p>
                      <div className="compliance-cost-card-footer">
                        <Link href="/solutions/continuous-compliance" className="solutions-card-btn">
                          View Solution
                          <FaArrowRight aria-hidden="true" />
                        </Link>
                      </div>
                    </div>

                    <div className="compliance-cost-card">
                      <div className="compliance-cost-card-header">
                        <div className="compliance-cost-card-icon">
                          <FaCodeFork aria-hidden="true" />
                        </div>
                        <span className="compliance-cost-card-index" aria-hidden="true">05</span>
                      </div>
                      <p className="compliance-cost-card-label">Change Impact Assessment</p>
                      <p className="compliance-cost-card-title">
                        Impact Beyond The Change
                      </p>
                      <p className="compliance-cost-card-body">
                        Understand how a change relates to the documentation, processes,
                        and obligations it may affect.
                      </p>
                      <div className="compliance-cost-card-footer">
                        <Link href="/solutions/change-impact-assessment" className="solutions-card-btn">
                          View Solution
                          <FaArrowRight aria-hidden="true" />
                        </Link>
                      </div>
                    </div>

                    <div className="compliance-cost-card">
                      <div className="compliance-cost-card-header">
                        <div className="compliance-cost-card-icon">
                          <FaMagnifyingGlass aria-hidden="true" />
                        </div>
                        <span className="compliance-cost-card-index" aria-hidden="true">06</span>
                      </div>
                      <p className="compliance-cost-card-label">Documentation Alignment</p>
                      <p className="compliance-cost-card-title">
                        Alignment Across Documentation
                      </p>
                      <p className="compliance-cost-card-body">
                        Identify where related procedures, records, and supporting
                        evidence may no longer be consistent.
                      </p>
                      <div className="compliance-cost-card-footer">
                        <Link href="/solutions/document-alignment" className="solutions-card-btn">
                          View Solution
                          <FaArrowRight aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </MobileAutoplayCardSlider>
                </div>

                <div className="mt-10 lg:mt-8 flex flex-col items-center gap-4">
                  <Link
                    href="/readiness"
                    className="inline-flex items-center gap-2 border-2 border-teal text-teal px-8 py-2.5 rounded-full text-base font-bold hover:bg-teal hover:text-navy transition-all group"
                  >
                    Check Your Readiness
                    <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                  </Link>
                  <p className="text-white/80 text-sm text-center">
                    Explore each solution to see how the Compliance Intelligence Layer applies it.
                  </p>
                </div>
              </div>
            </div>
          </div>

          </section>
    </>
  );
}
