import type { MetadataRoute } from "next";

/**
 * No public sitemap while the site is closed to crawlers.
 * Keep this empty so /sitemap.xml does not advertise routes.
 * Human-readable /sitemap page is unchanged.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [];
}
