"use client";

import { FormHero } from "@/components/sections/forms/FormHero";
import { ReadinessForm } from "@/components/sections/forms/ReadinessForm";
import { useTranslations } from "@/components/i18n/LocaleProvider";

export function ReadinessContent() {
  const t = useTranslations("forms.readiness");

  return (
    <>
      <FormHero
        eyebrow={t("heroEyebrow")}
        title={
          <>
            {t("heroTitleBefore")}{" "}
            <span className="text-teal">{t("heroTitleAccent")}</span>
          </>
        }
        paragraphs={[t("heroP1"), t("heroP2")]}
        complianceNote={t("complianceNote")}
        ctaLabel={t("heroCta")}
        ctaHref="#intake"
      />
      <ReadinessForm />
    </>
  );
}
