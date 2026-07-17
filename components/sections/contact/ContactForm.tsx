"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";
import {
  submitContact,
  type ContactPayload,
} from "@/lib/forms/contact";
import { FaLock } from "@/components/ui/icons";

const INTENTS = [
  { value: "general", label: "General Inquiry" },
  { value: "partnership", label: "Partnership" },
  { value: "design-partner", label: "Design Partner Program" },
];

const inputClass =
  "w-full rounded-[4px] border border-gray-300 bg-white px-4 py-3 text-[#374151] placeholder:text-[#6b7280]/60 focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");

    const fd = new FormData(form);
    const payload: ContactPayload = {
      name: String(fd.get("name") ?? ""),
      company: String(fd.get("company") ?? ""),
      workEmail: String(fd.get("work_email") ?? ""),
      intent: String(fd.get("intent") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    const result = await submitContact(payload);
    if (result.ok) {
      form.reset();
      setStatus("idle");
      toast.success("Thank you. Your inquiry will be reviewed by the Suricat team.");
    } else {
      setStatus("error");
      toast.error(result.error);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-1.5">
        <label htmlFor="name" className="text-sm text-navy">
          Name
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
          Company
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
          Work Email
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
          What brings you here?
        </label>
        <select id="intent" name="intent" required className={inputClass} defaultValue="">
          <option value="" disabled>
            Select an option
          </option>
          {INTENTS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="text-sm text-navy">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={`${inputClass} resize-y`}
        />
      </div>

      <div className="w-full pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="suricat-teal-btn w-full rounded-full px-8 py-2.5 font-semibold disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send Message"}
        </button>
      </div>
      <p className="text-sm leading-relaxed text-gray-700">
        <FaLock className="mr-1 inline-block align-middle text-xs" aria-hidden="true" />
        Your inquiry will be reviewed by the Suricat team.
      </p>
    </form>
  );
}
