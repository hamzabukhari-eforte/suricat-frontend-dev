/** Client-side Turnstile enable check (public env only). */

/** TEMP: hardcoded for production testing — remove once host env + rebuild works. */
const TEMP_TURNSTILE_ENABLED = true;
const TEMP_TURNSTILE_SITE_KEY = "0x4AAAAAAD6g7k0a5Ewltrvm";

function isEnabledFlag(value?: string): boolean {
  return value === "true" || value === "1";
}

export function isTurnstileEnabled(): boolean {
  if (TEMP_TURNSTILE_ENABLED) return true;
  return (
    isEnabledFlag(process.env.NEXT_PUBLIC_ENABLE_TURNSTILE) &&
    Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)
  );
}

export function getTurnstileSiteKey(): string | undefined {
  const key = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  return key || TEMP_TURNSTILE_SITE_KEY;
}
