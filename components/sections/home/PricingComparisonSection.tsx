"use client";

import { FaBolt, FaBuilding, FaCheck, FaEye, FaLayerGroup, FaPaperPlane, FaPuzzlePiece, FaShieldHalved, FaUsers } from "@/components/ui/icons";
import { PricingStaggerReveal } from "@/components/sections/pricing/PricingStaggerReveal";
export function PricingComparisonSection() {
  return (
    <>
      <section id="pricing-comparison-section" className="pricing-plans-scope pt-8 pb-3 px-4 sm:px-6 bg-white">
            <PricingStaggerReveal />
            <div className="max-w-7xl mx-auto">
              <div
                id="pricing-compare-sticky-bar"
                className="pricing-compare-sticky-bar"
                hidden
                aria-hidden="true"
              >
                <div
                  id="pricing-compare-sticky-scroll"
                  className="pricing-compare-sticky-scroll"
                ></div>
              </div>

              <div id="pricing-comparison">
                <div id="capability-comparison" className="pricing-compare-header mb-8 sm:mb-10">
                  <span
                    className="text-teal font-bold text-sm uppercase tracking-widest mb-4 block"
                    >Compare Subscription Options</span
                  >
                  <h2
                    className="text-2xl sm:text-3xl lg:text-[28px] leading-tight lg:leading-[36px] font-bold mb-4 text-navy max-w-3xl"
                  >
                    The Intelligence Remains The Same. The Operational Scope Expands.
                  </h2>
                  <p
                    className="text-base sm:text-lg lg:text-[20px] leading-relaxed lg:leading-[28px] text-navy max-w-4xl"
                  >
                    Every tier includes all six Compliance Intelligence solutions.
                    Document capacity, collaboration, governance, support, and
                    deployment options expand as your compliance program grows.
                  </p>
                </div>

                <div id="pricing-compare-sticky-root">
                  <div
                    className="pricing-compare-table-wrap overflow-x-auto rounded-[4px] border border-gray-200 bg-white shadow-sm"
                  >
                    <table className="pricing-compare-table w-full min-w-[880px] text-sm">
                      <thead id="pricing-compare-thead">
                        <tr
                          className="pricing-compare-thead-row border-b border-gray-200 font-semibold"
                        >
                          <th
                            className="text-left px-4 sm:px-5 py-3 font-bold text-navy uppercase tracking-wide text-sm w-[28%]"
                          >
                            Capability
                          </th>
                          <th className="px-4 sm:px-5 py-3 text-center w-[18%]">
                            <div className="flex flex-col items-center gap-1">
                              <span
                                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-teal"
                                ><FaEye className="text-sm" aria-hidden="true" /></span>
                              <span
                                className="font-bold text-navy text-sm uppercase tracking-wide"
                                >Evaluate</span
                              >
                              <span className="text-navy text-sm">Determine Fit</span>
                            </div>
                          </th>
                          <th className="px-4 sm:px-5 py-3 text-center w-[18%]">
                            <div className="flex flex-col items-center gap-1">
                              <span
                                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-teal"
                                ><FaPaperPlane className="text-sm" aria-hidden="true" /></span>
                              <span
                                className="font-bold text-navy text-sm uppercase tracking-wide"
                                >Pilot</span
                              >
                              <span className="text-navy text-sm">Validate Value</span>
                            </div>
                          </th>
                          <th className="px-4 sm:px-5 py-3 text-center w-[18%] bg-navy/5">
                            <div className="flex flex-col items-center gap-1">
                              <span
                                className="inline-block bg-teal text-navy text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full mb-1"
                                >Most Popular</span
                              >
                              <span
                                className="w-9 h-9 rounded-full border border-teal/40 bg-teal/10 flex items-center justify-center"
                                ><FaBolt className="text-sm" aria-hidden="true" /></span>
                              <span
                                className="font-bold text-navy text-sm uppercase tracking-wide"
                                >Foundation</span
                              >
                              <span className="text-navy text-sm">Operationalize</span>
                            </div>
                          </th>
                          <th className="px-4 sm:px-5 py-3 text-center w-[18%]">
                            <div className="flex flex-col items-center gap-1">
                              <span
                                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-teal"
                                ><FaBuilding className="text-sm" aria-hidden="true" /></span>
                              <span
                                className="font-bold text-navy text-sm uppercase tracking-wide"
                                >Enterprise</span
                              >
                              <span className="text-navy text-sm"
                                >Scale &amp; Govern</span
                              >
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="pricing-compare-row pricing-compare-category">
                          <td
                            colSpan={5}
                            className="px-4 sm:px-5 py-3 bg-gray-50 border-b border-gray-100"
                          >
                            <span
                              className="inline-flex items-center gap-2 text-teal text-[14px] font-bold uppercase tracking-[0.12em]"
                              ><FaLayerGroup aria-hidden="true" /> Core Platform</span
                            >
                          </td>
                        </tr>
                        <tr
                          className="pricing-compare-row border-b border-gray-100 font-semibold"
                        >
                          <td className="px-4 sm:px-5 py-3 text-navy">
                            All Six Compliance Intelligence Solutions
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                          <td className="text-center py-3 bg-navy/[0.02]">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                        </tr>
                        <tr
                          className="pricing-compare-row border-b border-gray-100 font-semibold"
                        >
                          <td className="px-4 sm:px-5 py-3 text-navy">
                            Customer Documentation
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                          <td className="text-center py-3 bg-navy/[0.02]">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                        </tr>
                        <tr
                          className="pricing-compare-row border-b border-gray-100 font-semibold"
                        >
                          <td className="px-4 sm:px-5 py-3 text-navy">
                            Analysis History
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-badge-limited">Limited</span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                          <td className="text-center py-3 bg-navy/[0.02]">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                        </tr>
                        <tr
                          className="pricing-compare-row border-b border-gray-100 font-semibold"
                        >
                          <td className="px-4 sm:px-5 py-3 text-navy">Email Support</td>
                          <td className="text-center py-3">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                          <td className="text-center py-3 bg-navy/[0.02]">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                        </tr>
                        <tr
                          className="pricing-compare-row border-b border-gray-100 font-semibold"
                        >
                          <td className="px-4 sm:px-5 py-3 text-navy">
                            Continuous Monitoring
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                          <td className="text-center py-3 bg-navy/[0.02]">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                        </tr>
                        <tr
                          className="pricing-compare-row border-b border-gray-100 font-semibold"
                        >
                          <td className="px-4 sm:px-5 py-3 text-navy">
                            Export Findings &amp; Reports
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                          <td className="text-center py-3 bg-navy/[0.02]">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                        </tr>
                        <tr
                          className="pricing-compare-row border-b border-gray-100 font-semibold"
                        >
                          <td className="px-4 sm:px-5 py-3 text-navy">
                            Shared SaaS Environment
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                          <td className="text-center py-3 bg-navy/[0.02]">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-dash">—</span>
                          </td>
                        </tr>
                        <tr
                          className="pricing-compare-row border-b border-gray-200 font-semibold"
                        >
                          <td className="px-4 sm:px-5 py-3 text-navy">
                            Guided SaaS Environment
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                          <td className="text-center py-3 bg-navy/[0.02]">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-dash">—</span>
                          </td>
                        </tr>

                        <tr className="pricing-compare-row pricing-compare-category">
                          <td
                            colSpan={5}
                            className="px-4 sm:px-5 py-3 bg-gray-50 border-b border-gray-100"
                          >
                            <span
                              className="inline-flex items-center gap-2 text-teal text-[14px] font-bold uppercase tracking-[0.12em]"
                              ><FaUsers aria-hidden="true" /> Collaboration &amp;
                              Operations</span
                            >
                          </td>
                        </tr>
                        <tr
                          className="pricing-compare-row border-b border-gray-100 font-semibold"
                        >
                          <td className="px-4 sm:px-5 py-3 text-navy">
                            Team Collaboration
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3 bg-navy/[0.02]">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                        </tr>
                        <tr
                          className="pricing-compare-row border-b border-gray-100 font-semibold"
                        >
                          <td className="px-4 sm:px-5 py-3 text-navy">
                            Shared Workspaces
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3 bg-navy/[0.02]">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                        </tr>
                        <tr
                          className="pricing-compare-row border-b border-gray-100 font-semibold"
                        >
                          <td className="px-4 sm:px-5 py-3 text-navy">
                            Priority Email Support
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3 bg-navy/[0.02]">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                        </tr>
                        <tr
                          className="pricing-compare-row border-b border-gray-200 font-semibold"
                        >
                          <td className="px-4 sm:px-5 py-3 text-navy">
                            Extended Data Retention Options
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-badge-optional">Optional</span>
                          </td>
                          <td className="text-center py-3 bg-navy/[0.02]">
                            <span className="pricing-badge-optional">Optional</span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                        </tr>

                        <tr className="pricing-compare-row pricing-compare-category">
                          <td
                            colSpan={5}
                            className="px-4 sm:px-5 py-3 bg-gray-50 border-b border-gray-100"
                          >
                            <span
                              className="inline-flex items-center gap-2 text-teal text-[14px] font-bold uppercase tracking-[0.12em]"
                              ><FaShieldHalved aria-hidden="true" /> Enterprise
                              Governance</span
                            >
                          </td>
                        </tr>
                        <tr
                          className="pricing-compare-row border-b border-gray-100 font-semibold"
                        >
                          <td className="px-4 sm:px-5 py-3 text-navy">
                            Dedicated Suricat Cloud Environment
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3 bg-navy/[0.02]">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                        </tr>
                        <tr
                          className="pricing-compare-row border-b border-gray-100 font-semibold"
                        >
                          <td className="px-4 sm:px-5 py-3 text-navy">
                            Single Sign-On (SSO)
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3 bg-navy/[0.02]">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                        </tr>
                        <tr
                          className="pricing-compare-row border-b border-gray-100 font-semibold"
                        >
                          <td className="px-4 sm:px-5 py-3 text-navy">
                            Advanced Governance &amp; Access Controls
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3 bg-navy/[0.02]">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                        </tr>
                        <tr
                          className="pricing-compare-row border-b border-gray-100 font-semibold"
                        >
                          <td className="px-4 sm:px-5 py-3 text-navy">
                            Service Level Agreement (SLA)
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3 bg-navy/[0.02]">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                        </tr>
                        <tr
                          className="pricing-compare-row border-b border-gray-200 font-semibold"
                        >
                          <td className="px-4 sm:px-5 py-3 text-navy">
                            Document Capacity Rollover
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3 bg-navy/[0.02]">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-check"
                              ><FaCheck aria-hidden="true" /></span>
                          </td>
                        </tr>

                        <tr className="pricing-compare-row pricing-compare-category">
                          <td
                            colSpan={5}
                            className="px-4 sm:px-5 py-3 bg-gray-50 border-b border-gray-100"
                          >
                            <span
                              className="inline-flex items-center gap-2 text-teal text-[14px] font-bold uppercase tracking-[0.12em]"
                              ><FaPuzzlePiece aria-hidden="true" /> Enterprise
                              Extensions</span
                            >
                          </td>
                        </tr>
                        <tr
                          className="pricing-compare-row border-b border-gray-100 font-semibold"
                        >
                          <td className="px-4 sm:px-5 py-3 text-navy">API Access</td>
                          <td className="text-center py-3">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3 bg-navy/[0.02]">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-badge-optional">Optional</span>
                          </td>
                        </tr>
                        <tr
                          className="pricing-compare-row border-b border-gray-100 font-semibold"
                        >
                          <td className="px-4 sm:px-5 py-3 text-navy">
                            Custom Integrations
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3 bg-navy/[0.02]">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-badge-optional">Optional</span>
                          </td>
                        </tr>
                        <tr
                          className="pricing-compare-row border-b border-gray-100 font-semibold"
                        >
                          <td className="px-4 sm:px-5 py-3 text-navy">
                            Dedicated Customer Success Manager
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3 bg-navy/[0.02]">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-badge-optional">Optional</span>
                          </td>
                        </tr>
                        <tr className="pricing-compare-row">
                          <td className="px-4 sm:px-5 py-3 text-navy font-semibold">
                            Technical Account Manager
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3 bg-navy/[0.02]">
                            <span className="pricing-dash">—</span>
                          </td>
                          <td className="text-center py-3">
                            <span className="pricing-badge-optional">Optional</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div
                  className="pricing-compare-legend flex flex-wrap justify-center gap-x-5 gap-y-3 mt-8 text-xs sm:text-sm text-navy"
                >
                  <span className="inline-flex items-center gap-2"
                    ><span className="pricing-check pricing-check-legend"
                      ><FaCheck aria-hidden="true" /></span
                    >Included</span
                  >
                  <span className="inline-flex items-center gap-2"
                    ><span className="pricing-dash">—</span>Not included</span
                  >
                  <span className="inline-flex items-center gap-2"
                    ><span className="pricing-badge-limited">Limited</span>Limited
                    Access</span
                  >
                  <span className="inline-flex items-center gap-2"
                    ><span className="pricing-badge-optional">Optional</span>Available as
                    Add-On</span
                  >
                </div>
              </div>
            </div>
          </section>
    </>
  );
}
