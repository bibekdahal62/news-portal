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
    <main className="mx-6">
      <section>
        <div className="container mx-auto mt-12">
          <AdBanner slot="home-top" page="news" />
        </div>
        <div className="container mx-auto mt-10 flex flex-col lg:flex-row justify-center xl:gap-10 gap-6">
          <div>
            <div className="shadow-lg rounded-lg border border-gray-50">
              <div className="px-10 pt-6">
                <h3 className="text-3xl font-bold">{category}</h3>
              </div>
              <NewsContainer newsData={displayNews} />
            </div>
            <div className="container mx-auto mt-10">
              <AdBanner slot="home-bottom" page="news" />
            </div>
          </div>
          <div>
            <AdBanner slot="home-side" page="news" />
          </div>
        </div>
      </section>
    </main>
  );
}

export default NewsPage;
