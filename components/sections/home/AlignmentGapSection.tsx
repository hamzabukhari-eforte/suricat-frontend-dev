"use client";

import {
  HomeNarrativeHeader,
  HomeNarrativeText,
} from "@/components/sections/home/HomeNarrativeHeader";
import { RequirementChangeFlow } from "@/components/sections/home/RequirementChangeFlow";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { Container } from "@/components/ui/Container";

export function AlignmentGapSection() {
  const t = useTranslations("home.alignmentGap");

  return (
    <section id="alignment-gap" className="bg-surface-muted pt-12 pb-6">
      <Container>
        <HomeNarrativeHeader eyebrow={t("sectionTitle")} title={t("headline")}>
          <HomeNarrativeText fullWidth>{t("lead")}</HomeNarrativeText>
          <HomeNarrativeText fullWidth>{t("p1")}</HomeNarrativeText>
          <p className="ag-emphasis-line">{t("p2")}</p>
        </HomeNarrativeHeader>

        <RequirementChangeFlow />
      </Container>
    </section>
  );
}
