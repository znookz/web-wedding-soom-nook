"use client";

import { useEffect, useState } from "react";
import Countdown from "react-countdown";

export default function CountdownSection() {
  const [isMounted, setIsMounted] = useState(false);

  const weddingDate = new Date("2026-09-06T08:00:00");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="bg-[var(--surface-main)] py-20 text-center">

      <h2 className="mb-10 text-3xl font-bold text-[var(--accent-strong)]" >
        Countdown to Our Wedding
      </h2>

      {isMounted ? (
        <Countdown
          date={weddingDate}
          renderer={({ days, hours, minutes, seconds }) => (
            <div className="text-3xl font-semibold text-[var(--accent-strong)]">
              {days} Days {hours} Hours {minutes} Minutes {seconds} Seconds
            </div>
          )}
        />
      ) : (
        <div className="text-3xl font-semibold text-[var(--accent-strong)]">
          -- Days -- Hours -- Minutes -- Seconds
        </div>
      )}

    </section>
  );
}