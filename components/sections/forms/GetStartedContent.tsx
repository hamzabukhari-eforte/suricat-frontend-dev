"use client";

import { FormHero } from "@/components/sections/forms/FormHero";
import { GetStartedForm } from "@/components/sections/forms/GetStartedForm";
import { useTranslations } from "@/components/i18n/LocaleProvider";

export function GetStartedContent() {
  const t = useTranslations("forms.getStarted");

  return (
    <>
      <FormHero
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
      <GetStartedForm />
    </>
  );
}
