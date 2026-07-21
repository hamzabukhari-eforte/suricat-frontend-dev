"use client";

import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { useCallback, useRef, useState } from "react";
import {
  getTurnstileSiteKey,
  isTurnstileEnabled,
} from "@/lib/turnstile";

type TurnstileStatus = "idle" | "ready" | "error" | "expired";

export function useTurnstileAction() {
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [captchaToken, setCaptchaTokenState] = useState("");
  const [captchaStatus, setCaptchaStatus] = useState<TurnstileStatus>("idle");
  const enabled = isTurnstileEnabled();
  const siteKey = getTurnstileSiteKey();

  const resetCaptcha = useCallback(() => {
    setCaptchaTokenState("");
    setCaptchaStatus("idle");
    turnstileRef.current?.reset();
  }, []);

  const setCaptchaToken = useCallback((token: string) => {
    setCaptchaTokenState(token);
    setCaptchaStatus("ready");
  }, []);

  const setCaptchaError = useCallback(() => {
    setCaptchaTokenState("");
    setCaptchaStatus("error");
  }, []);

  const setCaptchaExpired = useCallback(() => {
    setCaptchaTokenState("");
    setCaptchaStatus("expired");
  }, []);

  const isCaptchaReady = !enabled || Boolean(captchaToken);
  const isCaptchaBlockingSubmit = enabled && !isCaptchaReady;
  const captchaStatusMessage = isCaptchaBlockingSubmit
    ? captchaStatus === "error"
      ? "Security check failed. Please try again."
      : captchaStatus === "expired"
        ? "Security check expired. Please try again."
        : ""
    : null;

  return {
    turnstileRef,
    captchaToken,
    setCaptchaToken,
    setCaptchaError,
    setCaptchaExpired,
    resetCaptcha,
    isTurnstileEnabled: enabled,
    siteKey,
    captchaStatus,
    isCaptchaReady,
    isCaptchaBlockingSubmit,
    captchaStatusMessage,
  };
}
