export type FaqItem = {
  question: string;
  answer: string;
};

/** Teaser FAQs shown on the main pricing page (Designs/pricing.html). */
export const pricingFaqTeaser: FaqItem[] = [
  {
    question: "Is pricing published?",
    answer:
      "Yes. Suricat publishes annual pricing for Evaluate, Pilot, and Foundation tiers. Enterprise pricing is custom and based on device program complexity, user scale, and regulatory framework scope. There are no hidden fees.",
  },
  {
    question: "Are there per-seat charges?",
    answer:
      "No. Suricat does not charge per seat. Pricing is based on Document Capacity — the number of active compliance documents defined by your subscription tier. User access is defined by your subscription tier and does not affect pricing.",
  },
  {
    question: "Are subscriptions annual?",
    answer:
      "Yes. Pilot and Foundation are twelve-month annual subscriptions with published annual pricing. Evaluate is a 90-day evaluation term at no cost. Enterprise subscriptions are annual with custom commercial terms.",
  },
  {
    question: "Can I move from one tier to another mid-term?",
    answer:
      "Yes. Organizations may upgrade from one tier to another during an active subscription term. Suricat aligns Document Capacity, workspace scope, and commercial terms at the time of upgrade. Downgrades are not available mid-term.",
  },
  {
    question: "What counts toward Document Capacity?",
    answer:
      "Document Capacity reflects the number of active compliance-critical documents evaluated within your Suricat workspace — including procedures, records, risk files, CAPAs, investigations, training records, and supporting quality documentation.",
  },
];

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

/** Full FAQ list from Designs/pricing-faq.html */
export const pricingFaqFull: FaqItem[] = [
  {
    question: "Is pricing published?",
    answer:
      "Yes. Suricat publishes annual pricing for Evaluate, Pilot, and Foundation tiers. Enterprise pricing is custom and determined by documentation scope, device programs, and regulatory frameworks. There are no hidden fees.",
  },
  {
    question: "Are there per-seat charges?",
    answer:
      "No. Suricat does not charge per seat. Pricing is based on Document Capacity — the number of active compliance-critical documents maintained within the Compliance Intelligence Layer during your subscription term. User access is defined by your subscription tier and does not affect pricing.",
  },
  {
    question: "Are subscriptions annual?",
    answer:
      "Yes. All Suricat subscriptions are annual. There are no monthly subscription options. Twelve-month terms apply to Pilot, Foundation, and Enterprise. The Evaluate tier is a 90-day evaluation term at no cost.",
  },
  {
    question: "Can I move from one tier to another mid-term?",
    answer:
      "Tier upgrades are available during an active subscription term. Pilot subscribers may upgrade to Foundation and Foundation subscribers may initiate an Enterprise discussion at any time. Downgrades are not available mid-term.",
  },
  {
    question: "What counts as an active document?",
    answer:
      "Any compliance-critical document maintained within the Compliance Intelligence Layer during your subscription term — including procedures, work instructions, policies, risk files, CAPAs, investigations, training records, design documentation, and supporting quality records.",
  },
  {
    question: "What happens if I exceed my Document Capacity?",
    answer:
      "Document Capacity may be expanded at any time during your active subscription term without changing tiers. Expansion pricing decreases as volume increases, starting at $10 per document for the first 100 to 500 additional documents.",
  },
  {
    question: "Can I remove documents to stay within my capacity?",
    answer:
      "Yes. Documents may be removed from the Compliance Intelligence Layer at any time. Removed documents do not count toward active Document Capacity.",
  },
  {
    question: "Does Document Capacity roll over?",
    answer:
      "Document Capacity Rollover is available exclusively to Enterprise subscribers. Up to 25% of unused annual Document Capacity may carry forward into the first 90 days of the renewal term.",
  },
  {
    question: "Is a credit card required to start an evaluation?",
    answer:
      "No. The Evaluate tier requires no credit card, no procurement process, and no IT involvement. Access is provided through a self-service onboarding process.",
  },
  {
    question: "Can I use my own documentation during the evaluation?",
    answer:
      "Yes. The Evaluate tier is designed for evaluation using your own compliance-critical documentation. If you prefer to explore first, the Interactive Sandbox provides access using representative Medical Device documentation at no cost with no setup required.",
  },
  {
    question: "What happens to my documentation after the evaluation ends?",
    answer:
      "Customer documentation is retained throughout the active 90-day evaluation term. Following expiration, documentation is deleted within 30 to 60 days unless a written deletion request is submitted earlier. Customer documentation is never used to train models shared across customers.",
  },
  {
    question: "What happens at the end of my evaluation?",
    answer:
      "At the end of the 90-day evaluation term, you may convert to a Pilot or Foundation subscription to continue with production access. Suricat will reach out before your evaluation expires to discuss next steps.",
  },
];
