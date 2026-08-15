import { Link, useParams } from "react-router-dom";
import { useNews } from "../context/NewsContext";
import { displayTime } from "../utils/time";

import AdBanner from "../components/AdBanner";

function NewsDetail() {
  const { id } = useParams();
  const { getNewsById, loading } = useNews();

  if (loading) return <p className="text-center mt-10">लोड हुँदैछ...</p>;

  const article = getNewsById(id);

  if (!article) {
    return (
      <main className="min-h-screen container mx-auto mt-10 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">समाचार फेला परेन</h1>
        <Link to="/" className="text-(--primary-color) underline">
          गृहपृष्ठमा फर्कनुहोस्
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen container mx-auto mt-12 px-10 flex flex-col xl:flex-row justify-center xl:gap-10 gap-6">
      <section className="shadow-lg rounded-lg  py-6 px-4 lg:px-10 border border-gray-100">
        <img
          src={article.image}
          alt={article.headline}
          className="w-full max-h-105 object-cover mt-4 rounded-lg mb-6"
        />

        <span className="inline-block bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded mb-3">
          {article.category}
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {article.headline}
        </h1>
        <p className="text-sm text-gray-400 mb-6">{displayTime(article)}</p>

        <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-10">
          {article.description}
        </p>

        <Link to="/" className="text-(--primary-color) underline">
          ← गृहपृष्ठमा फर्कनुहोस्
        </Link>
      </section>

      <aside>
        <AdBanner slot="home-side" />
      </aside>
    </main>
  );
}

export default NewsDetail;
