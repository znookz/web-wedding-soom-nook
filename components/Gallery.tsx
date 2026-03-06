export default function Gallery() {

  const images = [
    "/img/1.jpg",
    "/img/2.jpg",
    "/img/3.jpg"
  ];

  return (
    <section className="py-20 bg-pink-50">

      <h2 className="text-3xl text-center font-bold mb-10 text-black">
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