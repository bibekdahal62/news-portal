// import { useState, useEffect } from "react";

import NewsContainer from "../components/NewsContainer";
// import NewsCard from "../components/NewsCard";
import Trending from "../components/TrendingNews";
import Banner from "../components/Banner";
import PinnedNews from "../components/PinnedNews";
import { useNews } from "../context/NewsContext";

function HomePage() {
  const { news, loading, error } = useNews();

  return (
    <main className="min-h-screen mt-4">
      <section>
        <div className="p-6 my-8">
          {loading && <p className="text-2xl text-center"> Loading News..</p>}

          {error && (
            <p className="text-2xl text-center text-red-500">
              Error loading News: {error}
            </p>
          )}

          {!loading && !error && <PinnedNews news={news} />}
        </div>
        <div className="container mx-auto mt-10 lg:px-10 flex flex-col-reverse xl:flex-row justify-center xl:gap-10 gap-6">
          <div>
            {!loading && !error && (
              <div>
                <div className="px-10">
                  <h3 className="text-3xl font-bold">ताजा समाचार</h3>
                </div>

                <NewsContainer newsData={news} limit={8} />
              </div>
            )}
          </div>
          <div className="p-4">
            <Trending />
            <div className="xl:max-w-lg">
              <Banner />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
