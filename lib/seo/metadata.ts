import type { Metadata } from "next";

const SITE_NAME = "Suricat";
const DEFAULT_DESCRIPTION =
  "Suricat is the Compliance Intelligence Platform for highly regulated industries — read-only by design, built for inspection-ready documentation confidence.";

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
  const desc = description ?? DEFAULT_DESCRIPTION;
  const fullTitle = absoluteTitle ? title : title;

  return {
    title: absoluteTitle
      ? { absolute: fullTitle }
      : fullTitle,
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

export const pageSeo = {
  home: buildPageMetadata({
    title: "Suricat | The Compliance Intelligence Platform",
    description:
      "The Compliance Intelligence Platform built for highly regulated industries. Gain inspection-ready confidence with read-only compliance intelligence.",
    path: "/",
    absoluteTitle: true,
  }),
  pricing: buildPageMetadata({
    title: "Pricing",
    description:
      "Published Suricat pricing for Platform License and Document Capacity subscriptions — no per-seat fees, with flexible evaluation paths.",
    path: "/pricing",
  }),
  pricingFaq: buildPageMetadata({
    title: "Pricing FAQs",
    description:
      "Answers to common questions about Suricat platform licensing, document capacity, evaluation, and subscription options.",
    path: "/pricing/faq",
  }),
  license: buildPageMetadata({
    title: "Platform License",
    description:
      "Learn how Suricat Platform License works for regulated organizations seeking compliance intelligence.",
    path: "/pricing/license",
  }),
  documentCapacity: buildPageMetadata({
    title: "Document Capacity",
    description:
      "Understand Suricat Document Capacity subscriptions and how capacity scales with your documentation footprint.",
    path: "/pricing/document-capacity",
  }),
  capacityExpansion: buildPageMetadata({
    title: "Capacity Expansion",
    description:
      "Expand your Suricat document capacity as your regulated documentation needs grow.",
    path: "/pricing/capacity-expansion",
  }),
  interactiveSandbox: buildPageMetadata({
    title: "Interactive Sandbox",
    description:
      "Explore Suricat in an interactive sandbox environment before committing to a full deployment.",
    path: "/pricing/interactive-sandbox",
  }),
  startWithEvaluate: buildPageMetadata({
    title: "Start With Evaluate",
    description:
      "Start with Suricat Evaluate to assess compliance intelligence value for your organization.",
    path: "/pricing/start-with-evaluate",
  }),
  continuousCompliance: buildPageMetadata({
    title: "Continuous Compliance",
    description:
      "Maintain continuous compliance visibility with Suricat's compliance intelligence layer.",
    path: "/solutions/continuous-compliance",
  }),
  documentationConfidence: buildPageMetadata({
    title: "Documentation Confidence",
    description:
      "Build documentation confidence with Suricat — defensible, inspection-ready documentation intelligence.",
    path: "/solutions/documentation-confidence",
  }),
  inspectionFindings: buildPageMetadata({
    title: "Inspection-Defensible Findings",
    description:
      "Produce inspection-defensible findings with Suricat's bounded reasoning and regulatory ontology.",
    path: "/solutions/inspection-findings",
  }),
  changeImpact: buildPageMetadata({
    title: "Change Impact Assessment",
    description:
      "Assess change impact across regulated documentation and systems with Suricat.",
    path: "/solutions/change-impact-assessment",
  }),
  inspectionReadiness: buildPageMetadata({
    title: "Inspection Readiness",
    description:
      "Improve inspection readiness with Suricat compliance intelligence for regulated organizations.",
    path: "/solutions/inspection-readiness",
  }),
  documentAlignment: buildPageMetadata({
    title: "Documentation Alignment",
    description:
      "Align documentation across systems and processes with Suricat's compliance intelligence.",
    path: "/solutions/document-alignment",
  }),
  medicalDevices: buildPageMetadata({
    title: "Medical Devices",
    description:
      "Suricat for medical device manufacturers — compliance intelligence built for QMSR and inspection readiness.",
    path: "/industries/medical-devices",
  }),
  industryExpansion: buildPageMetadata({
    title: "Industry Expansion",
    description:
      "How Suricat expands across biotechnology, biopharma, diagnostics, and other regulated industries.",
    path: "/industries/expansion",
  }),
  ourStory: buildPageMetadata({
    title: "Our Story",
    description:
      "The story behind Suricat — built by practitioners for highly regulated industries.",
    path: "/company/our-story",
  }),
  missionVision: buildPageMetadata({
    title: "Mission and Vision",
    description:
      "Suricat's mission and vision for compliance intelligence in regulated environments.",
    path: "/company/mission-vision",
  }),
  leadership: buildPageMetadata({
    title: "Leadership",
    description:
      "Meet the Suricat leadership team building the Compliance Intelligence Platform.",
    path: "/company/leadership",
  }),
  contact: buildPageMetadata({
    title: "Contact Us",
    description:
      "Contact the Suricat team to discuss compliance intelligence for your organization.",
    path: "/contact",
  }),
  designPartners: buildPageMetadata({
    title: "Design Partners",
    description:
      "Join Suricat's design partner program and help shape compliance intelligence for regulated industries.",
    path: "/design-partners",
  }),
  designPartnersApply: buildPageMetadata({
    title: "Design Partner Application",
    description:
      "Apply to become a Suricat design partner and collaborate on the Compliance Intelligence Platform.",
    path: "/design-partners/apply",
  }),
  getStarted: buildPageMetadata({
    title: "Get Started",
    description:
      "Get started with Suricat — schedule a discussion about compliance intelligence for your organization.",
    path: "/get-started",
  }),
  readiness: buildPageMetadata({
    title: "Check Your Readiness",
    description:
      "Check your QMSR and inspection readiness with Suricat's readiness assessment.",
    path: "/readiness",
  }),
  discussionConfirmed: buildPageMetadata({
    title: "Discussion Confirmed",
    description:
      "Your Suricat discussion is confirmed. Review your scheduled details and next steps.",
    path: "/discussion-confirmed",
  }),
  login: buildPageMetadata({
    title: "Login",
    description: "Sign in to your Suricat account.",
    path: "/login",
  }),
};
