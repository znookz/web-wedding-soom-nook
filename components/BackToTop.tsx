"use client";

import { useEffect, useState } from "react";

const SHOW_AFTER_SCROLL = 300;

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > SHOW_AFTER_SCROLL);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={scrollToTop}
      className={`fixed right-6 bottom-6 z-50 rounded-full bg-[var(--accent-strong)] px-4 py-3 text-sm font-semibold text-[var(--on-accent)] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-strong)] focus-visible:ring-offset-2 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      ↑ Top
    </button>
  );
}
