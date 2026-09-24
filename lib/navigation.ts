import { HOME_SECTION_IDS, platformTabHref } from "@/lib/homeHashes";
import type { Translator } from "@/lib/i18n/types";

export type NavLink = {
  label: string;
  href: string;
};

/** Match nav hrefs against the current path + hash (pages and in-page sections). */
export function isNavHrefActive(
  href: string,
  pathname: string,
  hash: string,
): boolean {
  const hashIndex = href.indexOf("#");
  const pathPart = hashIndex === -1 ? href : href.slice(0, hashIndex);
  const hashPart = hashIndex === -1 ? "" : href.slice(hashIndex);
  const normalizedPath = pathPart === "" ? "/" : pathPart;

  if (hashPart) {
    if (normalizedPath !== "/" && pathname !== normalizedPath) return false;
    if (normalizedPath === "/" && pathname !== "/") return false;
    return hash === hashPart;
  }

  return pathname === normalizedPath;
}

export type MegaMenuItem = {
  id: string;
  label: string;
  intro: {
    title: string;
    text: string;
    ctaLabel: string;
    ctaHref: string;
  };
  links: NavLink[];
  linkColumns?: number;
};

type MegaMenuDef = {
  id: string;
  labelKey: string;
  intro: {
    titleKey: string;
    textKey: string;
    ctaLabelKey: string;
    ctaHref: string;
  };
  links: { labelKey: string; href: string }[];
  linkColumns?: number;
};

const megaMenuDefs: MegaMenuDef[] = [
  {
    id: "why",
    labelKey: "nav.menus.why.label",
    intro: {
      titleKey: "nav.menus.why.introTitle",
      textKey: "nav.menus.why.introText",
      ctaLabelKey: "nav.menus.why.ctaLabel",
      ctaHref: `/#${HOME_SECTION_IDS.why}`,
    },
    links: [
      {
        labelKey: "nav.menus.why.links.costOfMisalignment",
        href: `/#${HOME_SECTION_IDS.costOfMisalignment}`,
      },
      {
        labelKey: "nav.menus.why.links.alignmentGap",
        href: `/#${HOME_SECTION_IDS.alignmentGap}`,
      },
      {
        labelKey: "nav.menus.why.links.changeImpact",
        href: `/#${HOME_SECTION_IDS.changeImpact}`,
      },
      {
        labelKey: "nav.menus.why.links.existingSystems",
        href: `/#${HOME_SECTION_IDS.platform}`,
      },
      {
        labelKey: "nav.menus.why.links.practitioners",
        href: `/#${HOME_SECTION_IDS.practitioners}`,
      },
      {
        labelKey: "nav.menus.why.links.regulated",
        href: `/#${HOME_SECTION_IDS.regulated}`,
      },
      {
        labelKey: "nav.menus.why.links.whySuricat",
        href: `/#${HOME_SECTION_IDS.why}`,
      },
    ],
    linkColumns: 2,
  },
  {
    id: "platform",
    labelKey: "nav.menus.platform.label",
    intro: {
      titleKey: "nav.menus.platform.introTitle",
      textKey: "nav.menus.platform.introText",
      ctaLabelKey: "nav.menus.platform.ctaLabel",
      ctaHref: `/#${HOME_SECTION_IDS.platform}`,
    },
    links: [
      {
        labelKey: "nav.menus.platform.links.intelligenceLayer",
        href: platformTabHref(0),
      },
      { labelKey: "nav.menus.platform.links.readOnly", href: platformTabHref(1) },
      {
        labelKey: "nav.menus.platform.links.noRipReplace",
        href: platformTabHref(2),
      },
      {
        labelKey: "nav.menus.platform.links.humanAccountability",
        href: platformTabHref(3),
      },
      {
        labelKey: "nav.menus.platform.links.deployment",
        href: platformTabHref(4),
      },
      {
        labelKey: "nav.menus.platform.links.regulatoryOntology",
        href: platformTabHref(5),
      },
      {
        labelKey: "nav.menus.platform.links.canonicalSchema",
        href: platformTabHref(6),
      },
      { labelKey: "nav.menus.platform.links.qvr", href: platformTabHref(7) },
      {
        labelKey: "nav.menus.platform.links.boundedReasoning",
        href: platformTabHref(8),
      },
    ],
    linkColumns: 3,
  },
  {
    id: "solutions",
    labelKey: "nav.menus.solutions.label",
    intro: {
      titleKey: "nav.menus.solutions.introTitle",
      textKey: "nav.menus.solutions.introText",
      ctaLabelKey: "nav.menus.solutions.ctaLabel",
      ctaHref: "/solutions/documentation-confidence",
    },
    links: [
      {
        labelKey: "nav.menus.solutions.links.documentationConfidence",
        href: "/solutions/documentation-confidence",
      },
      {
        labelKey: "nav.menus.solutions.links.continuousCompliance",
        href: "/solutions/continuous-compliance",
      },
      {
        labelKey: "nav.menus.solutions.links.inspectionFindings",
        href: "/solutions/inspection-findings",
      },
      {
        labelKey: "nav.menus.solutions.links.changeImpact",
        href: "/solutions/change-impact-assessment",
      },
      {
        labelKey: "nav.menus.solutions.links.inspectionReadiness",
        href: "/solutions/inspection-readiness",
      },
      {
        labelKey: "nav.menus.solutions.links.documentAlignment",
        href: "/solutions/document-alignment",
      },
    ],
    linkColumns: 2,
  },
  {
    id: "company",
    labelKey: "nav.menus.company.label",
    intro: {
      titleKey: "nav.menus.company.introTitle",
      textKey: "nav.menus.company.introText",
      ctaLabelKey: "nav.menus.company.ctaLabel",
      ctaHref: "/company/our-story",
    },
    links: [
      {
        labelKey: "nav.menus.company.links.ourStory",
        href: "/company/our-story",
      },
      {
        labelKey: "nav.menus.company.links.missionVision",
        href: "/company/mission-vision",
      },
      {
        labelKey: "nav.menus.company.links.leadership",
        href: "/company/leadership",
      },
      { labelKey: "nav.menus.company.links.contactUs", href: "/contact" },
    ],
    linkColumns: 2,
  },
];

