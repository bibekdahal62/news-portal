// import { useState, useEffect } from "react";

import NewsContainer from "../components/NewsContainer";
// import NewsCard from "../components/NewsCard";
import Trending from "../components/TrendingNews";
import Banner from "../components/Banner";
import PinnedNews from "../components/PinnedNews";
import AdBanner from "../components/AdBanner";
import { useNews } from "../context/NewsContext";

function HomePage() {
  const { news, loading, error } = useNews();

  return (
    <main className="min-h-screen mt-4">
      <section>
        <div className="p-8">
          {loading && <p className="text-2xl text-center"> Loading News..</p>}

          {error && (
            <p className="text-2xl text-center text-red-500">
              Error loading News: {error}
            </p>
          )}

          <div className="container mx-auto mb-10 px-10">
            <AdBanner slot="home-top" />
          </div>

          {!loading && !error && <PinnedNews news={news} />}
        </div>

        <div className="container mx-auto mt-4 lg:px-10 flex flex-col xl:flex-row justify-center xl:gap-10 gap-6">
          <div>
            {!loading && !error && (
              <div>
                <div className="shadow-lg rounded-lg border border-gray-100">
                  <div className="px-10 pt-6">
                    <h3 className="text-3xl font-bold">ताजा समाचार</h3>
                  </div>
                  <NewsContainer newsData={news} limit={8} />
                </div>
                <div className="container mx-auto mt-10">
                  <AdBanner slot="home-bottom" />
                </div>
              </div>
            )}
          </div>
          <div className="xl:min-w-sm">
            <Trending />
            <div>
              <div className="mt-6">
                <AdBanner slot="home-side" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
