/**
 * Shared API client for marketing-site form submissions.
 * Targets suricat-dev Nest API: {NEXT_PUBLIC_API_URL}/public/inquiries/*
 */

export type FormResult =
  | { ok: true; data?: unknown }
  | { ok: false; error: string };

const DEFAULT_API_URL = "http://localhost:3000/api/v1";

export function getApiBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim();
  return (raw || DEFAULT_API_URL).replace(/\/$/, "");
}

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

/**
 * POST JSON to the Nest API and map the response to FormResult.
 */
export async function postInquiry<TPayload extends object>(
  endpoint: string,
  payload: TPayload,
): Promise<FormResult> {
  const path = endpoint.replace(/^\//, "");
  const url = `${getApiBaseUrl()}/public/inquiries/${path}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    let body: unknown = null;
    const text = await response.text();
    if (text) {
      try {
        body = JSON.parse(text) as unknown;
      } catch {
        body = null;
      }
    }

    if (!response.ok) {
      return {
        ok: false,
        error: extractErrorMessage(
          body,
          response.status === 404
            ? "This form endpoint is not available yet. Please try again later."
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
