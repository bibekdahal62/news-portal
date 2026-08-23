import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { useNews } from "../context/NewsContext";
import { useLang } from "../context/LanguageContext";
import { localizeNews } from "../utils/localize";
import { displayTime, fullDateTimeNe, formatViewsNe } from "../utils/time";

import AdBanner from "../components/AdBanner";
import ShareButtons from "../components/ShareButtons";
import RelatedNews from "../components/RelatedNews";

function NewsDetail() {
  const { id } = useParams();
  const { getNewsById, loading } = useNews();
  const { lang } = useLang();

  const [isImageOpen, setIsImageOpen] = useState(false);

  useEffect(() => {
    if (isImageOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isImageOpen]);

  if (loading) {
    return <p className="text-center mt-10">लोड हुँदैछ...</p>;
  }

  const rawArticle = getNewsById(id);

  if (!rawArticle || rawArticle.published === false) {
    return (
      <main className="min-h-screen container mx-auto mt-10 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">समाचार फेला परेन</h1>

        <Link to="/" className="text-(--primary-color) underline">
          गृहपृष्ठमा फर्कनुहोस्
        </Link>
      </main>
    );
  }

  const article = localizeNews(rawArticle, lang);

  const body = article.content?.trim() ? article.content : article.description;

  return (
    <main className="min-h-screen mx-6">
      <section className="container mx-auto mt-12 flex flex-col xl:flex-row justify-center xl:gap-10 gap-6">
        <section className="shadow-lg w-full rounded-lg py-6 px-4 lg:px-10 border border-gray-100">
          <div className="cursor-pointer" onClick={() => setIsImageOpen(true)}>
            <img
              src={article.image}
              alt={article.headline}
              className="w-full max-h-125 object-cover mt-4 rounded-lg mb-6 hover:opacity-90 transition duration-200"
            />
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
              {article.category}
            </span>

            {article.isBreaking && (
              <span className="inline-block bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded">
                ब्रेकिङ
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {article.headline}
          </h1>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-400 mb-6">
            {article.author && (
              <span className="text-gray-600 font-medium">
                {article.author}
              </span>
            )}

            <span title={fullDateTimeNe(article)}>{displayTime(article)}</span>

            {typeof article.views === "number" && article.views > 0 && (
              <span>{formatViewsNe(article.views)} पटक हेरिएको</span>
            )}
          </div>

          <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">
            {body}
          </p>

          {Array.isArray(article.tags) && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <ShareButtons title={article.headline} />

          <Link to="/" className="text-(--primary-color) underline">
            {lang === "en" ? "← Back to home" : "← गृहपृष्ठमा फर्कनुहोस्"}
          </Link>

          <RelatedNews
            category={rawArticle.category}
            excludeId={rawArticle.id}
          />
        </section>

        <aside>
          <AdBanner slot="home-side" />
        </aside>
      </section>

      {isImageOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          {/* TOP-RIGHT BUTTONS */}
          <div className="absolute top-5 right-6 flex items-center gap-4 z-10">
            {/* DOWNLOAD BUTTON */}
            <a
              href={article.image}
              download
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-white hover:text-gray-300 transition cursor-pointer"
              title={
                lang === "en" ? "Download image" : "तस्बिर डाउनलोड गर्नुहोस्"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-7 h-7"
              >
                <path d="M12 3v12" />
                <path d="m7 10 5 5 5-5" />
                <path d="M5 21h14" />
              </svg>
            </a>

            {/* CLOSE BUTTON */}
            <button
              type="button"
              onClick={() => setIsImageOpen(false)}
              className="text-white text-4xl font-bold hover:text-gray-300 transition cursor-pointer leading-none"
              aria-label="Close image"
            >
              &times;
            </button>
          </div>

          {/* FULL IMAGE */}
          <img
            src={article.image}
            alt={article.headline}
            className="w-full h-full max-w-7xl max-h-[95vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
}

export default NewsDetail;
