import NewsCard from "./NewsCard";
import { displayTime } from "../utils/time";

const MAX_PINNED = 4;

function PinnedNews({ news }) {
  const breakingNews = news.filter((n) => n.isBreaking).slice(0, MAX_PINNED);

  if (breakingNews.length === 0) return null;

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {breakingNews.map((news) => (
        <NewsCard
          key={news.id}
          category={news.category}
          image={news.image}
          headline={news.headline}
          description={news.description}
          time={displayTime(news)}
          href={news.href}
          author={news.author}
          views={news.views}
          isBreaking={news.isBreaking}
        />
      ))}
    </div>
  );
}

export default PinnedNews;
