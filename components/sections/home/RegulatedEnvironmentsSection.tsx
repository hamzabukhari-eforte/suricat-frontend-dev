"use client";

import {
  HomeNarrativeHeader,
  HomeNarrativeText,
} from "@/components/sections/home/HomeNarrativeHeader";
import {
  FaFileShield,
  FaPlug,
  FaServer,
  FaShieldHalved,
  FaUsers,
} from "@/components/ui/icons";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import type { IconType } from "react-icons";
import { Container } from "@/components/ui/Container";

const FEATURED = {
  id: "accountability" as const,
  Icon: FaUsers,
};

const GRID_CARDS: { id: "noRipReplace" | "readOnly" | "data" | "dedicated"; Icon: IconType }[] = [
  { id: "noRipReplace", Icon: FaPlug },
  { id: "readOnly", Icon: FaFileShield },
  { id: "data", Icon: FaShieldHalved },
  { id: "dedicated", Icon: FaServer },
];

export function RegulatedEnvironmentsSection() {
  const t = useTranslations("home.regulated");
  const FeaturedIcon = FEATURED.Icon;

  return (
    <section
      id="designed-for-regulated-environments"
      className="bg-surface-muted pt-12 pb-10"
    >
      <Container>
        <HomeNarrativeHeader eyebrow={t("sectionTitle")} title={t("headline")}>
          <HomeNarrativeText>{t("intro")}</HomeNarrativeText>
        </HomeNarrativeHeader>

        <div className="regulated-bento">
          <article className="regulated-bento-featured">
            <div className="regulated-bento-featured-glow" aria-hidden="true" />
            <div className="regulated-bento-featured-orb regulated-bento-featured-orb-a" aria-hidden="true" />
            <div className="regulated-bento-featured-orb regulated-bento-featured-orb-b" aria-hidden="true" />

            <div className="regulated-bento-featured-inner">
              <p className="regulated-bento-featured-kicker">
                {t("featuredLabel")}
              </p>

              <span className="regulated-bento-featured-icon" aria-hidden="true">
                <span className="regulated-bento-featured-icon-ring" />
                <FeaturedIcon />
              </span>

              <h3 className="regulated-bento-featured-title">
                {t(`cards.${FEATURED.id}.title`)}
              </h3>

              <p className="regulated-bento-featured-body">
                {t(`cards.${FEATURED.id}.body`)}
              </p>

              <p className="regulated-bento-featured-footnote">
                {t("featuredFootnote")}
              </p>
            </div>
          </article>

          <div className="regulated-bento-grid">
            {GRID_CARDS.map(({ id, Icon }) => (
              <article key={id} className="regulated-bento-card">
                <span className="regulated-bento-card-icon" aria-hidden="true">
                  <Icon />
                </span>
                <h3 className="regulated-bento-card-title">
                  {t(`cards.${id}.title`)}
                </h3>
                <p className="regulated-bento-card-body">
                  {t(`cards.${id}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