export function buildMegaMenus(t: Translator): MegaMenuItem[] {
  return megaMenuDefs.map((menu) => ({
    id: menu.id,
    label: t(menu.labelKey),
    intro: {
      title: t(menu.intro.titleKey),
      text: t(menu.intro.textKey),
      ctaLabel: t(menu.intro.ctaLabelKey),
      ctaHref: menu.intro.ctaHref,
    },
    links: menu.links.map((link) => ({
      label: t(link.labelKey),
      href: link.href,
    })),
    linkColumns: menu.linkColumns,
  }));
}

export function buildFooterTopLinks(t: Translator): NavLink[] {
  return [
    { label: t("nav.menus.why.label"), href: `/#${HOME_SECTION_IDS.why}` },
    {
      label: t("nav.menus.platform.label"),
      href: `/#${HOME_SECTION_IDS.platform}`,
    },
    {
      label: t("nav.menus.solutions.label"),
      href: "/solutions/documentation-confidence",
    },
    {
      label: t("nav.menus.company.label"),
      href: "/company/our-story",
    },
  ];
}

export function buildFooterCompanyLinks(t: Translator): NavLink[] {
  return [
    {
      label: t("nav.menus.company.links.ourStory"),
      href: "/company/our-story",
    },
    {
      label: t("nav.menus.company.links.missionVision"),
      href: "/company/mission-vision",
    },
    {
      label: t("nav.menus.company.links.leadership"),
      href: "/company/leadership",
    },
    { label: t("footer.contactUs"), href: "/contact" },
  ];
}

export function buildFooterWhyLinks(t: Translator): NavLink[] {
  return [
    {
      label: t("nav.menus.why.links.costOfMisalignment"),
      href: `/#${HOME_SECTION_IDS.costOfMisalignment}`,
    },
    {
      label: t("nav.menus.why.links.alignmentGap"),
      href: `/#${HOME_SECTION_IDS.alignmentGap}`,
    },
    {
      label: t("nav.menus.why.links.changeImpact"),
      href: `/#${HOME_SECTION_IDS.changeImpact}`,
    },
    {
      label: t("nav.menus.why.links.existingSystems"),
      href: `/#${HOME_SECTION_IDS.platform}`,
    },
    {
      label: t("nav.menus.why.links.practitioners"),
      href: `/#${HOME_SECTION_IDS.practitioners}`,
    },
    {
      label: t("nav.menus.why.links.regulated"),
      href: `/#${HOME_SECTION_IDS.regulated}`,
    },
    {
      label: t("nav.menus.why.links.whySuricat"),
      href: `/#${HOME_SECTION_IDS.why}`,
    },
  ];
}

