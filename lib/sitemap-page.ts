export type SitemapLink = {
  href: string;
  label: string;
};

export type SitemapSection = {
  title: string;
  links: SitemapLink[];
};

/** Human-readable HTML sitemap groups (public pages only). */
export const sitemapPageSections: SitemapSection[] = [
  {
    title: "Main",
    links: [
      { href: "/", label: "Home" },
      { href: "/pricing", label: "Pricing" },
      { href: "/get-started", label: "Get Started" },
      { href: "/readiness", label: "Check Your Readiness" },
      { href: "/design-partners", label: "Design Partners" },
      { href: "/login", label: "Login" },
    ],
  },
  {
    title: "Solutions",
    links: [
      {
        href: "/solutions/documentation-confidence",
        label: "Documentation Confidence",
      },
      {
        href: "/solutions/continuous-compliance",
        label: "Continuous Compliance",
      },
      {
        href: "/solutions/inspection-findings",
        label: "Inspection-Defensible Findings",
      },
      {
        href: "/solutions/change-impact-assessment",
        label: "Change Impact Assessment",
      },
      {
        href: "/solutions/inspection-readiness",
        label: "Inspection Readiness",
      },
      {
        href: "/solutions/document-alignment",
        label: "Documentation Alignment",
      },
    ],
  },
  {
    title: "Industries",
    links: [
      { href: "/industries/medical-devices", label: "Medical Devices" },
      { href: "/industries/expansion", label: "Industry Expansion" },
    ],
  },
  {
    title: "Pricing",
    links: [
      { href: "/pricing", label: "Pricing Overview" },
      { href: "/pricing/license", label: "Platform License" },
      { href: "/pricing/document-capacity", label: "Document Capacity" },
      { href: "/pricing/capacity-expansion", label: "Capacity Expansion" },
      { href: "/pricing/interactive-sandbox", label: "Interactive Sandbox" },
      { href: "/pricing/start-with-evaluate", label: "Start With Evaluate" },
      { href: "/pricing/faq", label: "Pricing FAQs" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/company/our-story", label: "Our Story" },
      { href: "/company/mission-vision", label: "Mission and Vision" },
      { href: "/company/leadership", label: "Leadership" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { href: "/design-partners/apply", label: "Become a Design Partner" },
      { href: "/get-started", label: "Schedule a Discussion" },
      { href: "/readiness", label: "Readiness Discussion" },
    ],
  },
];
