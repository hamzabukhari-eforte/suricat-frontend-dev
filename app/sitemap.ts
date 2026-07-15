import type { MetadataRoute } from "next";

const BASE = "https://suricat.com";

const routes = [
  "/",
  "/pricing",
  "/pricing/faq",
  "/pricing/license",
  "/pricing/document-capacity",
  "/pricing/capacity-expansion",
  "/pricing/interactive-sandbox",
  "/pricing/start-with-evaluate",
  "/solutions/continuous-compliance",
  "/solutions/documentation-confidence",
  "/solutions/inspection-findings",
  "/solutions/change-impact-assessment",
  "/solutions/inspection-readiness",
  "/solutions/document-alignment",
  "/industries/medical-devices",
  "/industries/expansion",
  "/company/our-story",
  "/company/mission-vision",
  "/company/leadership",
  "/contact",
  "/design-partners",
  "/design-partners/apply",
  "/get-started",
  "/readiness",
  "/discussion-confirmed",
  "/login",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
