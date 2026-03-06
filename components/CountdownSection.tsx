"use client";

import Countdown from "react-countdown";

export default function CountdownSection() {

  const weddingDate = new Date("2026-09-06T08:00:00");

  return (
    <section className="py-20 text-center bg-white">

      <h2 className="text-3xl font-bold mb-10 text-black" >
        Countdown to Our Wedding
      </h2>

      <Countdown date={weddingDate}
        renderer={({ days, hours, minutes, seconds }) => (
          <div className="text-3xl font-semibold text-black">
            {days} Days {hours} Hours {minutes} Minutes {seconds} Seconds
          </div>
        )}
      />

    </section>
  );
}