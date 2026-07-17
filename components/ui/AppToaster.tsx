"use client";

import { Toaster } from "sonner";

/** Sitewide Sonner toasts — bottom-right. */
export function AppToaster() {
  return (
    <Toaster
      position="bottom-right"
      richColors
      toastOptions={{
        className: "font-sans",
      }}
    />
  );
}
