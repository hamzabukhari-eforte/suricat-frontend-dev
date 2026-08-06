import type { MetadataRoute } from "next";

/**
 * Block all crawlers, search engines, and AI/LLM scrapers.
 * Served at /robots.txt via Next.js MetadataRoute.
 */
export default function robots(): MetadataRoute.Robots {
  const disallowAll = {
    disallow: "/",
  } as const;

  return {
    rules: [
      {
        userAgent: "*",
        ...disallowAll,
      },
      // Explicit AI / LLM crawler user-agents (in case they ignore "*")
      { userAgent: "GPTBot", ...disallowAll },
      { userAgent: "ChatGPT-User", ...disallowAll },
      { userAgent: "Google-Extended", ...disallowAll },
      { userAgent: "Googlebot", ...disallowAll },
      { userAgent: "Googlebot-Image", ...disallowAll },
      { userAgent: "Bingbot", ...disallowAll },
      { userAgent: "BingPreview", ...disallowAll },
      { userAgent: "Slurp", ...disallowAll },
      { userAgent: "DuckDuckBot", ...disallowAll },
      { userAgent: "Baiduspider", ...disallowAll },
      { userAgent: "YandexBot", ...disallowAll },
      { userAgent: "facebookexternalhit", ...disallowAll },
      { userAgent: "Twitterbot", ...disallowAll },
      { userAgent: "LinkedInBot", ...disallowAll },
      { userAgent: "Applebot", ...disallowAll },
      { userAgent: "Applebot-Extended", ...disallowAll },
      { userAgent: "anthropic-ai", ...disallowAll },
      { userAgent: "ClaudeBot", ...disallowAll },
      { userAgent: "Claude-Web", ...disallowAll },
      { userAgent: "CCBot", ...disallowAll },
      { userAgent: "Bytespider", ...disallowAll },
      { userAgent: "Meta-ExternalAgent", ...disallowAll },
      { userAgent: "Meta-ExternalFetcher", ...disallowAll },
      { userAgent: "cohere-ai", ...disallowAll },
      { userAgent: "PerplexityBot", ...disallowAll },
      { userAgent: "YouBot", ...disallowAll },
      { userAgent: "Diffbot", ...disallowAll },
      { userAgent: "ia_archiver", ...disallowAll },
      { userAgent: "Amazonbot", ...disallowAll },
      { userAgent: "PetalBot", ...disallowAll },
      { userAgent: "SemrushBot", ...disallowAll },
      { userAgent: "AhrefsBot", ...disallowAll },
      { userAgent: "DotBot", ...disallowAll },
      { userAgent: "MJ12bot", ...disallowAll },
    ],
    // Intentionally omit sitemap so crawlers are not pointed at page lists.
  };
}
