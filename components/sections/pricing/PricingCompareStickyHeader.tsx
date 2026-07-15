"use client";

import { useEffect } from "react";

/**
 * Ports the Designs `initCompareStickyHeader` routine: once the comparison
 * table header scrolls under the site nav, a cloned header is pinned in a
 * fixed bar (`#pricing-compare-sticky-bar`) that mirrors the table's column
 * widths and horizontal scroll position. The original `<thead>` is hidden via
 * the `.is-stuck` class while the fixed bar is visible.
 */
export function PricingCompareStickyHeader() {
  useEffect(() => {
    const root = document.getElementById("pricing-compare-sticky-root");
    const bar = document.getElementById("pricing-compare-sticky-bar");
    const barScroll = document.getElementById("pricing-compare-sticky-scroll");
    const comparison = document.getElementById("pricing-comparison");
    if (!root || !bar || !barScroll || !comparison) return;

    const wrap = root.querySelector<HTMLElement>(".pricing-compare-table-wrap");
    const table = wrap?.querySelector<HTMLTableElement>(".pricing-compare-table");
    const thead = document.getElementById("pricing-compare-thead");
    const nav = document.querySelector("nav");
    if (!wrap || !table || !thead) return;

    const barTable = document.createElement("table");
    barTable.className = table.className;
    barTable.appendChild(thead.cloneNode(true));
    barScroll.appendChild(barTable);

    const sentinel = document.createElement("div");
    sentinel.className = "pricing-compare-sticky-sentinel";
    sentinel.setAttribute("aria-hidden", "true");
    root.insertBefore(sentinel, wrap);

    let stickyRaf = 0;
    let syncingScroll = false;

    const getStickyTop = () =>
      nav ? Math.round(nav.getBoundingClientRect().height) : 64;

    const syncColumnWidths = () => {
      const sourceThs = thead.querySelectorAll<HTMLElement>("th");
      const cloneThs = barTable.querySelectorAll<HTMLElement>("th");
      const tableWidth = table.getBoundingClientRect().width;

      barTable.style.width = `${tableWidth}px`;
      barTable.style.tableLayout = "fixed";

      sourceThs.forEach((sourceTh, index) => {
        const width = sourceTh.getBoundingClientRect().width;
        const cloneTh = cloneThs[index];
        if (cloneTh) cloneTh.style.width = `${width}px`;
      });
    };

    const updateStickyBar = () => {
      stickyRaf = 0;

      const stickyTop = getStickyTop();
      const sentinelTop = sentinel.getBoundingClientRect().top;
      const comparisonBottom = comparison.getBoundingClientRect().bottom;
      const headerHeight = thead.getBoundingClientRect().height;
      const shouldStick =
        sentinelTop <= stickyTop &&
        comparisonBottom > stickyTop + headerHeight;

      if (!shouldStick) {
        bar.hidden = true;
        bar.setAttribute("aria-hidden", "true");
        wrap.classList.remove("is-stuck");
        return;
      }

      const wrapRect = wrap.getBoundingClientRect();
      syncColumnWidths();
      bar.hidden = false;
      bar.setAttribute("aria-hidden", "false");
      wrap.classList.add("is-stuck");
      bar.style.top = `${stickyTop}px`;
      bar.style.left = `${wrapRect.left}px`;
      bar.style.width = `${wrapRect.width}px`;

      if (!syncingScroll) {
        barScroll.scrollLeft = wrap.scrollLeft;
      }
    };

    const scheduleStickyUpdate = () => {
      if (!stickyRaf) {
        stickyRaf = window.requestAnimationFrame(updateStickyBar);
      }
    };

    const onWrapScroll = () => {
      if (bar.hidden) return;
      syncingScroll = true;
      barScroll.scrollLeft = wrap.scrollLeft;
      syncingScroll = false;
    };

    wrap.addEventListener("scroll", onWrapScroll, { passive: true });
    window.addEventListener("scroll", scheduleStickyUpdate, { passive: true });
    window.addEventListener("resize", scheduleStickyUpdate);

    scheduleStickyUpdate();

    return () => {
      if (stickyRaf) window.cancelAnimationFrame(stickyRaf);
      wrap.removeEventListener("scroll", onWrapScroll);
      window.removeEventListener("scroll", scheduleStickyUpdate);
      window.removeEventListener("resize", scheduleStickyUpdate);
      wrap.classList.remove("is-stuck");
      sentinel.remove();
      barTable.remove();
    };
  }, []);

  return null;
}
