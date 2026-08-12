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
    <NewsContext.Provider value={{ news, loading, error }}>
      {children}
    </NewsContext.Provider>
  );
}

export function useNews() {
  return useContext(NewsContext);
}
