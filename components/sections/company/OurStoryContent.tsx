"use client";

import Image from "next/image";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { StickySubnav } from "@/components/layout/StickySubnav";
import { Container } from "@/components/ui/Container";
import { CompanyExploreBand } from "@/components/sections/company/CompanyExploreBand";
import { useCompanySubnavLinks } from "@/lib/i18n/use-nav-links";
import { useTranslations } from "@/components/i18n/LocaleProvider";

const TIMELINE_KEYS = [
  { key: "observation", icon: "/assets/images/observation.png" },
  { key: "relationships", icon: "/assets/images/hidden-relation.svg" },
  { key: "intelligence", icon: "/assets/images/continous-intelligence.svg" },
] as const;

export function OurStoryContent() {
  const t = useTranslations();
  const ts = useTranslations("company.ourStory");
  const companySubnavLinks = useCompanySubnavLinks();

  return (
    <>
      <StickySubnav
        links={companySubnavLinks}
        category={t("nav.menus.company.label")}
        navLabel={t("nav.menus.company.label")}
      />
      <PageHero
        title={
          <>
            {ts("heroTitleBefore")}{" "}
            <span className="text-teal">{ts("heroTitleAccent")}</span>
          </>
        }
        subtitle={ts("heroSubtitle")}
        measure="max-w-4xl"
      />

      <section id="our-story" className="bg-white pb-6 pt-8">
        <Container>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="company-page-section">
                <div className="company-page-number">01</div>
                <div className="company-page-number-line" />
                <h2 className="mb-5 text-xl font-bold leading-tight text-navy sm:text-2xl lg:text-[28px]">
                  {ts("s1Title")}
                </h2>
                <div className="space-y-5 text-base leading-relaxed text-navy sm:text-lg lg:text-[20px] lg:leading-[28px]">
                  <p>{ts("s1p1")}</p>
                  <p>{ts("s1p2")}</p>
                  <p>{ts("s1p3")}</p>
                </div>
              </div>

              <div className="company-page-section">
                <div className="company-page-number">02</div>
                <div className="company-page-number-line" />
                <h2 className="mb-5 text-xl font-bold leading-tight text-navy sm:text-2xl lg:text-[28px]">
                  {ts("s2Title")}
                </h2>
                <div className="space-y-5 text-base leading-relaxed text-navy sm:text-lg lg:text-[20px] lg:leading-[28px]">
                  <p>{ts("s2p1")}</p>
                  <p>{ts("s2p2")}</p>
                  <p>
                    {ts("s2p3Before")}{" "}
                    <strong>{ts("s2p3Strong")}</strong>
                  </p>
                </div>
              </div>

              <div className="company-page-section">
                <div className="company-page-number">03</div>
                <div className="company-page-number-line" />
                <h2 className="mb-5 text-xl font-bold leading-tight text-navy sm:text-2xl lg:text-[28px]">
                  {ts("s3Title")}
                </h2>
                <div className="space-y-5 text-base leading-relaxed text-navy sm:text-lg lg:text-[20px] lg:leading-[28px]">
                  <p>{ts("s3p1")}</p>
                  <p>{ts("s3p2")}</p>
                  <p>
                    {ts("s3p3Before")}{" "}
                    <strong>{ts("s3p3Strong")}</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-28">
              <p className="mb-8 text-xs font-bold uppercase tracking-widest text-navy sm:text-sm">
                {ts("timelineEyebrowBefore")} <br />
                <span className="text-teal">{ts("timelineEyebrowAccent")}</span>
              </p>
              <div className="company-page-timeline">
                {TIMELINE_KEYS.map(({ key, icon }) => (
                  <div key={key} className="company-page-timeline-step">
                    <div className="company-page-timeline-icon">
                      <Image
                        src={icon}
                        alt={ts(`timeline.${key}.title`)}
                        width={64}
                        height={64}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="mb-1 text-lg font-bold text-navy">
                        {ts(`timeline.${key}.title`)}
                      </h3>
                      <p className="text-base leading-relaxed text-navy">
                        {ts(`timeline.${key}.body`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CompanyExploreBand
        titleLead={ts("exploreTitleLead")}
        titleAccent={ts("exploreTitleAccent")}
        description={ts("exploreDescription")}
        ctaLabel={t("company.exploreCta")}
      />

      <CtaBand />
    </>
  );
}
