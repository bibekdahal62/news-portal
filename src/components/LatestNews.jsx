import NewsCard from "./NewsCard";
import { displayTime } from "../utils/time";

const MAX_LATEST = 5;

function LatestNews({ news }) {
  const latestNews = [...news]
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)) // newest first
    .slice(0, MAX_LATEST); // keep the 5 most recent

  if (latestNews.length === 0) return null;

  return (
    <div className="container mx-auto mb-10">
      <div className="flex items-center gap-2 mb-4">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
        </span>
        <h2 className="text-2xl font-bold text-gray-900">पछिल्लो समाचार</h2>
        <div className="flex-1 border-t-2 border-red-500 ml-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
        {latestNews.map((item) => (
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
        ))}
      </div>
    </div>
  );
}

export default LatestNews;
