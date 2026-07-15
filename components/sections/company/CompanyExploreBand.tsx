import Link from "next/link";
import { FaArrowRight } from "@/components/ui/icons";

type CompanyExploreBandProps = {
  titleLead: string;
  titleAccent: string;
  description: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export function CompanyExploreBand({
  titleLead,
  titleAccent,
  description,
  ctaHref = "/#platform-intelligence-section",
  ctaLabel = "Explore The Platform",
}: CompanyExploreBandProps) {
  return (
    <section className="bg-gray-50 px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 lg:flex-row">
        <div className="max-w-2xl flex-1">
          <h2 className="mb-4 max-w-3xl text-2xl font-bold leading-tight text-navy lg:text-[28px] lg:leading-[36px]">
            {titleLead} <span className="text-teal">{titleAccent}</span>
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-navy sm:text-lg lg:text-[20px] lg:leading-[28px]">
            {description}
          </p>
        </div>
        <div className="shrink-0">
          <Link
            href={ctaHref}
            className="suricat-teal-btn group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full px-6 py-3 text-sm font-bold transition-all sm:px-8 sm:py-3.5"
          >
            {ctaLabel}
            <FaArrowRight
              className="text-xs transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
