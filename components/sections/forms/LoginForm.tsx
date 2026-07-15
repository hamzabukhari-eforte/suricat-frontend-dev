"use client";

import { FaArrowLeft, FaArrowRight, FaCircleCheck, FaLock, FaRegEnvelope, FaRegEye, FaRegEyeSlash } from "@/components/ui/icons";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { submitLogin } from "@/lib/forms/login";

const inputClass =
  "input-transition block w-full pl-10 pr-4 py-2.5 bg-surface-muted/50 border border-gray-200 rounded-[4px] text-[#374151] placeholder-[#6b7280]/60 focus:bg-white focus:outline-none focus:border-navy";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);
    const result = await submitLogin({ email, password, rememberMe });
    setSubmitting(false);

    if (!result.ok) {
      setFieldErrors(result.fieldErrors ?? {});
      setFormError(result.error);
      return;
    }

    setFieldErrors({});
    setFormError(null);
  }

  return (
    <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-surface-muted relative overflow-hidden">
      <div
        className="w-full max-w-5xl bg-white rounded-[4px] shadow-lg overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[650px] relative z-10 border border-gray-200/50"
      >
        <div className="w-full lg:w-[45%] bg-navy text-white p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
          <Link
            href="/"
            className="absolute top-6 left-8 lg:left-12 z-20 flex items-center gap-2 text-sm font-semibold text-white hover:text-teal transition-colors group w-fit"
          >
            <FaArrowLeft className="text-xs transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
            Back to home
          </Link>
          <div className="z-10 max-w-md">
            <div className="inline-block text-teal text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
              Compliance Intelligence
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              Welcome Back!
            </h1>
            <p className="text-lg text-white/80 mb-8 font-normal leading-relaxed">
              Sign in to access your Suricat workspace and secure access to your
              Suricat workspace.
            </p>
            <div className="space-y-4 mt-8 pt-8 border-t border-white/10">
              {[
                "Read-only by default",
                "Human review remains in control",
                "Customer data remains isolated",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start text-sm text-white/70"
                >
                  <FaCircleCheck className="text-teal mt-0.5 mr-3 w-4" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[55%] p-8 lg:p-16 flex flex-col justify-center bg-white">
          <div className="max-w-md w-full mx-auto">
            <h2 className="text-2xl font-bold text-navy mb-2">Sign In</h2>
            <p className="text-navy text-sm mb-8">
              Enter your credentials to access your account.
            </p>
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-navy mb-1.5"
                >
                  Work Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <FaRegEnvelope className="text-[#6b7280]/70" aria-hidden="true" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="name@company.com"
                    className={inputClass}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {fieldErrors.email ? (
                  <p className="mt-1.5 text-xs text-red-500">{fieldErrors.email}</p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-navy mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <FaLock className="text-[#6b7280]/70" aria-hidden="true" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    placeholder="••••••••"
                    className={`${inputClass} pr-10`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#6b7280] hover:text-navy transition-colors focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <FaRegEyeSlash aria-hidden="true" />
                    ) : (
                      <FaRegEye aria-hidden="true" />
                    )}
                  </button>
                </div>
                {fieldErrors.password ? (
                  <p className="mt-1.5 text-xs text-red-500">
                    {fieldErrors.password}
                  </p>
                ) : null}
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 border-gray-200 rounded-[4px] cursor-pointer accent-teal"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-500 cursor-pointer hover:text-navy transition-colors"
                  >
                    Keep me signed in
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-teal hover:text-navy transition-colors hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>

              {formError ? (
                <p className="text-sm text-red-500" role="alert">
                  {formError}
                </p>
              ) : null}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="suricat-teal-btn group w-full flex justify-center items-center gap-3 px-6 py-2.5 rounded-full text-sm min-[1377px]:text-base font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal"
                >
                  Sign In
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                </button>
              </div>

              <div className="text-center mt-6 text-sm text-navy font-medium">
                Need an account?{" "}
                <Link
                  href="/get-started"
                  className="font-medium text-teal hover:text-navy hover:underline transition-colors"
                >
                  Signup
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export function LoginSlimHeader() {
  return (
    <nav className="border-b border-gray-200 sticky top-0 bg-white z-50 relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 lg:h-24 flex items-center">
        <Link href="/">
          <Image
            src="/assets/images/suricat-logo-nav.png"
            alt="Suricat"
            width={2048}
            height={470}
            className="h-8 shrink-0 object-contain object-left sm:h-11"
            style={{ width: "auto" }}
            priority
          />
        </Link>
      </div>
    </nav>
  );
}
