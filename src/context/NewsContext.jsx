import { createContext, useContext, useEffect, useState } from "react";

const NewsContext = createContext();

export function NewsProvider({ children }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/news-data.json");
        if (!res.ok) throw new Error("Failed to fetch news data");
        const data = await res.json();
        setNews(data["news-data"]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // `news` (raw, everything) is for the admin panel, which needs to see
  // and manage drafts/unpublished items too. `publishedNews` is what every
  // public-facing page/component should read from instead.
  const publishedNews = news.filter((n) => n.published !== false);

  function addNews(newsItem) {
    const id = news.length ? Math.max(...news.map((n) => n.id)) + 1 : 1;
    const item = {
      tags: [],
      content: "",
      author: "",
      views: 0,
      isBreaking: false,
      isFeatured: false,
      published: true,
      ...newsItem,
      id,
      publishedAt: new Date().toISOString(),
    };
    setNews((prev) => [item, ...prev]);
    return item;
  }

  function updateNews(id, updates) {
    setNews((prev) =>
      prev.map((n) =>
        n.id === id
          ? { ...n, ...updates, updatedAt: new Date().toISOString() }
          : n,
      ),
    );
  }

  function deleteNews(id) {
    setNews((prev) => prev.filter((n) => n.id !== id));
  }

  // Flips published <-> unpublished for one item.
  function togglePublish(id) {
    setNews((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              published: !(n.published !== false),
              updatedAt: new Date().toISOString(),
            }
          : n,
      ),
    );
  }

  // Looks up by id across ALL news (published or not) - the admin edit
  // form needs this to load drafts too. Public pages that use this
  // (newsDetail) are responsible for checking `.published` themselves so
  // an unpublished article's direct URL doesn't leak its content.
  function getNewsById(id) {
    return news.find((n) => String(n.id) === String(id));
  }

  // Public-facing: only published items, for category listing pages.
  function getNewsByCategory(category) {
    return publishedNews.filter((n) => n.category === category);
  }

  function getTrendingNews(limit = 5, windowHours = 72) {
    const cutoff = Date.now() - windowHours * 60 * 60 * 1000;
    const byViewsDesc = (a, b) => (b.views || 0) - (a.views || 0);

    const withinWindow = publishedNews
      .filter(
        (n) => n.publishedAt && new Date(n.publishedAt).getTime() >= cutoff,
      )
      .sort(byViewsDesc);

    if (withinWindow.length >= limit) {
      return withinWindow.slice(0, limit);
    }

    const usedIds = new Set(withinWindow.map((n) => n.id));
    const backfill = [...publishedNews]
      .sort(byViewsDesc)
      .filter((n) => !usedIds.has(n.id));

    return [...withinWindow, ...backfill].slice(0, limit);
  }

  return (
    <NewsContext.Provider
      value={{
        news,
        publishedNews,
        loading,
        error,
        addNews,
        updateNews,
        deleteNews,
        togglePublish,
        getNewsById,
        getNewsByCategory,
        getTrendingNews,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}

export function useNews() {
  return useContext(NewsContext);
}
