"use client";

import {
  HomeNarrativeHeader,
  HomeNarrativeText,
} from "@/components/sections/home/HomeNarrativeHeader";
import { FaArrowRight } from "@/components/ui/icons";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ROWS = [
  { from: "evidence", to: "gaps" },
  { from: "reconciliation", to: "impact" },
  { from: "traceability", to: "prepared" },
] as const;

const SEE = ["changed", "affected", "evidence", "attention"] as const;

export function WhySuricatSection() {
  const t = useTranslations("home.why");
  const boardRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = boardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="why-suricat" className="bg-white pt-12">
      <div className="mx-auto max-w-7xl px-6">
        <HomeNarrativeHeader eyebrow={t("sectionTitle")} title={t("headline")}>
          <HomeNarrativeText>{t("intro")}</HomeNarrativeText>
        </HomeNarrativeHeader>

        <div
          ref={boardRef}
          className={`why-attention${inView ? " is-in" : ""}`}
          aria-label={t("boardAria")}
        >
          <div className="why-attention-head" aria-hidden="true">
            <p className="why-attention-label is-from">{t("lessLabel")}</p>
            <p className="why-attention-label is-to">{t("moreLabel")}</p>
          </div>

          <ul className="why-attention-rows">
            {ROWS.map((row) => (
              <li key={row.from} className="why-attention-row">
                <div className="why-attention-cell is-from">
                  <p className="why-attention-cell-label">{t("lessLabel")}</p>
                  <h3 className="why-attention-title">
                    {t(`cards.${row.from}.title`)}
                  </h3>
                  <p className="why-attention-body">
                    {t(`cards.${row.from}.body`)}
                  </p>
                </div>

                <div className="why-attention-cell is-to">
                  <p className="why-attention-cell-label">{t("moreLabel")}</p>
                  <h3 className="why-attention-title">
                    {t(`cards.${row.to}.title`)}
                  </h3>
                  <p className="why-attention-body">
                    {t(`cards.${row.to}.body`)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="why-close">
        <div className="why-close-inner">
          <div className="why-close-split">
            <div className="why-close-copy">
              <p className="why-close-lead">{t("closingLead")}</p>
              <p className="why-close-accent">{t("closingAccent")}</p>
              <p className="why-close-body">{t("closingBody")}</p>
              <ul className="why-close-see">
                {SEE.map((id) => (
                  <li key={id}>{t(`see.${id}`)}</li>
                ))}
              </ul>
            </div>

            <div className="why-close-evaluate">
              <p className="why-close-pilot">{t("pilotPrompt")}</p>
              <Link
                href="/get-started"
                className="suricat-teal-btn why-close-cta group"
              >
                {t("pilotCta")}
                <FaArrowRight
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
