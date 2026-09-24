"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  submitDesignPartner,
  type DesignPartnerPayload,
} from "@/lib/forms/design-partner";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCircleInfo,
  FaExternalLinkAlt,
  FaLock,
  MdOutlineInfo,
} from "@/components/ui/icons";
import { TurnstileField } from "@/components/ui/TurnstileField";
import { useTurnstileAction } from "@/hooks/useTurnstileAction";
import { useTranslations } from "@/components/i18n/LocaleProvider";

const TOTAL_STEPS = 5;
const MAX_LEN = 1000;
const DRAFT_KEY = "suricat-design-partner-draft";

const EMPLOYEE_COUNTS = ["1-50", "51-200", "201-500", "500+"];
const DEVICE_CATEGORIES = ["Class I", "Class II", "Class III"];
const QMS_VENDORS = [
  "Arena QMS",
  "Greenlight Guru",
  "MasterControl",
  "Veeva Vault",
] as const;
const DOC_SYSTEM_VENDORS = [
  { value: "SharePoint", label: "SharePoint" },
  { value: "Microsoft 365", label: "Microsoft 365" },
  { value: "Google Workspace", label: "Google Workspace" },
  { value: "PLM", label: "PLM" },
  { value: "Document Control Software", label: "Document Control Software" },
  { value: "ERP", label: "ERP" },
] as const;
const INSPECTION_OPTION_KEYS = [
  "within3",
  "3to6",
  "6to12",
  "more12",
  "none",
] as const;
const PHONE_CODES = [
  "🇺🇸 +1",
  "🇨🇦 +1",
  "🇬🇧 +44",
  "🇩🇪 +49",
  "🇫🇷 +33",
  "🇮🇹 +39",
  "🇪🇸 +34",
  "🇳🇱 +31",
  "🇨🇭 +41",
  "🇸🇪 +46",
  "🇦🇺 +61",
  "🇯🇵 +81",
  "🇰🇷 +82",
  "🇮🇳 +91",
  "🇨🇳 +86",
  "🇸🇬 +65",
  "🇲🇽 +52",
  "🇧🇷 +55",
  "🇦🇪 +971",
  "🇮🇱 +972",
].map((label, i) => ({ id: String(i), code: label.split(" ")[1], label }));

type Values = {
  companyName: string;
  companyWebsite: string;
  employeeCount: string;
  deviceCategory: string;
  contactName: string;
  contactTitle: string;
  contactEmail: string;
  contactPhoneCode: string;
  contactPhone: string;
  qms: string;
  docSystems: string[];
  docSystemsOther: string;
  complianceChallenge: string;
  inspectionTimeframe: string;
  designPartnerInterest: string;
  ackDesignPartner: boolean;
  ackNda: boolean;
};

const INITIAL: Values = {
  companyName: "",
  companyWebsite: "",
  employeeCount: "",
  deviceCategory: "",
  contactName: "",
  contactTitle: "",
  contactEmail: "",
  contactPhoneCode: "+1",
  contactPhone: "",
  qms: "",
  docSystems: [],
  docSystemsOther: "",
  complianceChallenge: "",
  inspectionTimeframe: "",
  designPartnerInterest: "",
  ackDesignPartner: false,
  ackNda: false,
};

const labelCls = "form-label";

