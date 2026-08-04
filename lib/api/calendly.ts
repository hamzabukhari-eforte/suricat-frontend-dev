/**
 * Calendly availability + booking against suricat-dev Nest API.
 * {NEXT_PUBLIC_API_URL}/calendly/*
 */

import { getApiBaseUrl, type FormResult } from "@/lib/api/client";

export type CalendlyFormSource = "get-started" | "readiness";

export type CalendlySlot = {
  start_time: string;
};

/** Local calendar date → slots (UTC start_time). */
export type SlotsByDate = Record<string, CalendlySlot[]>;

export type BookCalendlyPayload = {
  name: string;
  email: string;
  start_time: string;
  formSource: CalendlyFormSource;
  company?: string;
  role?: string;
  companySize?: string;
  priority?: string;
  priorityOther?: string;
  timeline?: string;
  timelineOther?: string;
  context?: string;
  captchaToken?: string;
};

export type BookCalendlyResult =
  | { ok: true; data?: unknown }
  | {
      ok: false;
      error: string;
      /** True when the selected slot is no longer available. */
      slotTaken?: boolean;
    };

function extractErrorMessage(body: unknown, fallback: string): string {
  if (!body || typeof body !== "object") return fallback;

  const record = body as Record<string, unknown>;

  if (typeof record.error === "string" && record.error.trim()) {
    return record.error;
  }

  if (typeof record.message === "string" && record.message.trim()) {
    return record.message;
  }

  if (Array.isArray(record.message) && record.message.length > 0) {
    return record.message.map(String).join(" ");
  }

  return fallback;
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

/** Local YYYY-MM-DD for an instant (visitor timezone). */
export function localIsoDateFromUtc(isoUtc: string): string | null {
  const d = new Date(isoUtc);
  if (Number.isNaN(d.getTime())) return null;
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function asSlot(value: unknown): CalendlySlot | null {
  if (!value || typeof value !== "object") return null;
  const start =
    (value as { start_time?: unknown }).start_time ??
    (value as { startTime?: unknown }).startTime;
  if (typeof start !== "string" || !start.trim()) return null;
  return { start_time: start.trim() };
}

function collectSlots(body: unknown): CalendlySlot[] {
  if (!body || typeof body !== "object") return [];

  const record = body as Record<string, unknown>;
  const out: CalendlySlot[] = [];

  const pushList = (list: unknown) => {
    if (!Array.isArray(list)) return;
    for (const item of list) {
      const slot = asSlot(item);
      if (slot) out.push(slot);
    }
  };

  // Prefer grouped shapes from our Nest API.
  if (record.days && typeof record.days === "object" && !Array.isArray(record.days)) {
    for (const list of Object.values(record.days as Record<string, unknown>)) {
      pushList(list);
    }
    return out;
  }

  if (Array.isArray(record.availability)) {
    for (const day of record.availability) {
      if (day && typeof day === "object") {
        pushList((day as { slots?: unknown }).slots);
      }
    }
    return out;
  }

  // Flat passthrough: { slots } | { collection } | { data }
  pushList(record.slots);
  if (out.length) return out;
  pushList(record.collection);
  if (out.length) return out;
  pushList(record.data);
  return out;
}

/**
 * Group API slots by the visitor's local calendar date.
 * Filters out past start times.
 */
export function groupSlotsByLocalDate(slots: CalendlySlot[]): SlotsByDate {
  const now = Date.now();
  const byDate: SlotsByDate = {};

  for (const slot of slots) {
    const ms = Date.parse(slot.start_time);
    if (Number.isNaN(ms) || ms <= now) continue;
    const dateKey = localIsoDateFromUtc(slot.start_time);
    if (!dateKey) continue;
    (byDate[dateKey] ??= []).push(slot);
  }

  for (const key of Object.keys(byDate)) {
    byDate[key].sort(
      (a, b) => Date.parse(a.start_time) - Date.parse(b.start_time),
    );
  }

  return byDate;
}

async function parseJsonResponse(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

export async function fetchCalendlyAvailability(
  start: string,
  end: string,
  signal?: AbortSignal,
): Promise<FormResult & { slotsByDate?: SlotsByDate }> {
  const params = new URLSearchParams({ start, end });
  const url = `${getApiBaseUrl()}/calendly/availability?${params}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal,
    });

    const body = await parseJsonResponse(response);

    if (!response.ok) {
      return {
        ok: false,
        error: extractErrorMessage(
          body,
          response.status === 404
            ? "Scheduling is not available yet. Please try again later."
            : "Unable to load available times. Please try again.",
        ),
      };
    }

    const slots = collectSlots(body);
    return { ok: true, slotsByDate: groupSlotsByLocalDate(slots), data: body };
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return { ok: false, error: "aborted" };
    }
    return {
      ok: false,
      error:
        "Unable to reach the server. Check your connection and try again.",
    };
  }
}

export async function bookCalendlySlot(
  payload: BookCalendlyPayload,
): Promise<BookCalendlyResult> {
  const url = `${getApiBaseUrl()}/calendly/book`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const body = await parseJsonResponse(response);

    if (!response.ok) {
      const slotTaken =
        response.status === 409 ||
        response.status === 422 ||
        /slot|taken|available|conflict|no longer/i.test(
          extractErrorMessage(body, ""),
        );

      return {
        ok: false,
        slotTaken,
        error: extractErrorMessage(
          body,
          slotTaken
            ? "That time is no longer available. Please choose another slot."
            : response.status === 404
              ? "Scheduling is not available yet. Please try again later."
              : "Something went wrong. Please try again.",
        ),
      };
    }

    return { ok: true, data: body ?? undefined };
  } catch {
    return {
      ok: false,
      error:
        "Unable to reach the server. Check your connection and try again.",
    };
  }
}
