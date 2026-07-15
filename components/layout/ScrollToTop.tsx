"use client";

import { FaArrowUp } from "@/components/ui/icons";
import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      id="scroll-to-top-btn"
      className={`scroll-to-top-btn ${visible ? "is-visible" : ""}`}
      aria-label="Scroll to top"
      aria-hidden={!visible}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <FaArrowUp aria-hidden="true" />
    </button>
  );
}
