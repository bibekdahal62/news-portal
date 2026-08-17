import { useSearchParams } from "react-router-dom";
import NewsContainer from "../components/NewsContainer";
import Trending from "../components/TrendingNews";
import AdBanner from "../components/AdBanner";
import { useNews } from "../context/NewsContext";
import { useLang } from "../context/LanguageContext";

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { searchNews, loading, error } = useNews();
  const { t } = useLang();

  const results = query ? searchNews(query) : [];

  return (
    <main className="min-h-screen mt-12 mx-6">
      <section>
        <div className="container mx-auto mb-10">
          <AdBanner slot="home-top" page="search" />
        </div>

        <div className="container mx-auto flex flex-col xl:flex-row justify-center xl:gap-10 gap-6">
          <div className="flex-1">
            {loading && <p className="text-2xl text-center">Loading News..</p>}
            {error && (
              <p className="text-2xl text-center text-red-500">
                Error loading News: {error}
              </p>
            )}

            {!loading && !error && (
              <div>
                <div className="shadow-lg rounded-lg border border-gray-100">
                  <div className="px-10 pt-6">
                    {query ? (
                      <>
                        <h3 className="text-3xl font-bold">
                          {t.searchResultsFor} "{query}"
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {results.length} {t.searchResultsCount}
                        </p>
                      </>
                    ) : (
                      <h3 className="text-3xl font-bold">{t.search}</h3>
                    )}
                  </div>

                  {query && results.length === 0 && (
                    <div className="px-10 py-16 text-center">
                      <p className="text-xl font-semibold text-gray-700">
                        {t.searchNoResults} "{query}"
                      </p>
                      <p className="text-gray-500 mt-2">
                        {t.searchNoResultsHint}
                      </p>
                    </div>
                  )}

                  {!query && (
                    <div className="px-10 py-16 text-center text-gray-500">
                      {t.searchEmptyPrompt}
                    </div>
                  )}

                  {results.length > 0 && <NewsContainer newsData={results} />}
                </div>

                <div className="container mx-auto mt-10">
                  <AdBanner slot="home-bottom" page="search" />
                </div>
              </div>
            )}
          </div>

          <div className="xl:min-w-sm">
            <Trending />
            <div className="mt-6">
              <AdBanner slot="home-side" page="search" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SearchResultsPage;
