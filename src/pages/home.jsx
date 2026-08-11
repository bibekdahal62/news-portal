import { useState, useEffect } from "react";

import NewsContainer from "../components/NewsContainer";
// import NewsCard from "../components/NewsCard";
import Trending from "../components/TrendingNews";
import Banner from "../components/Banner";
import PinnedNews from "../components/PinnedNews";

function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/news-data.json");
        if (!res.ok) throw new Error("Failed to fetch news Data..");

        const data = await res.json();

        setNews(data["news-data"]);
        // console.log(data);
      } catch (er) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className="min-h-screen mt-4">
      <section>
        <div>
          <PinnedNews news={news} />
        </div>
        <div className="container mx-auto flex flex-col md:flex-row gap-10">
          <div>
            <NewsContainer newsData={news} />
          </div>
          <div>
            <Trending />
            <div className="max-w-lg">
              <Banner />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
