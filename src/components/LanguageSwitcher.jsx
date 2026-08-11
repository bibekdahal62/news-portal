import { useLang } from "../context/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <div className="inline-flex items-center rounded-full border border-line bg-white p-0.5 text-sm font-medium">
      <button
        onClick={() => setLang("en")}
        className={`px-2.5 py-1 rounded-full transition-colors ${
          lang === "en"
            ? "bg-indigo-500 text-white"
            : "text-ink-soft hover:text-ink"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("ne")}
        className={`px-2.5 py-1 rounded-full transition-colors font-body-ne ${
          lang === "ne"
            ? "bg-indigo-500 text-white"
            : "text-ink-soft hover:text-ink"
        }`}
      >
        नेपाली
      </button>
    </div>
  );
}
