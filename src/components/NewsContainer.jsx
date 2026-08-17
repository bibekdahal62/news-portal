import NewsCard from "./NewsCard";
import { displayTime } from "../utils/time";

function NewsContainer({ newsData, limit }) {
  const sortedNews = [...newsData].sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt),
  );

  const displayedNews = parseInt(limit)
    ? sortedNews.slice(0, parseInt(limit))
    : sortedNews;

  return (
    <section className="sm:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
        {displayedNews.map((news, index) => (
          <NewsCard
            key={news.id}
            id={news.id}
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
    </section>
  );
}

export default NewsContainer;
