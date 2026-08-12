import NewsCard from "./NewsCard";

function NewsContainer({ newsData, limit }) {
  const displayedNews = parseInt(limit)
    ? newsData.slice(0, parseInt(limit))
    : newsData;

  return (
    <section className="p-8 shadow-lg rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
        {displayedNews.map((news, index) => (
          <NewsCard
            key={news.id}
            category={news.category}
            image={news.image}
            headline={news.headline}
            description={news.description}
            time={news.time}
            href={news.href}
          />
        ))}
      </div>
    </section>
  );
}

export default NewsContainer;
