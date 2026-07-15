import { FaCheck, resolveFaIcon } from "@/components/ui/icons";
import { PricingBottomCta } from "@/components/sections/pricing/PricingSubpageBlocks";

const EXPLORE_ITEMS = [
  "Documentation alignment across procedures, risk files, and CAPAs",
  "Inspection readiness findings with evidence relationships",
  "Change impact analysis across connected documentation",
  "Continuous compliance signals across a device program",
];

const NO_REQUIREMENT = [
  "Customer documentation",
  "Security review",
  "IT involvement",
  "Procurement approval",
  "Vendor onboarding",
];

const HIGHLIGHTS = [
  { icon: "fa-file-medical", title: "Synthetic Medical Device documentation" },
  { icon: "fa-user-check", title: "Self-service access" },
  { icon: "fa-bolt", title: "No configuration required" },
];

export function InteractiveSandboxContent() {
  return (
    <>
      <section className="pt-8 px-4 sm:px-6 bg-surface-muted">
        <div className="max-w-5xl mx-auto">
          <span className="text-teal font-bold text-sm uppercase tracking-widest mb-4 block">
            What You Can Explore
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[28px] leading-tight lg:leading-[36px] font-bold mb-8 text-navy">
            Representative Medical Device documentation. Full platform access.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
            {EXPLORE_ITEMS.map((item) => (
              <div
                key={item}
                className="pricing-info-card bg-white rounded-[4px] border border-gray-200 p-5 sm:p-6 shadow-sm flex items-start gap-3"
              >
                <FaCheck className="text-teal mt-1 shrink-0" aria-hidden="true" />
                <p className="text-sm sm:text-base text-navy leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-8 pb-6 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <span className="text-teal font-bold text-sm uppercase tracking-widest mb-4 block">
            No Requirement For
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[28px] leading-tight lg:leading-[36px] font-bold mb-6 text-navy">
            Start Exploring Immediately.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {NO_REQUIREMENT.map((item, i) => (
              <div
                key={item}
                className={`rounded-[4px] border border-gray-200 bg-gray-50 px-5 py-4 text-center${
                  i === NO_REQUIREMENT.length - 1
                    ? " sm:col-span-2 lg:col-span-1"
                    : ""
                }`}
              >
                <p className="text-sm sm:text-base font-semibold text-navy">
                  {item}
                </p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {HIGHLIGHTS.map((item) => (
              <div
                key={item.title}
                className="pricing-info-card bg-white rounded-[4px] border border-gray-200 p-6 text-center shadow-sm"
              >
                <div className="w-12 h-12 rounded-[4px] border border-teal/30 bg-teal/10 flex items-center justify-center text-teal mb-4 mx-auto">
                  {(() => {
                    const Dyn = resolveFaIcon(item.icon);
                    return <Dyn className="text-lg" aria-hidden="true" />;
                  })()}
                </div>
                <h3 className="font-bold text-navy text-lg">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-8 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <PricingBottomCta
            href="/get-started"
            label="Launch Interactive Sandbox"
            note="See how the Compliance Intelligence Layer works before evaluating it against your own documentation."
          />
        </div>
      </section>
    </>
  );
}
