"use client";

import { FaArrowRight } from "@/components/ui/icons";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import Link from "next/link";

export function IndustriesSection() {
  const t = useTranslations("home.industries");

  return (
    <section id="industries" className="industries-scope pt-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-10">
          <span className="text-teal font-bold text-sm uppercase tracking-widest mb-4 block">
            {t("sectionTitle")}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[28px] leading-tight lg:leading-[36px] font-bold mb-4 text-navy max-w-3xl">
            {t("headline")} <br /> {t("headlineLine2")}
          </h2>
          <p className="text-base sm:text-lg lg:text-[20px] leading-relaxed lg:leading-[28px] text-navy max-w-4xl">
            {t("body")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
          <article className="industries-card bg-white rounded-[4px] border border-gray-200 shadow-sm p-8 lg:p-10 flex flex-col h-full">
            <h3 className="text-xl lg:text-[22px] font-bold text-navy mb-4">
              {t("medicalTitle")}
            </h3>
            <p className="text-navy text-base leading-relaxed mb-8 flex-1">
              {t("medicalBody")}
            </p>
            <Link
              href="/industries/medical-devices"
              className="suricat-teal-btn inline-flex items-center gap-3 px-6 py-2.5 rounded-full font-bold transition-all w-fit group"
            >
              {t("medicalCta")}
              <FaArrowRight
                className="group-hover:translate-x-1 transition-transform duration-300"
                aria-hidden="true"
              />
            </Link>
          </article>

          <article className="industries-card bg-white rounded-[4px] border border-gray-200 shadow-sm p-8 lg:p-10 flex flex-col h-full">
            <h3 className="text-xl lg:text-[22px] font-bold text-navy mb-4">
              {t("expansionTitle")}
            </h3>
            <p className="text-navy text-base leading-relaxed mb-8 flex-1">
              {t("expansionBody")}
            </p>
            <Link
              href="/industries/expansion"
              className="suricat-teal-btn inline-flex items-center gap-3 px-6 py-2.5 rounded-full font-bold transition-all w-fit group"
            >
              {t("expansionCta")}
              <FaArrowRight
                className="group-hover:translate-x-1 transition-transform duration-300"
                aria-hidden="true"
              />
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
