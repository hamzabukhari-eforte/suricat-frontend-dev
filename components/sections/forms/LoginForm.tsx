"use client";

import { FaArrowLeft, FaArrowRight, FaCircleCheck, FaLock, FaRegEnvelope, FaRegEye, FaRegEyeSlash } from "@/components/ui/icons";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { submitLogin } from "@/lib/forms/login";
import { TurnstileField } from "@/components/ui/TurnstileField";
import { useTurnstileAction } from "@/hooks/useTurnstileAction";
import { useTranslations } from "@/components/i18n/LocaleProvider";

const inputClass =
  "input-transition block w-full pl-10 pr-4 py-2.5 bg-surface-muted/50 border border-gray-200 rounded-[4px] text-[#374151] placeholder-[#6b7280]/60 focus:bg-white focus:outline-none focus:border-navy";

export function LoginForm() {
  const t = useTranslations("forms.login");
  const tCommon = useTranslations("common");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const turnstile = useTurnstileAction();

  const bullets = useMemo(
    () => [
      t("bullets.readOnly"),
      t("bullets.humanReview"),
      t("bullets.dataIsolated"),
    ],
    [t],
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (turnstile.isCaptchaBlockingSubmit) {
      setFormError(
        turnstile.captchaStatusMessage ?? tCommon("securityCheck"),
      );
      return;
    }

    setSubmitting(true);
    const result = await submitLogin({
      email,
      password,
      rememberMe,
      ...(turnstile.isTurnstileEnabled
        ? { captchaToken: turnstile.captchaToken }
        : {}),
    });
    setSubmitting(false);

    if (!result.ok) {
      turnstile.resetCaptcha();
      setFieldErrors(result.fieldErrors ?? {});
      setFormError(result.error);
      return;
    }

    turnstile.resetCaptcha();
    setFieldErrors({});
    setFormError(null);
  }

  return (
    <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-surface-muted relative overflow-hidden">
      <div
        className="w-full max-w-5xl bg-white rounded-[4px] shadow-lg overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[650px] relative z-10 border border-gray-200/50"
      >
        <div className="w-full lg:w-[45%] bg-navy text-white p-8 lg:p-12 flex flex-col justify-start lg:justify-center relative overflow-hidden">
          <Link
            href="/"
            className="relative mb-6 lg:mb-0 lg:absolute lg:top-6 lg:left-12 z-20 flex items-center gap-2 text-sm font-semibold text-white hover:text-teal transition-colors group w-fit"
          >
            <FaArrowLeft className="text-xs transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
            {tCommon("backToHome")}
          </Link>
          <div className="z-10 max-w-md">
            <div className="inline-block text-teal text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
              {t("badge")}
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              {t("welcomeTitle")}
            </h1>
            <p className="text-lg text-white/80 mb-8 font-normal leading-relaxed">
              {t("welcomeBody")}
            </p>
            <div className="space-y-4 mt-8 pt-8 border-t border-white/10">
              {bullets.map((item) => (
                <div
                  key={item}
                  className="flex items-start text-sm text-white/70"
                >
                  <FaCircleCheck className="text-teal mt-0.5 mr-3 w-4" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[55%] p-8 lg:p-16 flex flex-col justify-center bg-white">
          <div className="max-w-md w-full mx-auto">
            <h2 className="text-2xl font-bold text-navy mb-2">{t("signInTitle")}</h2>
            <p className="text-navy text-sm mb-8">
              {t("signInSubtitle")}
            </p>
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-navy mb-1.5"
                >
                  {t("workEmail")}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <FaRegEnvelope className="text-[#6b7280]/70" aria-hidden="true" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder={t("emailPlaceholder")}
                    className={inputClass}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {fieldErrors.email ? (
                  <p className="mt-1.5 text-xs text-red-500">{fieldErrors.email}</p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-navy mb-1.5"
                >
                  {t("password")}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <FaLock className="text-[#6b7280]/70" aria-hidden="true" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    placeholder="••••••••"
                    className={`${inputClass} pr-10`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#6b7280] hover:text-navy transition-colors focus:outline-none"
                    aria-label={showPassword ? t("hidePassword") : t("showPassword")}
                  >
                    {showPassword ? (
                      <FaRegEyeSlash aria-hidden="true" />
                    ) : (
                      <FaRegEye aria-hidden="true" />
                    )}
                  </button>
                </div>
                {fieldErrors.password ? (
                  <p className="mt-1.5 text-xs text-red-500">
                    {fieldErrors.password}
                  </p>
                ) : null}
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded-[4px] border-gray-200 cursor-pointer"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-500 cursor-pointer hover:text-navy transition-colors"
                  >
                    {t("keepSignedIn")}
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-teal hover:text-navy transition-colors hover:underline"
                  >
                    {t("forgotPassword")}
                  </a>
                </div>
              </div>

              {formError ? (
                <p className="text-sm text-red-500" role="alert">
                  {formError}
                </p>
              ) : null}

              <TurnstileField action={turnstile} />

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting || turnstile.isCaptchaBlockingSubmit}
                  className="suricat-teal-btn group w-full flex justify-center items-center gap-3 px-6 py-2.5 rounded-full text-sm md:text-base font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal disabled:opacity-60"
                >
                  {t("submit")}
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                </button>
              </div>

              <div className="text-center mt-6 text-sm text-navy font-medium">
                {t("needAccount")}{" "}
                <Link
                  href="/get-started"
                  className="font-medium text-teal hover:text-navy hover:underline transition-colors"
                >
                  {t("signup")}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export function LoginSlimHeader() {
  const tCommon = useTranslations("common");
  return (
    <nav className="border-b border-gray-200 sticky top-0 bg-white z-50 relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 lg:h-24 flex items-center">
        <Link href="/">
          <Image
            src="/assets/images/suricat-logo-nav.png"
            alt={tCommon("suricatAlt")}
            width={300}
            height={68}
            className="h-8 shrink-0 object-contain object-left sm:h-11"
            style={{ width: "auto" }}
            priority
          />
        </Link>
      </div>
    </nav>
  );
}
