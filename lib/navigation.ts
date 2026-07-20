export type NavLink = {
  label: string;
  href: string;
};

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

export const LANGUAGES = ["English", "German", "Spanish"] as const;

export const megaMenus: MegaMenuItem[] = [
  {
    id: "why",
    label: "Why Suricat",
    intro: {
      title: "Why Suricat",
      text: "Understand the structural compliance challenge, how Suricat was built to address it, and what it enables for regulated organizations.",
      ctaLabel: "Explore Why Suricat",
      ctaHref: "/#why-suricat-section",
    },
    links: [
      { label: "Suricat's Mission", href: "/#why-tab-0" },
      { label: "How Suricat Works", href: "/#why-tab-4" },
      { label: "Built by Practitioners", href: "/#why-tab-1" },
      { label: "Designed for Regulated Environments", href: "/#why-tab-5" },
      { label: "The Structural Problem", href: "/#why-tab-2" },
      { label: "What Suricat Enables", href: "/#why-tab-6" },
      { label: "Why Existing Systems Fall Short", href: "/#why-tab-3" },
    ],
    linkColumns: 2,
  },
  {
    id: "platform",
    label: "Platform",
    intro: {
      title: "Platform",
      text: "A read-only compliance intelligence layer built for regulated environments, with proprietary architecture for bounded reasoning and defensible outputs.",
      ctaLabel: "Explore the Platform",
      ctaHref: "/#platform-intelligence-section",
    },
    links: [
      { label: "Intelligence Layer", href: "/#platform-tab-0" },
      { label: "Read Only by Design", href: "/#platform-tab-1" },
      { label: "No Rip and Replace", href: "/#platform-tab-2" },
      { label: "Human Accountability", href: "/#platform-tab-3" },
      { label: "Deployment", href: "/#platform-tab-4" },
      { label: "Regulatory Ontology", href: "/#platform-tab-5" },
      { label: "Canonical Intelligence Schema", href: "/#platform-tab-6" },
      { label: "Quality Validation Rating", href: "/#platform-tab-7" },
      { label: "Bounded Reasoning", href: "/#platform-tab-8" },
    ],
    linkColumns: 3,
  },
  {
    id: "solutions",
    label: "Solutions",
    intro: {
      title: "Solutions",
      text: "Six focused capabilities that apply the Compliance Intelligence Layer to documentation confidence, inspection readiness, continuous compliance, and more.",
      ctaLabel: "View All Solutions",
      ctaHref: "/#solutions-section",
    },
    links: [
      {
        label: "Documentation Confidence",
        href: "/solutions/documentation-confidence",
      },
      {
        label: "Continuous Compliance",
        href: "/solutions/continuous-compliance",
      },
      {
        label: "Inspection-Defensible Findings",
        href: "/solutions/inspection-findings",
      },
      {
        label: "Change Impact Assessment",
        href: "/solutions/change-impact-assessment",
      },
      {
        label: "Inspection Readiness",
        href: "/solutions/inspection-readiness",
      },
      {
        label: "Documentation Alignment",
        href: "/solutions/document-alignment",
      },
    ],
    linkColumns: 2,
  },
  {
    id: "industry",
    label: "Industry",
    intro: {
      title: "Industry",
      text: "Built for regulated industries. Starting with medical devices and expanding across biotechnology, biopharma, diagnostics, and beyond.",
      ctaLabel: "Explore Industries",
      ctaHref: "/#industries-section",
    },
    links: [
      { label: "Medical Devices", href: "/industries/medical-devices" },
      { label: "Industry Expansion", href: "/industries/expansion" },
    ],
    linkColumns: 2,
  },
  {
    id: "pricing",
    label: "Pricing",
    intro: {
      title: "Pricing",
      text: "Annual Platform License and Document Capacity-based subscriptions with published pricing, flexible evaluation paths, and no per-seat fees.",
      ctaLabel: "Explore Pricing",
      ctaHref: "/pricing",
    },
    links: [
      { label: "Subscription Options", href: "/pricing#subscription-options" },
      { label: "Capability Comparison", href: "/pricing#capability-comparison" },
      { label: "Platform License", href: "/pricing/license" },
      { label: "Document Capacity", href: "/pricing/document-capacity" },
      { label: "Capacity Expansion", href: "/pricing/capacity-expansion" },
      { label: "Interactive Sandbox", href: "/pricing/interactive-sandbox" },
      { label: "Start With Evaluate", href: "/pricing/start-with-evaluate" },
      { label: "Pricing FAQ", href: "/pricing/faq" },
    ],
    linkColumns: 2,
  },
  {
    id: "company",
    label: "Company",
    intro: {
      title: "Company",
      text: "Learn about Suricat's story, mission, leadership, and how to get in touch with our team.",
      ctaLabel: "Our Story",
      ctaHref: "/company/our-story",
    },
    links: [
      { label: "Our Story", href: "/company/our-story" },
      { label: "Mission and Vision", href: "/company/mission-vision" },
      { label: "Leadership", href: "/company/leadership" },
      { label: "Contact Us", href: "/contact" },
    ],
    linkColumns: 2,
  },
];

