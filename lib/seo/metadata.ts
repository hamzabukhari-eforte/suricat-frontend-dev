import type { Metadata } from "next";
import { getTranslator } from "@/lib/i18n/server";

const SITE_NAME = "Suricat";

export type PageSeoKey =
  | "home"
  | "pricing"
  | "pricingFaq"
  | "license"
  | "documentCapacity"
  | "capacityExpansion"
  | "interactiveSandbox"
  | "startWithEvaluate"
  | "continuousCompliance"
  | "documentationConfidence"
  | "inspectionFindings"
  | "changeImpact"
  | "inspectionReadiness"
  | "documentAlignment"
  | "medicalDevices"
  | "industryExpansion"
  | "ourStory"
  | "missionVision"
  | "leadership"
  | "contact"
  | "designPartners"
  | "designPartnersApply"
  | "getStarted"
  | "readiness"
  | "discussionConfirmed"
  | "login"
  | "sitemap";

const pagePaths: Record<PageSeoKey, string> = {
  home: "/",
  pricing: "/pricing",
  pricingFaq: "/pricing/faq",
  license: "/pricing/license",
  documentCapacity: "/pricing/document-capacity",
  capacityExpansion: "/pricing/capacity-expansion",
  interactiveSandbox: "/pricing/interactive-sandbox",
  startWithEvaluate: "/pricing/start-with-evaluate",
  continuousCompliance: "/solutions/continuous-compliance",
  documentationConfidence: "/solutions/documentation-confidence",
  inspectionFindings: "/solutions/inspection-findings",
  changeImpact: "/solutions/change-impact-assessment",
  inspectionReadiness: "/solutions/inspection-readiness",
  documentAlignment: "/solutions/document-alignment",
  medicalDevices: "/industries/medical-devices",
  industryExpansion: "/industries/expansion",
  ourStory: "/company/our-story",
  missionVision: "/company/mission-vision",
  leadership: "/company/leadership",
  contact: "/contact",
  designPartners: "/design-partners",
  designPartnersApply: "/design-partners/apply",
  getStarted: "/get-started",
  readiness: "/readiness",
  discussionConfirmed: "/discussion-confirmed",
  login: "/login",
  sitemap: "/sitemap",
};

const absoluteTitleKeys = new Set<PageSeoKey>(["home"]);

export function buildPageMetadata({
  title,
  description,
  path = "/",
  absoluteTitle = false,
}: {
  title: string;
  description?: string;
  path?: string;
  absoluteTitle?: boolean;
}): Metadata {
  const desc = description ?? "";
  const fullTitle = title;

  return {
    title: absoluteTitle ? { absolute: fullTitle } : fullTitle,
    description: desc,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: absoluteTitle ? fullTitle : `${fullTitle} | ${SITE_NAME}`,
      description: desc,
      url: path,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: absoluteTitle ? fullTitle : `${fullTitle} | ${SITE_NAME}`,
      description: desc,
    },
  };
}

/** Locale-aware page metadata from the active cookie dictionary. */
export async function getPageMetadata(key: PageSeoKey): Promise<Metadata> {
  const { t } = await getTranslator();
  const title = t(`metadata.${key}.title`);
  const description = t(`metadata.${key}.description`);
  return buildPageMetadata({
    title,
    description,
    path: pagePaths[key],
    absoluteTitle: absoluteTitleKeys.has(key),
  });
}