export function DesignPartnerForm({
  onSubmitted,
}: {
  onSubmitted?: () => void;
}) {
  const t = useTranslations("forms.designPartner");
  const tCommon = useTranslations("common");
  const [step, setStep] = useState(1);
  const [enterClass, setEnterClass] = useState("");
  const [values, setValues] = useState<Values>(INITIAL);
  const [invalid, setInvalid] = useState<Set<string>>(new Set());
  const [ackInvalid, setAckInvalid] = useState<Set<string>>(new Set());
  const [showAckErrors, setShowAckErrors] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const turnstile = useTurnstileAction();
  const viewportRef = useRef<HTMLDivElement>(null);
  /** Blocks accidental submit from the Next→Submit button swap under the cursor. */
  const submitArmedRef = useRef(true);

  const stepLabels = useMemo(
    () => [
      [t("steps.company"), t("steps.companyInfo")],
      [t("steps.primary"), t("steps.contact")],
      [t("steps.current"), t("steps.environment")],
      [t("steps.priorities"), t("steps.prioritiesSub")],
      [t("steps.review"), t("steps.submit")],
    ],
    [t],
  );

  const qmsOptions = useMemo(
    () => [
      ...QMS_VENDORS.map((v) => ({ value: v, label: v })),
      { value: "Other", label: t("other") },
    ],
    [t],
  );

  const docSystems = useMemo(
    () => [
      ...DOC_SYSTEM_VENDORS.map((s) => ({
        value: s.value,
        label:
          s.value === "Document Control Software"
            ? t("docControlSoftware")
            : s.label,
      })),
      { value: "Other", label: t("otherSpecify") },
    ],
    [t],
  );

  const inspectionOptions = useMemo(
    () =>
      INSPECTION_OPTION_KEYS.map((key) => ({
        value: t(`inspectionOptions.${key}`),
        label: t(`inspectionOptions.${key}`),
      })),
    [t],
  );

  useEffect(() => {
    const t = window.setTimeout(() => setEnterClass(""), 420);
    return () => window.clearTimeout(t);
  }, [enterClass, step]);

  function set<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    setInvalid((prev) => {
      if (!prev.has(key as string)) return prev;
      const next = new Set(prev);
      next.delete(key as string);
      return next;
    });
  }

  function requiredFieldsFor(s: number): (keyof Values)[] {
    switch (s) {
      case 1:
        return [
          "companyName",
          "companyWebsite",
          "employeeCount",
          "deviceCategory",
        ];
      case 2:
        return ["contactName", "contactTitle", "contactEmail"];
      case 3: {
        const req: (keyof Values)[] = ["qms"];
        if (values.docSystems.includes("Other")) req.push("docSystemsOther");
        return req;
      }
      case 4:
        return [
          "complianceChallenge",
          "inspectionTimeframe",
          "designPartnerInterest",
        ];
      default:
        return [];
    }
  }

  function validateStep(s: number): boolean {
    const missing = requiredFieldsFor(s).filter((f) => {
      const val = values[f];
      return typeof val === "string" ? !val.trim() : !val;
    });
    if (missing.length) {
      setInvalid(new Set(missing as string[]));
      toast.error(t("toastIncomplete"));
      return false;
    }
    setInvalid(new Set());
    return true;
  }

  function goTo(next: number, direction: "forward" | "back") {
    if (next < 1 || next > TOTAL_STEPS || next === step) return;
    if (direction === "forward") {
      for (let s = step; s < next; s++) {
        if (!validateStep(s)) {
          if (s !== step) goTo(s, "forward");
          return;
        }
      }
    }
    // Ack errors only after an explicit submit attempt on the last step.
    setShowAckErrors(false);
    setAckInvalid(new Set());
    if (next === TOTAL_STEPS) {
      submitArmedRef.current = false;
      window.setTimeout(() => {
        submitArmedRef.current = true;
      }, 400);
    }
    setEnterClass(
      direction === "forward" ? "is-entering-forward" : "is-entering-back",
    );
    setStep(next);
  }

  function toggleDoc(value: string) {
    setValues((v) => {
      const has = v.docSystems.includes(value);
      const docSystems = has
        ? v.docSystems.filter((d) => d !== value)
        : [...v.docSystems, value];
      return { ...v, docSystems };
    });
  }

  function validateAcks(): boolean {
    const bad = new Set<string>();
    if (!values.ackDesignPartner) bad.add("ackDesignPartner");
    if (!values.ackNda) bad.add("ackNda");
    if (bad.size) {
      setShowAckErrors(true);
      setAckInvalid(bad);
      toast.error(t("toastAck"));
      return false;
    }
    setShowAckErrors(false);
    setAckInvalid(new Set());
    return true;
  }

  async function submitApplication() {
    if (step !== TOTAL_STEPS || !submitArmedRef.current || submitting) return;
    if (!validateStep(4)) {
      goTo(4, "back");
      return;
    }
    if (!validateAcks()) return;
    if (turnstile.isCaptchaBlockingSubmit) {
      toast.error(
        turnstile.captchaStatusMessage ?? tCommon("securityCheck"),
      );
      return;
    }
    setSubmitting(true);
    const payload: DesignPartnerPayload = {
      companyName: values.companyName,
      companyWebsite: values.companyWebsite,
      employeeCount: values.employeeCount,
      deviceCategory: values.deviceCategory,
      contactName: values.contactName,
      contactTitle: values.contactTitle,
      contactEmail: values.contactEmail,
      contactPhoneCode: values.contactPhoneCode,
      contactPhone: values.contactPhone,
      qms: values.qms,
      docSystems: values.docSystems,
      docSystemsOther: values.docSystemsOther || undefined,
      complianceChallenge: values.complianceChallenge,
      inspectionTimeframe: values.inspectionTimeframe,
      designPartnerInterest: values.designPartnerInterest,
      ackDesignPartner: values.ackDesignPartner,
      ackNda: values.ackNda,
      ...(turnstile.isTurnstileEnabled
        ? { captchaToken: turnstile.captchaToken }
        : {}),
    };
    const result = await submitDesignPartner(payload);
    setSubmitting(false);
    if (result.ok) {
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        /* ignore */
      }
      setValues(INITIAL);
      setInvalid(new Set());
      setAckInvalid(new Set());
      setShowAckErrors(false);
      setStep(1);
      setEnterClass("");
      turnstile.resetCaptcha();
      toast.success(t("toastSubmitted"));
      onSubmitted?.();
    } else {
      turnstile.resetCaptcha();
      toast.error(result.error);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await submitApplication();
  }

  function saveDraft() {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
      window.alert(t("toastDraftSaved"));
    } catch {
      window.alert(t("toastDraftFail"));
    }
  }

  const cls = (name: string) =>
    invalid.has(name) ? " is-invalid" : "";

  const fullPhone = values.contactPhone
    ? `${values.contactPhoneCode} ${values.contactPhone}`
    : "";

  return (
    <div id="application-form">
      {/* Progress Steps */}
      <div className="mb-5 max-w-3xl mx-auto">
        <div className="relative flex items-start justify-between">
          <div
            className="wizard-stepper-track absolute h-0.5 bg-gray-200 z-0 overflow-hidden max-md:left-[8%] max-md:right-[8%]"
            aria-hidden="true"
          >
            <div
              className="wizard-progress-line-fill h-full bg-teal"
              style={{ width: `${((step - 1) / (TOTAL_STEPS - 1)) * 100}%` }}
            />
          </div>
          {stepLabels.map(([a, b], i) => {
            const n = i + 1;
            const state =
              n < step ? "is-complete" : n === step ? "is-active" : "is-upcoming";
            return (
              <button
                key={n}
                type="button"
                onClick={() => {
                  if (n < step) goTo(n, "back");
                }}
                className={`wizard-step-indicator ${state} relative z-10 flex min-w-0 flex-1 flex-col items-center gap-2 max-md:gap-0 ${
                  n < step ? "cursor-pointer" : "cursor-default"
                }`}
              >
                <span className="step-circle flex shrink-0 items-center justify-center rounded-full border-2 font-bold">
                  {n < step ? "✓" : n}
                </span>
                <span className="step-label !hidden w-24 text-center text-xs md:!block">
                  {a}
                  <br />
                  {b}
                </span>
              </button>
            );
          })}
        </div>
        <p
          className="mt-3 text-center text-[0.8125rem] leading-snug text-gray-500 md:hidden"
          aria-live="polite"
        >
          <span className="block">{t("stepOf", { step, total: TOTAL_STEPS })}</span>
          <span className="mt-0.5 block text-sm font-semibold text-navy">
            {stepLabels[step - 1].join(" ")}
          </span>
        </p>
      </div>

      <form onSubmit={onSubmit} noValidate>
        <div className="wizard-steps-viewport" ref={viewportRef}>
          {step === 1 && (
            <section className={`wizard-step is-active ${enterClass}`}>
              <div className="bg-white p-8 rounded-[4px] shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-8">
                  <h2 className="text-base font-bold text-navy">
                    {t("companyInformation")}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelCls} htmlFor="company-name">
                      {t("companyName")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="company-name"
                      className={`form-input${cls("companyName")}`}
                      placeholder={t("companyNamePlaceholder")}
                      value={values.companyName}
                      onChange={(e) => set("companyName", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="company-website">
                      {t("companyWebsite")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="company-website"
                      type="url"
                      className={`form-input${cls("companyWebsite")}`}
                      placeholder="https://www.company.com"
                      value={values.companyWebsite}
                      onChange={(e) => set("companyWebsite", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="employee-count">
                      {t("employeeCount")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="employee-count"
                      className={`form-select${cls("employeeCount")}`}
                      value={values.employeeCount}
                      onChange={(e) => set("employeeCount", e.target.value)}
                    >
                      <option value="" disabled>
                        {t("employeeCountPlaceholder")}
                      </option>
                      {EMPLOYEE_COUNTS.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                    <p className="form-hint">
                      <FaCircleInfo aria-hidden="true" />
                      <span>
                        {t("employeeHint")}
                      </span>
                    </p>
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="device-category">
                      {t("deviceCategory")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="device-category"
                      className={`form-select${cls("deviceCategory")}`}
                      value={values.deviceCategory}
                      onChange={(e) => set("deviceCategory", e.target.value)}
                    >
                      <option value="" disabled>
                        {t("deviceCategoryPlaceholder")}
                      </option>
                      {DEVICE_CATEGORIES.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                    <p className="form-hint">
                      <FaCircleInfo aria-hidden="true" />
                      <span>
                        {t("deviceCategoryHint")}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className={`wizard-step is-active ${enterClass}`}>
              <div className="bg-white p-8 rounded-[4px] shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-8">
                  <h2 className="text-base font-bold text-navy">
                    {t("primaryContact")}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelCls} htmlFor="contact-name">
                      {t("fullName")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      className={`form-input${cls("contactName")}`}
                      placeholder={t("fullNamePlaceholder")}
                      value={values.contactName}
                      onChange={(e) => set("contactName", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="contact-title">
                      {t("title")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-title"
                      className={`form-input${cls("contactTitle")}`}
                      placeholder={t("titlePlaceholder")}
                      value={values.contactTitle}
                      onChange={(e) => set("contactTitle", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="contact-email">
                      {t("businessEmail")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      className={`form-input${cls("contactEmail")}`}
                      placeholder="name@company.com"
                      value={values.contactEmail}
                      onChange={(e) => set("contactEmail", e.target.value)}
                    />
                    <p className="form-hint">
                      <FaLock aria-hidden="true" />
                      <span>
                        {t("emailHint")}
                      </span>
                    </p>
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="contact-phone">
                      {t("phoneOptional")}
                    </label>
                    <div className="phone-input-group">
                      <select
                        className="phone-country-select"
                        aria-label={t("countryCode")}
                        value={values.contactPhoneCode}
                        onChange={(e) =>
                          set("contactPhoneCode", e.target.value)
                        }
                      >
                        {PHONE_CODES.map((c) => (
                          <option key={c.id} value={c.code}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                      <span className="phone-divider" aria-hidden="true" />
                      <input
                        id="contact-phone"
                        type="tel"
                        className="form-input"
                        placeholder="(555) 123-4567"
                        inputMode="tel"
                        autoComplete="tel-national"
                        value={values.contactPhone}
                        onChange={(e) => set("contactPhone", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className={`wizard-step is-active ${enterClass}`}>
              <div className="min-w-0 overflow-hidden rounded-[4px] border border-gray-100 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
                <div className="mb-6 flex items-center gap-3 sm:mb-8">
                  <h2 className="text-base font-bold text-navy">
                    {t("currentEnvironment")}
                  </h2>
                </div>
                <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
                  <div className="min-w-0">
                    <label className={labelCls} htmlFor="qms-select">
                      {t("qms")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="qms-select"
                      className={`form-select${cls("qms")}`}
                      value={values.qms}
                      onChange={(e) => set("qms", e.target.value)}
                    >
                      <option value="" disabled>
                        {t("qmsPlaceholder")}
                      </option>
                      {qmsOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-2 flex items-start gap-1.5">
                      <MdOutlineInfo className="mt-0.5" aria-hidden="true" />
                      <span>
                        {t("qmsHint")}
                      </span>
                    </p>
                  </div>
                  <div className="min-w-0 lg:col-span-2">
                    <p className="mb-3 text-sm font-medium text-gray-500">
                      {t("docSystems")}
                    </p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {docSystems.map((sys) => {
                        const checked = values.docSystems.includes(sys.value);
                        return (
                          <label
                            key={sys.value}
                            className={`doc-sys-card${checked ? " is-checked" : ""}`}
                          >
                            <input
                              type="checkbox"
                              className="doc-sys-cb"
                              checked={checked}
                              onChange={() => toggleDoc(sys.value)}
                            />
                            <span
                              className={`doc-sys-box${checked ? " box-checked" : ""}`}
                            >
                              <svg
                                className={`doc-sys-check${checked ? " check-visible" : ""}`}
                                viewBox="0 0 12 10"
                                fill="none"
                              >
                                <path
                                  d="M1 5L4.5 8.5L11 1.5"
                                  stroke="white"
                                  strokeWidth="2.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            <span
                              className={`doc-sys-label${checked ? " label-checked" : ""}`}
                            >
                              {sys.label}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    {values.docSystems.includes("Other") && (
                      <div className="mt-4">
                        <input
                          className={`form-input${cls("docSystemsOther")}`}
                          placeholder={t("docSystemsOtherPlaceholder")}
                          value={values.docSystemsOther}
                          onChange={(e) =>
                            set("docSystemsOther", e.target.value)
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          {step === 4 && (
            <section className={`wizard-step is-active ${enterClass}`}>
              <div className="bg-white p-8 rounded-[4px] shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-8">
                  <h2 className="text-base font-bold text-navy">
                    {t("compliancePriorities")}
                  </h2>
                </div>
                <div className="space-y-6">
                  <div className="w-full">
                    <label
                      className={labelCls}
                      htmlFor="compliance-challenge"
                    >
                      {t("biggestChallenge")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        id="compliance-challenge"
                        rows={4}
                        maxLength={MAX_LEN}
                        className={`form-textarea resize-none${cls("complianceChallenge")}`}
                        placeholder={t("biggestChallengePlaceholder")}
                        value={values.complianceChallenge}
                        onChange={(e) =>
                          set("complianceChallenge", e.target.value)
                        }
                      />
                      <span className="absolute bottom-3 right-4 text-xs text-gray-400">
                        {values.complianceChallenge.length}/{MAX_LEN}
                      </span>
                    </div>
                  </div>
                  <div className="w-full">
                    <label
                      className={labelCls}
                      htmlFor="inspection-timeframe"
                    >
                      {t("inspectionLabel")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="inspection-timeframe"
                      className={`form-select${cls("inspectionTimeframe")}`}
                      value={values.inspectionTimeframe}
                      onChange={(e) =>
                        set("inspectionTimeframe", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        {t("inspectionPlaceholder")}
                      </option>
                      {inspectionOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-2 flex items-start gap-1.5">
                      <MdOutlineInfo className="mt-0.5" aria-hidden="true" />
                      <span>
                        {t("inspectionHint")}
                      </span>
                    </p>
                  </div>
                  <div className="w-full">
                    <label
                      className={labelCls}
                      htmlFor="design-partner-interest"
                    >
                      {t("whyInterest")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        id="design-partner-interest"
                        rows={4}
                        maxLength={MAX_LEN}
                        className={`form-textarea resize-none${cls("designPartnerInterest")}`}
                        placeholder={t("whyInterestPlaceholder")}
                        value={values.designPartnerInterest}
                        onChange={(e) =>
                          set("designPartnerInterest", e.target.value)
                        }
                      />
                      <span className="absolute bottom-3 right-4 text-xs text-gray-400">
                        {values.designPartnerInterest.length}/{MAX_LEN}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {step === 5 && (
            <section className={`wizard-step is-active ${enterClass}`}>
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-navy mb-2">
                    {t("reviewTitle")}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {t("reviewSubtitle")}
                  </p>
                </div>

                <ReviewCard
                  title={t("companyInformation")}
                  editLabel={t("edit")}
                  onEdit={() => goTo(1, "back")}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ReviewField label={t("companyName")} value={values.companyName} />
                    <ReviewField label={t("website")} value={values.companyWebsite} />
                    <ReviewField label={t("employees")} value={values.employeeCount} />
                    <ReviewField
                      label={t("deviceCategory")}
                      value={values.deviceCategory}
                    />
                  </div>
                </ReviewCard>

                <ReviewCard
                  title={t("primaryContact")}
                  editLabel={t("edit")}
                  onEdit={() => goTo(2, "back")}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ReviewField label={t("name")} value={values.contactName} />
                    <ReviewField label={t("title")} value={values.contactTitle} />
                    <ReviewField label={t("email")} value={values.contactEmail} />
                    <ReviewField
                      label={t("phone")}
                      value={fullPhone || t("notProvided")}
                    />
                  </div>
                </ReviewCard>

                <ReviewCard
                  title={t("currentEnvironment")}
                  editLabel={t("edit")}
                  onEdit={() => goTo(3, "back")}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ReviewField label={t("currentQms")} value={values.qms} />
                    <ReviewField
                      label={t("documentationSystems")}
                      value={
                        values.docSystems.length
                          ? values.docSystems
                              .map((d) =>
                                d === "Other" && values.docSystemsOther
                                  ? t("otherPrefix", { value: values.docSystemsOther })
                                  : d,
                              )
                              .join(", ")
                          : t("noneSelected")
                      }
                    />
                  </div>
                </ReviewCard>

                <ReviewCard
                  title={t("compliancePriorities")}
                  editLabel={t("edit")}
                  onEdit={() => goTo(4, "back")}
                >
                  <div className="space-y-5">
                    <div>
                      <p className="review-field-label mb-2">{t("biggestChallengeShort")}</p>
                      <p className="review-field-value text-sm font-semibold leading-relaxed">
                        {values.complianceChallenge || "—"}
                      </p>
                    </div>
                    {values.inspectionTimeframe ? (
                      <div className="flex flex-wrap gap-2">
                        <span className="review-tag">
                          {values.inspectionTimeframe}
                        </span>
                      </div>
                    ) : null}
                    <div className="mt-4">
                      <p className="review-field-label mb-2">
                        {t("whyDesignPartner")}
                      </p>
                      <p className="review-field-value text-sm font-semibold leading-relaxed">
                        {values.designPartnerInterest || "—"}
                      </p>
                    </div>
                  </div>
                </ReviewCard>

                <div className="review-card">
                  <div className="space-y-4">
                    <label
                      className={`flex items-start gap-3 cursor-pointer group ack-label${
                        showAckErrors && ackInvalid.has("ackDesignPartner")
                          ? " is-invalid"
                          : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        className={`ack-cb mt-0.5 shrink-0${
                          showAckErrors && ackInvalid.has("ackDesignPartner")
                            ? " is-invalid"
                            : ""
                        }`}
                        checked={values.ackDesignPartner}
                        onChange={(e) => {
                          set("ackDesignPartner", e.target.checked);
                          setAckInvalid((prev) => {
                            const n = new Set(prev);
                            n.delete("ackDesignPartner");
                            return n;
                          });
                        }}
                      />
                      <span className="text-sm text-[#334155] font-medium leading-relaxed group-hover:text-navy transition-colors">
                        {t("ackDesignPartner")}
                      </span>
                    </label>
                    <label
                      className={`flex items-start gap-3 cursor-pointer group ack-label${
                        showAckErrors && ackInvalid.has("ackNda")
                          ? " is-invalid"
                          : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        className={`ack-cb mt-0.5 shrink-0${
                          showAckErrors && ackInvalid.has("ackNda")
                            ? " is-invalid"
                            : ""
                        }`}
                        checked={values.ackNda}
                        onChange={(e) => {
                          set("ackNda", e.target.checked);
                          setAckInvalid((prev) => {
                            const n = new Set(prev);
                            n.delete("ackNda");
                            return n;
                          });
                        }}
                      />
                      <span className="text-sm text-[#334155] font-medium leading-relaxed group-hover:text-navy transition-colors">
                        {t("ackNda")}
                      </span>
                    </label>
                  </div>
                </div>

                <div className="review-submit-notice">
                  <FaCircleInfo
                    className="text-teal mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <p>
                    {t("reviewNotice")}
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Navigation */}
        {step === TOTAL_STEPS ? (
          <div className="mt-4 space-y-3">
            <div className="flex w-full justify-end">
              <div className="w-full min-w-0 max-w-sm sm:max-w-xs">
                <TurnstileField action={turnstile} />
              </div>
            </div>
            <div className="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => goTo(step - 1, "back")}
                className="order-3 hero-cta-hover hero-banner-cta-btn inline-flex items-center justify-center gap-2 rounded-full border-2 border-navy font-bold text-navy transition-all hover:bg-navy hover:text-white sm:order-1"
              >
                <FaArrowLeft className="text-xs" aria-hidden="true" /> {t("back")}
              </button>
              <div className="order-1 flex w-full flex-col items-stretch gap-3 sm:order-2 sm:ml-auto sm:w-auto sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={saveDraft}
                  className="order-2 hero-banner-cta-btn px-4 font-bold text-teal transition-colors hover:text-navy sm:order-1"
                >
                  {t("saveFinishLater")}
                </button>
                <button
                  type="button"
                  disabled={submitting || turnstile.isCaptchaBlockingSubmit}
                  onClick={() => {
                    void submitApplication();
                  }}
                  className="order-1 suricat-teal-btn hero-cta-hover hero-banner-cta-btn inline-flex items-center justify-center gap-2 rounded-full font-bold text-navy !px-8 transition-all disabled:opacity-60 sm:order-2"
                >
                  {submitting ? tCommon("submitting") : t("submitApplication")}{" "}
                  <FaArrowRight aria-hidden="true" />
                </button>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-700">
              <FaLock className="mr-1 inline-block align-middle text-xs" aria-hidden="true" />
              {t("privacyNote")}
            </p>
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => goTo(step - 1, "back")}
              disabled={step === 1}
              className="order-3 hero-cta-hover hero-banner-cta-btn inline-flex items-center justify-center gap-2 rounded-full border-2 border-navy font-bold text-navy transition-all hover:bg-navy hover:text-white disabled:pointer-events-none disabled:opacity-40 sm:order-1"
            >
              <FaArrowLeft className="text-xs" aria-hidden="true" /> {t("back")}
            </button>
            <div className="order-1 flex w-full flex-col items-stretch gap-3 sm:order-2 sm:ml-auto sm:w-auto sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={saveDraft}
                className="order-2 hero-banner-cta-btn px-4 font-bold text-teal transition-colors hover:text-navy sm:order-1"
              >
                {t("saveFinishLater")}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (validateStep(step)) goTo(step + 1, "forward");
                }}
                className="order-1 suricat-teal-btn hero-cta-hover hero-banner-cta-btn inline-flex items-center justify-center gap-2 rounded-full font-bold text-navy !px-8 transition-all sm:order-2"
              >
                {t("continue")} <FaArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

function ReviewCard({
  title,
  editLabel,
  onEdit,
  children,
}: {
  title: string;
  editLabel: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="review-card">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h3 className="text-xs font-bold tracking-widest text-navy uppercase">
          {title}
        </h3>
        <button type="button" className="review-edit-btn" onClick={onEdit}>
          {editLabel}{" "}
          <FaExternalLinkAlt className="text-[10px]" aria-hidden="true" />
        </button>
      </div>
      {children}
    </div>
  );
}

function ReviewField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="review-field-label">{label}</p>
      <p className="review-field-value">{value || "—"}</p>
    </div>
  );
}