export const footerTopLinks: NavLink[] = [
  { label: "Why Suricat", href: "/#why-suricat-section" },
  { label: "Platform", href: "/#platform-intelligence-section" },
  { label: "Solutions", href: "/#solutions-section" },
  { label: "Pricing", href: "/pricing" },
  { label: "Company", href: "/company/our-story" },
];

export const footerCompanyLinks: NavLink[] = [
  { label: "Our Story", href: "/company/our-story" },
  { label: "Mission and Vision", href: "/company/mission-vision" },
  { label: "Leadership", href: "/company/leadership" },
  { label: "Contact us", href: "/contact" },
];

export const footerWhyLinks: NavLink[] = [
  { label: "Suricat's Mission", href: "/#why-tab-0" },
  { label: "Built by Practitioners", href: "/#why-tab-1" },
  { label: "The Structural Problem", href: "/#why-tab-2" },
  { label: "Why Existing Systems Fall Short", href: "/#why-tab-3" },
  { label: "How Suricat Works", href: "/#why-tab-4" },
  { label: "Designed for Regulated Environments", href: "/#why-tab-5" },
  { label: "What Suricat Enables", href: "/#why-tab-6" },
];

export const footerPlatformLinks: NavLink[] = [
  { label: "Intelligence Layer", href: "/#platform-tab-0" },
  { label: "Read Only by Design", href: "/#platform-tab-1" },
  { label: "No Rip and Replace", href: "/#platform-tab-2" },
  { label: "Human Accountability", href: "/#platform-tab-3" },
  { label: "Deployment", href: "/#platform-tab-4" },
  { label: "Regulatory Ontology", href: "/#platform-tab-5" },
  { label: "Canonical Intelligence Schema", href: "/#platform-tab-6" },
  { label: "Quality Validation Rating", href: "/#platform-tab-7" },
  { label: "Bounded Reasoning", href: "/#platform-tab-8" },
];

export const footerResourceLinks: NavLink[] = [
  { label: "Design Partner", href: "/design-partners" },
  { label: "Industry", href: "/industries/medical-devices" },
  { label: "FAQs", href: "/pricing/faq" },
  { label: "Blog", href: "#" },
  { label: "Events", href: "#" },
];

export const companySubnavLinks: NavLink[] = [
  { label: "Our Story", href: "/company/our-story" },
  { label: "Mission and Vision", href: "/company/mission-vision" },
  { label: "Leadership", href: "/company/leadership" },
  { label: "Contact Us", href: "/contact" },
];

export const industrySubnavLinks: NavLink[] = [
  { label: "Medical Devices", href: "/industries/medical-devices" },
  { label: "Industry Expansion", href: "/industries/expansion" },
];

export const solutionNavLinks: NavLink[] = [
  {
    label: "Documentation Confidence",
    href: "/solutions/documentation-confidence",
  },
  {
    label: "Continuous Compliance",
    href: "/solutions/continuous-compliance",
  },
  {
    label: "Inspection-Defensible Findings",
    href: "/solutions/inspection-findings",
  },
  {
    label: "Change Impact Assessment",
    href: "/solutions/change-impact-assessment",
  },
  { label: "Inspection Readiness", href: "/solutions/inspection-readiness" },
  { label: "Documentation Alignment", href: "/solutions/document-alignment" },
];

export const pricingSubnavLinks: NavLink[] = [
  { label: "Platform License", href: "/pricing/license" },
  { label: "Document Capacity", href: "/pricing/document-capacity" },
  { label: "Capacity Expansion", href: "/pricing/capacity-expansion" },
  { label: "Interactive Sandbox", href: "/pricing/interactive-sandbox" },
  { label: "Start With Evaluate", href: "/pricing/start-with-evaluate" },
  { label: "Pricing FAQ", href: "/pricing/faq" },
];
