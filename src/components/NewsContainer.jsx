import NewsCard from "./NewsCard";

function NewsContainer({ newsData }) {
  return (
    <section className="p-8 shadow-lg rounded-lg">
      <div className="my-4">
        <h3 className="text-3xl font-bold">ताजा समाचार</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
        {newsData.map((news) => (
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
