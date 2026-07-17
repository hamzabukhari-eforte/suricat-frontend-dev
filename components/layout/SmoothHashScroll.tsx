"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const PENDING_HASH_KEY = "suricat-pending-hash";

/** Fired after the URL hash is set so home tab sections can activate before scroll. */
export const HOME_HASH_EVENT = "suricat:home-hash";

/** Map Designs tab hashes to the section they belong to. */
export function sectionIdForHash(hash: string): string | null {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  if (!id) return null;
  if (/^why-tab-\d+$/.test(id)) return "why-suricat-section";
  if (/^platform-tab-\d+$/.test(id)) return "platform-intelligence-section";
  return id;
}

export function parseWhyTabIndex(hash: string): number | null {
  const match = hash.match(/why-tab-(\d+)/);
  if (!match) return null;
  const index = Number.parseInt(match[1], 10);
  return Number.isNaN(index) ? null : index;
}

export function parsePlatformTabIndex(hash: string): number | null {
  const match = hash.match(/platform-tab-(\d+)/);
  if (!match) return null;
  const index = Number.parseInt(match[1], 10);
  return Number.isNaN(index) ? null : index;
}

function notifyHomeHashConsumers(hash: string) {
  window.dispatchEvent(
    new CustomEvent(HOME_HASH_EVENT, { detail: { hash } }),
  );
}

function scrollToSection(hash: string, behavior: ScrollBehavior) {
  const sectionId = sectionIdForHash(hash);
  if (!sectionId) return;
  const el = document.getElementById(sectionId);
  if (!el) return;
  el.scrollIntoView({ behavior, block: "start" });
}

/**
 * Activate tab (if any) first, then smooth-scroll after layout settles.
 * Avoids the old double-scroll race (scroll → tab height change → missed target).
 */
function applyHomeHash(hash: string, behavior: ScrollBehavior = "smooth") {
  if (!hash || hash === "#") return;

  notifyHomeHashConsumers(hash);

  // Wait for React to commit the active tab, then scroll once.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      scrollToSection(hash, behavior);
    });
  });
}

function samePagePath(destPath: string, pathname: string) {
  const currentPath = window.location.pathname;
  return (
    destPath === currentPath ||
    destPath === pathname ||
    (destPath === "/" && (currentPath === "/" || pathname === "/"))
  );
}

/** Smooth hash scrolling with sticky nav offset + why/platform tab hashes (Designs). */
export function SmoothHashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    let ignoreHashChange = false;

    const setHashAndApply = (hash: string, behavior: ScrollBehavior) => {
      const next = `${window.location.pathname}${window.location.search}${hash}`;
      const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;

      ignoreHashChange = true;
      if (next !== current) {
        history.pushState(null, "", next);
      } else {
        // Same hash again (e.g. scrolled away) — still re-apply scroll/tab.
        history.replaceState(null, "", next);
      }
      applyHomeHash(hash, behavior);
      window.setTimeout(() => {
        ignoreHashChange = false;
      }, 400);
    };

    // Restore hash after cross-route Next.js navigations (hash can be dropped)
    try {
      const pending = sessionStorage.getItem(PENDING_HASH_KEY);
      if (pending) {
        sessionStorage.removeItem(PENDING_HASH_KEY);
        if (!window.location.hash) {
          history.replaceState(
            null,
            "",
            `${window.location.pathname}${window.location.search}${pending}`,
          );
        }
      }
    } catch {
      /* ignore */
    }

    if (window.location.hash) {
      const hash = window.location.hash;
      requestAnimationFrame(() => {
        window.setTimeout(() => applyHomeHash(hash, "smooth"), 100);
      });
    }

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      try {
        const url = new URL(href, window.location.origin);
        if (url.origin !== window.location.origin) return;
        if (!url.hash) return;

        const destPath = url.pathname || "/";
        if (!samePagePath(destPath, pathname)) {
          try {
            sessionStorage.setItem(PENDING_HASH_KEY, url.hash);
          } catch {
            /* ignore */
          }
          return;
        }

        // Capture + preventDefault so Next.js <Link> does not fight the scroll.
        event.preventDefault();

        setHashAndApply(url.hash, "smooth");

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
      if (ignoreHashChange) return;
      applyHomeHash(window.location.hash, "smooth");
    };

    // Capture phase beats Next.js Link's bubble handler — fixes "click twice".
    document.addEventListener("click", onClick, true);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [pathname]);

  return null;
}
