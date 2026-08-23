import { useState } from "react";
import { Link } from "react-router-dom";
import { useVideos } from "../context/VideoContext";
import { useCategories } from "../context/CategoryContext";
import { useLang } from "../context/LanguageContext";
import { youtubeThumbnailUrl } from "../utils/youtube";
import { displayTime } from "../utils/time";
import { FaPlay } from "react-icons/fa";

import AdBanner from "../components/AdBanner";

function VideosPage() {
  const { publishedVideos } = useVideos();
  const { navCategories } = useCategories();
  const { lang } = useLang();
  const [categoryFilter, setCategoryFilter] = useState("all");

  const usedCategoryNames = new Set(
    publishedVideos.map((v) => v.category).filter(Boolean),
  );
  const availableCategories = navCategories.filter((cat) =>
    usedCategoryNames.has(cat.name),
  );

  const videos =
    categoryFilter === "all"
      ? publishedVideos
      : publishedVideos.filter((v) => v.category === categoryFilter);

  return (
    <main className="mx-6 min-h-screen mt-12">
      <div className="container mx-auto mb-10">
        <AdBanner slot="home-top" />
      </div>
      <section className="container mx-auto mt-12 flex flex-col xl:flex-row justify-center xl:gap-10 gap-6">
        <section className="px-4 py-6 lg:px-10 shadow-lg rounded-lg w-full border border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h1 className="text-3xl font-bold">
              {lang === "en" ? "Videos" : "भिडियो"}
            </h1>

            {availableCategories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCategoryFilter("all")}
                  className={`text-xs sm:text-sm px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
                    categoryFilter === "all"
                      ? "bg-(--primary-color) text-white border-(--primary-color)"
                      : "border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {lang === "en" ? "All" : "सबै"}
                </button>
                {availableCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.name)}
                    className={`text-xs sm:text-sm px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
                      categoryFilter === cat.name
                        ? "bg-(--primary-color) text-white border-(--primary-color)"
                        : "border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {lang === "en" && cat.nameEn ? cat.nameEn : cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {videos.length === 0 && (
            <p className="text-gray-400 text-center py-20">
              {lang === "en"
                ? "No videos published yet."
                : "अहिलेसम्म कुनै भिडियो प्रकाशित गरिएको छैन।"}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {videos.map((video) => (
              <Link
                key={video.id}
                to={`/videos/${video.id}`}
                className="block bg-white rounded-md shadow-sm border border-gray-50 overflow-hidden no-underline hover:no-underline group hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img
                    src={youtubeThumbnailUrl(video.youtubeId)}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                      <FaPlay
                        className="text-(--primary-color) ml-1"
                        size={20}
                      />
                    </div>
                  </div>
                  {video.category && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                      {video.category}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2 mb-1">
                    {video.title}
                  </h3>
                  <p className="text-xs text-gray-400">{displayTime(video)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <aside>
          <AdBanner slot="home-side" page={"news"} />
        </aside>
      </section>
    </main>
  );
}

export default VideosPage;
