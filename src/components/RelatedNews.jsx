import NewsCard from "./NewsCard";
import { useNews } from "../context/NewsContext";
import { useLang } from "../context/LanguageContext";
import { localizeNews } from "../utils/localize";
import { displayTime } from "../utils/time";

const RELATED_LIMIT = 4;

// Shows other published articles from the same category, most recent
// first, excluding the article currently being viewed. Rendered as its
// own section below the article on the news detail page.
function RelatedNews({ category, excludeId }) {
  const { getNewsByCategory } = useNews();
  const { lang, t } = useLang();

  const related = getNewsByCategory(category)
    .filter((n) => String(n.id) !== String(excludeId))
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, RELATED_LIMIT);

  if (related.length === 0) return null;

  const title =
    t.relatedNews || (lang === "en" ? "Related News" : "सम्बन्धित समाचार");

  return (
    <section className="mt-10 pt-8 border-t border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-5">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {related.map((raw) => {
          const item = localizeNews(raw, lang);
          return (
            <NewsCard
              key={item.id}
              id={item.id}
              category={item.category}
              image={item.image}
              headline={item.headline}
              description={item.description}
              time={displayTime(item)}
              href={item.href}
              author={item.author}
              views={item.views}
              isBreaking={item.isBreaking}
            />
          );
        })}
      </div>
    </section>
  );
}

export default RelatedNews;
