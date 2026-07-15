import type { MaxWidth } from "@/lib/layout/measure";

export type SolutionCard = { icon: string; title: string; body: string };
export type SolutionOutcome = { icon: string; label: string; title: string; body: string };

/** Optional per-page measure overrides. Defaults live in SolutionPageContent. */
export type SolutionMeasures = {
  /** Hero copy container. Default `max-w-4xl`. */
  hero?: MaxWidth;
  /** Hero title. Default `max-w-full`. */
  heroTitle?: MaxWidth;
  /** Hero subtitle. Default `max-w-5xl`. */
  heroSubtitle?: MaxWidth;
  /** Section h2 titles. Default `max-w-3xl`. */
  title?: MaxWidth;
  /** Challenge / How Suricat Helps body. Default `max-w-3xl`. */
  description?: MaxWidth;
  /** Outcomes intro. Default `max-w-4xl`. */
  outcomesIntro?: MaxWidth;
  /** Readiness note under CTA. Default `max-w-4xl`. */
  readinessNote?: MaxWidth;
};

export type SolutionPageData = {
  heroTitle: string;
  /** Second line of hero title, rendered in teal (Designs). */
  heroTitleAccent: string;
  heroSubtitle: string;
  /** Supporting line under outcomes readiness CTA */
  readinessNote: string;
  /** Per-section max-width overrides when Designs differ from defaults. */
  measures?: SolutionMeasures;
  problem: {
    title: string;
    paragraphs: string[];
    cards: SolutionCard[];
  };
  solution: {
    title: string;
    paragraphs: string[];
    cards: SolutionCard[];
  };
  enables: {
    title: string;
    intro: string;
    outcomes: SolutionOutcome[];
  };
};

