"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const PENDING_HASH_KEY = "suricat-pending-hash";

/** Map Designs tab hashes to the section they belong to. */
function sectionIdForHash(hash: string): string | null {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  if (!id) return null;
  if (/^why-tab-\d+$/.test(id)) return "why-suricat-section";
  if (/^platform-tab-\d+$/.test(id)) return "platform-intelligence-section";
  return id;
}

function notifyHashConsumers() {
  // pushState does not fire hashchange — tab sections listen for it
  window.dispatchEvent(new Event("hashchange"));
}

/** Smooth hash scrolling with sticky nav offset + why/platform tab hashes (Designs). */
export function SmoothHashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToHash = (hash: string, behavior: ScrollBehavior = "smooth") => {
      if (!hash || hash === "#") return;
      const sectionId = sectionIdForHash(hash);
      if (!sectionId) return;
      const el = document.getElementById(sectionId);
      if (!el) return;
      el.scrollIntoView({ behavior, block: "start" });
    };

    const applyHash = (hash: string, behavior: ScrollBehavior = "smooth") => {
      scrollToHash(hash, behavior);
      notifyHashConsumers();
    };

    // Restore hash after cross-route Next.js navigations (hash can be dropped)
    try {
      const pending = sessionStorage.getItem(PENDING_HASH_KEY);
      if (pending) {
        sessionStorage.removeItem(PENDING_HASH_KEY);
        if (!window.location.hash) {
          history.replaceState(null, "", `${window.location.pathname}${pending}`);
        }
      }
    } catch {
      /* ignore */
    }

    if (window.location.hash) {
      const hash = window.location.hash;
      requestAnimationFrame(() => {
        setTimeout(() => applyHash(hash, "smooth"), 150);
      });
    }

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      try {
        const url = new URL(href, window.location.origin);
        if (url.origin !== window.location.origin) return;
        if (!url.hash) return;

        const currentPath = window.location.pathname;
        const destPath = url.pathname || "/";
        const samePage =
          destPath === currentPath ||
          destPath === pathname ||
          (destPath === "/" && (currentPath === "/" || pathname === "/"));

        if (!samePage) {
          try {
            sessionStorage.setItem(PENDING_HASH_KEY, url.hash);
          } catch {
            /* ignore */
          }
          return;
        }

        event.preventDefault();
        history.pushState(null, "", `${destPath}${url.hash}`);
        applyHash(url.hash, "smooth");

        // Close desktop mega menus stuck open via :hover/:focus-within
        const active = document.activeElement;
        if (active instanceof HTMLElement) active.blur();
        document.querySelectorAll(".nav-mega-group").forEach((el) => {
          el.classList.add("nav-mega-force-closed");
        });
      } catch {
        /* ignore */
      }
    };

    const onHashChange = () => {
      scrollToHash(window.location.hash, "smooth");
    };

    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [pathname]);

  return null;
}
