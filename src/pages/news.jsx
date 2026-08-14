import NewsContainer from "../components/NewsContainer";
import Trending from "../components/TrendingNews";
import Banner from "../components/Banner";
import { useNews } from "../context/NewsContext";
import AdBanner from "../components/AdBanner";

function NewsPage({ category }) {
  const { news, getNewsByCategory } = useNews();

  if (!category)
    return (
      <div className="text-center my-10 font-bold text-3xl">
        Error Loading Data
      </div>
    );

  const displayNews = getNewsByCategory(category);

  return (
    <main>
      <section>
        <div className="container mx-auto mt-10 lg:px-10 flex flex-col xl:flex-row justify-center xl:gap-10 gap-6">
          <div>
            <div className="px-10">
              <h3 className="text-3xl font-bold">{category}</h3>
            </div>
            <NewsContainer newsData={displayNews} />
          </div>
          <div>
            <div className="xl:max-w-lg">
              <div className="mt-4 xl:max-w-lg">
                <AdBanner slot="home-side" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default NewsPage;
