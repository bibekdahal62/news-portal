import { useTerms } from "../context/TermsContext";
import { useLang } from "../context/LanguageContext";
import { localizeSectionList } from "../utils/localize";

function TermsPage() {
  const { sections } = useTerms();
  const { t, lang, loading, error } = useLang();

  // termsSections now lives inside en.json/ne.json (merged there instead
  // of a separate terms.en.json/terms.ne.json fetch), so it's already
  // loaded by the time LanguageProvider's own `loading` flips to false —
  // no page-local fetch/loading/error state needed anymore.
  const termsSections = t.termsSections || [];

  // Admin-added sections carry both heading/body (Nepali) and
  // heading_en/body_en (English, optional) — localize them the same way
  // Privacy Policy's admin sections are localized.
  const localizedSections = localizeSectionList(sections, lang);

  return (
    <main className="min-h-screen mx-6">
      <section className="container mx-auto mt-12 rounded-lg bg-(--primary-color) text-white">
        <div className="container mx-auto px-6 py-16 text-center lg:px-10">
          <h1 className="text-3xl font-bold sm:text-4xl">{t.termsHeroTitle}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-indigo-100 sm:text-base">
            {t.termsHeroText}
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
            termsSections.map((section) => (
              <div key={`${lang}-${section.heading}`}>
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
              {localizedSections.map((section) => (
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

export default TermsPage;
