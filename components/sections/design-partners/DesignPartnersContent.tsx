import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/sections/CtaBand";
import { PricingFaq } from "@/components/sections/pricing/PricingFaq";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { designPartnersFaq } from "@/lib/pricing/faq";
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

const RECEIVE = [
  "Executive findings summary",
  "Evidence mapping report",
  "Potential documentation misalignments",
  "Inspection readiness observations",
  "Recommendations for next steps",
  "Direct influence on the product roadmap",
  "Preferred consideration for early adoption",
];

const REQUIREMENTS = [
  {
    icon: FaUserTie,
    title: "Executive Sponsor",
    body: "Provides alignment and strategic oversight",
  },
  {
    icon: FaFileLines,
    title: "Representative Documentation",
    body: "Share key documents to enable meaningful analysis",
  },
  {
    icon: FaUsers,
    title: "Weekly Collaboration Sessions",
    body: "~2-3 hours per week with our founding team",
  },
  {
    icon: FaComments,
    title: "Subject Matter Expertise",
    body: "Input from your team as needed",
  },
  {
    icon: FaHandshake,
    title: "Founder Collaboration",
    body: "Work directly with Suricat founding team throughout the engagement",
  },
];

const INVESTMENT = [
  { icon: FaUserTie, role: "Executive Sponsor", time: "~1hr / week" },
  { icon: FaGear, role: "QA / RA Lead", time: "~2-3 hrs / week" },
  { icon: FaUserGraduate, role: "Subject Matter Experts", time: "As needed" },
];

const IDEAL_PARTNERS = [
  {
    icon: FaShieldHalved,
    title: "Medical Device Manufacturers",
    body: "Building safe, effective products for patients worldwide.",
  },
  {
    icon: FaCertificate,
    title: "ISO 13485 Certified",
    body: "Operating under ISO 13485 or preparing for certification.",
  },
  {
    icon: FaClipboardCheck,
    title: "Preparing for FDA Inspection",
    body: "Seeking greater confidence and readiness for regulatory inspections.",
  },
  {
    icon: FaSitemap,
    title: "Complex Quality Environment",
    body: "Managing multiple systems, interconnected processes, and documentation.",
  },
];

