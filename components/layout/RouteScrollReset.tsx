"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Ensure non-hash navigations always land at the top of the page.
 * Sticky subnav / soft navigations can otherwise leave a mid-page scroll.
 */
export function RouteScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
