"use client";

import { FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  submitContact,
  type ContactPayload,
} from "@/lib/forms/contact";
import { FaLock } from "@/components/ui/icons";
import { TurnstileField } from "@/components/ui/TurnstileField";
import { useTurnstileAction } from "@/hooks/useTurnstileAction";
import { useTranslations } from "@/components/i18n/LocaleProvider";

const inputClass =
  "w-full rounded-[4px] border border-gray-300 bg-white px-4 py-3 text-[#374151] placeholder:text-[#6b7280]/60 focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal";

export function ContactForm() {
  const t = useTranslations("forms.contact");
  const tCommon = useTranslations("common");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const turnstile = useTurnstileAction();

  const intents = useMemo(
    () => [
      { value: "general", label: t("intents.general") },
      { value: "partnership", label: t("intents.partnership") },
      { value: "design-partner", label: t("intents.designPartner") },
    ],
    [t],
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (turnstile.isCaptchaBlockingSubmit) {
      toast.error(
        turnstile.captchaStatusMessage ?? tCommon("securityCheck"),
      );
      return;
    }

    setStatus("submitting");

    const fd = new FormData(form);
    const payload: ContactPayload = {
      name: String(fd.get("name") ?? ""),
      company: String(fd.get("company") ?? ""),
      workEmail: String(fd.get("work_email") ?? ""),
      intent: String(fd.get("intent") ?? ""),
      message: String(fd.get("message") ?? ""),
      ...(turnstile.isTurnstileEnabled
        ? { captchaToken: turnstile.captchaToken }
        : {}),
    };

    const result = await submitContact(payload);
    if (result.ok) {
      form.reset();
      turnstile.resetCaptcha();
      setStatus("idle");
      toast.success(t("success"));
    } else {
      turnstile.resetCaptcha();
      setStatus("error");
      toast.error(result.error);
    }
  }

  return (
    <form onSubmit={onSubmit} className="min-w-0 max-w-full space-y-6 max-sm:space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="name" className="text-sm text-navy">
          {t("name")}
        </label>
        <input
          id="name"
          name="name"
          required
          className={inputClass}
          autoComplete="name"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="company" className="text-sm text-navy">
          {t("company")}
        </label>
        <input
          id="company"
          name="company"
          required
          className={inputClass}
          autoComplete="organization"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="work_email" className="text-sm text-navy">
          {t("workEmail")}
        </label>
        <input
          id="work_email"
          name="work_email"
          type="email"
          required
          className={inputClass}
          autoComplete="email"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="intent" className="text-sm text-navy">
          {t("intentLabel")}
        </label>
        <select id="intent" name="intent" required className={inputClass} defaultValue="">
          <option value="" disabled>
            {tCommon("selectOption")}
          </option>
          {intents.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="text-sm text-navy">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={`${inputClass} resize-y`}
        />
      </div>

      <TurnstileField action={turnstile} />

      <div className="w-full pt-2">
        <button
          type="submit"
          disabled={status === "submitting" || turnstile.isCaptchaBlockingSubmit}
          className="suricat-teal-btn w-full rounded-full px-8 py-2.5 font-bold disabled:opacity-60"
        >
          {status === "submitting" ? tCommon("sending") : t("submit")}
        </button>
      </div>
      <p className="text-sm leading-relaxed text-gray-700">
        <FaLock className="mr-1 inline-block align-middle text-xs" aria-hidden="true" />
        {t("privacyNote")}
      </p>
    </form>
  );
}
