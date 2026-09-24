"use client";

import { HomeNarrativeText } from "@/components/sections/home/HomeNarrativeHeader";
import { useTranslations } from "@/components/i18n/LocaleProvider";

const ENTRIES = ["quality", "regulatory", "inspections", "capas"] as const;

export function PractitionersSection() {
  const t = useTranslations("home.practitioners");

  return (
    <section id="built-by-practitioners" className="bg-white px-6 pt-12 pb-10">
      <div className="mx-auto max-w-7xl">
        <div className="practitioners-story">
          <div className="practitioners-copy">
            <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-teal">
              {t("sectionTitle")}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-semibold mb-4 sm:mb-6 leading-tight lg:leading-[36px] text-navy">
              {t("headline")}
            </h2>
            <HomeNarrativeText>{t("p1")}</HomeNarrativeText>
            <HomeNarrativeText>{t("p2")}</HomeNarrativeText>
            <HomeNarrativeText>{t("p3")}</HomeNarrativeText>
          </div>

          <aside
            className="practitioners-docket"
            aria-label={t("docketTitle")}
          >
            <header className="practitioners-docket-head">
              <p className="practitioners-docket-title">{t("docketTitle")}</p>
              <p className="practitioners-docket-meta">{t("docketMeta")}</p>
            </header>

            <ol className="practitioners-docket-list">
              {ENTRIES.map((id, index) => (
                <li key={id} className="practitioners-docket-row">
                  <span className="practitioners-docket-no">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="practitioners-docket-body">
                    <p className="practitioners-docket-name">
                      {t(`entries.${id}.title`)}
                    </p>
                    <p className="practitioners-docket-detail">
                      {t(`entries.${id}.detail`)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <footer className="practitioners-docket-foot">
              <p className="practitioners-docket-sign">{t("closer")}</p>
            </footer>
          </aside>
        </div>
      </div>
    </section>
  );
}
