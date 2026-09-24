"use client";

import Image from "next/image";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { StickySubnav } from "@/components/layout/StickySubnav";
import { Container } from "@/components/ui/Container";
import { CompanyExploreBand } from "@/components/sections/company/CompanyExploreBand";
import {
  FaEarthAmericas,
  FaHeartPulse,
  MdOutlineDescription,
  MdOutlineGroups,
  MdOutlineStorage,
} from "@/components/ui/icons";
import { useCompanySubnavLinks } from "@/lib/i18n/use-nav-links";
import { useTranslations } from "@/components/i18n/LocaleProvider";

const MISSION_SOURCES = [
  { Icon: MdOutlineStorage, key: "systems" },
  { Icon: MdOutlineDescription, key: "documents" },
  { Icon: MdOutlineGroups, key: "people" },
] as const;

export function MissionVisionContent() {
  const t = useTranslations();
  const ts = useTranslations("company.missionVision");
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

      <section id="mission-vision" className="bg-white pb-6 pt-8">
        <Container>
          <div
            className="company-page-section grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16"
            style={{ paddingTop: 0, marginTop: 0, borderTop: "none" }}
          >
            <div>
              <div className="company-page-number">01</div>
              <div className="company-page-number-line" />
              <p className="company-page-label">{ts("missionLabel")}</p>
              <h2 className="mb-5 text-xl font-bold leading-tight text-navy sm:text-2xl lg:text-[28px]">
                {ts("missionTitle")}
              </h2>
              <div className="space-y-5 text-base leading-relaxed text-navy sm:text-lg lg:text-[20px] lg:leading-[28px]">
                <p>{ts("missionP1")}</p>
                <p>
                  {ts("missionP2Before")}{" "}
                  <strong>{ts("missionP2Strong")}</strong>{" "}
                  {ts("missionP2After")}
                </p>
                <p>
                  <strong>{ts("missionP3Strong")}</strong>
                </p>
                <p>
                  {ts("missionP4Before")}{" "}
                  <strong>{ts("missionP4Strong")}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center lg:pt-8">
              <div className="w-full max-w-md">
                <div className="company-page-mission-sources">
                  {MISSION_SOURCES.map(({ Icon, key }, i) => (
                    <div key={key} className="contents">
                      {i > 0 ? (
                        <span className="company-page-mission-plus" aria-hidden="true">
                          +
                        </span>
                      ) : null}
                      <div className="company-page-mission-source">
                        <div className="company-page-mission-source-icon">
                          <span className="text-teal">
                            <Icon className="h-8 w-8" aria-hidden="true" />
                          </span>
                        </div>
                        <span className="text-base font-semibold text-navy">
                          {ts(`sources.${key}`)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="company-page-mission-bracket">
                  <svg viewBox="0 0 200 40" fill="none" aria-hidden="true">
                    <path
                      d="M10 4 H190 M10 4 V28 M190 4 V28 M100 4 V40"
                      stroke="#19D3C5"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="company-page-mission-center">
                  <div className="company-page-mission-center-icon">
                    <Image
                      src="/assets/images/Suricat-logo-dark.svg"
                      alt="Suricat"
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-navy">
                      {ts("missionCenterTitle")}
                    </p>
                    <p className="mt-1 text-base text-navy">
                      {ts("missionCenterLine1")}
                    </p>
                    <p className="text-base text-navy">
                      {ts("missionCenterLine2")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="company-page-section grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="company-page-number">02</div>
              <div className="company-page-number-line" />
              <p className="company-page-label">{ts("visionLabel")}</p>
              <h2 className="mb-5 text-xl font-bold leading-tight text-navy sm:text-2xl lg:text-[28px]">
                {ts("visionTitle")}
              </h2>
              <div className="mb-8 space-y-5 text-base leading-relaxed text-navy sm:text-lg lg:text-[20px] lg:leading-[28px]">
                <p>{ts("visionP1")}</p>
                <p>{ts("visionP2")}</p>
                <p>
                  <strong>{ts("visionP3Strong")}</strong>
                </p>
                <p>{ts("visionP4")}</p>
              </div>
              <div className="space-y-0">
                <p className="company-page-vision-statement text-base sm:text-lg lg:text-[20px]">
                  {ts("visionStmt1")}
                </p>
                <p className="company-page-vision-statement text-base sm:text-lg lg:text-[20px]">
                  {ts("visionStmt2")}
                </p>
                <p className="company-page-vision-statement text-base sm:text-lg lg:text-[20px] pt-4">
                  {ts("visionStmt3")}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center lg:pt-8">
              <div className="company-page-vision-flow w-full max-w-lg">
                <div className="company-page-vision-node">
                  <div className="company-page-vision-node-icon">
                    <span className="text-teal">
                      <FaHeartPulse className="h-7 w-7" aria-hidden="true" />
                    </span>
                  </div>
                  <p className="mb-1 text-sm font-bold text-navy">
                    {ts("flowStartTitle")}
                  </p>
                  <p className="text-xs text-navy">{ts("flowStartSub")}</p>
                </div>
                <div className="company-page-vision-connector" aria-hidden="true" />
                <div className="company-page-vision-node">
                  <div className="company-page-vision-node-icon is-center">
                    <Image
                      src="/assets/images/Suricat-logo-dark.svg"
                      alt="Suricat"
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                  <p className="mb-1 text-xl font-bold text-navy">
                    {ts("flowCenterTitle")}
                  </p>
                  <p className="text-base leading-relaxed text-navy">
                    {ts("flowCenterBody")}
                  </p>
                </div>
                <div className="company-page-vision-connector" aria-hidden="true" />
                <div className="company-page-vision-node">
                  <div className="company-page-vision-node-icon">
                    <span className="text-teal">
                      <FaEarthAmericas className="h-7 w-7" aria-hidden="true" />
                    </span>
                  </div>
                  <p className="mb-1 text-sm font-bold text-navy">
                    {ts("flowEndTitle")}
                  </p>
                  <p className="text-xs text-navy">{ts("flowEndSub")}</p>
                </div>
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
