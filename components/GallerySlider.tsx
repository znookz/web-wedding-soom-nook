"use client";

import { useEffect, useState } from "react";

type GallerySliderProps = {
  images: string[];
};

export default function GallerySlider({ images }: GallerySliderProps) {
  const [popupImage, setPopupImage] = useState<string | null>(null);

  useEffect(() => {
    if (!popupImage) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPopupImage(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [popupImage]);

  if (images.length === 0) {
    return (
      <p className="px-10 text-center text-[var(--accent-strong)]/80">
        No gallery images found in public/gallery.
      </p>
    );
  }

  const loopImages = [...images, ...images];

  return (
    <div className="gallery-slider-mask px-4 md:px-10">
      <div className="gallery-slider-track">
        {loopImages.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="gallery-slide-item group relative transition-transform duration-300 ease-out hover:z-30 active:z-30"
          >
            <button
              type="button"
              onClick={() => setPopupImage(src)}
              className="block w-full"
              aria-label={`Open memory ${i + 1}`}
            >
              <img
                src={src}
                alt={`Wedding memory ${i + 1}`}
                className="h-56 w-full rounded-xl object-cover shadow transition-transform duration-300 ease-out group-hover:scale-105 group-active:scale-105 md:h-72"
              />
            </button>
          </div>
        ))}
      </div>

      {popupImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setPopupImage(null)}
          role="dialog"
          aria-modal="true"
        >
  
          {/* <button
            type="button"
            aria-label="Close popup"
            onClick={() => setPopupImage(null)}
            className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-2xl font-bold leading-none text-[var(--accent-strong)] shadow hover:bg-white"
          >
            X
          </button> */}

          <img
            src={popupImage}
            alt="Selected wedding memory"
            className="max-h-[90vh] w-auto max-w-[95vw] rounded-2xl shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />

        <img
            src="/daysi1.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute top-5 w-36 max-w-[45vw] md:top-160 md:w-256"
          />

        </div>
      )}
    </div>
  );
}
