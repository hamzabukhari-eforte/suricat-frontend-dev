import { FaCheck, FaFileLines } from "@/components/ui/icons";
import { PricingStaggerReveal } from "@/components/sections/pricing/PricingStaggerReveal";
import Link from "next/link";

export function PricingPlansSection() {
  return (
    <>
      <section
            id="pricing-plans"
            className="pricing-plans-scope pt-8 px-4 sm:px-6 bg-surface-muted"
          >
            <PricingStaggerReveal />
            <div className="max-w-7xl mx-auto">
              <div className="mb-8 sm:mb-10">
                <span
                  className="text-teal font-bold text-sm uppercase tracking-widest mb-4 block"
                  >Pricing</span
                >
                <h2
                  className="text-2xl sm:text-3xl lg:text-[28px] leading-tight lg:leading-[36px] font-bold mb-4 text-navy max-w-3xl"
                >
                  The Scope Lives in the Documentation. <br /> Not the Seat Count.
                </h2>
                <p
                  className="text-base sm:text-lg lg:text-[20px] leading-relaxed lg:leading-[28px] text-navy max-w-4xl mb-4"
                >
                  Compliance complexity is reflected in documentation, not headcount.
                  Every Suricat subscription combines an Annual Platform License with a
                  defined Document Capacity, allowing Quality and Regulatory teams to
                  collaborate without per-seat licensing constraints.
                </p>
                <p
                  className="text-base sm:text-lg lg:text-[20px] font-semibold leading-relaxed lg:leading-[28px] text-navy max-w-4xl"
                >
                  Documents may be evaluated across all six Compliance Intelligence
                  solutions without additional consumption charges.
                </p>
              </div>
              <div id="pricing-cards">
                <div
                  id="subscription-options"
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6 items-stretch"
                >
                  {/* Evaluate */}
                  <article
                    id="start-with-evaluate"
                    className="pricing-stagger-item pricing-card bg-white rounded-[4px] border border-gray-200 shadow-sm flex flex-col overflow-hidden"
                  >
                    <div className="p-6 flex flex-col flex-1">
                      <p
                        className="text-navy text-[12px] font-bold uppercase tracking-[0.12em] mb-3"
                      >
                        Evaluation
                      </p>
                      <h3 className="text-[28px] font-bold text-navy leading-tight mb-1">
                        Evaluate
                      </h3>
                      <p className="text-teal font-semibold text-base mb-2">
                        Determine Fit
                      </p>
                      <p className="text-navy text-sm mb-5">
                        Will Suricat work on our documentation?
                      </p>
                      <div className="mb-5">
                        <p className="text-[32px] font-bold text-navy leading-none">$0</p>
                        <p className="text-navy text-sm mt-1">90-day evaluation term</p>
                      </div>
                      <div
                        className="pricing-doc-capacity rounded-[4px] bg-teal/10 border border-teal/20 p-4 mb-5"
                      >
                        <FaFileLines className="text-teal text-lg" aria-hidden="true" />
                        <p className="text-teal font-bold text-sm tracking-wide mt-1">
                          50 DOCUMENTS
                        </p>
                        <p className="text-navy font-bold text-sm mt-1">
                          Focused Evaluation
                        </p>
                        <p className="text-navy text-xs mt-0.5">Active Documents</p>
                      </div>
                      <ul className="space-y-2 text-sm text-navy mb-5">
                        <li className="flex items-start gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 shrink-0"
                          ></span
                          >1 Organization
                        </li>
                        <li className="flex items-start gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 shrink-0"
                          ></span
                          >1 User
                        </li>
                        <li className="flex items-start gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 shrink-0"
                          ></span
                          >1 Product Family
                        </li>
                        <li className="flex items-start gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 shrink-0"
                          ></span
                          >90-Day Evaluation Term
                        </li>
                      </ul>
                      <p
                        className="text-teal text-[14px] font-bold uppercase tracking-[0.12em] mb-3"
                      >
                        Core Platform
                      </p>
                      <ul className="space-y-2 text-sm text-navy mb-5">
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-teal shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >All Six Compliance Intelligence Solutions
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-teal shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >Self-service evaluation workspace
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-teal shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >Evidence navigation
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-teal shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >Guided onboarding
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-teal shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >Knowledge base
                        </li>
                      </ul>
                      <p
                        className="text-teal text-[14px] font-bold uppercase tracking-[0.12em] mb-2"
                      >
                        Support
                      </p>
                      <p className="text-sm text-navy font-semibold mb-6 flex-1">
                        <span className="block">Self-service support only.</span>
                        <span className="block mt-1.5">Knowledge base and guided onboarding included.</span>
                      </p>
                      <Link
                        href="/get-started"
                        className="suricat-teal-btn pricing-card-btn w-full inline-flex items-center justify-center font-bold px-6 py-3 rounded-full text-sm transition-all"
                      >
                        Start Free Evaluation
                      </Link>
                    </div>
                  </article>

                  {/* Pilot */}
                  <article
                    className="pricing-stagger-item pricing-card bg-white rounded-[4px] border border-gray-200 shadow-sm flex flex-col overflow-hidden"
                  >
                    <div className="p-6 flex flex-col flex-1">
                      <p
                        className="text-navy text-[12px] font-bold uppercase tracking-[0.12em] mb-3"
                      >
                        Operational Validation
                      </p>
                      <h3 className="text-[28px] font-bold text-navy leading-tight mb-1">
                        Pilot
                      </h3>
                      <p className="text-teal font-semibold text-base mb-2">
                        Validate Value
                      </p>
                      <p className="text-navy text-sm mb-5">
                        Can Suricat become part of our quality workflow?
                      </p>
                      <div className="mb-5">
                        <p className="text-[32px] font-bold text-navy leading-none">
                          $10,000
                        </p>
                        <p className="text-navy text-sm mt-1">per year</p>
                      </div>
                      <div
                        className="pricing-doc-capacity rounded-[4px] bg-teal/10 border border-teal/20 p-4 mb-5"
                      >
                        <FaFileLines className="text-teal text-lg" aria-hidden="true" />
                        <p className="text-teal font-bold text-sm tracking-wide mt-1">
                          250 DOCUMENTS
                        </p>
                        <p className="text-navy font-bold text-sm mt-1">
                          Single Device Program
                        </p>
                        <p className="text-navy text-xs mt-0.5">Active Documents</p>
                      </div>
                      <ul className="space-y-2 text-sm text-navy mb-5">
                        <li className="flex items-start gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 shrink-0"
                          ></span
                          >1 Organization
                        </li>
                        <li className="flex items-start gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 shrink-0"
                          ></span
                          >Up to 2 Users
                        </li>
                        <li className="flex items-start gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 shrink-0"
                          ></span
                          >1 Product Family
                        </li>
                        <li className="flex items-start gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 shrink-0"
                          ></span
                          >1 Regulatory Framework
                        </li>
                        <li className="flex items-start gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 shrink-0"
                          ></span
                          >Twelve-Month Subscription
                        </li>
                      </ul>
                      <p
                        className="text-teal text-[14px] font-bold uppercase tracking-[0.12em] mb-3"
                      >
                        Core Platform
                      </p>
                      <ul className="space-y-2 text-sm text-navy mb-5">
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-teal shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >All Six Compliance Intelligence Solutions
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-teal shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >Production workspace
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-teal shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >Continuous monitoring
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-teal shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >Report export
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-teal shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >Saved analysis history
                        </li>
                      </ul>
                      <p
                        className="text-teal text-[14px] font-bold uppercase tracking-[0.12em] mb-2"
                      >
                        Support
                      </p>
                      <p className="text-sm text-navy font-semibold mb-6 flex-1">
                        Email support and guided onboarding included.
                      </p>
                      <Link
                        href="/get-started"
                        className="suricat-teal-btn pricing-card-btn w-full inline-flex items-center justify-center font-bold px-6 py-3 rounded-full text-sm transition-all"
                      >
                        Start Pilot
                      </Link>
                    </div>
                  </article>

                  {/* Foundation */}
                  <article
                    id="document-capacity"
                    className="pricing-stagger-item pricing-card pricing-card-featured pricing-card-foundation relative rounded-[4px] border shadow-lg flex flex-col"
                  >
                    <span className="pricing-most-popular">Most Popular</span>
                    <div className="p-6 flex flex-col flex-1">
                      <p
                        className="text-[12px] font-bold uppercase tracking-[0.12em] mb-3"
                      >
                        Production Deployment
                      </p>
                      <h3 className="text-[28px] font-bold leading-tight mb-1">
                        Foundation
                      </h3>
                      <p className="font-semibold text-base mb-2">
                        Operationalize
                      </p>
                      <p className="text-sm mb-5">
                        Can Suricat support ongoing compliance operations?
                      </p>
                      <div className="mb-5">
                        <p className="text-[32px] font-bold leading-none">$25,000</p>
                        <p className="pricing-price-muted text-sm mt-1">per year</p>
                      </div>
                      <div
                        className="pricing-doc-capacity pricing-doc-box rounded-[4px] border p-4 mb-5"
                      >
                        <FaFileLines className="text-lg" aria-hidden="true" />
                        <p className="font-bold text-sm tracking-wide mt-1">
                          1,000 DOCUMENTS
                        </p>
                        <p className="font-bold text-sm mt-1">
                          Multiple Device Programs
                        </p>
                        <p className="pricing-doc-muted text-xs mt-0.5">Active Documents</p>
                      </div>
                      <ul className="space-y-2 text-sm mb-5">
                        <li className="flex items-start gap-2">
                          <span
                            className="pricing-bullet w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          ></span
                          >1 Organization
                        </li>
                        <li className="flex items-start gap-2">
                          <span
                            className="pricing-bullet w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          ></span
                          >Up to 3 Users
                        </li>
                        <li className="flex items-start gap-2">
                          <span
                            className="pricing-bullet w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          ></span
                          >Up to 3 Product Families
                        </li>
                        <li className="flex items-start gap-2">
                          <span
                            className="pricing-bullet w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          ></span
                          >Up to 3 Regulatory Frameworks
                        </li>
                        <li className="flex items-start gap-2">
                          <span
                            className="pricing-bullet w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          ></span
                          >Twelve-Month Subscription
                        </li>
                      </ul>
                      <p
                        className="text-[14px] font-bold uppercase tracking-[0.12em] mb-3"
                      >
                        Core Platform
                      </p>
                      <ul className="space-y-2 text-sm mb-5">
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-teal shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >Everything included in Pilot
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-teal shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >Team collaboration
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-teal shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >Shared workspaces
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-teal shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >Advanced reporting
                        </li>
                      </ul>
                      <p
                        className="text-[14px] font-bold uppercase tracking-[0.12em] mb-2"
                      >
                        Support
                      </p>
                      <p className="text-sm font-semibold mb-6 flex-1">
                        <span className="block">Priority email support.</span>
                        <span className="block mt-1.5">Accelerated response times.</span>
                      </p>
                      <Link
                        href="/get-started"
                        className="pricing-card-btn w-full inline-flex items-center justify-center border-2 font-bold px-6 py-3 rounded-full text-sm transition-all"
                      >
                        Start Foundation
                      </Link>
                    </div>
                  </article>

                  {/* Enterprise */}
                  <article
                    id="capacity-expansion"
                    className="pricing-stagger-item pricing-card pricing-card-enterprise rounded-[4px] border shadow-sm flex flex-col overflow-hidden"
                  >
                    <div className="p-6 flex flex-col flex-1">
                      <p
                        className="pricing-accent text-[12px] font-bold uppercase tracking-[0.12em] mb-3"
                      >
                        Enterprise Scale
                      </p>
                      <h3 className="text-[28px] font-bold leading-tight mb-1">
                        Enterprise
                      </h3>
                      <p className="pricing-accent font-semibold text-base mb-2">
                        Scale &amp; Govern
                      </p>
                      <p className="text-sm mb-5">
                        Can Suricat scale across the organization?
                      </p>
                      <div className="mb-5">
                        <p className="text-[32px] font-bold leading-none">
                          Custom
                        </p>
                        <p className="text-sm mt-1">annual platform license</p>
                      </div>
                      <div
                        className="pricing-doc-capacity pricing-doc-box rounded-[4px] border py-4 px-2 mb-5"
                      >
                        <FaFileLines className="pricing-accent text-lg" aria-hidden="true" />
                        <p className="pricing-accent font-bold text-sm tracking-wide mt-1">
                          CUSTOM CAPACITY
                        </p>
                        <p className="font-bold text-sm mt-1">
                          Organization-Wide Deployment
                        </p>
                        <p className="text-xs mt-0.5">Active Documents</p>
                      </div>
                      <ul className="space-y-2 text-sm mb-5">
                        <li className="flex items-start gap-2">
                          <span
                            className="pricing-bullet w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          ></span
                          >Unlimited Users
                        </li>
                        <li className="flex items-start gap-2">
                          <span
                            className="pricing-bullet w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          ></span
                          >Custom Product Families
                        </li>
                        <li className="flex items-start gap-2">
                          <span
                            className="pricing-bullet w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          ></span
                          >Custom Regulatory Frameworks
                        </li>
                        <li className="flex items-start gap-2">
                          <span
                            className="pricing-bullet w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          ></span
                          >Custom Subscription Term
                        </li>
                      </ul>
                      <p
                        className="pricing-accent text-[14px] font-bold uppercase tracking-[0.12em] mb-3"
                      >
                        Core Platform
                      </p>
                      <ul className="space-y-2 text-sm mb-5">
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-violet shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >Dedicated Suricat Cloud environment
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-violet shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >Custom retention policies
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-violet shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >Document capacity rollover
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-violet shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >Single sign-on and governance
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-violet shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >Advanced RBAC and audit logging
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="pricing-check pricing-check-violet shrink-0"
                            ><FaCheck aria-hidden="true" /></span
                          >Contracted SLA
                        </li>
                      </ul>
                      <p
                        className="pricing-accent text-[14px] font-bold uppercase tracking-[0.12em] mb-2"
                      >
                        Support
                      </p>
                      <p className="text-sm font-semibold mb-6 flex-1">
                        Shared Customer Success, Shared Technical Account Management,
                        Escalation Management.
                      </p>
                      <Link
                        href="/contact"
                        className="pricing-card-btn w-full inline-flex items-center justify-center border-2 font-bold px-6 py-3 rounded-full text-sm transition-all"
                      >
                        Contact Sales
                      </Link>
                    </div>
                  </article>
                </div>

                <div
                  className="pricing-stagger-item flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8 sm:mt-10 pb-2 text-sm text-navy"
                >
                  <span className="inline-flex items-center gap-2"
                    ><span className="w-1.5 h-1.5 rounded-full bg-teal"></span>Published
                    annual pricing</span
                  >
                  <span className="inline-flex items-center gap-2"
                    ><span className="w-1.5 h-1.5 rounded-full bg-teal"></span
                    >Twelve-month terms</span
                  >
                  <span className="inline-flex items-center gap-2"
                    ><span className="w-1.5 h-1.5 rounded-full bg-teal"></span>No per-seat
                    fees</span
                  >
                </div>
              </div>

            </div>
          </section>
    </>
  );
}
