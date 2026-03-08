export default function Gallery() {

  const images = [
    "/img/1.jpg",
    "/img/2.jpg",
    "/img/3.jpg"
  ];

  return (
    <section className="bg-[var(--surface-soft)] py-20">

      <h2 className="mb-10 text-center text-3xl font-bold text-[var(--accent-strong)]">
        Our Memories
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10">

        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            className="rounded-xl shadow"
          />
        ))}

      </div>

    </section>
  );
}