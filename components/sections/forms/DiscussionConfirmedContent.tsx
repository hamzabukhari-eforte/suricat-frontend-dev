"use client";

import { FaArrowLeft, FaCircleInfo, FaRegCalendar, FaRegFileLines, FaRegUser } from "@/components/ui/icons";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type Summary = {
  name: string;
  email: string;
  company: string;
  date: string;
  time: string;
  timeline: string;
  priority: string;
};

const DEFAULTS: Summary = {
  name: "Shahzad",
  email: "shahzad@suricat.com",
  company: "eForte Solutions Inc.",
  date: "Tuesday, June 30, 2026",
  time: "4:00 PM",
  timeline: "Within 90 Days",
  priority: "Inspection Readiness",
};

function readSession(): Partial<Summary> {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem("suricat-discussion");
    if (!raw) return {};
    const data = JSON.parse(raw) as Record<string, string>;
    return {
      name: data.name,
      email: data.email,
      company: data.company,
      date: data.date,
      time: data.time,
      timeline: data.timeline,
      priority: data.priority,
    };
  } catch {
    return {};
  }
}

export function DiscussionConfirmedContent() {
  const searchParams = useSearchParams();

  const summary = useMemo(() => {
    const fromQuery: Partial<Summary> = {
      name: searchParams.get("name")?.trim() || undefined,
      email: searchParams.get("email")?.trim() || undefined,
      company: searchParams.get("company")?.trim() || undefined,
      date: searchParams.get("date")?.trim() || undefined,
      time: searchParams.get("time")?.trim() || undefined,
      timeline: searchParams.get("timeline")?.trim() || undefined,
      priority: searchParams.get("priority")?.trim() || undefined,
    };
    const fromSession = readSession();
    return { ...DEFAULTS, ...fromSession, ...fromQuery };
  }, [searchParams]);

  const scheduled =
    summary.date && summary.time
      ? `${summary.date} | ${summary.time}`
      : summary.date || summary.time || DEFAULTS.date;

  const contact = [summary.email, summary.company].filter(Boolean).join(" | ");
  const focusTags = [summary.timeline, summary.priority].filter(Boolean);

  return (
    <section className="py-8 w-full bg-[#f5f7fa] min-h-[70vh]">
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-[4px] shadow-[0_8px_60px_rgba(0,0,0,0.08)] border border-gray-100 px-8 lg:px-12 py-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4">
            <svg
              className="conf-anim w-16 h-16"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle className="conf-bg" cx="20" cy="20" r="20" fill="#19D3C5" />
              <path
                className="conf-cal"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.625 11.4707C17.0926 11.4707 17.4688 11.8469 17.4688 12.3145V13.7207H22.5312V12.3145C22.5312 11.8469 22.9074 11.4707 23.375 11.4707C23.8426 11.4707 24.2188 11.8469 24.2188 12.3145V13.7207H25.625C26.866 13.7207 27.875 14.7297 27.875 15.9707V16.5332V18.2207V27.2207C27.875 28.4617 26.866 29.4707 25.625 29.4707H14.375C13.134 29.4707 12.125 28.4617 12.125 27.2207V18.2207V16.5332V15.9707C12.125 14.7297 13.134 13.7207 14.375 13.7207H15.7812V12.3145C15.7812 11.8469 16.1574 11.4707 16.625 11.4707ZM26.1875 18.2207H13.8125V27.2207C13.8125 27.5301 14.0656 27.7832 14.375 27.7832H25.625C25.9344 27.7832 26.1875 27.5301 26.1875 27.2207V18.2207Z"
                fill="white"
              />
              <path
                className="conf-check"
                d="M16.4 23.4L18.9 25.7L23.6 20.9"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
          <h1
            className="conf-reveal text-[28px] font-extrabold text-teal mb-3 tracking-tight"
            style={{ animationDelay: "0.15s" }}
          >
            Your Discussion Is Confirmed
          </h1>
          <p
            className="conf-reveal text-navy font-semibold text-lg mb-3"
            style={{ animationDelay: "0.25s" }}
          >
            Thank you for scheduling time with us.
          </p>
          <p
            className="conf-reveal text-navy text-sm leading-relaxed mb-3 max-w-xl mx-auto"
            style={{ animationDelay: "0.35s" }}
          >
            Our team will review your responses before the discussion so we can
            focus on understanding your priorities and exploring next steps
            together.
          </p>
          <p
            className="conf-reveal text-navy font-medium text-base mb-6"
            style={{ animationDelay: "0.45s" }}
          >
            We look forward to the conversation.
          </p>

          <div
            className="conf-reveal border border-gray-200 rounded-[4px] text-left overflow-hidden mb-6"
            style={{ animationDelay: "0.55s" }}
          >
            <div className="bg-gray-50 border-b border-gray-200 px-5 py-2">
              <p className="text-sm font-bold text-navy uppercase tracking-widest">
                Confirmation Summary
              </p>
            </div>
            <div className="divide-y divide-gray-100">
              <div className="flex items-start gap-3 px-5 py-3">
                <span className="w-8 h-8 rounded-full bg-[#E8F8F7] inline-flex items-center justify-center shrink-0">
                  <FaRegCalendar className="text-teal text-sm" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[12px] font-bold text-navy uppercase tracking-widest mb-1">
                    Scheduled Time
                  </p>
                  <p className="text-sm font-medium text-navy">{scheduled}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 px-5 py-3">
                <span className="w-8 h-8 rounded-full bg-[#E8F8F7] inline-flex items-center justify-center shrink-0">
                  <FaRegUser className="text-teal text-sm" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[12px] font-bold text-navy uppercase tracking-widest mb-1">
                    Your Details
                  </p>
                  <p className="text-sm font-medium text-navy">{summary.name}</p>
                  <p className="text-xs text-navy mt-0.5">{contact}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 px-5 py-3">
                <span className="w-8 h-8 rounded-full bg-[#E8F8F7] inline-flex items-center justify-center shrink-0">
                  <FaRegFileLines className="text-teal text-sm" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[12px] font-bold text-navy uppercase tracking-widest mb-2">
                    Discussion Focus
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {focusTags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium text-navy bg-gray-100 border border-gray-200 rounded-full px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="conf-reveal flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-[4px] px-4 py-3 text-left mb-6"
            style={{ animationDelay: "0.65s" }}
          >
            <FaCircleInfo className="text-navy text-sm mt-0.5" aria-hidden="true" />
            <p className="text-xs text-navy leading-relaxed">
              A calendar invitation has been sent to{" "}
              <a
                href={`mailto:${summary.email}`}
                className="text-teal font-bold underline"
              >
                {summary.email}
              </a>
              . Our team will reach out if any additional preparation is needed
              before your session.
            </p>
          </div>

          <div
            className="conf-reveal flex flex-col sm:flex-row gap-3 justify-center"
            style={{ animationDelay: "0.75s" }}
          >
            <Link
              href="/"
              className="suricat-teal-btn group inline-flex items-center justify-center gap-2 font-bold px-7 py-3 rounded-full text-sm transition-all"
            >
              <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform duration-300" aria-hidden="true" />
              Return to Website
            </Link>
          </div>
        </div>
        <p
          className="conf-reveal text-center text-navy text-xs mt-4"
          style={{ animationDelay: "0.85s" }}
        >
          Built for Medical Device Manufacturers operating under FDA QMSR and ISO
          13485.
        </p>
      </div>
    </section>
  );
}
