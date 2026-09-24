"use client";

import { Button } from "@/components/ui/Button";
import { FaArrowRight } from "@/components/ui/icons";
import { HeroDiagramInteractive } from "@/components/sections/home/HeroDiagramInteractive";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import Link from "next/link";

export function HeroSection() {
  const t = useTranslations("home.hero");

  return (
    <>
      <header
        id="hero-section"
        className="bg-navy text-white relative overflow-x-clip overflow-y-visible py-8 md:py-10 lg:py-12 min-h-0 lg:min-h-[500px] flex items-center"
      >
        <div className="w-full max-w-7xl mx-auto px-6 flex items-center relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-6 lg:gap-12 w-full items-center">
            <div className="flex flex-col justify-center min-w-0 md:col-span-7 lg:col-span-5">
              <h1 className="text-3xl md:text-[1.75rem] lg:text-[36px] font-bold mb-5 md:mb-4 lg:mb-6 transform translate-y-4 opacity-0 animate-fade-in-up leading-tight lg:leading-[44px]">
                {t("titleBefore")} <br />
                {t("titleCompliance")}
                <span className="text-teal ms-1.5">{t("titleIntelligence")}</span>
              </h1>
              <div className="w-12 h-1 bg-teal mb-5 md:mb-4 lg:mb-6 transform scale-x-0 animate-scale-x origin-left"></div>
              <p className="text-base lg:text-[22px] text-gray-100 mb-6 md:mb-5 lg:mb-8 font-normal md:pr-0 lg:pr-4 transform translate-y-4 opacity-0 animate-fade-in-up-delayed leading-relaxed lg:leading-[32px]">
                {t("body")}
              </p>
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-nowrap sm:items-center transform translate-y-4 opacity-0 animate-fade-in-up-more-delayed">
                <Button
                  variant="outline-teal"
                  href="#platform"
                  className="group w-full shrink-0 gap-1.5 whitespace-nowrap sm:w-auto"
                >
                  {t("explorePlatform")}
                  <FaArrowRight
                    className="text-[10px] transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Button>
                <Link
                  href="/design-partners/apply"
                  className="hero-cta-hover group inline-flex h-[42px] w-full shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border-2 border-white/20 bg-transparent px-6 text-sm font-bold leading-none text-white transition-all hover:border-white hover:bg-transparent hover:text-white sm:w-auto md:text-base"
                >
                  {t("becomeDesignPartner")}
                  <FaArrowRight
                    className="text-[10px] transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>

            <div className="hidden md:flex items-center justify-center relative md:col-span-5 lg:col-span-7 overflow-visible">
              <div className="relative z-20 w-full flex flex-col items-center justify-center transform translate-x-0 lg:translate-x-8 opacity-0 animate-slide-in-right overflow-visible">
                <p className="text-teal font-bold text-xs lg:text-lg uppercase tracking-widest mb-3 lg:mb-4 text-center">
                  {t("bannerLabel")}
                </p>
                <HeroDiagramInteractive
                  src="/assets/images/Hero-section-01.svg?v=logo-mark-v1"
                  alt={t("bannerAlt")}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
