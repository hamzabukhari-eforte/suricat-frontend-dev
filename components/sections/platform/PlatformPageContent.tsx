"use client";

import { CtaBand } from "@/components/sections/CtaBand";
import { WhySuricatSection } from "@/components/sections/home/WhySuricatSection";
import { PlatformClosingSection } from "@/components/sections/platform/PlatformClosingSection";
import { PlatformCrossDiagram } from "@/components/sections/platform/PlatformCrossDiagram";
import { PlatformDocumentDiagram } from "@/components/sections/platform/PlatformDocumentDiagram";
import { PlatformGapDiagram } from "@/components/sections/platform/PlatformGapDiagram";
import { PlatformHeroDiagram } from "@/components/sections/platform/PlatformHeroDiagram";
import { PlatformQualityDiagram } from "@/components/sections/platform/PlatformQualityDiagram";
import { PlatformRecordDiagram } from "@/components/sections/platform/PlatformRecordDiagram";
import { PlatformRegulatoryDiagram } from "@/components/sections/platform/PlatformRegulatoryDiagram";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FaHandshake } from "@/components/ui/icons";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import Link from "next/link";

export function PlatformPageContent() {
  const t = useTranslations("platformPage");
  const tCta = useTranslations("cta");

  return (
    <>
      <header className="platform-hero-band bg-navy text-white relative overflow-x-clip overflow-y-visible">
        <Container className="platform-hero-band-inner relative z-10">
          <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-6">
            <div className="platform-hero-copy flex min-w-0 flex-col justify-center lg:col-span-4">
              <h1 className="mb-3 text-3xl font-bold leading-tight tracking-tight md:text-[1.75rem] lg:mb-4 lg:text-[36px] lg:leading-[44px]">
                {t("heroTitleBefore")}{" "}
                <span className="text-teal">{t("heroTitleAccent")}</span>
              </h1>
              <p className="mb-3 text-[18px] font-normal leading-relaxed text-gray-100 lg:leading-[26px]">
                {t("heroLead")}
              </p>
              <p className="platform-hero-body mb-8 lg:mb-10">
                {t("heroBody")}
              </p>

              <div className="flex flex-col gap-3">
                <div className="flex flex-row flex-nowrap items-center gap-2">
                  <Button
                    variant="teal"
                    href="/design-partners/apply"
                    className="group shrink-0 gap-2 whitespace-nowrap"
                  >
                    <FaHandshake
                      className="shrink-0 text-base text-navy"
                      aria-hidden="true"
                    />
                    {tCta("becomeDesignPartner")}
                  </Button>
                  <Button
                    variant="outline-white"
                    href="/get-started"
                    className="group shrink-0 whitespace-nowrap"
                  >
                    {tCta("requestFreePilot")}
                  </Button>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex w-fit text-base font-semibold text-white underline decoration-white/70 underline-offset-4 transition-colors hover:text-teal hover:decoration-teal md:text-lg"
                >
                  {tCta("gotQuestions")}
                </Link>
              </div>
            </div>

            <div className="platform-hero-diagram-wrap relative lg:col-span-8">
              <PlatformHeroDiagram />
            </div>
          </div>
        </Container>
      </header>

      <section className="bg-surface-muted">
        <Container>
          <div
            id="platform-step-regulatory"
            className="platform-reg-section"
          >
            <p className="platform-reg-eyebrow">
              {t("steps.regulatory.phase")}
            </p>
            <h2 className="platform-reg-title">
              {t("steps.regulatory.title")}
            </h2>
            <div className="platform-reg-copy">
              <p>{t("steps.regulatory.lead")}</p>
              <p>{t("steps.regulatory.body")}</p>
              <p>{t("steps.regulatory.close")}</p>
            </div>
            <PlatformRegulatoryDiagram />
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <div id="platform-step-document" className="platform-doc-section">
            <p className="platform-reg-eyebrow">
              {t("steps.document.phase")}
            </p>
            <h2 className="platform-reg-title">
              {t("steps.document.title")}
            </h2>
            <div className="platform-reg-copy">
              <p>{t("steps.document.lead")}</p>
              <p>{t("steps.document.body")}</p>
              <p>{t("steps.document.close")}</p>
            </div>
            <PlatformDocumentDiagram />
          </div>
        </Container>
      </section>

      <section className="bg-surface-muted">
        <Container>
          <div id="platform-step-quality" className="platform-iq-section">
            <p className="platform-reg-eyebrow is-teal">
              {t("steps.quality.phase")}
            </p>
            <h2 className="platform-reg-title">{t("steps.quality.title")}</h2>
            <div className="platform-reg-copy">
              <p>{t("steps.quality.lead")}</p>
              <p>{t("steps.quality.body")}</p>
              <p>{t("steps.quality.close")}</p>
            </div>
            <PlatformQualityDiagram />
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <div id="platform-step-gap" className="platform-iq-section">
            <p className="platform-reg-eyebrow is-teal">
              {t("steps.gap.phase")}
            </p>
            <h2 className="platform-reg-title">{t("steps.gap.title")}</h2>
            <div className="platform-reg-copy">
              <p>{t("steps.gap.lead")}</p>
              <p>{t("steps.gap.body")}</p>
              <p>{t("steps.gap.close")}</p>
            </div>
            <PlatformGapDiagram />
          </div>
        </Container>
      </section>

      <section className="bg-surface-muted">
        <Container>
          <div id="platform-step-cross" className="platform-iq-section">
            <p className="platform-reg-eyebrow is-teal">
              {t("steps.cross.phase")}
            </p>
            <h2 className="platform-reg-title">{t("steps.cross.title")}</h2>
            <div className="platform-reg-copy">
              <p>{t("steps.cross.lead")}</p>
              <p>{t("steps.cross.body")}</p>
              <p>{t("steps.cross.close")}</p>
            </div>
            <PlatformCrossDiagram />
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <div id="platform-step-record" className="platform-iq-section">
            <p className="platform-reg-eyebrow is-teal">
              {t("steps.record.phase")}
            </p>
            <h2 className="platform-reg-title">{t("steps.record.title")}</h2>
            <div className="platform-reg-copy">
              <p>{t("steps.record.lead")}</p>
              <p>{t("steps.record.body")}</p>
              <p>{t("steps.record.close")}</p>
            </div>
            <PlatformRecordDiagram />
          </div>
        </Container>
      </section>

      <PlatformClosingSection />
      <WhySuricatSection />
      <CtaBand />
    </>
  );
}
