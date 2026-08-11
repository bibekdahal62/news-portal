import NewsCard from "./NewsCard";

function PinnedNews({ news }) {
  const rochakNews = news.filter((n) => n.category === "रोचक");

  console.log(rochakNews);

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rochakNews.map((news, index) =>
        index <= 2 ? (
          <NewsCard
            key={news.id}
            category={news.category}
            image={news.image}
            headline={news.headline}
            description={news.description}
            time={news.time}
            href={news.href}
          />
        ) : (
          ""
        ),
      )}
    </div>
  );
}

export default PinnedNews;