export const solutionPages = {
  'continuous-compliance': {
    heroTitle: 'Compliance Posture Changes Between Reviews.',
    heroTitleAccent: 'Visibility Should Not Fall Behind.',
    heroSubtitle: 'Audits, inspections, and management reviews provide periodic assessments of compliance. However, documentation, records, investigations, training activities, and operational processes continue to evolve every day between those milestones.',
    readinessNote: 'Understand how the Compliance Intelligence Layer can help your organization maintain visibility across compliance critical documentation between audits, inspections, and reviews.',
    measures: {
      hero: 'max-w-4xl',
      heroTitle: 'max-w-full',
    },
    problem: {
      title: 'Point in Time Assessments Leave Gaps Between Reviews.',
      paragraphs: [
        'Many organizations assess compliance at specific points in time and assume their compliance posture remains stable until the next review.',
        'In reality, changes accumulate continuously. New records are created, procedures are updated, CAPAs progress, training is completed, and investigations unfold. Over time, potential concerns can emerge long before the next audit or inspection begins.',
        'As a result, organizations may discover issues during preparation activities rather than when they first emerge, leaving less time to investigate, understand, and address potential concerns.',
      ],
      cards: [
        { icon: 'fa-calendar-xmark', title: 'Periodic Only Reviews', body: 'Compliance posture assessed only at formal milestones, leaving extended blind spots between audits and inspections.' },
        { icon: 'fa-rotate', title: 'Continuous Change', body: 'Records, procedures, CAPAs, and training evolve daily while compliance visibility remains static between reviews.' },
        { icon: 'fa-magnifying-glass-minus', title: 'Late Detection', body: 'Potential concerns go undetected until preparation begins, when time to investigate and remediate is already limited.' },
        { icon: 'fa-chart-line', title: 'Accumulating Drift', body: 'Small changes compound over time, eroding compliance posture gradually with no signal until a formal review surfaces the gap.' },
      ],
    },
    solution: {
      title: 'Maintain Ongoing Visibility Across Compliance Critical Documentation',
      paragraphs: [
        'Suricat helps Quality and Regulatory teams maintain ongoing visibility across compliance critical documentation so potential concerns can be identified earlier rather than discovered during audits, inspections, or periodic reviews.',
        'By continuously evaluating relationships across documentation, records, and supporting evidence, Suricat helps organizations understand how compliance posture evolves over time.',
        'The result is greater awareness of emerging concerns and increased confidence in compliance posture between reviews.',
      ],
      cards: [
        { icon: 'fa-wave-square', title: 'Continuous Documentation Monitoring', body: 'Evaluates compliance critical documentation on an ongoing basis, not only when a formal review is announced.' },
        { icon: 'fa-network-wired', title: 'Relationship Aware Analysis', body: 'Evaluates connections between records, procedures, and evidence the same way an auditor or inspector would examine them.' },
        { icon: 'fa-bell-concierge', title: 'Early Concern Surfacing', body: 'Surfaces potential compliance concerns as they emerge rather than when preparation activities begin before an audit.' },
        { icon: 'fa-timeline', title: 'Posture Evolution Over Time', body: 'Helps teams understand how compliance posture evolves across the quality system between formal review cycles.' },
      ],
    },
    enables: {
      title: 'What Continuous Compliance Enables',
      intro: 'Five outcomes that strengthen how Quality and Regulatory teams maintain visibility, detect concerns early, and build confidence in compliance posture between formal reviews.',
      outcomes: [
        { icon: 'fa-eye', label: 'Improved Visibility', title: 'Improved Visibility Between Audits and Inspections', body: 'Maintain awareness of compliance-critical activities and documentation between formal review cycles.' },
        { icon: 'fa-magnifying-glass', label: 'Earlier Identification', title: 'Earlier Identification of Emerging Compliance Concerns', body: 'Identify potential concerns before they escalate or affect audit and inspection outcomes.' },
        { icon: 'fa-file-circle-check', label: 'Reduced Preparation', title: 'Reduced Audit Preparation Effort', body: 'Spend less time gathering, validating, and reviewing documentation before audits and inspections.' },
        { icon: 'fa-chart-mixed', label: 'Enhanced Confidence', title: 'Visibility Into Compliance Posture Over Time', body: 'Understand how compliance posture evolves so teams can take action sooner.' },
        { icon: 'fa-clipboard-check', label: 'Proactive Management', title: 'Greater Confidence Between Formal Reviews', body: 'Build confidence that compliance posture remains sound in the periods between audits, inspections, and management reviews' },
      ],
    },
  } satisfies SolutionPageData,
  'documentation-confidence': {
    heroTitle: 'Confidence In A Decision Depends On',
    heroTitleAccent: 'Confidence In The Evidence.',
    heroSubtitle: 'Quality and regulatory decisions are only as defensible as the evidence supporting them. Whether responding to an audit, evaluating a CAPA, assessing risk, approving a change, or preparing for an inspection, teams must be confident that supporting evidence is complete, traceable, and readily available.',
    readinessNote: 'Understand how the Compliance Intelligence Layer can help your organization strengthen confidence in the evidence behind quality and regulatory decisions.',
    measures: {
      hero: 'max-w-4xl',
      heroTitle: 'max-w-full',
    },
    problem: {
      title: 'Not All Evidence Provides The Same Level Of Support',
      paragraphs: [
        'Records may be incomplete, supporting documentation may be difficult to trace, and critical information may be dispersed across multiple systems, documents, and repositories.',
        'As organizations grow and documentation volumes increase, determining whether available evidence is sufficient often requires significant manual review and interpretation. Teams may spend substantial time validating records, confirming traceability, and evaluating whether the evidence truly supports the decision being made.',
        'As a result, uncertainty can remain long after documentation has been collected, making it more difficult to support decisions, investigations, submissions, audits, and inspections with confidence.',
      ],
      cards: [
        { icon: 'fa-puzzle-piece', title: 'Incomplete Records', body: 'Supporting documentation may be missing or not fully connected to the decision it supports.' },
        { icon: 'fa-share-nodes', title: 'Dispersed Evidence', body: 'Critical information spread across multiple systems, documents, and repositories.' },
        { icon: 'fa-clock', title: 'Manual Review Burden', body: 'Teams spend significant time validating records and confirming traceability before each decision.' },
        { icon: 'fa-triangle-exclamation', title: 'Persistent Uncertainty', body: 'Uncertainty persists even after documentation has been collected, increasing inspection risk.' },
      ],
    },
    solution: {
      title: 'Evaluate Evidence In Context, Before Decisions Are Made',
      paragraphs: [
        'Suricat helps Quality and Regulatory teams evaluate compliance critical documentation in the context of the evidence that supports it.',
        'By connecting related procedures, records, risk files, CAPAs, investigations, and supporting documentation, Suricat helps organizations understand the completeness, traceability, and strength of available evidence before critical decisions are made.',
        'The result is greater confidence that quality and regulatory decisions are supported by evidence that can be understood, explained, and defended when needed.',
      ],
      cards: [
        { icon: 'fa-link', title: 'Connected Evidence', body: 'Connects procedures, records, risk files, CAPAs, and investigations into a unified evidence view.' },
        { icon: 'fa-magnifying-glass-chart', title: 'Completeness Evaluation', body: 'Evaluates whether supporting documentation and evidence are complete before decisions are made.' },
        { icon: 'fa-route', title: 'Traceability Intelligence', body: 'Surfaces how supporting evidence relates to quality and regulatory decisions with full traceability.' },
        { icon: 'fa-shield-halved', title: 'Inspection Defensible Output', body: 'Produces findings that can be explained, understood, and defended during audits and inspections.' },
      ],
    },
    enables: {
      title: 'What Documentation Confidence Enables',
      intro: 'Five measurable outcomes that strengthen how Quality and Regulatory teams evaluate and defend compliance critical decisions.',
      outcomes: [
        { icon: 'fa-check-double', label: 'Evidence Confidence', title: 'Greater Confidence In Supporting Evidence', body: 'Understand whether available evidence provides sufficient support for quality and regulatory activities.' },
        { icon: 'fa-file-circle-check', label: 'Completeness', title: 'Improved Confidence In Evidence Completeness', body: 'Understand whether supporting documentation, records, and evidence are complete and connected.' },
        { icon: 'fa-route', label: 'Traceability', title: 'Increased Confidence In Evidence Traceability', body: 'Understand how supporting evidence relates to quality and regulatory decisions.' },
        { icon: 'fa-clock-rotate-left', label: 'Efficiency', title: 'Reduced Uncertainty During Evidence Review', body: 'Spend less time determining whether available evidence adequately supports a decision.' },
        { icon: 'fa-award', label: 'Defensibility', title: 'Better Informed Quality And Regulatory Decisions', body: 'Make decisions with greater confidence in the evidence available.' },
      ],
    },
  } satisfies SolutionPageData,
  'inspection-findings': {
    heroTitle: 'Evidence Supports A Finding.',
    heroTitleAccent: 'An Explanation Defends It.',
    heroSubtitle: 'Quality and regulatory teams routinely close CAPAs, complete investigations, document risk determinations, and respond to audit observations. Each of these activities produces a finding the organization must be prepared to stand behind, and when that finding is examined, the question is rarely whether the evidence exists. It is whether the reasoning connecting that evidence to the conclusion can be clearly shown.',
    readinessNote: 'Understand how the Compliance Intelligence Layer can help your organization strengthen the explanations behind findings and conclusions.',
    measures: {
      hero: 'max-w-5xl',
      heroTitle: 'max-w-4xl',
    },
    problem: {
      title: 'The Reasoning Behind A Finding Is Rarely Documented As Its Own Artifact',
      paragraphs: [
        'A root cause identified through a CAPA, a determination reached during a risk assessment, a conclusion drawn from an investigation, each of these is the result of a reasoning process that draws on multiple sources of evidence. The documentation that records the finding does not always capture the reasoning that led to it.',
        'Over time, the evidence that supported a finding may remain in the systems where it originated, while the finding itself is recorded separately, as a closed CAPA, a completed investigation, or an accepted risk determination. The connection between the two is rarely documented as its own artifact.',
        'When a finding is revisited during a follow up investigation, a management review, or a regulatory inspection, reconstructing the reasoning behind it can require retracing steps across multiple records and systems. A finding that was originally well supported can appear inadequately explained.',
      ],
      cards: [
        { icon: 'fa-diagram-project', title: 'Disconnected Reasoning', body: 'The reasoning that led to a finding is rarely captured as a documented artifact alongside the finding itself.' },
        { icon: 'fa-share-nodes', title: 'Dispersed Evidence', body: 'Supporting evidence remains in originating systems, separated from the findings they produced.' },
        { icon: 'fa-clock-rotate-left', title: 'Costly Reconstruction', body: 'Revisiting a finding requires retracing steps across multiple records and systems, consuming significant time.' },
        { icon: 'fa-triangle-exclamation', title: 'Apparent Weakness', body: 'A well supported finding can appear inadequately explained if the reasoning cannot be reconstructed quickly.' },
      ],
    },
    solution: {
      title: 'Reconstruct The Reasoning Behind A Finding, Whenever It Is Revisited',
      paragraphs: [
        'Suricat helps Quality and Regulatory teams reconstruct the reasoning behind a finding by linking it back to the records, evidence, and activities that produced it.',
        'By mapping how a finding connects to the investigations, risk assessments, procedures, and records it draws on, Suricat helps organizations show not only what was concluded, but how the conclusion follows from the evidence available at the time.',
        'The result is a finding that can be explained the same way it was reached, whenever it is revisited, whether in a follow up review or during a regulatory inspection.',
      ],
      cards: [
        { icon: 'fa-sitemap', title: 'Finding, Evidence Mapping', body: 'Links each finding back to the investigations, risk assessments, procedures, and records that produced it.' },
        { icon: 'fa-brain', title: 'Reasoning Reconstruction', body: 'Shows how conclusions follow from available evidence, making the reasoning path transparent and auditable.' },
        { icon: 'fa-route', title: 'Traceability Intelligence', body: 'Surfaces how supporting evidence relates to findings with full cross system traceability.' },
        { icon: 'fa-shield-halved', title: 'Inspection Ready Explanations', body: 'Produces consistent, clear explanations that hold up during audits, inspections, and management reviews.' },
      ],
    },
    enables: {
      title: 'What Inspection Defensible Findings Enables',
      intro: 'Five measurable outcomes that strengthen how Quality and Regulatory teams explain and defend findings and conclusions.',
      outcomes: [
        { icon: 'fa-comment-dots', label: 'Explanation Clarity', title: 'Clearer Explanations Behind Findings', body: 'Understand how a finding connects to the evidence, records, and activities that produced it.' },
        { icon: 'fa-bolt', label: 'Efficiency', title: 'Faster Preparation of Finding Explanations', body: 'Spend less time retracing the steps that led to a specific finding when it needs to be explained.' },
        { icon: 'fa-shield-halved', label: 'Risk Reduction', title: 'Reduced Risk of Unexplained Conclusions', body: 'Lower the likelihood that a well supported finding appears unsupported when examined.' },
        { icon: 'fa-eye', label: 'Visibility', title: 'Improved Visibility Into the Basis for Findings', body: 'See how individual findings relate to the broader body of evidence and records that support them.' },
        { icon: 'fa-circle-check', label: 'Confidence', title: 'Greater Confidence When Findings Are Challenged', body: 'Respond to questions about a finding with an explanation that is clear, consistent, and well supported.' },
      ],
    },
  } satisfies SolutionPageData,
  'change-impact-assessment': {
    heroTitle: 'Changes Rarely Stay Contained.',
    heroTitleAccent: 'Their Impact Often Extends Beyond What Changed.',
    heroSubtitle: 'A change made to a procedure, requirement, record, risk file, CAPA, or design document can affect multiple areas of the quality system. Understanding those relationships is critical to maintaining compliance as change occurs.',
    readinessNote: 'Understand how the Compliance Intelligence Layer can help your organization evaluate the potential impact of change across compliance critical documentation.',
    measures: {
      hero: 'max-w-5xl',
      heroTitle: 'max-w-5xl',
    },
    problem: {
      title: 'The Full Impact of a Change Is Not Always Immediately Visible.',
      paragraphs: [
        'Organizations routinely manage changes across procedures, records, requirements, risk files, CAPAs, and supporting documentation. However, the full impact of a change is not always immediately visible.',
        'A modification made in one location may affect related documentation, processes, records, controls, or compliance obligations elsewhere in the quality system.',
        'Determining what else may be affected often requires time consuming manual reviews across disconnected systems and documentation. As a result, downstream impacts may remain unnoticed until additional issues emerge.',
      ],
      cards: [
        { icon: 'fa-eye-slash', title: 'Hidden Downstream Impact', body: 'A change in one document may silently invalidate related records, processes, or compliance obligations elsewhere.' },
        { icon: 'fa-network-wired', title: 'Disconnected Systems', body: 'Disconnected documentation makes it difficult to trace how a single change ripples across the quality system.' },
        { icon: 'fa-person-digging', title: 'Manual Review Burden', body: 'Time consuming manual searches across systems delay impact assessments and consume Quality team capacity.' },
        { icon: 'fa-triangle-exclamation', title: 'Late Issue Discovery', body: 'Downstream impacts go unnoticed until additional compliance issues emerge, long after the original change was made.' },
      ],
    },
    solution: {
      title: 'Understand How Changes Relate to Connected Documentation and Compliance Obligations',
      paragraphs: [
        'Suricat helps Quality and Regulatory teams understand how changes may relate to connected documents, records, processes, and compliance obligations so potential downstream impacts can be identified earlier and evaluated with greater confidence.',
        'By providing visibility into change relationships across compliance critical documentation, Suricat helps organizations understand the broader implications of change before additional issues emerge.',
        'The result is faster impact assessments and more informed quality and regulatory decisions.',
      ],
      cards: [
        { icon: 'fa-code-branch', title: 'Change Relationship Mapping', body: 'Maps how a change in one document or record relates to connected documentation, processes, and compliance obligations across the quality system.' },
        { icon: 'fa-magnifying-glass-chart', title: 'Earlier Downstream Identification', body: 'Surfaces potential downstream impacts before they manifest as additional compliance issues, giving teams time to evaluate and act.' },
        { icon: 'fa-bolt', title: 'Accelerated Impact Assessment', body: 'Reduces time spent on manual reviews across disconnected systems by surfacing relevant relationships in a structured, navigable way.' },
        { icon: 'fa-shield-halved', title: 'More Informed Regulatory Decisions', body: 'Equips Quality and Regulatory teams to evaluate the full scope of a change with greater confidence before decisions are finalized.' },
      ],
    },
    enables: {
      title: 'What Change Impact Assessment Enables',
      intro: 'Five outcomes that strengthen how Quality and Regulatory teams identify, evaluate, and respond to the downstream implications of change.',
      outcomes: [
        { icon: 'fa-magnifying-glass', label: 'Downstream Identification', title: 'Earlier Identification of Downstream Impacts', body: 'Understand what else may be affected before additional issues emerge.' },
        { icon: 'fa-eye', label: 'Change Relationships', title: 'Improved Visibility Into Change Relationships', body: 'See how changes relate to connected documentation, processes, and compliance obligations.' },
        { icon: 'fa-bolt', label: 'Faster Assessment', title: 'Faster Impact Assessments', body: 'Reduce the time required to understand the potential scope of change.' },
        { icon: 'fa-clock', label: 'Reduced Manual Effort', title: 'Reduced Manual Analysis Effort', body: 'Spend less time reviewing disconnected systems and documentation.' },
        { icon: 'fa-bullseye', label: 'Greater Confidence', title: 'Greater Confidence in Evaluating Change', body: 'Evaluate change with greater confidence before action is taken.' },
      ],
    },
  } satisfies SolutionPageData,
  'inspection-readiness': {
    heroTitle: 'Inspection Preparation Does Not Create Readiness.',
    heroTitleAccent: 'It Reveals Whether Readiness Already Exists.',
    heroSubtitle: 'Regulatory inspections and audits do not only review documentation. They assess whether an organization can demonstrate the current condition of its quality system across procedures, records, risk files, CAPAs, training, and supporting evidence, most of which was already in place long before any preparation activity began.',
    readinessNote: 'Understand how the Compliance Intelligence Layer can help your organization build and maintain inspection readiness across the quality system.',
    measures: {
      hero: 'max-w-5xl',
      heroTitle: 'max-w-4xl',
    },
    problem: {
      title: 'Preparation Surfaces Readiness. It Does Not Create It.',
      paragraphs: [
        'When an inspection or audit is announced, organizations typically begin a focused preparation effort: reviewing procedures, gathering records, validating evidence, and addressing issues that surface along the way.',
        'However, the condition of the quality system at that point, whether procedures are current, whether CAPAs are properly closed, whether training records are complete, whether risk files reflect the latest assessments, was largely determined before preparation began. Preparation does not change that condition. It surfaces it.',
        'As a result, issues that have existed for some time are often discovered during preparation rather than when they first occurred. By the time they surface, there may be limited time to address them before the inspection begins.',
      ],
      cards: [
        { icon: 'fa-hourglass-half', title: 'Late Discovery', body: 'Issues that have existed for months surface only when inspection preparation begins, leaving little time to act.' },
        { icon: 'fa-link-slash', title: 'Broken Connections', body: 'A CAPA closed without a training update, a risk file not reflecting current design controls, gaps that remain invisible day to day.' },
        { icon: 'fa-clock-rotate-left', title: 'Reactive Remediation', body: 'Teams spend inspection preparation time remediating longstanding gaps rather than confirming readiness.' },
        { icon: 'fa-triangle-exclamation', title: 'Invisible Drift', body: 'Procedures, records, and evidence drift out of alignment gradually, with no signal until an inspection reveals the gap.' },
      ],
    },
    solution: {
      title: 'Understand Readiness At Any Time, Not Only When Preparation Begins',
      paragraphs: [
        'Suricat helps Quality and Regulatory teams understand the current state of readiness across the quality system, independent of whether an inspection has been announced.',
        'By evaluating relationships across procedures, records, risk files, CAPAs, training, and supporting evidence on an ongoing basis, Suricat helps organizations see where the connections an inspection would examine may be incomplete or out of date.',
        'The result is a quality system whose readiness can be assessed at any time, well before preparation activities begin, rather than discovered in the course of them.',
      ],
      cards: [
        { icon: 'fa-gauge-high', title: 'Continuous Readiness Assessment', body: 'Evaluates the condition of the quality system on an ongoing basis, independent of whether an inspection has been announced.' },
        { icon: 'fa-sitemap', title: 'Cross System Relationship Mapping', body: 'Maps connections between procedures, training, CAPAs, and risk files in the exact way an inspection would examine them.' },
        { icon: 'fa-magnifying-glass-chart', title: 'Gap Surfacing Before Preparation', body: 'Identifies where procedures, records, or evidence are out of alignment well before preparation activities begin.' },
        { icon: 'fa-shield-halved', title: 'Defensible System State', body: 'Produces a quality system whose current condition can be demonstrated clearly whenever an inspection occurs.' },
      ],
    },
    enables: {
      title: 'What Inspection Readiness Enables',
      intro: 'Five outcomes that strengthen how Quality and Regulatory teams understand, maintain, and demonstrate inspection readiness across the quality system.',
      outcomes: [
        { icon: 'fa-eye', label: 'Comprehensive Visibility', title: 'Comprehensive Visibility Into Quality System Readiness', body: 'Understand the current condition of procedures, records, risk files, CAPAs, training, and supporting evidence across the organization.' },
        { icon: 'fa-magnifying-glass-clock', label: 'Earlier Identification', title: 'Earlier Identification of Longstanding Gaps', body: 'Identify procedures, records, or evidence that have been out of alignment for some time, before they surface during inspection preparation.' },
        { icon: 'fa-hourglass-end', label: 'Reduced Remediation', title: 'Reduced Last Minute Remediation', body: 'Resolve readiness gaps with enough lead time to act, rather than discovering them during final preparation.' },
        { icon: 'fa-diagram-project', label: 'Clearer Connections', title: 'Clearer Connections Across Inspection Relevant Records', body: 'See how procedures, training, CAPAs, and risk files connect in the ways an inspection would examine them.' },
        { icon: 'fa-shield-halved', label: 'Greater Confidence', title: 'Greater Confidence Going Into An Inspection', body: 'Enter an inspection with confidence that the quality system\'s current condition can be demonstrated, not just explained.' },
      ],
    },
  } satisfies SolutionPageData,
  'document-alignment': {
    heroTitle: 'Documentation Drift Rarely Happens All At Once.',
    heroTitleAccent: 'It Accumulates Over Time.',
    heroSubtitle: 'Quality and regulatory decisions depend on documentation that remains consistent across procedures, records, risk files, CAPAs, design documentation, and supporting evidence. As organizations evolve, maintaining that consistency becomes increasingly difficult.',
    readinessNote: 'Understand how the Compliance Intelligence Layer can help your organization maintain alignment across compliance critical documentation.',
    measures: {
      hero: 'max-w-4xl',
      heroTitle: 'max-w-full',
    },
    problem: {
      title: 'Changes Rarely Occur in Isolation.',
      paragraphs: [
        'Updates made to one document do not always carry through to related documentation, creating gaps that may remain unnoticed until investigations, audits, inspections, or change reviews begin.',
        'As documentation continues to evolve across procedures, records, risk files, CAPAs, and supporting evidence, inconsistencies can accumulate gradually. What begins as a small misalignment can become increasingly difficult to detect as relationships across documentation become more complex.',
        'As a result, teams may spend significant effort determining what changed, what is affected, and how alignment should be restored. Over time, documentation drift can increase review effort, complicate decision-making, and weaken confidence in the integrity of the quality system.',
      ],
      cards: [
        { icon: 'fa-code-branch', title: 'Incomplete Propagation', body: 'Updates to one document do not automatically carry through to related records, procedures, or risk files.' },
        { icon: 'fa-layer-group', title: 'Accumulating Drift', body: 'Small misalignments compound over time, becoming harder to detect as documentation relationships grow more complex.' },
        { icon: 'fa-magnifying-glass', title: 'Late Surfacing', body: 'Inconsistencies remain invisible until investigations, audits, or change reviews begin, when remediation effort is highest.' },
        { icon: 'fa-chart-line', title: 'Increased Review Burden', body: 'Teams spend significant effort reconciling what changed, what is affected, and how alignment should be restored.' },
      ],
    },
    solution: {
      title: 'Identify Alignment Issues Earlier, Before They Become Compliance Concerns',
      paragraphs: [
        'Suricat continuously evaluates relationships across compliance critical documentation to help teams identify potential alignment issues earlier.',
        'By providing visibility into how procedures, records, risk files, CAPAs, and supporting documentation relate to one another, Suricat helps organizations understand where inconsistencies may exist before they become larger compliance concerns.',
        'The result is greater confidence in the consistency of compliance critical documentation and the decisions that depend on it.',
      ],
      cards: [
        { icon: 'fa-rotate', title: 'Continuous Relationship Evaluation', body: 'Evaluates relationships across compliance critical documentation on an ongoing basis, not only when a change event is triggered.' },
        { icon: 'fa-network-wired', title: 'Cross Document Visibility', body: 'Provides visibility into how procedures, records, risk files, CAPAs, and supporting documentation relate and where they may be misaligned.' },
        { icon: 'fa-bell-slash', title: 'Earlier Gap Detection', body: 'Surfaces potential inconsistencies before they expand across related documentation or become visible during formal review activities.' },
        { icon: 'fa-file-shield', title: 'Consistent Documentation Integrity', body: 'Supports a quality system whose compliance critical documentation remains aligned and whose consistency can be demonstrated confidently.' },
      ],
    },
    enables: {
      title: 'What Documentation Alignment Enables',
      intro: 'Five outcomes that strengthen how Quality and Regulatory teams identify, maintain, and demonstrate alignment across compliance critical documentation.',
      outcomes: [
        { icon: 'fa-magnifying-glass', label: 'Earlier Identification', title: 'Earlier Identification of Documentation Drift', body: 'Identify potential alignment issues before they expand across related documentation.' },
        { icon: 'fa-link', label: 'Improved Consistency', title: 'Improved Consistency Across Related Documentation', body: 'Maintain stronger alignment between procedures, records, risk files, CAPAs, and supporting evidence.' },
        { icon: 'fa-person-digging', label: 'Reduced Manual Effort', title: 'Reduced Manual Review and Reconciliation Effort', body: 'Spend less time comparing documentation and investigating inconsistencies.' },
        { icon: 'fa-bolt', label: 'Faster Investigation', title: 'Faster Investigation of Potential Discrepancies', body: 'Understand where potential gaps exist and how they may affect related documentation.' },
        { icon: 'fa-clipboard-check', label: 'Greater Confidence', title: 'Greater Confidence in Quality System Integrity', body: 'Make decisions supported by documentation that remains aligned and consistent.' },
      ],
    },
  } satisfies SolutionPageData,
} as const;

export type SolutionSlug = keyof typeof solutionPages;
