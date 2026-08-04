import { bookCalendlySlot, type BookCalendlyResult } from "@/lib/api/calendly";
import type { FormResult } from "@/lib/api/client";

export type GetStartedPayload = {
  name: string;
  email: string;
  company: string;
  role?: string;
  companySize?: string;
  priority?: string;
  priorityOther?: string;
  context?: string;
  /** Local calendar date YYYY-MM-DD (UI selection). */
  date?: string;
  /** UTC ISO start_time from Calendly availability. */
  startTime?: string;
  /** Human-readable local time for confirmation display. */
  time?: string;
  captchaToken?: string;
};

export type GetStartedFormResult =
  | { ok: true; data?: unknown }
  | {
      ok: false;
      error: string;
      fieldErrors?: Record<string, string>;
      slotTaken?: boolean;
    };

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validateGetStarted(
  payload: GetStartedPayload,
): GetStartedFormResult {
  const fieldErrors: Record<string, string> = {};

  if (!payload.name.trim()) fieldErrors.name = "Name is required.";
  if (!payload.email.trim()) {
    fieldErrors.email = "Work email is required.";
  } else if (!isValidEmail(payload.email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }
  if (!payload.company.trim()) fieldErrors.company = "Company name is required.";
  if (!payload.priority) fieldErrors.priority = "Select a conversation focus.";
  if (payload.priority === "other" && !payload.priorityOther?.trim()) {
    fieldErrors.priorityOther = "Please describe your focus.";
  }
  // Keep ISO date for schedule validation; human-readable for confirmation.
  if (!payload.startTime) {
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

export async function submitGetStarted(
  payload: GetStartedPayload,
): Promise<GetStartedFormResult> {
  const validated = validateGetStarted(payload);
  if (!validated.ok) return validated;

  const result: BookCalendlyResult = await bookCalendlySlot({
    name: payload.name,
    email: payload.email,
    company: payload.company,
    role: payload.role,
    companySize: payload.companySize,
    priority: payload.priority,
    priorityOther: payload.priorityOther,
    context: payload.context,
    start_time: payload.startTime!,
    formSource: "get-started",
    ...(payload.captchaToken ? { captchaToken: payload.captchaToken } : {}),
  });

  if (!result.ok) {
    return {
      ok: false,
      error: result.error,
      slotTaken: result.slotTaken,
      ...(result.slotTaken
        ? { fieldErrors: { schedule: result.error } }
        : {}),
    };
  }

  return { ok: true, data: result.data };
}

export function buildDiscussionConfirmedQuery(
  payload: GetStartedPayload,
): string {
  const params = new URLSearchParams();
  if (payload.name) params.set("name", payload.name);
  if (payload.email) params.set("email", payload.email);
  if (payload.company) params.set("company", payload.company);
  if (payload.date) params.set("date", payload.date);
  if (payload.time) params.set("time", payload.time);
  if (payload.priorityOther && payload.priority === "other") {
    params.set("priority", payload.priorityOther);
  } else if (payload.priority) {
    params.set("priority", payload.priority);
  }
  return params.toString();
}

export type { FormResult };