export function DesignPartnersContent() {
  return (
    <>
      <header
        id="design-partners-hero"
        className="bg-navy text-white relative overflow-hidden py-12 lg:py-12 min-h-[70vh] lg:min-h-[500px] flex items-center"
      >
        <div className="w-full max-w-7xl mx-auto px-6 flex items-center relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 w-full items-center">
            <div className="flex flex-col justify-center min-w-0 lg:col-span-5">
              <h1 className="text-4xl lg:text-[36px] font-bold mb-4 leading-[44px] transform translate-y-4 opacity-0 animate-fade-in-up">
                Help Define the Future of
                <br />
                <span className="text-teal">Compliance Intelligence</span>.
              </h1>
              <div className="w-12 h-1 bg-teal mb-5 transform scale-x-0 animate-scale-x origin-left" />
              <p className="dp-hero-sub text-base lg:text-[22px] text-white mb-5 font-normal leading-[32px] transform translate-y-4 opacity-0 animate-fade-in-up-delayed">
                Join a select group of medical device manufacturers
                collaborating directly with the Suricat founding team to shape
                the future of Compliance Intelligence.
              </p>
              <div className="mb-6 flex items-start gap-3 text-sm text-white transform translate-y-4 opacity-0 animate-fade-in-up-delayed">
                <FaUsers className="mt-0.5 shrink-0 text-teal" aria-hidden="true" />
                <span>
                  Limited to a small cohort of medical device manufacturers.
                </span>
              </div>
              <div className="flex flex-col gap-2 mb-6 transform translate-y-4 opacity-0 animate-fade-in-up-more-delayed lg:flex-row lg:flex-nowrap lg:items-center">
                <Link
                  href="/design-partners/apply"
                  className="hero-cta-hover hero-banner-cta-btn group border-2 border-teal text-teal hover:bg-teal hover:text-navy inline-flex items-center justify-center gap-1.5 rounded-full font-bold transition-all whitespace-nowrap shrink-0 w-full lg:w-auto"
                >
                  Become a Design Partner
                  <FaArrowRight
                    className="text-[10px] transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href="/readiness"
                  className="hero-cta-hover hero-banner-cta-btn group inline-flex items-center justify-center gap-1.5 border-2 border-white/20 text-white rounded-full font-bold hover:border-white transition-all whitespace-nowrap shrink-0 w-full lg:w-auto"
                >
                  Schedule a Discussion
                  <FaArrowRight
                    className="text-[10px] transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
              <div className="flex flex-col items-start gap-2 text-[11px] text-white transform translate-y-4 opacity-0 animate-fade-in-up-more-delayed sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-2 lg:flex-nowrap lg:gap-x-4 lg:text-[11px]">
                <div className="flex items-center gap-1.5">
                  <FaClock
                    className="shrink-0 text-teal text-[10px]"
                    aria-hidden="true"
                  />
                  <span>5-minute application</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FaCalendarCheck
                    className="shrink-0 text-teal text-[10px]"
                    aria-hidden="true"
                  />
                  <span>Response within 3 business days</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FaCircleCheck
                    className="shrink-0 text-teal text-[10px]"
                    aria-hidden="true"
                  />
                  <span>No obligation</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center relative lg:col-span-7 overflow-visible">
              <div className="relative z-10 w-full flex flex-col items-center justify-center transform translate-x-4 opacity-0 animate-slide-in-right">
                <Image
                  id="dp-hero-svg"
                  src="/assets/images/design-partner.svg"
                  alt="Design partner program"
                  width={760}
                  height={520}
                  className="relative z-10 h-auto object-contain"
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
              The Program
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[28px] leading-tight lg:leading-[36px] font-bold mb-4 text-navy max-w-3xl">
              A focused engagement built to validate measurable outcomes.
            </h2>
            <p className="text-base sm:text-lg lg:text-[20px] leading-relaxed lg:leading-[28px] text-navy max-w-4xl">
              Collaborate directly with Suricat&apos;s founders to validate
              findings, gather feedback, and determine mutual fit with minimal
              disruption to your team.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 border border-gray-200 rounded-[4px] overflow-hidden shadow-sm">
            <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-gray-200 bg-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center">
                  <FaUsers className="text-teal" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-navy text-sm uppercase tracking-[0.12em]">
                  Founding Cohort
                </h3>
              </div>
              <p className="text-sm text-navy mb-4 leading-relaxed">
                Be among the first 5-10 medical device manufacturers helping
                define the future of Compliance Intelligence.
              </p>
              <p className="text-sm text-navy mb-6 leading-relaxed">
                Your feedback will directly shape the Suricat platform before
                general availability.
              </p>
              <p className="text-sm font-bold text-teal flex items-center gap-2">
                <FaStar aria-hidden="true" /> Only 5-10 organizations in this
                inaugural cohort.
              </p>
            </div>

            <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-gray-200 bg-white">
              <h4 className="text-navy font-bold text-sm uppercase tracking-[0.12em] mb-6">
                What You&apos;ll Receive
              </h4>
              <ul className="space-y-4">
                {RECEIVE.map((item) => (
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
                <span
                  className="w-5 shrink-0 flex items-center justify-center mt-0.5"
                  aria-hidden="true"
                >
                  <FaBolt className="text-teal text-sm" />
                </span>
                <span className="text-sm text-navy font-semibold leading-snug">
                  Actionable outputs you can use immediately.
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-gray-200 bg-white">
              <h4 className="text-navy font-bold text-sm uppercase tracking-[0.12em] mb-6">
                What We&apos;ll Ask
              </h4>
              <ul className="space-y-6">
                {REQUIREMENTS.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <item.icon
                      className="text-teal mt-1 w-5 shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-bold text-navy">{item.title}</p>
                      <p className="text-xs text-navy">{item.body}</p>
                    </div>
                  </li>
                ))}
                <li className="flex items-start gap-3">
                  <FaClock
                    className="text-teal mt-1 w-5 shrink-0"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-navy">
                    Approximately 2-3 hours per week.
                  </p>
                </li>
              </ul>
            </div>

            <div className="p-6 sm:p-8 bg-white flex flex-col">
              <h4 className="text-navy font-bold text-sm uppercase tracking-[0.12em] mb-6">
                Typical Time Commitment
              </h4>
              <div className="space-y-4 mb-8">
                {INVESTMENT.map((row) => (
                  <div
                    key={row.role}
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-[4px]"
                  >
                    <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center shrink-0">
                      <row.icon className="text-teal" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy">{row.role}</p>
                      <p className="text-xs text-navy">{row.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-auto bg-navy p-6 rounded-[4px] text-white">
                <p className="text-teal text-xs font-bold uppercase tracking-[0.12em] mb-2">
                  Total Organizational Investment
                </p>
                <div className="flex items-center gap-4 mb-2">
                  <FaClock className="text-2xl text-teal" aria-hidden="true" />
                  <span className="text-3xl font-bold text-white">
                    20–30 <span className="text-xl font-bold">Hours</span>
                  </span>
                </div>
                <p className="text-teal text-sm font-medium">Across 30 Days</p>
              </div>
            </div>
          </div>

          <div className="mt-10 bg-navy rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-3 p-10 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10">
                <div className="text-teal font-bold text-sm uppercase tracking-widest mb-2">
                  Ideal Partners
                </div>
                <h3 className="text-2xl font-bold text-white leading-tight mb-4">
                  Who should apply?
                </h3>
                <p className="text-sm text-white leading-relaxed">
                  We&apos;re looking for forward-thinking medical device
                  manufacturers that are committed to raising the bar for quality
                  and compliance.
                </p>
              </div>
              <div className="lg:col-span-9 p-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {IDEAL_PARTNERS.map((card) => (
                  <div
                    key={card.title}
                    className="ideal-partner-card flex flex-col items-center text-center gap-4"
                  >
                    <div className="ideal-partner-card-icon">
                      <card.icon aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm leading-snug mb-2">
                        {card.title}
                      </h4>
                      <p className="text-white text-xs leading-relaxed">
                        {card.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-white/10 px-10 py-4 flex justify-center items-center gap-3">
              <FaUsers className="text-teal text-sm shrink-0" aria-hidden="true" />
              <p className="text-white text-xs">
                Also ideal for organizations with multiple documentation systems
                and increasing regulatory complexity.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <PricingFaq
        items={designPartnersFaq}
        sectionId="design-partners-faq"
        sectionClassName="pt-8 px-4 sm:px-6 bg-white"
        eyebrow="Frequently Asked Questions"
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
                Become One of Suricat&apos;s{" "}
                <span className="text-teal">Founding Design Partners.</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-[20px] leading-relaxed lg:leading-[28px] text-navy">
                Join a small group of industry leaders driving the next
                generation of Compliance Intelligence—together with Suricat.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0 items-stretch w-fit">
              <Button
                variant="teal"
                size="lg"
                href="/design-partners/apply"
                className="hero-cta-hover group !px-8"
              >
                Apply to Become a Design Partner
                <FaArrowRight
                  className="text-[10px] transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Button>
              <Link
                href="/readiness"
                className="hero-cta-hover group inline-flex items-center justify-center gap-1.5 border-2 border-navy text-navy px-8 py-3 sm:py-3.5 rounded-full font-bold hover:bg-navy hover:text-white transition-all text-sm"
              >
                Schedule a Discussion
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
                  <FaShieldHalved
                    className="text-teal text-base"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="text-navy font-semibold text-sm leading-tight">
                    Enterprise-grade security
                  </p>
                  <p className="text-navy text-sm mt-0.5 leading-relaxed">
                    Your data stays in your environment.
                  </p>
                </div>
              </div>
              <div className="founding-cta-trust-card">
                <div className="w-10 h-10 rounded-[4px] bg-teal/10 flex items-center justify-center shrink-0">
                  <FaLock className="text-teal text-base" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-navy font-semibold text-sm leading-tight">
                    Confidential engagement
                  </p>
                  <p className="text-navy text-sm mt-0.5 leading-relaxed">
                    Your information is always protected.
                  </p>
                </div>
              </div>
              <div className="founding-cta-trust-card">
                <div className="w-10 h-10 rounded-[4px] bg-teal/10 flex items-center justify-center shrink-0">
                  <FaUsers className="text-teal text-base" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-navy font-semibold text-sm leading-tight">
                    Founder-led experience
                  </p>
                  <p className="text-navy text-sm mt-0.5 leading-relaxed">
                    Work directly with our leadership.
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
