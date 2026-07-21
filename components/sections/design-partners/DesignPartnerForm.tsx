"use client";

import { useEffect, useRef, useState } from "react";
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

const TOTAL_STEPS = 5;
const MAX_LEN = 1000;
const DRAFT_KEY = "suricat-design-partner-draft";

const STEP_LABELS = [
  ["Company", "Information"],
  ["Primary", "Contact"],
  ["Current", "Environment"],
  ["Current Compliance", "Priorities"],
  ["Review &", "Submit"],
];

const EMPLOYEE_COUNTS = ["1-50", "51-200", "201-500", "500+"];
const DEVICE_CATEGORIES = ["Class I", "Class II", "Class III"];
const QMS_OPTIONS = [
  "Arena QMS",
  "Greenlight Guru",
  "MasterControl",
  "Veeva Vault",
  "Other",
];
const DOC_SYSTEMS = [
  { value: "SharePoint", label: "SharePoint" },
  { value: "Microsoft 365", label: "Microsoft 365" },
  { value: "Google Workspace", label: "Google Workspace" },
  { value: "PLM", label: "PLM" },
  { value: "Document Control Software", label: "Document Control Software" },
  { value: "ERP", label: "ERP" },
  { value: "Other", label: "Other (please specify)" },
];
const INSPECTION_OPTIONS = [
  "Within 3 months",
  "3–6 months",
  "6–12 months",
  "More than 12 months",
  "No inspection currently scheduled",
];
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
  const [step, setStep] = useState(1);
  const [enterClass, setEnterClass] = useState("");
  const [values, setValues] = useState<Values>(INITIAL);
  const [invalid, setInvalid] = useState<Set<string>>(new Set());
  const [ackInvalid, setAckInvalid] = useState<Set<string>>(new Set());
  const [showAckErrors, setShowAckErrors] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  /** Blocks accidental submit from the Next→Submit button swap under the cursor. */
  const submitArmedRef = useRef(true);

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
      toast.error("Please complete all required fields before continuing.");
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
      toast.error("Please confirm both acknowledgments before submitting.");
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
      toast.success(
        "Application submitted. Our team will contact you within 1 business day.",
      );
      onSubmitted?.();
    } else {
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
      window.alert(
        "Your progress has been saved locally. You can return to complete your application later.",
      );
    } catch {
      window.alert("Unable to save progress in this browser.");
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
          {STEP_LABELS.map(([a, b], i) => {
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
          <span className="block">Step {step} of {TOTAL_STEPS}</span>
          <span className="mt-0.5 block text-sm font-semibold text-navy">
            {STEP_LABELS[step - 1].join(" ")}
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
                    Company Information
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelCls} htmlFor="company-name">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="company-name"
                      className={`form-input${cls("companyName")}`}
                      placeholder="Enter company name"
                      value={values.companyName}
                      onChange={(e) => set("companyName", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="company-website">
                      Company Website <span className="text-red-500">*</span>
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
                      Number of Employees{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="employee-count"
                      className={`form-select${cls("employeeCount")}`}
                      value={values.employeeCount}
                      onChange={(e) => set("employeeCount", e.target.value)}
                    >
                      <option value="" disabled>
                        Select number of employees
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
                        This helps us tailor the program to organizations of
                        your size.
                      </span>
                    </p>
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="device-category">
                      Medical Device Category{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="device-category"
                      className={`form-select${cls("deviceCategory")}`}
                      value={values.deviceCategory}
                      onChange={(e) => set("deviceCategory", e.target.value)}
                    >
                      <option value="" disabled>
                        Select medical device category
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
                        Select the category that best describes your primary
                        products.
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
                    Primary Contact
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelCls} htmlFor="contact-name">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      className={`form-input${cls("contactName")}`}
                      placeholder="Enter full name"
                      value={values.contactName}
                      onChange={(e) => set("contactName", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="contact-title">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-title"
                      className={`form-input${cls("contactTitle")}`}
                      placeholder="Enter your title"
                      value={values.contactTitle}
                      onChange={(e) => set("contactTitle", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="contact-email">
                      Business Email <span className="text-red-500">*</span>
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
                        We&apos;ll use this to follow up about your application.
                      </span>
                    </p>
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="contact-phone">
                      Phone (Optional)
                    </label>
                    <div className="phone-input-group">
                      <select
                        className="phone-country-select"
                        aria-label="Country code"
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
                    Current Environment
                  </h2>
                </div>
                <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
                  <div className="min-w-0">
                    <label className={labelCls} htmlFor="qms-select">
                      Current Quality Management System (QMS){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="qms-select"
                      className={`form-select${cls("qms")}`}
                      value={values.qms}
                      onChange={(e) => set("qms", e.target.value)}
                    >
                      <option value="" disabled>
                        Select your QMS
                      </option>
                      {QMS_OPTIONS.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-2 flex items-start gap-1.5">
                      <MdOutlineInfo className="mt-0.5" aria-hidden="true" />
                      <span>
                        The system you rely on for quality and compliance
                        processes.
                      </span>
                    </p>
                  </div>
                  <div className="min-w-0 lg:col-span-2">
                    <p className="mb-3 text-sm font-medium text-gray-500">
                      Current Documentation Systems (select all that apply)
                    </p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {DOC_SYSTEMS.map((sys) => {
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
                          placeholder="List the documentation system..."
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
                    Current Compliance Priorities
                  </h2>
                </div>
                <div className="space-y-6">
                  <div className="w-full">
                    <label
                      className={labelCls}
                      htmlFor="compliance-challenge"
                    >
                      Biggest Documentation or Compliance Challenge{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        id="compliance-challenge"
                        rows={4}
                        maxLength={MAX_LEN}
                        className={`form-textarea resize-none${cls("complianceChallenge")}`}
                        placeholder="Briefly describe your biggest documentation or compliance challenge."
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
                      Upcoming FDA / ISO Inspection{" "}
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
                        Select timeframe
                      </option>
                      {INSPECTION_OPTIONS.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-2 flex items-start gap-1.5">
                      <MdOutlineInfo className="mt-0.5" aria-hidden="true" />
                      <span>
                        Your inspection timeline helps us prioritize support.
                      </span>
                    </p>
                  </div>
                  <div className="w-full">
                    <label
                      className={labelCls}
                      htmlFor="design-partner-interest"
                    >
                      Why are you interested in becoming a Design Partner?{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        id="design-partner-interest"
                        rows={4}
                        maxLength={MAX_LEN}
                        className={`form-textarea resize-none${cls("designPartnerInterest")}`}
                        placeholder="Tell us what you hope to accomplish and why you'd like to participate."
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
                    Review &amp; Submit
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Please review your application before submitting.
                  </p>
                </div>

                <ReviewCard title="Company Information" onEdit={() => goTo(1, "back")}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ReviewField label="Company Name" value={values.companyName} />
                    <ReviewField label="Website" value={values.companyWebsite} />
                    <ReviewField label="Employees" value={values.employeeCount} />
                    <ReviewField
                      label="Medical Device Category"
                      value={values.deviceCategory}
                    />
                  </div>
                </ReviewCard>

                <ReviewCard title="Primary Contact" onEdit={() => goTo(2, "back")}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ReviewField label="Name" value={values.contactName} />
                    <ReviewField label="Title" value={values.contactTitle} />
                    <ReviewField label="Email" value={values.contactEmail} />
                    <ReviewField
                      label="Phone"
                      value={fullPhone || "Not provided"}
                    />
                  </div>
                </ReviewCard>

                <ReviewCard
                  title="Current Environment"
                  onEdit={() => goTo(3, "back")}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ReviewField label="Current QMS" value={values.qms} />
                    <ReviewField
                      label="Documentation Systems"
                      value={
                        values.docSystems.length
                          ? values.docSystems
                              .map((d) =>
                                d === "Other" && values.docSystemsOther
                                  ? `Other: ${values.docSystemsOther}`
                                  : d,
                              )
                              .join(", ")
                          : "None selected"
                      }
                    />
                  </div>
                </ReviewCard>

                <ReviewCard
                  title="Compliance Priorities"
                  onEdit={() => goTo(4, "back")}
                >
                  <div className="space-y-5">
                    <div>
                      <p className="review-field-label mb-2">Biggest Challenge</p>
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
                        Why Design Partner?
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
                        We understand that this is a collaborative Design Partner
                        program and not a commercial software purchase.
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
                        We agree to review documentation under a mutual NDA prior
                        to participation.
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
                    This is well structured for a B2B application. It asks only
                    for information that helps qualify a potential design partner
                    while keeping the application concise and low-friction.
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => goTo(step - 1, "back")}
            disabled={step === 1}
            className="order-3 sm:order-1 hero-cta-hover hero-banner-cta-btn inline-flex items-center justify-center gap-2 border-2 border-navy text-navy rounded-full font-bold hover:bg-navy hover:text-white transition-all disabled:opacity-40 disabled:pointer-events-none"
          >
            <FaArrowLeft className="text-xs" aria-hidden="true" /> Previous
          </button>
          <div className="order-1 sm:order-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:ml-auto w-full sm:w-auto">
            <button
              type="button"
              onClick={saveDraft}
              className="order-2 sm:order-1 hero-banner-cta-btn text-teal font-bold hover:text-navy transition-colors px-4"
            >
              Save &amp; Finish Later
            </button>
            {step < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={() => {
                  if (validateStep(step)) goTo(step + 1, "forward");
                }}
                className="order-1 sm:order-2 suricat-teal-btn hero-cta-hover hero-banner-cta-btn inline-flex items-center justify-center gap-2 text-navy !px-8 rounded-full font-bold transition-all"
              >
                Next <FaArrowRight aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                disabled={submitting}
                onClick={() => {
                  void submitApplication();
                }}
                className="order-1 sm:order-2 suricat-teal-btn hero-cta-hover hero-banner-cta-btn inline-flex items-center justify-center gap-2 text-navy !px-8 rounded-full font-bold transition-all disabled:opacity-60"
              >
                {submitting ? "Submitting…" : "Submit Application"}{" "}
                <FaArrowRight aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

function ReviewCard({
  title,
  onEdit,
  children,
}: {
  title: string;
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
          Edit <FaExternalLinkAlt className="text-[10px]" aria-hidden="true" />
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
