import { postInquiry, type FormResult } from "@/lib/api/client";

export type ReadinessPayload = {
  name: string;
  email: string;
  company: string;
  role?: string;
  timeline?: string;
  timelineOther?: string;
  priority?: string;
  priorityOther?: string;
  context?: string;
  date?: string;
  time?: string;
};

export type ReadinessFormResult =
  | { ok: true; data?: unknown }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

const PRIORITY_LABELS: Record<string, string> = {
  audit: "Audit Preparation",
  consistency: "Cross-Document Consistency",
  capa: "CAPA Traceability",
  change: "Change Impact Assessment",
  evidence: "Evidence Visibility",
  readiness: "Inspection Readiness",
  alignment: "Operational Alignment",
};

const TIMELINE_LABELS: Record<string, string> = {
  within90: "Within 90 Days",
  "90to180": "90–180 Days",
  "180to365": "180–365 Days",
};

export function validateReadiness(
  payload: ReadinessPayload,
): ReadinessFormResult {
  const fieldErrors: Record<string, string> = {};

  if (!payload.name.trim()) fieldErrors.name = "Name is required.";
  if (!payload.email.trim()) {
    fieldErrors.email = "Work email is required.";
  } else if (!isValidEmail(payload.email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }
  if (!payload.company.trim()) fieldErrors.company = "Company name is required.";
  if (!payload.timeline) fieldErrors.timeline = "Select an inspection timeline.";
  if (payload.timeline === "other" && !payload.timelineOther?.trim()) {
    fieldErrors.timelineOther = "Please describe your timeline.";
  }
  if (!payload.priority) fieldErrors.priority = "Select a priority.";
  if (payload.priority === "other" && !payload.priorityOther?.trim()) {
    fieldErrors.priorityOther = "Please describe your priority.";
  }
  if (!payload.date || !payload.time) {
    fieldErrors.schedule = "Select a date and time.";
  }

  if (Object.keys(fieldErrors).length) {
    return {
      ok: false,
      error: "Please complete all required fields.",
      fieldErrors,
    };
  }

  return { ok: true };
}

export async function submitReadiness(
  payload: ReadinessPayload,
): Promise<ReadinessFormResult> {
  const validated = validateReadiness(payload);
  if (!validated.ok) return validated;

  return postInquiry("readiness", payload);
}

export function buildDiscussionConfirmedQuery(
  payload: ReadinessPayload,
): string {
  const params = new URLSearchParams();
  if (payload.name) params.set("name", payload.name);
  if (payload.email) params.set("email", payload.email);
  if (payload.company) params.set("company", payload.company);
  if (payload.date) params.set("date", payload.date);
  if (payload.time) params.set("time", payload.time);

  const timeline =
    payload.timeline === "other"
      ? payload.timelineOther
      : payload.timeline
        ? TIMELINE_LABELS[payload.timeline] ?? payload.timeline
        : "";
  if (timeline) params.set("timeline", timeline);

  const priority =
    payload.priority === "other"
      ? payload.priorityOther
      : payload.priority
        ? PRIORITY_LABELS[payload.priority] ?? payload.priority
        : "";
  if (priority) params.set("priority", priority);

  return params.toString();
}

export type { FormResult };
