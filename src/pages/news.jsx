import NewsContainer from "../components/NewsContainer";
import Trending from "../components/TrendingNews";
import Banner from "../components/Banner";
import { useNews } from "../context/NewsContext";
import { useLang } from "../context/LanguageContext";
import AdBanner from "../components/AdBanner";

function NewsPage({ category, categoryKey, headingOverride }) {
  const { getNewsByCategory, loading, error } = useNews();
  const { t } = useLang();

  if (!category)
    return (
      <div className="text-center my-10 font-bold text-3xl">
        Error Loading Data
      </div>
    );

  const displayNews = getNewsByCategory(category);
  const heading =
    headingOverride ??
    (categoryKey && t[categoryKey] ? t[categoryKey] : category);

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
                <h3 className="text-3xl font-bold">{heading}</h3>
              </div>

              {loading && (
                <p className="text-center text-gray-500 py-16">
                  {t.newsLoading}
                </p>
              )}

              {/* Error state */}
              {!loading && error && (
                <p className="text-center text-red-500 py-16">
                  {t.newsLoadError}
                </p>
              )}

              {/* Empty state: category exists but has no published news */}
              {!loading && !error && displayNews.length === 0 && (
                <div className="text-center py-16 px-6">
                  <p className="text-lg font-medium text-gray-700">
                    {t.categoryNoNews}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {t.categoryNoNewsHint}
                  </p>
                </div>
              )}

              {!loading && !error && displayNews.length > 0 && (
                <NewsContainer newsData={displayNews} />
              )}
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
