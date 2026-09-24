export type SitemapLinkDef = {
  href: string;
  labelKey: string;
};

export type SitemapSectionDef = {
  titleKey: string;
  links: SitemapLinkDef[];
};

/** Human-readable HTML sitemap groups (public pages only). Labels via i18n keys. */
export const sitemapPageSections: SitemapSectionDef[] = [
  {
    titleKey: "main",
    links: [
      { href: "/", labelKey: "home" },
      { href: "/pricing", labelKey: "pricing" },
      { href: "/get-started", labelKey: "getStarted" },
      { href: "/readiness", labelKey: "readiness" },
      { href: "/design-partners", labelKey: "designPartners" },
      { href: "/login", labelKey: "login" },
    ],
  },
  {
    titleKey: "solutions",
    links: [
      {
        href: "/solutions/documentation-confidence",
        labelKey: "documentationConfidence",
      },
      {
        href: "/solutions/continuous-compliance",
        labelKey: "continuousCompliance",
      },
      {
        href: "/solutions/inspection-findings",
        labelKey: "inspectionFindings",
      },
      {
        href: "/solutions/change-impact-assessment",
        labelKey: "changeImpact",
      },
      {
        href: "/solutions/inspection-readiness",
        labelKey: "inspectionReadiness",
      },
      {
        href: "/solutions/document-alignment",
        labelKey: "documentAlignment",
      },
    ],
  },
  {
    titleKey: "industries",
    links: [
      { href: "/industries/medical-devices", labelKey: "medicalDevices" },
      { href: "/industries/expansion", labelKey: "industryExpansion" },
    ],
  },
  {
    titleKey: "pricing",
    links: [
      { href: "/pricing", labelKey: "pricingOverview" },
      { href: "/pricing/license", labelKey: "platformLicense" },
      { href: "/pricing/document-capacity", labelKey: "documentCapacity" },
      { href: "/pricing/capacity-expansion", labelKey: "capacityExpansion" },
      { href: "/pricing/interactive-sandbox", labelKey: "interactiveSandbox" },
      { href: "/pricing/start-with-evaluate", labelKey: "startWithEvaluate" },
      { href: "/pricing/faq", labelKey: "pricingFaqs" },
    ],
  },
  {
    titleKey: "company",
    links: [
      { href: "/company/our-story", labelKey: "ourStory" },
      { href: "/company/mission-vision", labelKey: "missionVision" },
      { href: "/company/leadership", labelKey: "leadership" },
      { href: "/contact", labelKey: "contactUs" },
    ],
  },
  {
    titleKey: "getInvolved",
    links: [
      { href: "/design-partners/apply", labelKey: "becomeDesignPartner" },
      { href: "/get-started", labelKey: "scheduleDiscussion" },
      { href: "/readiness", labelKey: "readinessDiscussion" },
    ],
  },
];
