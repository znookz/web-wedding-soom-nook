export default function Hero() {
  return (
    <section className="flex h-screen flex-col items-center justify-center bg-[var(--surface-hero)] text-center text-[var(--on-accent)]">
      <h1 className="text-5xl font-bold mb-4">
        Nook ❤️ SOOM
      </h1>

      <p className="text-xl">
        We're Getting Married
      </p>

      <p className="mt-2 text-lg text-[var(--on-accent)]">
        6 September 2026
      </p>
    </section>
  );
}