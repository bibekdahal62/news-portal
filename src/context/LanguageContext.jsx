import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const initialLang = document.documentElement.lang || "en";

  const [lang, setLang] = useState(initialLang === "ne" ? "ne" : "en");
  const [translations, setTranslations] = useState({ en: {}, ne: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetched once on mount, same pattern as NewsContext pulling
  // /news-data.json from the public folder.
  useEffect(() => {
    (async () => {
      try {
        const [enRes, neRes] = await Promise.all([
          fetch("/locales/en.json"),
          fetch("/locales/ne.json"),
        ]);

        if (!enRes.ok || !neRes.ok) {
          throw new Error("Failed to fetch translation files");
        }

        const [enData, neData] = await Promise.all([
          enRes.json(),
          neRes.json(),
        ]);

        setTranslations({ en: enData, ne: neData });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang] || {};

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, loading, error }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
