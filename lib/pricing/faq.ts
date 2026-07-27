export type FaqItem = {
  question: string;
  answer: string;
};

export function getPricingFaqItems(
  t: { raw: (key: string) => unknown },
  kind: "teaser" | "full",
): FaqItem[] {
  return t.raw(kind) as FaqItem[];
}

/** Design Partner program FAQ from Designs/design-partners.html */
export const designPartnersFaq: FaqItem[] = [
  {
    question: "Do we need to change our existing systems?",
    answer:
      "No. Suricat operates as a read-only Compliance Intelligence Layer above your existing quality and documentation systems. There is no rip-and-replace, data migration, or disruption to your validated environment.",
  },
  {
    question: "Do we need to sign an NDA?",
    answer:
      "Yes. A mutual NDA is executed before any documentation is reviewed. Protecting your confidential information is a foundational part of the Design Partner program.",
  },
  {
    question: "What documents will you need to review?",
    answer:
      "We typically review a representative set of quality and regulatory documentation, which may include SOPs, work instructions, risk management files, CAPAs, design documentation, and supporting records. The exact scope is determined collaboratively based on your environment and objectives.",
  },
  {
    question: "Who from our team should participate?",
    answer:
      "The program is most effective when supported by a small cross-functional team, typically including a Quality or Regulatory leader, an executive sponsor, and subject matter experts as needed throughout the engagement.",
  },
  {
    question: "How much time will this take?",
    answer:
      "Most Design Partners invest approximately 20–30 hours over a 30-day engagement, with an average of 2–3 hours per week for collaboration sessions, document reviews, and feedback.",
  },
  {
    question: "What happens after the engagement?",
    answer:
      "At the conclusion of the engagement, you'll receive an executive findings summary, documentation alignment insights, and recommendations. Together, we'll review the results, gather your feedback, and discuss next steps, including potential continued collaboration.",
  },
  {
    question: "Is there any cost to participate?",
    answer:
      "No. There is no fee to participate in the Design Partner program. Participation is based on mutual fit, collaboration, and a willingness to provide feedback that helps shape the platform.",
  },
  {
    question: "How is our data and information protected?",
    answer:
      "Your documentation remains your property. Suricat reviews approved materials under a mutual NDA, operates in a read-only manner, and never modifies your validated systems. Every finding is supported by traceable evidence and remains subject to human review.",
  },
  {
    question: "Will Suricat use our data to train AI models?",
    answer:
      "No. Your documentation is never used to train foundation models or shared with other customers. Your information remains confidential and is used only to support your Design Partner engagement unless you explicitly authorize otherwise.",
  },
];

