"use client";

import { AppTurnstile } from "@/components/ui/AppTurnstile";
import { useTurnstileAction } from "@/hooks/useTurnstileAction";

export type TurnstileFieldApi = ReturnType<typeof useTurnstileAction>;

/** Shared Turnstile block for marketing forms. Renders nothing when disabled. */
export function TurnstileField({
  action,
  className = "",
}: {
  action: TurnstileFieldApi;
  className?: string;
}) {
  const {
    isTurnstileEnabled,
    siteKey,
    turnstileRef,
    setCaptchaToken,
    setCaptchaError,
    setCaptchaExpired,
    captchaStatusMessage,
  } = action;

  if (!isTurnstileEnabled || !siteKey) return null;

  return (
    <div className={`w-full min-w-0 max-w-full space-y-2 ${className}`}>
      <AppTurnstile
        ref={turnstileRef}
        siteKey={siteKey}
        onSuccess={setCaptchaToken}
        onError={setCaptchaError}
        onExpire={setCaptchaExpired}
      />
      {captchaStatusMessage ? (
        <p className="text-sm text-red-500" role="alert">
          {captchaStatusMessage}
        </p>
      ) : null}
    </div>
  );
}
