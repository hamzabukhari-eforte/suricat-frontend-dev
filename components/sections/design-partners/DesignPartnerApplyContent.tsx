"use client";

import { useState } from "react";
import Link from "next/link";
import { CtaBand } from "@/components/sections/CtaBand";
import { LoginSlimHeader } from "@/components/sections/forms/LoginForm";
import { DesignPartnerForm } from "@/components/sections/design-partners/DesignPartnerForm";
import {
  FaArrowRight,
  FaRegCalendarCheck,
  FaRegCircleCheck,
  FaRegCircleUser,
  FaRegClock,
  FaRegEye,
  FaRegFileLines,
  FaShieldHalved,
} from "@/components/ui/icons";

export function DesignPartnerApplyContent() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-[#f8fafc]">
        <LoginSlimHeader />
        <div className="application-success text-center px-6 py-16 sm:py-24 max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-[#F0FDFA] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <svg
              className="w-10 h-10 text-teal"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-navy mb-4">
            Application Submitted
          </h2>
          <p className="text-navy text-base sm:text-lg max-w-md mx-auto mb-8 leading-relaxed">
            Thank you for your interest. Our team will review your application
            and contact you within 1 business day regarding the next steps.
          </p>
          <Link
            href="/"
            className="suricat-teal-btn hero-cta-hover inline-flex items-center justify-center gap-3 px-6 py-2.5 rounded-full font-semibold transition-all group text-navy"
          >
            Return to Home
            <FaArrowRight
              className="group-hover:translate-x-1 transition-transform duration-300"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section
        id="hero-section"
        className="w-full bg-navy relative overflow-hidden py-8 md:py-10 lg:py-12 min-h-0 lg:min-h-[500px] flex items-center justify-center text-white"
      >
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none"
          aria-hidden="true"
        />
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 lg:py-0 relative z-10 flex flex-col items-center justify-center text-center">
          <p className="text-teal font-bold text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 animate-fade-up-2">
            Design Partner Application
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-[36px] font-bold !leading-[32px] sm:!leading-[44px] mb-3 sm:mb-4 tracking-tight max-w-4xl animate-fade-up-2">
            Become a <span className="text-teal">Design Partner</span>
          </h1>
          <p className="text-white text-base sm:text-lg lg:text-[22px] font-normal !leading-[32px] mb-5 sm:mb-6 max-w-3xl mx-auto animate-fade-up-3">
            For medical device manufacturers evaluating documentation alignment,
            inspection readiness, and compliance operations.
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 animate-fade-up-3 max-w-5xl">
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-[12px] font-medium">
              <FaRegClock className="text-teal shrink-0 text-[12px]" aria-hidden="true" />
              Estimated time:{" "}
              <span className="text-teal font-semibold">5 minutes</span>
            </span>
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-[12px] font-medium">
              <FaRegCalendarCheck
                className="text-teal shrink-0 text-[12px]"
                aria-hidden="true"
              />
              Reviewed within:{" "}
              <span className="text-teal font-semibold">1 business day</span>
            </span>
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-[12px] font-medium">
              <FaShieldHalved
                className="text-teal shrink-0 text-[12px]"
                aria-hidden="true"
              />
              Mutual NDA before documentation review
            </span>
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-[12px] font-medium">
              <FaRegCircleCheck
                className="text-teal shrink-0 text-[12px]"
                aria-hidden="true"
              />
              No obligation
            </span>
          </div>
        </div>
      </section>

      <div className="application-main px-4 py-12 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <DesignPartnerForm onSubmitted={() => setSubmitted(true)} />

          {/* Trust Badges Footer */}
          <div className="mt-16 flex flex-col items-start gap-8 border-t border-gray-200 pt-12 md:flex-row md:flex-wrap md:justify-center md:gap-12">
            <div className="flex items-center gap-4">
              <FaRegEye className="text-2xl text-teal" aria-hidden="true" />
              <div>
                <h5 className="text-sm font-bold text-navy">
                  Read-only Deployment
                </h5>
                <p className="text-xs text-gray-500">
                  No system access
                  <br />
                  or data migration
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FaRegFileLines className="text-2xl text-teal" aria-hidden="true" />
              <div>
                <h5 className="text-sm font-bold text-navy">Mutual NDA</h5>
                <p className="text-xs text-gray-500">
                  Before documentation
                  <br />
                  review begins
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 shrink-0 text-teal"
                aria-hidden="true"
              >
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              </svg>
              <div>
                <h5 className="text-sm font-bold text-navy">No System Changes</h5>
                <p className="text-xs text-gray-500">
                  Works within your
                  <br />
                  existing environment
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FaRegCircleUser className="text-2xl text-teal" aria-hidden="true" />
              <div>
                <h5 className="text-sm font-bold text-navy">
                  Human Accountability
                </h5>
                <p className="text-xs text-gray-500">
                  Every finding remains
                  <br />
                  subject to human review
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-12">
            Suricat is building the leading Compliance Intelligence platform for
            medical device manufacturers.
            <br />
            Your partnership helps build it right.
          </p>
        </div>
      </div>

      <CtaBand />
    </>
  );
}
