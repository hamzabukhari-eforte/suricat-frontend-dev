"use client";

import { Button } from "@/components/ui/Button";
import { FaHandshake } from "@/components/ui/icons";
import { HeroCipAnimation } from "@/components/sections/home/HeroCipAnimation";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function HeroSection() {
  const t = useTranslations("home.hero");

  return (
    <>
      <header
        id="hero-section"
        className="bg-navy text-white relative overflow-x-clip overflow-y-visible py-8 md:py-10 lg:py-12 min-h-0 lg:min-h-[500px] flex items-center"
      >
        <Container className="flex items-center relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-6 lg:gap-12 w-full items-center">
            <div className="flex flex-col justify-center min-w-0 md:col-span-7 lg:col-span-5">
              <h1 className="text-3xl md:text-[1.75rem] lg:text-[36px] font-bold mb-3 md:mb-2.5 lg:mb-3 transform translate-y-4 opacity-0 animate-fade-in-up leading-tight lg:leading-[44px]">
                {t("titleBefore")} <br />
                {t("titleCompliance")}
                <span className="text-teal ms-1.5">{t("titleIntelligence")}</span>
              </h1>
              <div className="w-12 h-1 bg-teal mb-3 md:mb-2.5 lg:mb-3 transform scale-x-0 animate-scale-x origin-left"></div>
              <p className="text-[20px] text-gray-100 mb-8 md:mb-8 lg:mb-10 font-normal md:pr-0 lg:pr-4 transform translate-y-4 opacity-0 animate-fade-in-up-delayed leading-relaxed lg:leading-[30px]">
                {t("body")}
              </p>

              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                  <Button
                    variant="teal"
                    href="/design-partners/apply"
                    className="group w-full shrink-0 gap-2 whitespace-nowrap sm:w-auto"
                  >
                    <FaHandshake className="text-base shrink-0 text-navy" aria-hidden="true" />
                    {t("becomeDesignPartner")}
                  </Button>
                  <Button
                    variant="outline-white"
                    href="/get-started"
                    className="group w-full shrink-0 whitespace-nowrap sm:w-auto"
                  >
                    {t("explorePlatform")}
                  </Button>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex w-fit text-sm font-semibold text-white underline underline-offset-4 decoration-white/70 transition-colors hover:text-teal hover:decoration-teal md:text-base"
                >
                  {t("gotQuestions")}
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-center relative md:col-span-5 lg:col-span-7 overflow-visible mt-6 md:mt-0">
              <div className="relative z-20 w-full flex flex-col items-center justify-center transform translate-x-0 lg:translate-x-8 animate-slide-in-right overflow-visible">
                <HeroCipAnimation />
              </div>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
}
