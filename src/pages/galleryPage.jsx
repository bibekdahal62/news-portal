import { Link } from "react-router-dom";
import { useGallery } from "../context/GalleryContext";
import { useLang } from "../context/LanguageContext";
import { localizeAlbum } from "../utils/localize";
import { MdImage, MdPhotoLibrary } from "react-icons/md";

import AdBanner from "../components/AdBanner";

function GalleryPage() {
  const { publishedAlbums, getCoverImage } = useGallery();
  const { lang } = useLang();

  const albums = publishedAlbums.map((a) => localizeAlbum(a, lang));

  return (
    <main className="mx-6 min-h-screen mt-12">
      <div className="container mx-auto mb-10">
        <AdBanner slot="home-top" />
      </div>
      <section className="container mx-auto mt-12 flex flex-col xl:flex-row justify-center xl:gap-10 gap-6">
        <section className="px-4 py-6 lg:px-10 shadow-lg rounded-lg w-full border border-gray-100">
          <h1 className="text-3xl font-bold mb-8">
            {lang === "en" ? "Gallery" : "ग्यालरी"}
          </h1>

          {albums.length === 0 && (
            <p className="text-gray-400 text-center py-20">
              {lang === "en"
                ? "No galleries have been published yet."
                : "अहिलेसम्म कुनै ग्यालरी प्रकाशित गरिएको छैन।"}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {albums.map((album) => {
              const cover = getCoverImage(album);
              return (
                <Link
                  key={album.id}
                  to={`/gallery/${album.id}`}
                  className="block bg-white rounded-md shadow-sm border border-gray-50 overflow-hidden no-underline hover:no-underline group hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    {cover ? (
                      <img
                        src={cover.url}
                        alt={album.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-300">
                        <MdImage size={40} />
                      </div>
                    )}
                    <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black/60 to-transparent px-3 py-2">
                      <span className="inline-flex items-center gap-1 text-white text-xs font-medium">
                        <MdPhotoLibrary size={14} />
                        {album.images?.length || 0}{" "}
                        {lang === "en" ? "photos" : "तस्बिर"}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
                      {album.title}
                    </h3>
                    {album.description && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {album.description}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <aside>
          <AdBanner slot="home-side" page={"news"} />
        </aside>
      </section>
    </main>
  );
}

export default GalleryPage;
