import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useNews } from "../context/NewsContext";
import { useLang } from "../context/LanguageContext";
import { localizeNews } from "../utils/localize";

const MAX_SUGGESTIONS = 5;

function SearchBar({ className = "", onNavigate }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const { searchNews } = useNews();
  const { t, lang } = useLang();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      // searchNews already matches against both Nepali and English fields.
      setSuggestions(searchNews(value).slice(0, MAX_SUGGESTIONS));
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }

  function goToResultsPage(rawQuery) {
    const trimmed = rawQuery.trim();
    if (!trimmed) return;
    setIsOpen(false);
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    onNavigate?.();
  }

  function handleSubmit(e) {
    e.preventDefault();
    goToResultsPage(query);
  }

  function handleSuggestionClick(id) {
    setIsOpen(false);
    setQuery("");
    navigate(`/news/${id}`);
    onNavigate?.();
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") setIsOpen(false);
  }

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => query.trim() && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={t.search}
          autoComplete="off"
          className="w-full px-4 py-2 pr-10 border border-gray-300 outline-none rounded-full"
        />
        <button
          type="submit"
          aria-label={t.search}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
        >
          <CiSearch size={22} />
        </button>
      </form>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          {suggestions.length > 0 ? (
            <>
              <ul className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                {suggestions.map((rawItem) => {
                  const item = localizeNews(rawItem, lang);
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => handleSuggestionClick(item.id)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 transition-colors"
                      >
                        <img
                          src={item.image}
                          alt={item.headline}
                          className="w-10 h-10 object-cover rounded shrink-0"
                        />
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-gray-900 truncate">
                            {item.headline}
                          </span>
                          <span className="block text-xs text-gray-400">
                            {item.category}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <button
                type="button"
                onClick={() => goToResultsPage(query)}
                className="w-full text-center text-sm font-semibold text-blue-700 py-2 border-t border-gray-100 hover:bg-gray-50 transition-colors"
              >
                {t.searchViewAll}
              </button>
            </>
          ) : (
            <p className="px-4 py-3 text-sm text-gray-500">
              {t.searchNoResults} "{query}"
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
