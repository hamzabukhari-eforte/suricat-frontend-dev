"use client";

import { FaTimes } from "@/components/ui/icons";
import { useEffect, useState } from "react";

const STORAGE_KEY = "suricat-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = (value: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      id="cookie-banner"
      className="cookie-banner fixed inset-x-0 bottom-0 z-[100] bg-white px-6 py-6 lg:py-4"
      role="dialog"
      aria-label="Cookie consent"
    >
      <button
        type="button"
        onClick={() => dismiss("dismissed")}
        className="absolute right-4 top-4 cursor-pointer p-1 lg:right-6 lg:top-3"
        aria-label="Close cookie banner"
      >
        <FaTimes className="text-gray-400" aria-hidden="true" />
      </button>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 pr-6 lg:flex-row lg:items-center lg:pr-8">
        <p className="w-full max-w-4xl text-[11px] leading-relaxed text-gray-600 lg:min-w-0 lg:flex-1">
          This website uses cookies and other tracking technologies to enable
          our website functionalities, to enhance user experience, to display
          personalized advertisements, and/or to analyze performance and
          traffic. We may also share or sell information about your use of our
          site with our social media, advertising, and analytics partners to
          perform targeted advertising and to deliver ads and content that will
          be more relevant to you. You can exercise your rights to opt-in or
          opt-out of the sale of personal data and/or targeted advertising by
          updating your preferences. If we have detected an opt-out preference
          signal, we will honor it. Further information about our data
          processing is available in our{" "}
          <a href="#" className="cursor-pointer text-navy underline">
            Privacy Statement
          </a>
        </p>
        <div className="flex w-full flex-col items-center gap-3 lg:w-auto lg:shrink-0 lg:items-end">
          <a
            href="#"
            className="cursor-pointer text-center text-[11px] font-bold text-navy underline lg:text-right lg:whitespace-nowrap"
          >
            Opt out of sale of personal data and Targeted Advertising
          </a>
          <div className="flex flex-wrap items-center justify-center gap-4 whitespace-nowrap lg:justify-end">
            <button
              type="button"
              onClick={() => dismiss("rejected")}
              className="cookie-cta-btn"
            >
              Reject All
            </button>
            <button
              type="button"
              onClick={() => dismiss("accepted")}
              className="cookie-cta-btn"
            >
              Accept Cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
