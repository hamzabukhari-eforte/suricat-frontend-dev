export type ContactPayload = {
  name: string;
  company: string;
  workEmail: string;
  intent: string;
  message: string;
};

export type FormResult = { ok: true } | { ok: false; error: string };

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** TODO: wire API */
export async function submitContactStub(
  payload: ContactPayload,
): Promise<FormResult> {
  await delay(600);
  if (!payload.name || !payload.workEmail || !payload.message) {
    return { ok: false, error: "Please fill in all required fields." };
  }
  return { ok: true };
}
