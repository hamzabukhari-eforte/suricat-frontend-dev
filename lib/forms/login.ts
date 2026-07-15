export type LoginPayload = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type FormResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validateLogin(payload: LoginPayload): FormResult {
  const fieldErrors: Record<string, string> = {};

  if (!payload.email.trim()) {
    fieldErrors.email = "Work email is required.";
  } else if (!isValidEmail(payload.email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }

  if (!payload.password) {
    fieldErrors.password = "Password is required.";
  } else if (payload.password.length < 8) {
    fieldErrors.password = "Password must be at least 8 characters.";
  }

  if (Object.keys(fieldErrors).length) {
    return { ok: false, error: "Please fix the errors below.", fieldErrors };
  }

  return { ok: true };
}

/** TODO: wire API — no real auth yet; validation UX only */
export async function submitLogin(payload: LoginPayload): Promise<FormResult> {
  const validated = validateLogin(payload);
  if (!validated.ok) return validated;

  // TODO: wire API — authenticate and establish session
  await Promise.resolve();
  return {
    ok: false,
    error: "Sign-in is not connected yet. Validation passed.",
  };
}
