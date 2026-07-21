import { FaArrowRight, FaChartLine, FaClipboardList, FaClock, FaFileCircleExclamation, FaFolderOpen, FaUpRightFromSquare, FaUserGraduate } from "@/components/ui/icons";
import { MobileAutoplayCardSlider } from "@/components/ui/MobileAutoplayCardSlider";
import Link from "next/link";

export function ComplianceCostSection() {
  return (
    <>
      <section id="compliance-cost-section" className="pt-8 max-w-7xl mx-auto">
            <div className="mb-6 lg:pt-0">
              <span
              className="text-teal font-bold text-sm uppercase tracking-widest mb-4 block"
              >Cost of Misalignment</span
            >
              <h2
                className="text-2xl sm:text-3xl lg:text-[28px] leading-tight lg:leading-[36px] font-bold mb-4 sm:mb-4 max-w-3xl"
              >
                Compliance Misalignment Does Not Announce Itself. These Are Its Consequences
              </h2>
              <p
                className="text-base sm:text-lg lg:text-[20px] leading-relaxed lg:leading-[28px] text-navy max-w-4xl"
              >
              Misalignment often remains hidden until an inspection, CAPA, or recall exposes it. By then, the impact is already measurable. The data below reflects the realities medical device manufacturers face under QMSR and ISO 13485.
              </p>
            </div>
            <div className="relative mt-4 pl-0 extend_top-left o-flow-vis">
              <div
                className="compliance-cost-banner-bg rounded-[4px] p-10 lg:p-6 relative z-10 text-white extend_top-left-base"
              >
                {/* Cards Grid */}
                <div className="relative">
                  <MobileAutoplayCardSlider
                    id="compliance-cards-grid"
                    gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4 py-2"
                  >
                    <div className="compliance-cost-card">
                      <div className="compliance-cost-card-header">
                        <div className="compliance-cost-card-icon">
                          <FaFileCircleExclamation aria-hidden="true" />
                        </div>
                        <span className="compliance-cost-card-index" aria-hidden="true">01</span>
                      </div>
                      <p className="compliance-cost-card-label">FDA Warning Letters</p>
                      <p className="compliance-cost-card-title">
                        <span className="compliance-stat-emphasis">44</span> Warning Letters
                      </p>
                      <p className="compliance-cost-card-body">
                        Indicates significant quality system gaps that can escalate.
                      </p>
                      <div className="compliance-cost-card-footer">
                        <a
                          href="https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/compliance-actions-and-activities/warning-letters"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="compliance-cost-card-link"
                        >
                          FDA FY2025 Enforcement Data
                          <FaUpRightFromSquare className="text-xs" aria-hidden="true" />
                        </a>
                      </div>
                    </div>

                    <div className="compliance-cost-card">
                      <div className="compliance-cost-card-header">
                        <div className="compliance-cost-card-icon">
                          <FaClipboardList aria-hidden="true" />
                        </div>
                        <span className="compliance-cost-card-index" aria-hidden="true">02</span>
                      </div>
                      <p className="compliance-cost-card-label">CAPA Deficiencies</p>
                      <p className="compliance-cost-card-title">
                        <span className="compliance-stat-emphasis">~50%</span> of Device Firms
                      </p>
                      <p className="compliance-cost-card-body">
                        Face CAPA deficiencies, a leading driver of inspection
                        findings.
                      </p>
                      <div className="compliance-cost-card-footer">
                        <a
                          href="https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/inspection-references/inspection-observations"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="compliance-cost-card-link"
                        >
                          FDA Inspection Observation Reports
                          <FaUpRightFromSquare className="text-xs" aria-hidden="true" />
                        </a>
                      </div>
                    </div>

                    <div className="compliance-cost-card">
                      <div className="compliance-cost-card-header">
                        <div className="compliance-cost-card-icon">
                          <FaChartLine aria-hidden="true" />
                        </div>
                        <span className="compliance-cost-card-index" aria-hidden="true">03</span>
                      </div>
                      <p className="compliance-cost-card-label">Recall Exposure</p>
                      <p className="compliance-cost-card-title">
                        <span className="compliance-stat-emphasis">$10M–$50M+</span>
                      </p>
                      <p className="compliance-cost-card-body">
                        Major recalls can create significant remediation and
                        operational burden.
                      </p>
                      <div className="compliance-cost-card-footer">
                        <a
                          href="https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="compliance-cost-card-link"
                        >
                          FDA Class I Recall Cost Analysis
                          <FaUpRightFromSquare className="text-xs" aria-hidden="true" />
                        </a>
                      </div>
                    </div>

                    <div className="compliance-cost-card">
                      <div className="compliance-cost-card-header">
                        <div className="compliance-cost-card-icon">
                          <FaClock aria-hidden="true" />
                        </div>
                        <span className="compliance-cost-card-index" aria-hidden="true">04</span>
                      </div>
                      <p className="compliance-cost-card-label">Recall Resolution Time</p>
                      <p className="compliance-cost-card-title">
                        Up to 2 Years
                      </p>
                      <p className="compliance-cost-card-body">
                        Serious medical device recalls can take years to fully
                        resolve.
                      </p>
                      <div className="compliance-cost-card-footer">
                        <a
                          href="https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfres/res.cfm"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="compliance-cost-card-link"
                        >
                          FDA Medical Device Recall Database
                          <FaUpRightFromSquare className="text-xs" aria-hidden="true" />
                        </a>
                      </div>
                    </div>

                    <div className="compliance-cost-card">
                      <div className="compliance-cost-card-header">
                        <div className="compliance-cost-card-icon">
                          <FaUserGraduate aria-hidden="true" />
                        </div>
                        <span className="compliance-cost-card-index" aria-hidden="true">05</span>
                      </div>
                      <p className="compliance-cost-card-label">Training Compliance Gaps</p>
                      <p className="compliance-cost-card-title">
                        <span className="compliance-stat-emphasis">67%</span> of Audit Findings
                      </p>
                      <p className="compliance-cost-card-body">
                        Involve training deficiencies or outdated records.
                      </p>
                      <div className="compliance-cost-card-footer">
                        <a
                          href="https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/inspection-references/inspection-observations"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="compliance-cost-card-link"
                        >
                          FDA Inspection Observation Reports
                          <FaUpRightFromSquare className="text-xs" aria-hidden="true" />
                        </a>
                      </div>
                    </div>

                    <div className="compliance-cost-card">
                      <div className="compliance-cost-card-header">
                        <div className="compliance-cost-card-icon">
                          <FaFolderOpen aria-hidden="true" />
                        </div>
                        <span className="compliance-cost-card-index" aria-hidden="true">06</span>
                      </div>
                      <p className="compliance-cost-card-label">Manual Audit Preparation</p>
                      <p className="compliance-cost-card-title">
                        Weeks of Preparation
                      </p>
                      <p className="compliance-cost-card-body">
                        Teams still manually assemble evidence, increasing effort and
                        risk of oversight.
                      </p>
                      <div className="compliance-cost-card-footer">
                        <a
                          href="https://www.fda.gov/medical-devices/postmarket-requirements-devices/quality-system-qs-regulationmedical-device-good-manufacturing-practices"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="compliance-cost-card-link"
                        >
                          FDA Quality System Regulation
                          <FaUpRightFromSquare className="text-xs" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </MobileAutoplayCardSlider>
                </div>

                <div className="mt-10 lg:mt-8 flex flex-col items-center gap-4">
                  <Link
                    href="/readiness"
                    className="compliance-banner-cta inline-flex items-center gap-2 border-2 border-teal text-teal px-8 py-2.5 rounded-full text-sm font-bold hover:bg-teal hover:text-navy transition-all group md:text-base"
                  >
                    Check Your Readiness
                    <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                  </Link>
                  <p className="text-white/80 text-sm text-center">
                    Learn how Suricat approaches compliance intelligence
                  </p>
                </div>
              </div>
            </div>

          </section>
    </>
  );
}
