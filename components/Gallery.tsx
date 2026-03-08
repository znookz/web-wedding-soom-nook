import { readdir } from "fs/promises";
import path from "path";
import GallerySlider from "@/components/GallerySlider";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

export default async function Gallery() {
  const galleryDir = path.join(process.cwd(), "public", "gallery");
  const files = await readdir(galleryDir);

  const images = files
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => `/gallery/${file}`);

  return (
    <section className="bg-[var(--surface-soft)] py-20">
      <h2 className="mb-10 text-center text-3xl font-bold text-[var(--accent-strong)]">
        Our Memories
      </h2>
      <GallerySlider images={images} />
    </section>
  );
}