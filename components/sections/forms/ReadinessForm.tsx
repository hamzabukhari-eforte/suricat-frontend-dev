"use client";

import { FaArrowRight, FaCircleExclamation, FaEnvelope, FaLock } from "@/components/ui/icons";
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

const TIMELINES = [
  { value: "within90", label: "Within 90 Days" },
  { value: "90to180", label: "90–180 Days" },
  { value: "180to365", label: "180–365 Days" },
  { value: "other", label: "Other" },
] as const;

const PRIORITIES = [
  { value: "audit", label: "Audit Preparation" },
  { value: "consistency", label: "Cross-Document Consistency" },
  { value: "capa", label: "CAPA Traceability" },
  { value: "change", label: "Change Impact Assessment" },
  { value: "evidence", label: "Evidence Visibility" },
  { value: "readiness", label: "Inspection Readiness" },
  { value: "alignment", label: "Operational Alignment" },
  { value: "other", label: "Other" },
] as const;

const inputClass =
  "w-full px-4 py-2.5 text-sm bg-[#F3F4F6]/50 border border-[#E5E7EB] rounded-[4px] text-[#374151] placeholder-[#6B7280]/60 focus:bg-white focus:outline-none focus:border-navy transition-all";

export function ReadinessForm() {
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
  const [day, setDay] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [emailError, setEmailError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = useMemo(() => {
    if (!name.trim() || !email.trim() || !company.trim()) return false;
    if (!timeline) return false;
    if (timeline === "other" && !timelineOther.trim()) return false;
    if (!priority) return false;
    if (priority === "other" && !priorityOther.trim()) return false;
    if (day == null || !time) return false;
    return true;
  }, [
    name,
    email,
    company,
    timeline,
    timelineOther,
    priority,
    priorityOther,
    day,
    time,
  ]);

  async function onSubmit() {
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
      date: day != null ? formatScheduleDate(day) : undefined,
      time: time ?? undefined,
    };

    setSubmitting(true);
    const result = await submitReadiness(payload);
    setSubmitting(false);

    if (!result.ok) {
      if (result.fieldErrors?.email) setEmailError(true);
      toast.error(result.error);
      return;
    }

    const qs = buildDiscussionConfirmedQuery(payload);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("suricat-discussion", JSON.stringify(payload));
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
    setDay(null);
    setTime(null);
    setEmailError(false);
    toast.success("Discussion scheduled. A confirmation email is on the way.");

    router.push(`/discussion-confirmed?${qs}`);
  }

  return (
    <section id="intake" className="relative w-full bg-[#f5f7fa] py-8">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-6">
          <p className="mb-3 text-[14px] font-bold uppercase tracking-[0.15em] text-teal">
            Schedule Your Discussion
          </p>
          <h2 className="mb-3 text-[1.5rem] font-bold tracking-tight text-navy sm:text-[28px]">
            Begin Your Readiness Discussion
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-navy sm:text-[20px]">
            Complete all four steps below and schedule a time with a compliance
            specialist.
            <br />
            No automated analysis, just real expert guidance.
          </p>
        </div>

        <form
          className="grid items-start gap-6 lg:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            void onSubmit();
          }}
        >
          <div className="min-w-0 space-y-6">
            <div className="rounded-[4px] border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-7">
              <h3 className="mb-5 text-base font-bold text-navy">
                Intake Questions
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="min-w-0">
                  <label className="mb-1.5 block text-xs font-medium text-navy">
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
                <div className="min-w-0">
                  <label className="mb-1.5 block text-xs font-medium text-navy">
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
                <div className="min-w-0">
                  <label className="mb-1.5 block text-xs font-medium text-navy">
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
                <div className="min-w-0">
                  <label className="mb-1.5 block text-xs font-medium text-navy">
                    Role / Title{" "}
                    <span className="font-normal text-gray-400">(optional)</span>
                  </label>
                  <input
                    className={inputClass}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Quality Manager"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-[4px] border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-7">
              <h3 className="mb-1 text-base font-bold text-navy">
                Inspection Timeline
              </h3>
              <p className="mb-4 text-xs text-navy">
                When is your next inspection or audit?
              </p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {TIMELINES.map((opt) => (
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
                  placeholder="Please describe your timeline..."
                />
              </div>
            </div>

            <div className="rounded-[4px] border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-7">
              <h3 className="mb-1 text-base font-bold text-navy">
                Current Priority
              </h3>
              <p className="mb-4 text-xs text-navy">
                What would make this discussion most valuable?
              </p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {PRIORITIES.map((opt) => (
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
                  placeholder="Tell us what you'd like to focus on..."
                />
              </div>
            </div>

            <div className="rounded-[4px] border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-7">
              <h3 className="mb-1 text-base font-bold text-navy">
                Additional Context{" "}
                <span className="text-sm font-normal text-gray-400">
                  (optional)
                </span>
              </h3>
              <p className="mb-4 text-xs text-navy">
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
              <p className="mt-1.5 text-right text-[11px] text-gray-400">
                Maximum: 300 characters ({context.length}/300)
              </p>
            </div>
          </div>

          <div className="min-w-0 space-y-6 lg:sticky lg:top-24">
            <ScheduleCalendar
              selectedDay={day}
              selectedTime={time}
              onSelectDay={setDay}
              onSelectTime={setTime}
            />
            <div className="rounded-[4px] border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
              <p className="mb-4 text-xs leading-relaxed text-navy">
                Your responses are used only to help our team prepare for a
                focused readiness discussion tailored to your environment and
                priorities. No automated analysis is performed.
              </p>
              <button
                type="submit"
                disabled={!canSubmit || submitting}
                className={
                  canSubmit && !submitting
                    ? "suricat-teal-btn group mx-auto flex w-full max-w-md items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all min-[1377px]:text-base"
                    : "group mx-auto flex w-full max-w-md cursor-not-allowed items-center justify-center gap-2 rounded-full border-2 border-gray-200 bg-gray-100 px-6 py-2.5 text-sm font-semibold text-gray-400 transition-all min-[1377px]:text-base"
                }
              >
                {!canSubmit ? (
                  <FaLock className="text-xs" aria-hidden="true" />
                ) : null}
                Schedule Discussion
                <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-navy">
                {canSubmit ? (
                  <FaEnvelope className="text-[10px] text-teal" aria-hidden="true" />
                ) : (
                  <span className="group/tip relative inline-flex">
                    <FaCircleExclamation
                      className="cursor-help text-[10px] text-gray-400"
                      aria-hidden="true"
                    />
                    <span
                      role="tooltip"
                      className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-[min(14rem,calc(100vw-2rem))] -translate-x-1/2 rounded-[4px] bg-navy px-3 py-2 text-left text-[11px] leading-snug text-white opacity-0 shadow-lg transition-opacity group-hover/tip:opacity-100"
                    >
                      30-minute introductory discussion with a Suricat specialist.
                      No preparation required—simply select a convenient time.
                    </span>
                  </span>
                )}
                <span className="min-w-0">
                  {canSubmit
                    ? "Confirmation email on the way"
                    : "Complete all required fields to schedule your discussion."}
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
