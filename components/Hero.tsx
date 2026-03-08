"use client";

import { useEffect, useState } from "react";
import Countdown from "react-countdown";


export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);

  const weddingDate = new Date("2026-09-06T08:00:00");

  useEffect(() => {
    setIsMounted(true);
  }, []);





  return (
    <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden text-center  text-black">
      <div
        className="absolute inset-0 z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg2.png')" }}
      />

      <div className="absolute inset-0 z-0 bg-[linear-gradient(235deg,rgba(255,167,37,1),rgba(255,167,37,1),rgba(106,156,137,1))]" />
      <div className="pointer-events-none absolute -left-20 -top-16 z-20 h-64 w-64 rounded-full bg-[#FFA725]/50 blur-3xl md:h-96 md:w-96" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 z-20 h-72 w-72 rounded-full bg-[#FFF5E4]/35 blur-3xl md:h-[28rem] md:w-[28rem]" />

      <div className="hero-text-accent relative z-30 px-4">
        <h1 className="mb-4 text-7xl font-normal md:text-8xl">
          <span className="flex flex-col items-center gap-1 md:flex-row md:gap-4 ">
            <span>Pattarapon</span>
            <span aria-hidden="true">❤️</span>
            <span>Ausanee</span>
          </span>
        </h1>

        <p className="text-4xl font-normal md:text-6xl">
          We're Getting Married
        </p>

        <p className="mt-2 text-4xl font-normal  md:text-6xl">
          6 September 2026
        </p>

      {isMounted ? (
        <Countdown
          date={weddingDate}
          renderer={({ days, hours, minutes, seconds }) => (
            <div className="text-3xl font-semibold text-[var(--accent-strong)] mt-15">
              {days} Days {hours} Hours {minutes} Minutes {seconds} Seconds
            </div>
          )}
        />
      ) : (
        <div className="text-3xl font-semibold text-[var(--accent-strong)]">
          -- Days -- Hours -- Minutes -- Seconds
        </div>
      )}
        
      </div>
    </section>
  );
}