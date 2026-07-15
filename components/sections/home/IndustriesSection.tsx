import { FaArrowRight, FaChevronDown, FaChevronRight } from "@/components/ui/icons";
import Image from "next/image";
import Link from "next/link";

export function IndustriesSection() {
  return (
    <>
      <section id="industries-section" className="industries-scope pt-8 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8 sm:mb-10">
                <span
                  className="text-teal font-bold text-sm uppercase tracking-widest mb-4 block"
                  >Industries</span
                >
                <h2
                  className="text-2xl sm:text-3xl lg:text-[28px] leading-tight lg:leading-[36px] font-bold mb-4 text-navy max-w-3xl"
                >
                  Built For Regulated Industries. <br /> Starting With Medical Devices.
                </h2>
                <p
                  className="text-base sm:text-lg lg:text-[20px] leading-relaxed lg:leading-[28px] text-navy max-w-4xl"
                >
                  Medical device manufacturers operate within one of the world's most
                  demanding documentation environments. Suricat begins here because if
                  the Compliance Intelligence Layer can earn trust where documentation
                  complexity and regulatory expectations are highest, it can naturally
                  extend across other regulated industries.
                </p>
              </div>

              {/* <div aria-label="Industry expansion flow" className="max-w-6xl mx-auto">
                <div
                  className="industries-flow industries-flow-desktop hidden lg:grid items-center gap-4 xl:gap-6 mb-8"
                >
                  <div className="industries-flow-step is-start industries-flow-endpoint">
                    <div>
                      <p className="text-xl font-bold text-navy">Medical Devices</p>
                      <p className="text-teal text-sm font-semibold mt-1">Where We Begin</p>
                    </div>
                  </div>

                  <div className="industries-flow-step">
                    <FaChevronRight className="industries-flow-arrow" aria-hidden="true" />
                  </div>

                  <div className="industries-flow-step industries-flow-center flex-col">
                    <div className="industries-flow-icon">
                      <Image
                        src="/assets/images/Suricat-logo-dark.svg"
                        alt="Suricat"
                        className="h-auto w-[100px]"
                        width={128}
                        height={128}
                        style={{ height: "auto" }}
                      />
                    </div>
                    <p
                      className="text-lg font-bold text-navy text-center mt-4 max-w-[220px]"
                    >
                      Compliance Intelligence Layer
                    </p>
                  </div>

                  <div className="industries-flow-step">
                    <FaChevronRight className="industries-flow-arrow" aria-hidden="true" />
                  </div>

                  <div className="industries-flow-step is-end industries-flow-endpoint">
                    <div>
                      <p className="text-xl font-bold text-navy">Regulated Industries</p>
                      <p className="text-teal text-sm font-semibold mt-1">
                        Where We Can Extend
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="industries-flow flex flex-col items-center gap-8 mb-12 lg:hidden"
                >
                  <div className="industries-flow-endpoint text-center">
                    <p className="text-xl font-bold text-navy">Medical Devices</p>
                    <p className="text-teal text-sm font-semibold mt-1">Where We Begin</p>
                  </div>

                  <FaChevronDown className="industries-flow-arrow" aria-hidden="true" />

                  <div className="industries-flow-center flex flex-col items-center">
                    <div className="industries-flow-icon">
                      <Image
                        src="/assets/images/banner-suricat-vector2.svg"
                        alt="Suricat meerkat"
                        className="h-auto w-full"
                        width={120}
                        height={122}
                        style={{ height: "auto" }}
                      />
                    </div>
                    <p
                      className="text-base font-bold text-navy text-center mt-4 max-w-[220px]"
                    >
                      Compliance Intelligence Layer
                    </p>
                  </div>

                  <FaChevronDown className="industries-flow-arrow" aria-hidden="true" />

                  <div className="industries-flow-endpoint text-center">
                    <p className="text-xl font-bold text-navy">Regulated Industries</p>
                    <p className="text-teal text-sm font-semibold mt-1">
                      Where We Can Extend
                    </p>
                  </div>
                </div>
              </div> */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
                <article
                  className="industries-card bg-white rounded-[4px] border border-gray-200 shadow-sm p-8 lg:p-10 flex flex-col h-full"
                >
                  <h3 className="text-xl lg:text-[22px] font-bold text-navy mb-4">
                    Medical Devices
                  </h3>
                  <p className="text-navy text-base leading-relaxed mb-8 flex-1">
                    Learn why medical devices represent the first implementation of the
                    Compliance Intelligence Layer and how Suricat helps Quality and
                    Regulatory teams maintain documentation alignment and inspection
                    readiness.
                  </p>
                  <Link
                    href="/industries/medical-devices"
                    className="suricat-teal-btn inline-flex items-center gap-3 px-6 py-2.5 rounded-full font-semibold transition-all w-fit group"
                  >
                    Explore Medical Devices
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                  </Link>
                </article>

                <article
                  className="industries-card bg-white rounded-[4px] border border-gray-200 shadow-sm p-8 lg:p-10 flex flex-col h-full"
                >
                  <h3 className="text-xl lg:text-[22px] font-bold text-navy mb-4">
                    Industry Expansion
                  </h3>
                  <p className="text-navy text-base leading-relaxed mb-8 flex-1">
                    Explore how the Compliance Intelligence Layer can extend across
                    additional regulated industries where documentation quality,
                    evidence traceability, and regulatory oversight are equally
                    critical.
                  </p>
                  <Link
                    href="/industries/expansion"
                    className="suricat-teal-btn inline-flex items-center gap-3 px-6 py-2.5 rounded-full font-semibold transition-all w-fit group"
                  >
                    Explore Industry Expansion
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                  </Link>
                </article>
              </div>
            </div>
          </section>
    </>
  );
}
