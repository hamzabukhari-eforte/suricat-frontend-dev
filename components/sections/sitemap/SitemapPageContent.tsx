import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { sitemapPageSections } from "@/lib/sitemap-page";

export function SitemapPageContent() {
  return (
    <section className="bg-white py-12 md:py-16">
      <Container>
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-navy md:text-4xl">
          Sitemap
        </h1>
        <p className="mb-10 max-w-3xl text-base leading-relaxed text-navy/70">
          Browse all public pages on our website. For the XML sitemap used by
          search engines, see{" "}
          <Link
            href="/sitemap.xml"
            className="font-medium text-navy underline underline-offset-2 hover:text-teal"
          >
            sitemap.xml
          </Link>
          .
        </p>

        <div className="columns-1 gap-10 space-y-10 md:columns-2 lg:columns-3">
          {sitemapPageSections.map((section) => (
            <section key={section.title} className="break-inside-avoid">
              <h2 className="mb-3 border-b border-gray-200 pb-2 text-lg font-semibold text-navy">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={`${section.title}-${link.href}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-navy/80 underline underline-offset-2 hover:text-teal"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Container>
    </section>
  );
}
