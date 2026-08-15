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
        <div className="container mx-auto mt-12 px-10">
          <AdBanner slot="home-top" />
        </div>
        <div className="container mx-auto mt-10 lg:px-10 flex flex-col xl:flex-row justify-center xl:gap-10 gap-6">
          <div>
            <div className="shadow-lg rounded-lg border border-gray-100">
              <div className="px-10 pt-6">
                <h3 className="text-3xl font-bold">{category}</h3>
              </div>
              <NewsContainer newsData={displayNews} />
            </div>
            <div className="container mx-auto mt-10">
              <AdBanner slot="home-bottom" />
            </div>
          </div>
          <div>
            <AdBanner slot="home-side" />
          </div>
        </div>
      </section>
    </main>
  );
}

export default NewsPage;
