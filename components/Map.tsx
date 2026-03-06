export default function Map() {
  return (
    <section className="py-20 text-center">

      <h2 className="text-3xl font-bold mb-10">
        Wedding Location
      </h2>

      <div className="flex justify-center">

        <iframe
          src="https://www.google.com/maps?q=Bangkok&output=embed"
          width="600"
          height="400"
          className="rounded-xl"
        />

      </div>

    </section>
  );
}