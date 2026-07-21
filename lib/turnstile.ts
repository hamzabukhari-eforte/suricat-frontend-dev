/** Client-side Turnstile enable check (public env only). */

function isEnabledFlag(value?: string): boolean {
  return value === "true" || value === "1";
}

export function isTurnstileEnabled(): boolean {
  return (
    isEnabledFlag(process.env.NEXT_PUBLIC_ENABLE_TURNSTILE) &&
    Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)
  );
}

export function getTurnstileSiteKey(): string | undefined {
  const key = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  return key || undefined;
}
