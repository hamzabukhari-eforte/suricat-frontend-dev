"use client";

import {
  HomeNarrativeHeader,
  HomeNarrativeText,
} from "@/components/sections/home/HomeNarrativeHeader";
import { FaArrowRight } from "@/components/ui/icons";
import {
  ControlIcon,
  DesignIcon,
  EvidenceIcon,
  ProcedureIcon,
  RequirementIcon,
  RiskIcon,
  TrainingIcon,
  VvIcon,
} from "@/components/sections/home/ChangeImpactIcons";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import Link from "next/link";
import type { ReactNode } from "react";

const CHAIN: {
  id:
    | "requirement"
    | "procedure"
    | "risk"
    | "control"
    | "design"
    | "vv"
    | "training"
    | "evidence";
  icon: () => ReactNode;
}[] = [
  { id: "requirement", icon: RequirementIcon },
  { id: "procedure", icon: ProcedureIcon },
  { id: "risk", icon: RiskIcon },
  { id: "control", icon: ControlIcon },
  { id: "design", icon: DesignIcon },
  { id: "vv", icon: VvIcon },
  { id: "training", icon: TrainingIcon },
  { id: "evidence", icon: EvidenceIcon },
];

export function ChangeImpactSection() {
  const t = useTranslations("home.changeImpact");

  return (
    <section id="change-impact" className="bg-white px-6 pt-12 pb-10">
      <div className="mx-auto max-w-7xl">
        <HomeNarrativeHeader eyebrow={t("sectionTitle")} title={t("headline")}>
          <HomeNarrativeText>{t("lead")}</HomeNarrativeText>
          <HomeNarrativeText>{t("p1")}</HomeNarrativeText>
        </HomeNarrativeHeader>

        <div className="change-impact-infographic">
          <p className="change-impact-process-label">{t("processLabel")}</p>
          <div className="change-impact-track">
            <span className="change-impact-rail" aria-hidden="true" />
            <span className="change-impact-flow-dot" aria-hidden="true" />
            {CHAIN.map(({ id, icon: Icon }) => (
              <div key={id} className="change-impact-step">
                <div className="change-impact-node">
                  <div className="change-impact-step-icon" tabIndex={0}>
                    <Icon aria-hidden="true" />
                    <span className="change-impact-tooltip" role="tooltip">
                      {t(`tooltips.${id}`)}
                    </span>
                  </div>
                </div>
                <p className="change-impact-step-label">{t(`chain.${id}`)}</p>
              </div>
            ))}
          </div>
          <p className="change-impact-caption">{t("p2")}</p>
          <div className="change-impact-footer">
            <p className="change-impact-closer">{t("closer")}</p>
            <Link
              href="/get-started"
              className="change-impact-cta group"
            >
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
