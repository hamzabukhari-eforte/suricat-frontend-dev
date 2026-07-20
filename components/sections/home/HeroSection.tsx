import { FaArrowRight } from "@/components/ui/icons";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <>
      <header
            id="hero-section"
            className="bg-navy text-white relative overflow-hidden py-8 md:py-10 lg:py-12 min-h-0 lg:min-h-[500px] flex items-center"
          >
            <div
              className="w-full max-w-7xl mx-auto px-6 flex items-center relative z-10"
            >
              <div
                className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-6 lg:gap-12 w-full items-center"
              >
                {/* Left Half */}
                <div
                  className="flex flex-col justify-center min-w-0 md:col-span-7 lg:col-span-5"
                >
                  <h1
                    className="text-3xl md:text-[1.75rem] lg:text-[36px] font-bold mb-5 md:mb-4 lg:mb-6 transform translate-y-4 opacity-0 animate-fade-in-up leading-tight lg:leading-[44px]"
                  >
                    The Sentinel for <br />Compliance
                    <span className="text-teal">Intelligence</span>
                  </h1>
                  <div
                    className="w-12 h-1 bg-teal mb-5 md:mb-4 lg:mb-6 transform scale-x-0 animate-scale-x origin-left"
                  ></div>
                  <p
                    className="text-base lg:text-[22px] text-gray-100 mb-6 md:mb-5 lg:mb-8 font-normal md:pr-0 lg:pr-4 transform translate-y-4 opacity-0 animate-fade-in-up-delayed leading-relaxed lg:leading-[32px]"
                  >
                  Continuously evaluates cross-document alignment and surfaces inspection-defensible
                  findings for earlier review.
                  </p>
                  <div
                    className="flex flex-col gap-2 sm:flex-row sm:flex-nowrap sm:items-center transform translate-y-4 opacity-0 animate-fade-in-up-more-delayed"
                  >
                    <a
                      href="#platform-intelligence-section"
                      className="hero-cta-hover hero-banner-cta-btn group border-2 border-teal text-teal hover:bg-teal hover:text-navy inline-flex w-full sm:w-auto shrink-0 items-center justify-center gap-1.5 rounded-full font-bold transition-all whitespace-nowrap !px-3 !text-[0.6875rem] md:!px-3.5 md:!text-[0.7rem] lg:!px-5 lg:!text-[0.8125rem]"
                    >
                      Explore the Platform
                      <FaArrowRight className="text-[10px] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </a>
                    <Link
                      href="/design-partners/apply"
                      className="hero-cta-hover hero-banner-cta-btn group inline-flex w-full sm:w-auto shrink-0 items-center justify-center gap-1.5 border-2 border-white/20 text-white rounded-full font-bold hover:border-white transition-all whitespace-nowrap !px-3 !text-[0.6875rem] md:!px-3.5 md:!text-[0.7rem] lg:!px-5 lg:!text-[0.8125rem]"
                    >
                      Become a Design Partner
                      <FaArrowRight className="text-[10px] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                {/* Right Half - Banner Visual (tablet + desktop) */}
                <div
                  className="hidden md:flex items-center justify-center relative md:col-span-5 lg:col-span-7"
                >
                  <div
                    className="relative z-10 w-full flex flex-col items-center justify-center transform translate-x-0 lg:translate-x-8 opacity-0 animate-slide-in-right"
                  >
                    <p
                      className="text-teal font-bold text-xs lg:text-lg uppercase tracking-widest mb-3 lg:mb-4 text-center"
                    >
                      COMPLIANCE INTELLIGENCE PLATFORM
                    </p>
                    <Image
                      id="hero-animated-svg"
                      src="/assets/images/Hero-section-01.svg"
                      alt="Suricat founders banner"
                      width={900}
                      height={520}
                      className="relative z-10 h-auto w-full max-w-[280px] lg:max-w-none lg:w-[90%] object-contain"
                      style={{ height: "auto" }}
                      priority
                    />

                  </div>
                </div>
              </div>
            </div>


          </header>
    </>
  );
}
