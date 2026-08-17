import NewsCard from "./NewsCard";
import { displayTime } from "../utils/time";
import { useLang } from "../context/LanguageContext";
import { localizeNews } from "../utils/localize";

const MAX_PINNED = 4;

function PinnedNews({ news }) {
  const { lang } = useLang();
  const breakingNews = news.filter((n) => n.isBreaking).slice(0, MAX_PINNED);

  if (breakingNews.length === 0) return null;

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {breakingNews.map((raw) => {
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
  );
}

export default PinnedNews;
