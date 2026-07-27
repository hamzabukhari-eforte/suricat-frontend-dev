"use client";

import { FaArrowRight, FaLock } from "@/components/ui/icons";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  buildDiscussionConfirmedQuery,
  submitReadiness,
  type ReadinessPayload,
} from "@/lib/forms/readiness";
import {
  formatScheduleDate,
  ScheduleCalendar,
} from "@/components/sections/forms/ScheduleCalendar";
import { ScheduleHelperNote } from "@/components/sections/forms/ScheduleHelperNote";
import { TurnstileField } from "@/components/ui/TurnstileField";
import { useTurnstileAction } from "@/hooks/useTurnstileAction";
import { useLocale, useTranslations } from "@/components/i18n/LocaleProvider";

const inputClass =
  "w-full px-4 py-2.5 text-sm bg-[#F3F4F6]/50 border border-[#E5E7EB] rounded-[4px] text-[#374151] placeholder-[#6B7280]/60 focus:bg-white focus:outline-none focus:border-navy transition-all";

export function ReadinessForm() {
  const t = useTranslations("forms.readiness");
  const tCommon = useTranslations("common");
  const { locale } = useLocale();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [timeline, setTimeline] = useState("");
  const [timelineOther, setTimelineOther] = useState("");
  const [priority, setPriority] = useState("");
  const [priorityOther, setPriorityOther] = useState("");
  const [context, setContext] = useState("");
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [emailError, setEmailError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const turnstile = useTurnstileAction();

  const timelines = useMemo(
    () => [
      { value: "within90", label: t("timelines.within90") },
      { value: "90to180", label: t("timelines.90to180") },
      { value: "180to365", label: t("timelines.180to365") },
      { value: "other", label: t("timelines.other") },
    ],
    [t],
  );

  const priorities = useMemo(
    () => [
      { value: "audit", label: t("priorities.audit") },
      { value: "consistency", label: t("priorities.consistency") },
      { value: "capa", label: t("priorities.capa") },
      { value: "change", label: t("priorities.change") },
      { value: "evidence", label: t("priorities.evidence") },
      { value: "readiness", label: t("priorities.readiness") },
      { value: "alignment", label: t("priorities.alignment") },
      { value: "other", label: t("priorities.other") },
    ],
    [t],
  );

  const canSubmit = useMemo(() => {
    if (!name.trim() || !email.trim() || !company.trim()) return false;
    if (!timeline) return false;
    if (timeline === "other" && !timelineOther.trim()) return false;
    if (!priority) return false;
    if (priority === "other" && !priorityOther.trim()) return false;
    if (date == null || !time) return false;
    if (turnstile.isCaptchaBlockingSubmit) return false;
    return true;
  }, [
    name,
    email,
    company,
    timeline,
    timelineOther,
    priority,
    priorityOther,
    date,
    time,
    turnstile.isCaptchaBlockingSubmit,
  ]);

  async function onSubmit() {
    if (turnstile.isCaptchaBlockingSubmit) {
      toast.error(
        turnstile.captchaStatusMessage ?? tCommon("securityCheck"),
      );
      return;
    }

    const payload: ReadinessPayload = {
      name,
      email,
      company,
      role,
      timeline,
      timelineOther,
      priority,
      priorityOther,
      context,
      date: date != null ? formatScheduleDate(date, locale) : undefined,
      time: time ?? undefined,
      ...(turnstile.isTurnstileEnabled
        ? { captchaToken: turnstile.captchaToken }
        : {}),
    };

    setSubmitting(true);
    const result = await submitReadiness(payload);
    setSubmitting(false);

    if (!result.ok) {
      turnstile.resetCaptcha();
      if (result.fieldErrors?.email) setEmailError(true);
      toast.error(result.error);
      return;
    }

    const { captchaToken: _token, ...stored } = payload;
    const qs = buildDiscussionConfirmedQuery(payload);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("suricat-discussion", JSON.stringify(stored));
    }

    setName("");
    setEmail("");
    setCompany("");
    setRole("");
    setTimeline("");
    setTimelineOther("");
    setPriority("");
    setPriorityOther("");
    setContext("");
    setDate(null);
    setTime(null);
    setEmailError(false);
    turnstile.resetCaptcha();
    toast.success(t("toastSuccess"));

    router.push(`/discussion-confirmed?${qs}`);
  }

  return (
    <section id="intake" className="relative w-full bg-[#f5f7fa] py-8 max-sm:py-5">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-6 max-sm:mb-4">
          <p className="mb-3 text-[14px] font-bold uppercase tracking-[0.15em] text-teal max-sm:mb-2">
            {t("sectionEyebrow")}
          </p>
          <h2 className="mb-3 text-[1.5rem] font-bold tracking-tight text-navy max-sm:mb-2 sm:text-[28px]">
            {t("sectionTitle")}
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-navy sm:text-[20px]">
            {t("sectionBody")}
            <br />
            {t("sectionBody2")}
          </p>
        </div>

        <form
          className="grid min-w-0 items-start gap-6 max-sm:gap-3 lg:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            void onSubmit();
          }}
        >
          <div className="min-w-0 space-y-6">
            <div className="rounded-[4px] border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-7">
              <h3 className="mb-5 text-base font-bold text-navy">
                {t("intakeTitle")}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="min-w-0">
                  <label className="mb-1.5 block text-xs font-medium text-navy">
                    {t("name")} <span className="text-teal">*</span>
                  </label>
                  <input
                    className={inputClass}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("namePlaceholder")}
                    required
                  />
                </div>
                <div className="min-w-0">
                  <label className="mb-1.5 block text-xs font-medium text-navy">
                    {t("email")} <span className="text-teal">*</span>
                  </label>
                  <input
                    type="email"
                    className={inputClass}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError(false);
                    }}
                    placeholder={t("emailPlaceholder")}
                    required
                  />
                  {emailError ? (
                    <p className="mt-1.5 text-xs text-red-500">
                      {t("emailInvalid")}
                    </p>
                  ) : null}
                </div>
                <div className="min-w-0">
                  <label className="mb-1.5 block text-xs font-medium text-navy">
                    {t("company")} <span className="text-teal">*</span>
                  </label>
                  <input
                    className={inputClass}
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder={t("companyPlaceholder")}
                    required
                  />
                </div>
                <div className="min-w-0">
                  <label className="mb-1.5 block text-xs font-medium text-navy">
                    {t("role")}{" "}
                    <span className="font-normal text-gray-400">{t("optional")}</span>
                  </label>
                  <input
                    className={inputClass}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder={t("rolePlaceholder")}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-[4px] border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-7">
              <h3 className="mb-1 text-base font-bold text-navy">
                {t("timeline")}
              </h3>
              <p className="mb-4 text-xs text-navy">
                {t("timelineHint")}
              </p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {timelines.map((opt) => (
                  <label
                    key={opt.value}
                    className="timeline-option flex min-w-0 cursor-pointer items-center gap-2 rounded-[4px] border border-gray-200 bg-white px-2.5 py-2.5 transition-all hover:border-teal/50 sm:gap-2.5 sm:px-4 sm:py-3"
                  >
                    <input
                      type="radio"
                      name="timeline"
                      value={opt.value}
                      checked={timeline === opt.value}
                      onChange={() => setTimeline(opt.value)}
                    />
                    <span className="min-w-0 text-xs font-medium leading-snug break-words text-navy sm:text-sm">
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
              <div
                className={`other-box${timeline === "other" ? " is-open" : ""}`}
              >
                <input
                  className={inputClass}
                  value={timelineOther}
                  onChange={(e) => setTimelineOther(e.target.value)}
                  placeholder={t("timelineOther")}
                />
              </div>
            </div>

            <div className="rounded-[4px] border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-7">
              <h3 className="mb-1 text-base font-bold text-navy">
                {t("priority")}
              </h3>
              <p className="mb-4 text-xs text-navy">
                {t("priorityHint")}
              </p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {priorities.map((opt) => (
                  <label
                    key={opt.value}
                    className="priority-option flex min-w-0 cursor-pointer items-center gap-2 rounded-[4px] border border-gray-200 bg-white px-2.5 py-2.5 transition-all hover:border-teal/50 sm:gap-2.5 sm:px-4 sm:py-3"
                  >
                    <input
                      type="radio"
                      name="priority"
                      value={opt.value}
                      checked={priority === opt.value}
                      onChange={() => setPriority(opt.value)}
                    />
                    <span className="min-w-0 text-xs font-medium leading-snug break-words text-navy sm:text-sm">
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
              <div
                className={`other-box${priority === "other" ? " is-open" : ""}`}
              >
                <input
                  className={inputClass}
                  value={priorityOther}
                  onChange={(e) => setPriorityOther(e.target.value)}
                  placeholder={t("priorityOther")}
                />
              </div>
            </div>

            <div className="rounded-[4px] border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-7">
              <h3 className="mb-1 text-base font-bold text-navy">
                {t("context")}{" "}
                <span className="text-sm font-normal text-gray-400">
                  {t("optional")}
                </span>
              </h3>
              <p className="mb-4 text-xs text-navy">
                {t("contextHint")}
              </p>
              <textarea
                rows={4}
                maxLength={300}
                className={`${inputClass} resize-none py-3`}
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder={t("contextPlaceholder")}
              />
              <p className="mt-1.5 text-right text-[11px] text-gray-400">
                {t("maxChars", { count: context.length })}
              </p>
            </div>
          </div>

          <div className="min-w-0 max-w-full space-y-6 max-sm:space-y-3 lg:sticky lg:top-24">
            <ScheduleCalendar
              selectedDate={date}
              selectedTime={time}
              onSelectDate={setDate}
              onSelectTime={setTime}
            />
            <div className="min-w-0 max-w-full overflow-x-hidden rounded-[4px] border border-gray-200 bg-white p-6 shadow-sm max-sm:p-3 sm:p-6">
              <p className="mb-4 text-xs leading-relaxed text-navy max-sm:mb-3 max-sm:text-[11px] max-sm:leading-snug">
                {t("privacyNote")}
              </p>
              <div className="mx-auto w-full min-w-0 max-w-md space-y-4 max-sm:space-y-2.5">
                <TurnstileField action={turnstile} />
                <button
                  type="submit"
                  disabled={!canSubmit || submitting}
                  className={
                    canSubmit && !submitting
                      ? "suricat-teal-btn group flex w-full max-w-full items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-all max-sm:px-5 max-sm:py-2 md:text-base"
                      : "group flex w-full max-w-full cursor-not-allowed items-center justify-center gap-2 rounded-full border-2 border-gray-200 bg-gray-100 px-6 py-2.5 text-sm font-bold text-gray-400 transition-all max-sm:px-5 max-sm:py-2 md:text-base"
                  }
                >
                  {!canSubmit ? (
                    <FaLock className="text-xs" aria-hidden="true" />
                  ) : null}
                  {t("submit")}
                  <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </button>
                <ScheduleHelperNote canSubmit={canSubmit} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
