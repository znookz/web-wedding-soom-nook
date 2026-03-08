"use client";

import Countdown from "react-countdown";

export default function CountdownSection() {

  const weddingDate = new Date("2026-09-06T08:00:00");

  return (
    <section className="bg-[var(--surface-main)] py-20 text-center">

      <h2 className="mb-10 text-3xl font-bold text-[var(--accent-strong)]" >
        Countdown to Our Wedding
      </h2>

      <Countdown date={weddingDate}
        renderer={({ days, hours, minutes, seconds }) => (
          <div className="text-3xl font-semibold text-[var(--accent-strong)]">
            {days} Days {hours} Hours {minutes} Minutes {seconds} Seconds
          </div>
        )}
      />

    </section>
  );
}