export function buildFooterPlatformLinks(t: Translator): NavLink[] {
  return [
    {
      label: t("nav.menus.platform.links.intelligenceLayer"),
      href: platformTabHref(0),
    },
    { label: t("nav.menus.platform.links.readOnly"), href: platformTabHref(1) },
    {
      label: t("nav.menus.platform.links.noRipReplace"),
      href: platformTabHref(2),
    },
    {
      label: t("nav.menus.platform.links.humanAccountability"),
      href: platformTabHref(3),
    },
    {
      label: t("nav.menus.platform.links.deployment"),
      href: platformTabHref(4),
    },
    {
      label: t("nav.menus.platform.links.regulatoryOntology"),
      href: platformTabHref(5),
    },
    {
      label: t("nav.menus.platform.links.canonicalSchema"),
      href: platformTabHref(6),
    },
    { label: t("nav.menus.platform.links.qvr"), href: platformTabHref(7) },
    {
      label: t("nav.menus.platform.links.boundedReasoning"),
      href: platformTabHref(8),
    },
  ];
}

export function buildFooterResourceLinks(t: Translator): NavLink[] {
  return [
    {
      label: t("footer.resources.designPartner"),
      href: "/design-partners",
    },
    {
      label: t("footer.resources.industry"),
      href: "/industries/medical-devices",
    },
    { label: t("footer.resources.faqs"), href: "/pricing/faq" },
  ];
}

export function buildCompanySubnavLinks(t: Translator): NavLink[] {
  return [
    {
      label: t("nav.menus.company.links.ourStory"),
      href: "/company/our-story",
    },
    {
      label: t("nav.menus.company.links.missionVision"),
      href: "/company/mission-vision",
    },
    {
      label: t("nav.menus.company.links.leadership"),
      href: "/company/leadership",
    },
    { label: t("nav.menus.company.links.contactUs"), href: "/contact" },
  ];
}

export function buildIndustrySubnavLinks(t: Translator): NavLink[] {
  return [
    {
      label: t("nav.menus.industry.links.medicalDevices"),
      href: "/industries/medical-devices",
    },
    {
      label: t("nav.menus.industry.links.expansion"),
      href: "/industries/expansion",
    },
  ];
}

export function buildSolutionNavLinks(t: Translator): NavLink[] {
  return [
    {
      label: t("nav.menus.solutions.links.documentationConfidence"),
      href: "/solutions/documentation-confidence",
    },
    {
      label: t("nav.menus.solutions.links.continuousCompliance"),
      href: "/solutions/continuous-compliance",
    },
    {
      label: t("nav.menus.solutions.links.inspectionFindings"),
      href: "/solutions/inspection-findings",
    },
    {
      label: t("nav.menus.solutions.links.changeImpact"),
      href: "/solutions/change-impact-assessment",
    },
    {
      label: t("nav.menus.solutions.links.inspectionReadiness"),
      href: "/solutions/inspection-readiness",
    },
    {
      label: t("nav.menus.solutions.links.documentAlignment"),
      href: "/solutions/document-alignment",
    },
  ];
}

export function buildPricingSubnavLinks(t: Translator): NavLink[] {
  return [
    {
      label: t("nav.menus.pricing.links.platformLicense"),
      href: "/pricing/license",
    },
    {
      label: t("nav.menus.pricing.links.documentCapacity"),
      href: "/pricing/document-capacity",
    },
    {
      label: t("nav.menus.pricing.links.capacityExpansion"),
      href: "/pricing/capacity-expansion",
    },
    {
      label: t("nav.menus.pricing.links.interactiveSandbox"),
      href: "/pricing/interactive-sandbox",
    },
    {
      label: t("nav.menus.pricing.links.startWithEvaluate"),
      href: "/pricing/start-with-evaluate",
    },
    {
      label: t("nav.menus.pricing.links.pricingFaqs"),
      href: "/pricing/faq",
    },
  ];
}
