import { postInquiry, type FormResult } from "@/lib/api/client";

export type ContactPayload = {
  name: string;
  company: string;
  workEmail: string;
  intent: string;
  message: string;
};

export type { FormResult };

export async function submitContact(
  payload: ContactPayload,
): Promise<FormResult> {
  if (!payload.name || !payload.workEmail || !payload.message) {
    return { ok: false, error: "Please fill in all required fields." };
  }

  return postInquiry("contact", payload);
}

/** @deprecated Use submitContact */
export const submitContactStub = submitContact;
