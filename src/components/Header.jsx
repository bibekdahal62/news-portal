import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FiX, FiMenu } from "react-icons/fi";
import { useState, useEffect } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLang } from "../context/LanguageContext";
import DateDisplay from "./DateDisplay";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLang();

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

  return (
    <header className="shadow-lg">
      {/* Date */}
      <div className="bg-(--primary-color)">
        <div className="container mx-auto">
          <DateDisplay />
        </div>
      </div>

      <div className="container mx-auto flex flex-col">
        <div>
          {/* Logo + Right Side */}
          <div className="flex justify-between items-center my-4 mx-4 px-4 xl:mx-0 xl:px-2">

            {/* Logo */}
            <Link to="/">
              <h1 className="text-3xl text-(--primary-color) font-bold my-4">
                {t.title}
              </h1>
            </Link>

            {/* Right Side */}
            <div className="flex flex-col items-end gap-2">

              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Search + Hamburger */}
              <div className="flex items-center gap-2">

                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t.search}
                    className="w-40 sm:w-52 lg:w-64 px-4 py-2 pr-10 border border-gray-300 outline-none rounded-full"
                  />

                  <CiSearch
                    size={22}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  />
                </div>

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
          <nav className="hidden mx-4 px-2 xl:mx-2 lg:flex items-center justify-between rounded-t-lg bg-(--primary-color)">
            
            <Link to="/" className="nav-styles">
              {t.home}
            </Link>

            <Link to="/news" className="nav-styles">
              {t.news}
            </Link>

            <Link to="/news/economy" className="nav-styles">
              {t.economic}
            </Link>

            <Link to="/news/politics" className="nav-styles">
              {t.politics}
            </Link>

            <Link to="/news/local" className="nav-styles">
              {t.local}
            </Link>

            <Link to="/news/sports" className="nav-styles">
              {t.sports}
            </Link>

            <Link to="/news/entertainment" className="nav-styles">
              {t.entertainment}
            </Link>

            <Link to="/news/international" className="nav-styles">
              {t.international}
            </Link>

            <Link to="/videos" className="nav-styles">
              {t.videos}
            </Link>

            <Link to="/about" className="nav-styles">
              {t.about}
            </Link>

            <Link to="/contact" className="nav-styles">
              {t.contact}
            </Link>

          </nav>

          {/* Tablet / Mobile Navigation */}
          {isMenuOpen && (
            <nav className="lg:hidden px-4 mb-4 flex flex-col gap-4 font-semibold items-start">

              <Link to="/" className="text-hover">
                {t.home}
              </Link>

              <Link to="/news" className="text-hover">
                {t.news}
              </Link>

              <Link to="/news/economy" className="text-hover">
                {t.economic}
              </Link>

              <Link to="/news/politics" className="text-hover">
                {t.politics}
              </Link>

              <Link to="/news/local" className="text-hover">
                {t.local}
              </Link>

              <Link to="/news/sports" className="text-hover">
                {t.sports}
              </Link>

              <Link to="/news/entertainment" className="text-hover">
                {t.entertainment}
              </Link>

              <Link to="/news/international" className="text-hover">
                {t.international}
              </Link>

              <Link to="/videos" className="text-hover">
                {t.videos}
              </Link>

              <Link to="/about" className="text-hover">
                {t.about}
              </Link>

              <Link to="/contact" className="text-hover">
                {t.contact}
              </Link>

            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;