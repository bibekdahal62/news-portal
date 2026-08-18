import NewsContainer from "../components/NewsContainer";
import Trending from "../components/TrendingNews";
import Banner from "../components/Banner";
import PinnedNews from "../components/PinnedNews";
import LatestNews from "../components/LatestNews";
import AdBanner from "../components/AdBanner";
import { useNews } from "../context/NewsContext";
import { useLang } from "../context/LanguageContext";

function HomePage() {
  const { publishedNews, loading, error } = useNews();
  const { t } = useLang();

  const featuredNews = publishedNews.filter((n) => n.isFeatured);

  return (
    <main className="min-h-screen mt-12 mx-6">
      <section>
        <div className="mb-8">
          {loading && <p className="text-2xl text-center">{t.newsLoading}</p>}

          {error && (
            <p className="text-2xl text-center text-red-500">
              {t.newsLoadError}
            </p>
          )}

          <div className="container mx-auto mb-10">
            <AdBanner slot="home-top" page="home" />
          </div>

          {!loading && !error && (
            <div>
              <LatestNews news={publishedNews} />
              <PinnedNews news={publishedNews} />
            </div>
          )}
        </div>

        <div className="container mx-auto mt-4 flex flex-col lg:flex-row justify-center xl:gap-10 gap-6">
          <div>
            {!loading && !error && (
              <div>
                <div className="shadow-lg rounded-lg border border-gray-50">
                  <div className="px-10 py-6">
                    <h3 className="text-3xl font-bold text-center sm:text-left">
                      {t.featuredNews}
                    </h3>
                  </div>
                  {featuredNews.length === 0 ? (
                    <p className="text-center text-gray-400 py-14">
                      {t.featuredEmpty}
                    </p>
                  ) : (
                    <NewsContainer newsData={featuredNews} limit={8} />
                  )}
                </div>
                <div className="container mx-auto mt-10">
                  <AdBanner slot="home-bottom" page="home" />
                </div>
              </div>
            )}
          </div>
          <div className="xl:min-w-sm">
            <Trending />
            <div>
              <div className="mt-6">
                <AdBanner slot="home-side" page="home" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
