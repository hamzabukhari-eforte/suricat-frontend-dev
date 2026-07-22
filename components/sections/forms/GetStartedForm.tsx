"use client";

import { FaArrowRight, FaLock } from "@/components/ui/icons";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  buildDiscussionConfirmedQuery,
  submitGetStarted,
  type GetStartedPayload,
} from "@/lib/forms/get-started";
import {
  formatScheduleDate,
  ScheduleCalendar,
} from "@/components/sections/forms/ScheduleCalendar";
import { ScheduleHelperNote } from "@/components/sections/forms/ScheduleHelperNote";
import { TurnstileField } from "@/components/ui/TurnstileField";
import { useTurnstileAction } from "@/hooks/useTurnstileAction";

const COMPANY_SIZES = [
  { value: "lt50", label: "<50" },
  { value: "50to250", label: "50–250" },
  { value: "250to1000", label: "250–1000" },
  { value: "1000plus", label: "1000+" },
] as const;

const PRIORITIES = [
  { value: "fit", label: "Understand whether Suricat fits our environment" },
  { value: "readiness", label: "Explore readiness and operating challenges" },
  { value: "approach", label: "Understand Suricat's approach" },
  { value: "architecture", label: "Discuss architecture and operating model" },
  { value: "collaboration", label: "Explore strategic collaboration" },
  { value: "other", label: "Other" },
] as const;

const inputClass =
  "w-full px-4 py-2.5 text-sm bg-[#F3F4F6]/50 border border-[#E5E7EB] rounded-[4px] text-[#374151] placeholder-[#6B7280]/60 focus:bg-white focus:outline-none focus:border-navy transition-all";

