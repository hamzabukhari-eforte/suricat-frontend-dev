"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { CtaBand } from "@/components/sections/CtaBand";
import { PricingFaq } from "@/components/sections/pricing/PricingFaq";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import type { FaqItem } from "@/lib/pricing/faq";
import {
  FaArrowRight,
  FaBolt,
  FaCalendarCheck,
  FaCertificate,
  FaCheck,
  FaCircleCheck,
  FaClipboardCheck,
  FaClock,
  FaComments,
  FaFileLines,
  FaGear,
  FaHandshake,
  FaLock,
  FaShieldHalved,
  FaSitemap,
  FaStar,
  FaUserGraduate,
  FaUserTie,
  FaUsers,
} from "@/components/ui/icons";

const REQUIREMENT_KEYS = [
  { key: "sponsor", icon: FaUserTie },
  { key: "docs", icon: FaFileLines },
  { key: "sessions", icon: FaUsers },
  { key: "sme", icon: FaComments },
  { key: "founder", icon: FaHandshake },
] as const;

const INVESTMENT_KEYS = [
  { key: "sponsor", icon: FaUserTie },
  { key: "qa", icon: FaGear },
  { key: "sme", icon: FaUserGraduate },
] as const;

const IDEAL_KEYS = [
  { key: "md", icon: FaShieldHalved },
  { key: "iso", icon: FaCertificate },
  { key: "fda", icon: FaClipboardCheck },
  { key: "complex", icon: FaSitemap },
] as const;

