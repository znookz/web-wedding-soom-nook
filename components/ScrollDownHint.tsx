"use client";

import { useEffect, useState } from "react";

const SHOW_WHILE_NEAR_TOP = 40;

export default function ScrollDownHint() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY <= SHOW_WHILE_NEAR_TOP);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight * 0.95, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollDown}
      aria-label="Scroll down"
      className={`fixed left-1/2 top-22/24 z-40 -translate-x-1/2 rounded-full border border-white/60 bg-black/25 px-5 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-black/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${
        isVisible
          ? "opacity-100 animate-bounce"
          : "pointer-events-none opacity-0"
      }`}
    >
      Scroll Down ↓
    </button>
  );
}
