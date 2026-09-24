"use client";

import {
  HomeNarrativeHeader,
  HomeNarrativeText,
} from "@/components/sections/home/HomeNarrativeHeader";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { useEffect, useRef, useState } from "react";

const CONTROLS = [
  "accountability",
  "evidence",
  "readOnly",
  "data",
  "noRipReplace",
] as const;

export function RegulatedEnvironmentsSection() {
  const t = useTranslations("home.regulated");
  const registerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = registerRef.current;
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
    <section
      id="designed-for-regulated-environments"
      className="bg-surface-muted px-6 pt-12 pb-10"
    >
      <div className="mx-auto max-w-7xl">
        <HomeNarrativeHeader eyebrow={t("sectionTitle")} title={t("headline")}>
          <HomeNarrativeText>{t("intro")}</HomeNarrativeText>
        </HomeNarrativeHeader>

        <div
          ref={registerRef}
          className={`regulated-register${inView ? " is-in" : ""}`}
        >
          {CONTROLS.map((id) => (
            <article
              key={id}
              className="regulated-control"
              onAnimationEnd={(event) => {
                if (event.animationName !== "regulated-control-in") return;
                event.currentTarget.classList.add("is-settled");
              }}
            >
              <p className="regulated-control-kind">{t(`cards.${id}.kind`)}</p>
              <h3 className="regulated-control-title">
                {t(`cards.${id}.title`)}
              </h3>
              <p className="regulated-control-body">{t(`cards.${id}.body`)}</p>
              <p className="regulated-control-residual">
                {t(`cards.${id}.residual`)}
              </p>
            </article>
          ))}
        </div>

        <p className="regulated-closer">{t("closer")}</p>
      </div>
    </section>
  );
}
