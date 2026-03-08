export default function Map() {
  return (
    <section className="bg-[var(--surface-soft)] py-20 text-center">

      <h2 className="mb-10 text-3xl font-bold text-[var(--accent-strong)]">
        Wedding Location
      </h2>

      <div className="flex justify-center">

        <iframe
          src="https://www.google.com/maps?q=Bangkok&output=embed"
          width="600"
          height="400"
          className="rounded-xl shadow"
        />

      </div>

    </section>
  );
}