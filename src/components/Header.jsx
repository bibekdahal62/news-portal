import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FiX, FiMenu } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLang } from "../context/LanguageContext";
import { useCategories } from "../context/CategoryContext";
import { useSettings } from "../context/SettingsContext";
import DateDisplay from "./DateDisplay";

import SearchBar from "./SearchBar";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);
  const { t, lang } = useLang();
  const { navCategories } = useCategories();
  const { settings } = useSettings();
  const logoSrc = settings.logo || "/logo-nepali.png";

  // These 6 have dedicated, hardcoded links in the nav below (Economy
  // through International), same as the site's original design. Anything
  // else that's enabled + flagged for nav (रोचक, कला साहित्य, or a new
  // category an admin adds later) falls into the "More" dropdown instead,
  // so new categories show up automatically without editing this file.
  const HARDCODED_NAV_NAMES = [
    "समाचार",
    "अर्थ",
    "राजनीति",
    "स्थानिय",
    "खेलकुद",
    "मनोरञ्जन",
    "अन्तर्राष्ट्रिय",
  ];
  const moreCategories = navCategories.filter(
    (cat) => !HARDCODED_NAV_NAMES.includes(cat.name),
  );

  // Automatically close mobile menu when screen becomes desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Close the "More" dropdown when clicking anywhere outside it — hover
  // already closes it on mouse-leave, but a click-to-open (e.g. touchscreen
  // laptops) needs an explicit outside-click check too.
  useEffect(() => {
    if (!moreOpen) return;

    function handleClickOutside(e) {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [moreOpen]);

  return (
    <header className="shadow-lg">
      {/* Date */}
      <div className="bg-(--primary-color)">
        <div className="container mx-auto">
          <DateDisplay />
        </div>
      </div>

      <div className="mx-6">
        <div className="container mx-auto flex flex-col">
          <div>
            {/* Logo + Right Side */}
            <div className="flex justify-between items-center my-4 mx-4 xl:mx-0 xl:px-2">
              {/* Logo */}
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                {/* <h1 className="text-3xl text-(--primary-color) font-bold my-4">
                  {t.title}
                </h1> */}
                <div className="w-44 md:w-52 lg:w-62.5 h-auto">
                  <img src={logoSrc} alt="site logo" />
                </div>
              </Link>

              {/* Right Side */}
              <div className="flex flex-col items-end gap-2">
                {/* Language Switcher */}
                <div className="hidden sm:inline-block">
                  <LanguageSwitcher />
                </div>

                {/* Search + Hamburger */}
                <div className="flex items-center gap-2">
                  {/* Search Bar */}

                  <SearchBar className="hidden lg:inline-block w-40 sm:w-52 lg:w-64" />

                  {/* Hamburger - Tablet and Mobile Only */}
                  <button
                    className="text-3xl cursor-pointer lg:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    {isMenuOpen ? <FiX /> : <FiMenu />}
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-between rounded-t-lg bg-(--primary-color)">
              <Link
                to="/"
                className="nav-styles"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.home}
              </Link>

              <Link
                to={"/news"}
                className="nav-styles"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.news}
              </Link>

              <Link
                to="/news/economy"
                className="nav-styles"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.economic}
              </Link>

              <Link
                to={"/news/politics"}
                className="nav-styles"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.politics}
              </Link>

              <Link
                to={"/news/local"}
                className="nav-styles"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.local}
              </Link>

              <Link
                to={"/news/sports"}
                className="nav-styles"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.sports}
              </Link>

              <Link
                to="/news/entertainment"
                className="nav-styles"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.entertainment}
              </Link>

              <Link
                to={"/news/international"}
                className="nav-styles"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.international}
              </Link>

              <Link
                to={"/videos"}
                className="nav-styles"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.videos}
              </Link>

              <div
                ref={moreRef}
                className="relative"
                onMouseEnter={() => setMoreOpen(true)}
                onMouseLeave={() => setMoreOpen(false)}
              >
                <button
                  type="button"
                  className="nav-styles flex items-center gap-1 cursor-pointer"
                  onClick={() => setMoreOpen((v) => !v)}
                  aria-expanded={moreOpen}
                >
                  {lang === "ne" ? "थप" : "More"}
                  <MdKeyboardArrowDown size={16} />
                </button>

                {moreOpen && (
                  <div className="absolute right-0 top-full min-w-40 bg-(--primary-color) shadow-lg rounded-b-md z-50">
                    {moreCategories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/news/category/${cat.id}`}
                        className="block nav-styles"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setMoreOpen(false);
                        }}
                      >
                        {lang === "ne" ? cat.name : cat.nameEn}
                      </Link>
                    ))}

                    {moreCategories.length > 0 && (
                      <div className="border-t border-gray-100 my-1" />
                    )}

                    <Link
                      to={"/about"}
                      className="block nav-styles"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setMoreOpen(false);
                      }}
                    >
                      {t.about}
                    </Link>

                    <Link
                      to={"/contact"}
                      className="block nav-styles"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setMoreOpen(false);
                      }}
                    >
                      {t.contact}
                    </Link>

                    <Link
                      to="/admin"
                      className="block nav-styles"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setMoreOpen(false);
                      }}
                    >
                      एडमिन
                    </Link>
                  </div>
                )}
              </div>
            </nav>

            {/* Tablet / Mobile Navigation — slides in from the left as an
              overlay panel, same pattern as the admin panel's sidebar
              (AdminLayout.jsx): a click-to-close backdrop plus a fixed
              aside that translates in/out via -translate-x-full. This
              replaces the old inline dropdown that pushed page content
              down. Rendered unconditionally (not `isMenuOpen && (...)`)
              so the translate-x transition can actually animate — hiding
              it via pointer-events instead of unmounting. */}
            <div
              className={`lg:hidden fixed inset-0 z-40 transition-opacity ${
                isMenuOpen
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setIsMenuOpen(false)}
              />
              <nav
                className={`absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-white flex flex-col overflow-y-auto transition-transform duration-200 ${
                  isMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <div className="px-4 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
                  <div className="w-32 h-auto">
                    <img src={logoSrc} alt="site logo" />
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-1.5 rounded hover:bg-gray-100 text-gray-600 cursor-pointer"
                    aria-label="मेनु बन्द गर्नुहोस्"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                <div className="px-4 py-4 flex flex-col gap-4 font-semibold items-start">
                  <SearchBar
                    className="w-full"
                    onNavigate={() => setIsMenuOpen(false)}
                  />

                  {/* Language switcher was previously hidden below the
                    `sm` breakpoint entirely, so phone-only users had no
                    way to switch language. Surfacing it here fixes that
                    without touching the top bar's existing behaviour. */}
                  <div className="sm:hidden">
                    <LanguageSwitcher />
                  </div>

                  <Link
                    to="/"
                    className="text-hover"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.home}
                  </Link>

                  <Link
                    to="/news"
                    className="text-hover"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.news}
                  </Link>

                  <Link
                    to="/news/economy"
                    className="text-hover"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.economic}
                  </Link>

                  <Link
                    to="/news/politics"
                    className="text-hover"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.politics}
                  </Link>

                  <Link
                    to="/news/local"
                    className="text-hover"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.local}
                  </Link>

                  <Link
                    to="/news/sports"
                    className="text-hover"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.sports}
                  </Link>

                  <Link
                    to="/news/entertainment"
                    className="text-hover"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.entertainment}
                  </Link>

                  <Link
                    to="/news/international"
                    className="text-hover"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.international}
                  </Link>

                  {/* No nested dropdown on mobile — the panel is already a
                    flat vertical list, so "more" categories just continue
                    the same list instead of adding another layer of UI. */}
                  {moreCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/news/category/${cat.id}`}
                      className="text-hover"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {lang === "ne" ? cat.name : cat.nameEn}
                    </Link>
                  ))}

                  <Link
                    to="/videos"
                    className="text-hover"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.videos}
                  </Link>

                  <Link
                    to="/about"
                    className="text-hover"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.about}
                  </Link>

                  <Link
                    to="/contact"
                    className="text-hover"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.contact}
                  </Link>
                  <Link
                    to="/privacy"
                    className="text-hover"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.privacy}
                  </Link>
                  <Link
                    to="/terms"
                    className="text-hover"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.terms}
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
