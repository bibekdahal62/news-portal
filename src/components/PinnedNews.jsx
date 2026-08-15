import NewsCard from "./NewsCard";
import { displayTime } from "../utils/time";

function PinnedNews({ news }) {
  const rochakNews = news.filter((n) => n.category === "रोचक");

  // console.log(rochakNews);

  return (
    <div className="container mx-auto px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rochakNews.map((news, index) =>
        index <= 2 ? (
          <NewsCard
            key={news.id}
            category={news.category}
            image={news.image}
            headline={news.headline}
            description={news.description}
            time={displayTime(news)}
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
