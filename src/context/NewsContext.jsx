import { createContext, useContext, useEffect, useState } from "react";

const NewsContext = createContext();

// All news data lives in React state only for this session. It is seeded
// once from /news-data.json on load; admin create/update/delete work
// immediately, but nothing is written to localStorage or any backend, so
// a page refresh resets everything back to the seed data. See the chat
// reply for what a real persistence layer would need.
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

  function addNews(newsItem) {
    const id = news.length ? Math.max(...news.map((n) => n.id)) + 1 : 1;
    const item = {
      id,
      href: `/news/${id}`,
      createdAt: new Date().toISOString(),
      ...newsItem,
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

  function getNewsById(id) {
    return news.find((n) => String(n.id) === String(id));
  }

  function getNewsByCategory(category) {
    return news.filter((n) => n.category === category);
  }

  return (
    <NewsContext.Provider
      value={{
        news,
        loading,
        error,
        addNews,
        updateNews,
        deleteNews,
        getNewsById,
        getNewsByCategory,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}

export function useNews() {
  return useContext(NewsContext);
}
