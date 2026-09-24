"use client";

import {
  HomeNarrativeHeader,
  HomeNarrativeText,
} from "@/components/sections/home/HomeNarrativeHeader";
import {
  FaArrowRight,
  FaFolderOpen,
  FaLink,
  FaRotate,
  FaShareNodes,
} from "@/components/ui/icons";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";

const QUESTIONS: { id: "q1" | "q2" | "q3" | "q4"; icon: IconType }[] = [
  { id: "q1", icon: FaRotate },
  { id: "q2", icon: FaShareNodes },
  { id: "q3", icon: FaLink },
  { id: "q4", icon: FaFolderOpen },
];

export function AlignmentGapSection() {
  const t = useTranslations("home.alignmentGap");

  return (
    <section id="alignment-gap" className="bg-surface-muted px-6 pt-12 pb-10">
      <div className="mx-auto max-w-7xl">
        <HomeNarrativeHeader eyebrow={t("sectionTitle")} title={t("headline")}>
          <HomeNarrativeText>{t("lead")}</HomeNarrativeText>
          <HomeNarrativeText>{t("p1")}</HomeNarrativeText>
          <HomeNarrativeText>{t("p2")}</HomeNarrativeText>
        </HomeNarrativeHeader>

        <p className="mb-6 max-w-4xl text-base font-semibold leading-relaxed text-navy sm:text-lg lg:text-[20px] lg:leading-[28px]">
          {t("questionsIntro")}
        </p>

        <div className="alignment-gap-qa">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {QUESTIONS.map(({ id, icon: Icon }) => (
              <article key={id} className="alignment-question-card">
                <div className="alignment-question-card-icon">
                  <Icon aria-hidden="true" />
                </div>
                <p className="alignment-question-card-text">
                  {t(`questions.${id}`)}
                </p>
              </article>
            ))}
          </div>

          <div className="alignment-gap-bridge" aria-hidden="true">
            <span className="alignment-gap-bridge-stems">
              <span />
              <span />
              <span />
              <span />
            </span>
            <span className="alignment-gap-bridge-line" />
            <span className="alignment-gap-bridge-arrow" />
          </div>

          <div className="alignment-gap-closer">
            <div className="alignment-gap-closer-copy">
              <p className="alignment-gap-answer-label">{t("answerLabel")}</p>
              <p className="alignment-gap-closer-text">
                <Image
                  src="/assets/images/suricat-logo-mark.png"
                  alt=""
                  width={36}
                  height={36}
                  className="alignment-gap-closer-mark"
                  aria-hidden="true"
                />
                <span>{t("closer")}</span>
              </p>
            </div>
            <Link href="/get-started" className="alignment-gap-cta group">
              {t("cta")}
              <FaArrowRight
                className="text-sm transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