export function GetStartedForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [priority, setPriority] = useState("");
  const [priorityOther, setPriorityOther] = useState("");
  const [context, setContext] = useState("");
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [emailError, setEmailError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const turnstile = useTurnstileAction();

  const canSubmit = useMemo(() => {
    if (!name.trim() || !email.trim() || !company.trim()) return false;
    if (!priority) return false;
    if (priority === "other" && !priorityOther.trim()) return false;
    if (date == null || !time) return false;
    if (turnstile.isCaptchaBlockingSubmit) return false;
    return true;
  }, [
    name,
    email,
    company,
    priority,
    priorityOther,
    date,
    time,
    turnstile.isCaptchaBlockingSubmit,
  ]);

  async function onSubmit() {
    if (turnstile.isCaptchaBlockingSubmit) {
      toast.error(
        turnstile.captchaStatusMessage ?? "Please complete the security check.",
      );
      return;
    }

    const payload: GetStartedPayload = {
      name,
      email,
      company,
      role,
      companySize,
      priority,
      priorityOther,
      context,
      date: date != null ? formatScheduleDate(date) : undefined,
      time: time ?? undefined,
      ...(turnstile.isTurnstileEnabled
        ? { captchaToken: turnstile.captchaToken }
        : {}),
    };

    setSubmitting(true);
    const result = await submitGetStarted(payload);
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
    setCompanySize("");
    setPriority("");
    setPriorityOther("");
    setContext("");
    setDate(null);
    setTime(null);
    setEmailError(false);
    turnstile.resetCaptcha();
    toast.success("Discussion scheduled. A confirmation email is on the way.");

    router.push(`/discussion-confirmed?${qs}`);
  }

  return (
    <section id="intake" className="relative w-full bg-[#f5f7fa] py-8 max-sm:py-5">
      <div className="max-w-7xl mx-auto px-6 relative z-10 max-sm:px-4">
        <div className="mb-6 max-sm:mb-4">
          <p className="mb-3 text-[14px] font-bold uppercase tracking-[0.15em] text-teal max-sm:mb-2">
            Introductory Discussion
          </p>
          <h2 className="mb-3 text-[28px] font-bold tracking-tight text-navy max-sm:mb-2 max-sm:text-[1.5rem]">
            Tell Us About Your Environment
          </h2>
          <p className="max-w-3xl text-[20px] leading-relaxed text-navy max-sm:text-base">
            Share a little about your environment and priorities, then choose a
            time that works for you. No automated analysis, just real expert
            guidance.
          </p>
        </div>

        <form
          className="grid min-w-0 items-start gap-6 max-sm:gap-3 lg:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            void onSubmit();
          }}
        >
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-[4px] p-6 lg:p-7 shadow-sm">
              <h3 className="text-navy font-bold text-base mb-5">
                Intake Questions
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-navy font-medium mb-1.5 block">
                    Your Name <span className="text-teal">*</span>
                  </label>
                  <input
                    className={inputClass}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-navy font-medium mb-1.5 block">
                    Work Email Address <span className="text-teal">*</span>
                  </label>
                  <input
                    type="email"
                    className={inputClass}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError(false);
                    }}
                    placeholder="jane@company.com"
                    required
                  />
                  {emailError ? (
                    <p className="mt-1.5 text-xs text-red-500">
                      Please enter a valid email address.
                    </p>
                  ) : null}
                </div>
                <div>
                  <label className="text-xs text-navy font-medium mb-1.5 block">
                    Company Name <span className="text-teal">*</span>
                  </label>
                  <input
                    className={inputClass}
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="MedDevice Corp"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-navy font-medium mb-1.5 block">
                    Role / Title{" "}
                    <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    className={inputClass}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Quality Manager"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="text-xs text-navy font-medium mb-2 block">
                  Company Size{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {COMPANY_SIZES.map((opt) => (
                    <label
                      key={opt.value}
                      className="companysize-option flex items-center gap-2.5 bg-white border border-gray-200 rounded-[4px] px-2 py-3 cursor-pointer hover:border-teal/50 transition-all"
                    >
                      <input
                        type="radio"
                        name="companysize"
                        value={opt.value}
                        checked={companySize === opt.value}
                        onChange={() => setCompanySize(opt.value)}
                      />
                      <span className="text-sm text-navy font-medium">
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-[4px] p-6 lg:p-7 shadow-sm">
              <h3 className="text-navy font-bold text-base mb-4">
                What would make this conversation most valuable?
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {PRIORITIES.map((opt) => (
                  <label
                    key={opt.value}
                    className="priority-option flex items-center gap-2.5 bg-white border border-gray-200 rounded-[4px] px-4 py-3 cursor-pointer hover:border-teal/50 transition-all"
                  >
                    <input
                      type="radio"
                      name="priority"
                      value={opt.value}
                      checked={priority === opt.value}
                      onChange={() => setPriority(opt.value)}
                    />
                    <span className="text-sm text-navy font-medium">
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
                  placeholder="Tell us what you'd like to focus on..."
                />
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-[4px] p-6 lg:p-7 shadow-sm">
              <h3 className="text-navy font-bold text-base mb-1">
                Additional Context{" "}
                <span className="text-gray-400 font-normal text-sm">
                  (optional)
                </span>
              </h3>
              <p className="text-xs text-navy mb-4">
                Tell us anything useful before the discussion.
              </p>
              <textarea
                rows={4}
                maxLength={300}
                className={`${inputClass} resize-none py-3`}
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Share anything that would help us prepare for the conversation..."
              />
              <p className="text-[11px] text-gray-400 mt-1.5 text-right">
                Maximum: 300 characters ({context.length}/300)
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
            <div className="min-w-0 max-w-full overflow-x-hidden rounded-[4px] border border-gray-200 bg-white p-6 shadow-sm max-sm:p-3">
              <p className="mb-4 text-xs leading-relaxed text-navy max-sm:mb-3 max-sm:text-[11px] max-sm:leading-snug">
                Your responses are used only to help our team prepare for a
                focused, non-sales discussion tailored to your environment and
                priorities. No automated analysis is performed.
              </p>
              <div className="mx-auto w-full min-w-0 max-w-md space-y-4 max-sm:space-y-2.5">
                <TurnstileField action={turnstile} />
                <button
                  type="submit"
                  disabled={!canSubmit || submitting}
                  className={
                    canSubmit && !submitting
                      ? "suricat-teal-btn group flex w-full max-w-full items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all max-sm:px-5 max-sm:py-2 md:text-base"
                      : "group flex w-full max-w-full cursor-not-allowed items-center justify-center gap-2 rounded-full border-2 border-gray-200 bg-gray-100 px-6 py-2.5 text-sm font-semibold text-gray-400 transition-all max-sm:px-5 max-sm:py-2 md:text-base"
                  }
                >
                  {!canSubmit ? (
                    <FaLock className="text-xs" aria-hidden="true" />
                  ) : null}
                  Schedule Discussion
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
