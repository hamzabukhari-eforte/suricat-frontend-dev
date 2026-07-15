import { FaAngleDoubleRight } from "@/components/ui/icons";
import Link from "next/link";

export function MarqueeTopBar() {
  const content = (
    <p className="font-semibold text-navy">
      QMSR enforcement is now active. Are you inspection-ready?
      <Link
        href="/readiness"
        className="font-extrabold underline ml-2 text-navy group"
      >
        Check Your Readiness
        <FaAngleDoubleRight className="inline-block text-xs transition-transform duration-300 group-hover:translate-x-1 ml-1" aria-hidden="true" />
      </Link>
    </p>
  );

  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        <div className="marquee-content">{content}</div>
        <div className="marquee-content" aria-hidden="true">
          {content}
        </div>
      </div>
    </div>
  );
}
