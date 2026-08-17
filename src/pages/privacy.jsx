import { useEffect, useState } from "react";
import { usePrivacy } from "../context/PrivacyContext";
import { useLang } from "../context/LanguageContext";

function PrivacyPage() {
  const { sections } = usePrivacy();
  const { t, lang } = useLang();

  const [defaultSections, setDefaultSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Re-fetch whenever the language changes, same fetch-from-/public
  // pattern as news-data.json and the locale files.
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`/locales/privacy.${lang}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch privacy content");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setDefaultSections(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [lang]);

  return (
    <main className="min-h-screen mx-6">
      <section className="container mx-auto mt-12 rounded-lg bg-(--primary-color) text-white">
        <div className="container mx-auto px-6 py-16 text-center lg:px-10">
          <h1 className="text-3xl font-bold sm:text-4xl">
            {t.privacyHeroTitle}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-indigo-100 sm:text-base">
            {t.privacyHeroText}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12 lg:px-10">
        <div className="mx-auto max-w-3xl flex flex-col gap-8">
          {loading && (
            <p className="text-center text-gray-400">लोड हुँदैछ...</p>
          )}
          {error && (
            <p className="text-center text-red-500">
              Error loading content: {error}
            </p>
          )}

          {!loading &&
            !error &&
            defaultSections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                  {section.heading}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base whitespace-pre-line">
                  {section.body}
                </p>
              </div>
            ))}

          {sections.length > 0 && (
            <div className="border-t border-gray-100 pt-8 flex flex-col gap-8">
              {sections.map((section) => (
                <div key={section.id}>
                  <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                    {section.heading}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base whitespace-pre-line">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default PrivacyPage;