export function DesignPartnersContent() {
  const tp = useTranslations("designPartners.page");
  const tf = useTranslations("designPartners.faq");

  const receive = useMemo(() => {
    const raw = tp.raw("receive");
    return Array.isArray(raw) ? (raw as string[]) : [];
  }, [tp]);

  const faqItems = useMemo(() => {
    const raw = tf.raw("items");
    if (!Array.isArray(raw)) return [] as FaqItem[];
    return (raw as { question: string; answer: string }[]).map((item) => ({
      question: item.question,
      answer: item.answer,
    }));
  }, [tf]);

  return (
    <>
      <header
        id="design-partners-hero"
        className="bg-navy text-white relative overflow-x-clip overflow-y-visible py-8 md:py-10 lg:py-12 flex items-center"
      >
        <div className="w-full max-w-7xl mx-auto px-6 flex items-center relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 lg:gap-10 w-full items-center">
            <div className="flex flex-col justify-center min-w-0 md:col-span-6 pb-1">
              <h1 className="text-4xl lg:text-[36px] font-bold mb-4 leading-[44px] transform translate-y-4 opacity-0 animate-fade-in-up">
                {tp("heroTitleBefore")}
                <br />
                <span className="text-teal">{tp("heroTitleAccent")}</span>.
              </h1>
              <div className="w-12 h-1 bg-teal mb-5 transform scale-x-0 animate-scale-x origin-left" />
              <p className="dp-hero-sub text-base lg:text-[22px] text-white mb-5 font-normal leading-[32px] transform translate-y-4 opacity-0 animate-fade-in-up-delayed">
                {tp("heroSubtitle")}
              </p>
              <div className="mb-6 flex items-start gap-3 text-sm text-white transform translate-y-4 opacity-0 animate-fade-in-up-delayed">
                <FaUsers className="mt-0.5 shrink-0 text-teal" aria-hidden="true" />
                <span>{tp("heroCohortNote")}</span>
              </div>
              <div className="dp-hero-ctas flex flex-col gap-2 mb-6 transform translate-y-4 opacity-0 animate-fade-in-up-more-delayed sm:flex-row sm:flex-wrap sm:items-stretch">
                <Link
                  href="/design-partners/apply"
                  className="hero-cta-hover hero-banner-cta-btn dp-hero-cta-btn group border-2 border-teal text-teal hover:bg-teal hover:text-navy inline-flex items-center justify-center gap-1.5 rounded-full font-bold transition-all w-full sm:w-auto sm:max-w-full"
                >
                  {tp("ctaApply")}
                  <FaArrowRight
                    className="text-[10px] shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href="/readiness"
                  className="hero-cta-hover hero-banner-cta-btn dp-hero-cta-btn group inline-flex items-center justify-center gap-1.5 border-2 border-white/20 text-white rounded-full font-bold hover:border-white transition-all w-full sm:w-auto sm:max-w-full"
                >
                  {tp("ctaDiscuss")}
                  <FaArrowRight
                    className="text-[10px] shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
              <div className="dp-hero-meta flex flex-col items-start gap-2 text-[11px] text-white transform translate-y-4 opacity-0 animate-fade-in-up-more-delayed sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <FaClock className="shrink-0 text-teal text-[10px]" aria-hidden="true" />
                  <span className="min-w-0">{tp("metaApp")}</span>
                </div>
                <div className="flex items-center gap-1.5 min-w-0">
                  <FaCalendarCheck className="shrink-0 text-teal text-[10px]" aria-hidden="true" />
                  <span className="min-w-0">{tp("metaResponse")}</span>
                </div>
                <div className="flex items-center gap-1.5 min-w-0">
                  <FaCircleCheck className="shrink-0 text-teal text-[10px]" aria-hidden="true" />
                  <span className="min-w-0">{tp("metaNoObligation")}</span>
                </div>
              </div>
            </div>


            <div className="hidden md:flex items-center justify-center relative md:col-span-6 overflow-visible">
              <div className="relative z-10 w-full flex flex-col items-center justify-center transform md:translate-x-2 lg:translate-x-4 opacity-0 animate-slide-in-right">
                <Image
                  id="dp-hero-svg"
                  src="/assets/images/design-partner.svg"
                  alt={tp("heroImageAlt")}
                  width={760}
                  height={520}
                  className="relative z-10 h-auto w-full max-w-[420px] lg:max-w-none object-contain"
                  style={{ height: "auto" }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="program" className="pt-8 bg-white">
        <Container>
          <div className="mb-8 sm:mb-10">
            <span className="text-teal font-bold text-sm uppercase tracking-widest mb-4 block">
              {tp("programEyebrow")}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[28px] leading-tight lg:leading-[36px] font-bold mb-4 text-navy max-w-3xl">
              {tp("programTitle")}
            </h2>
            <p className="text-base sm:text-lg lg:text-[20px] leading-relaxed lg:leading-[28px] text-navy max-w-4xl">
              {tp("programBody")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 border border-gray-200 rounded-[4px] overflow-hidden shadow-sm">
            <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-gray-200 bg-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center">
                  <FaUsers className="text-teal" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-navy text-sm uppercase tracking-[0.12em]">
                  {tp("cohortTitle")}
                </h3>
              </div>
              <p className="text-sm text-navy mb-4 leading-relaxed">{tp("cohortP1")}</p>
              <p className="text-sm text-navy mb-6 leading-relaxed">{tp("cohortP2")}</p>
              <p className="text-sm font-bold text-teal flex items-center gap-2">
                <FaStar aria-hidden="true" /> {tp("cohortHighlight")}
              </p>
            </div>

            <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-gray-200 bg-white">
              <h4 className="text-navy font-bold text-sm uppercase tracking-[0.12em] mb-6">
                {tp("receiveTitle")}
              </h4>
              <ul className="space-y-4">
                {receive.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="w-5 h-5 rounded-full bg-teal text-white flex items-center justify-center shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      <FaCheck className="text-[10px]" />
                    </span>
                    <span className="text-sm text-navy font-medium leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 bg-teal/10 py-4 pr-4 rounded-[4px] flex items-start gap-3">
                <span className="w-5 shrink-0 flex items-center justify-center mt-0.5" aria-hidden="true">
                  <FaBolt className="text-teal text-sm" />
                </span>
                <span className="text-sm text-navy font-semibold leading-snug">
                  {tp("receiveNote")}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-gray-200 bg-white">
              <h4 className="text-navy font-bold text-sm uppercase tracking-[0.12em] mb-6">
                {tp("askTitle")}
              </h4>
              <ul className="space-y-6">
                {REQUIREMENT_KEYS.map(({ key, icon: Icon }) => (
                  <li key={key} className="flex items-start gap-3">
                    <Icon className="text-teal mt-1 w-5 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-bold text-navy">
                        {tp(`requirements.${key}.title`)}
                      </p>
                      <p className="text-xs text-navy">
                        {tp(`requirements.${key}.body`)}
                      </p>
                    </div>
                  </li>
                ))}
                <li className="flex items-start gap-3">
                  <FaClock className="text-teal mt-1 w-5 shrink-0" aria-hidden="true" />
                  <p className="text-sm text-navy">{tp("askHours")}</p>
                </li>
              </ul>
            </div>

            <div className="p-6 sm:p-8 bg-white flex flex-col">
              <h4 className="text-navy font-bold text-sm uppercase tracking-[0.12em] mb-6">
                {tp("timeTitle")}
              </h4>
              <div className="space-y-4 mb-8">
                {INVESTMENT_KEYS.map(({ key, icon: Icon }) => (
                  <div
                    key={key}
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-[4px]"
                  >
                    <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center shrink-0">
                      <Icon className="text-teal" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy">
                        {tp(`investment.${key}.role`)}
                      </p>
                      <p className="text-xs text-navy">
                        {tp(`investment.${key}.time`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-auto bg-navy p-6 rounded-[4px] text-white">
                <p className="text-teal text-xs font-bold uppercase tracking-[0.12em] mb-2">
                  {tp("totalLabel")}
                </p>
                <div className="flex items-center gap-4 mb-2">
                  <FaClock className="text-2xl text-teal" aria-hidden="true" />
                  <span className="text-3xl font-bold text-white">
                    20–30 <span className="text-xl font-bold">{tp("totalHours")}</span>
                  </span>
                </div>
                <p className="text-teal text-sm font-medium">{tp("totalAcross")}</p>
              </div>
            </div>
          </div>

          <div className="mt-10 bg-navy rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-3 p-10 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10">
                <div className="text-teal font-bold text-sm uppercase tracking-widest mb-2">
                  {tp("idealEyebrow")}
                </div>
                <h3 className="text-2xl font-bold text-white leading-tight mb-4">
                  {tp("idealTitle")}
                </h3>
                <p className="text-sm text-white leading-relaxed">{tp("idealBody")}</p>
              </div>
              <div className="lg:col-span-9 p-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {IDEAL_KEYS.map(({ key, icon: Icon }) => (
                  <div
                    key={key}
                    className="ideal-partner-card flex flex-col items-center text-center gap-4"
                  >
                    <div className="ideal-partner-card-icon">
                      <Icon aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm leading-snug mb-2">
                        {tp(`idealCards.${key}.title`)}
                      </h4>
                      <p className="text-white text-xs leading-relaxed">
                        {tp(`idealCards.${key}.body`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-white/10 px-10 py-4 flex justify-center items-center gap-3">
              <FaUsers className="text-teal text-sm shrink-0" aria-hidden="true" />
              <p className="text-white text-xs">{tp("idealFooter")}</p>
            </div>
          </div>
        </Container>
      </section>

      <PricingFaq
        items={faqItems}
        sectionId="design-partners-faq"
        sectionClassName="pt-8 px-4 sm:px-6 bg-white"
        eyebrow={tp("faqEyebrow")}
        title=""
        description=""
        defaultOpenIndex={0}
      />

      <section
        id="founding-partners-cta"
        className="py-8 px-4 sm:px-6 bg-surface-muted text-navy relative overflow-hidden"
      >
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10 pb-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl lg:text-[28px] leading-tight lg:leading-[36px] font-bold mb-4 text-navy">
                {tp("ctaTitleBefore")}{" "}
                <span className="text-teal">{tp("ctaTitleAccent")}</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-[20px] leading-relaxed lg:leading-[28px] text-navy">
                {tp("ctaBody")}
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0 items-stretch w-fit">
              <Button
                variant="teal"
                size="lg"
                href="/design-partners/apply"
                className="hero-cta-hover group !px-8"
              >
                {tp("ctaApplyLong")}
                <FaArrowRight
                  className="text-[10px] transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Button>
              <Link
                href="/readiness"
                className="hero-cta-hover group inline-flex items-center justify-center gap-1.5 border-2 border-navy text-navy px-8 py-3 sm:py-3.5 rounded-full font-bold hover:bg-navy hover:text-white transition-all text-sm"
              >
                {tp("ctaDiscuss")}
                <FaArrowRight
                  className="text-[10px] transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              <div className="founding-cta-trust-card">
                <div className="w-10 h-10 rounded-[4px] bg-teal/10 flex items-center justify-center shrink-0">
                  <FaShieldHalved className="text-teal text-base" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-navy font-semibold text-sm leading-tight">
                    {tp("trust.securityTitle")}
                  </p>
                  <p className="text-navy text-sm mt-0.5 leading-relaxed">
                    {tp("trust.securityBody")}
                  </p>
                </div>
              </div>
              <div className="founding-cta-trust-card">
                <div className="w-10 h-10 rounded-[4px] bg-teal/10 flex items-center justify-center shrink-0">
                  <FaLock className="text-teal text-base" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-navy font-semibold text-sm leading-tight">
                    {tp("trust.confidentialTitle")}
                  </p>
                  <p className="text-navy text-sm mt-0.5 leading-relaxed">
                    {tp("trust.confidentialBody")}
                  </p>
                </div>
              </div>
              <div className="founding-cta-trust-card">
                <div className="w-10 h-10 rounded-[4px] bg-teal/10 flex items-center justify-center shrink-0">
                  <FaUsers className="text-teal text-base" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-navy font-semibold text-sm leading-tight">
                    {tp("trust.founderTitle")}
                  </p>
                  <p className="text-navy text-sm mt-0.5 leading-relaxed">
                    {tp("trust.founderBody")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
