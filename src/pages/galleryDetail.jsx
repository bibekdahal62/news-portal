import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGallery } from "../context/GalleryContext";
import { useLang } from "../context/LanguageContext";
import { localizeAlbum } from "../utils/localize";
import {
  MdClose,
  MdChevronLeft,
  MdChevronRight,
  MdImage,
} from "react-icons/md";

import AdBanner from "../components/AdBanner";

function GalleryDetail() {
  const { id } = useParams();
  const { getAlbumById } = useGallery();
  const { lang } = useLang();
  const [activeIndex, setActiveIndex] = useState(null);

  const rawAlbum = getAlbumById(id);
  const notFound = !rawAlbum || rawAlbum.published === false;
  const album = notFound ? null : localizeAlbum(rawAlbum, lang);
  const images = album?.images || [];

  // Keyboard support for the lightbox: Escape closes, arrows navigate.
  useEffect(() => {
    if (activeIndex === null) return;

    function handleKey(e) {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") {
        setActiveIndex((i) => (i + 1) % images.length);
      }
      if (e.key === "ArrowLeft") {
        setActiveIndex((i) => (i - 1 + images.length) % images.length);
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, images.length]);

  if (notFound) {
    return (
      <main className="min-h-screen container mx-auto mt-10 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">
          {lang === "en" ? "Gallery not found" : "ग्यालरी फेला परेन"}
        </h1>
        <Link to="/gallery" className="text-(--primary-color) underline">
          {lang === "en" ? "← Back to gallery" : "← सबै ग्यालरी"}
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-6 min-h-screen">
      <section className="container mx-auto mt-12 flex flex-col xl:flex-row justify-center xl:gap-10 gap-6">
        <section className="px-4 py-6 lg:px-10 shadow-lg rounded-lg w-full border border-gray-50">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {album.title}
          </h1>
          {album.description && (
            <p className="text-gray-600 leading-relaxed whitespace-pre-line mb-6">
              {album.description}
            </p>
          )}

          {images.length === 0 ? (
            <div className="py-16 text-center text-gray-300">
              <MdImage size={40} className="mx-auto mb-2" />
              <p className="text-gray-400">
                {lang === "en"
                  ? "This gallery has no photos yet."
                  : "यो ग्यालरीमा अहिलेसम्म कुनै तस्बिर छैन।"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
              {images.map((img, index) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="relative group rounded-md overflow-hidden border border-gray-100 cursor-pointer"
                >
                  <img
                    src={img.url}
                    alt={img.caption || `${album.title} ${index + 1}`}
                    className="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  {img.caption && (
                    <span className="absolute bottom-0 inset-x-0 bg-black/55 text-white text-[11px] px-2 py-1 text-left line-clamp-1">
                      {img.caption}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          <Link to="/gallery" className="text-(--primary-color) underline">
            {lang === "en" ? "← Back to gallery" : "← सबै ग्यालरी"}
          </Link>
        </section>

        <aside>
          <AdBanner slot="home-side" page={"news"} />
        </aside>
      </section>

      {/* Lightbox */}
      {activeIndex !== null && images[activeIndex] && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center px-4"
          onClick={() => setActiveIndex(null)}
        >
          <button
            onClick={() => setActiveIndex(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 cursor-pointer"
            aria-label="बन्द गर्नुहोस्"
          >
            <MdClose size={28} />
          </button>

          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((i) => (i - 1 + images.length) % images.length);
              }}
              className="absolute left-2 sm:left-6 text-white/80 hover:text-white p-2 cursor-pointer"
              aria-label="अघिल्लो"
            >
              <MdChevronLeft size={36} />
            </button>
          )}

          <div
            className="max-w-4xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[activeIndex].url}
              alt={images[activeIndex].caption || ""}
              className="max-h-[75vh] w-auto mx-auto rounded-md object-contain"
            />
            {images[activeIndex].caption && (
              <p className="text-white/90 text-sm mt-3 text-center px-4">
                {images[activeIndex].caption}
              </p>
            )}
            <p className="text-white/50 text-xs mt-2">
              {activeIndex + 1} / {images.length}
            </p>
          </div>

          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((i) => (i + 1) % images.length);
              }}
              className="absolute right-2 sm:right-6 text-white/80 hover:text-white p-2 cursor-pointer"
              aria-label="अर्को"
            >
              <MdChevronRight size={36} />
            </button>
          )}
        </div>
      )}
    </main>
  );
}

export default GalleryDetail;
