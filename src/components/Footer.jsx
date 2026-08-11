import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useLang } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="mt-16 bg-(--primary-color) text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-bold tracking-tight">{t.title}</h2>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-indigo-100">
              {t.description}
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-indigo-200">
              {t.company}
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/about"
                  className="text-indigo-100 transition hover:text-white"
                >
                  {t.about}
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-indigo-100 transition hover:text-white"
                >
                  {t.contact}
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy"
                  className="text-indigo-100 transition hover:text-white"
                >
                  {t.privacy}
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="text-indigo-100 transition hover:text-white"
                >
                  {t.terms}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-indigo-200">
              {t.reachUs}
            </h3>

            <ul className="space-y-3 text-sm text-indigo-100">
              <li>{t.phone}</li>
              <li className="break-all">news@newsite.com.np</li>
              <li>{t.location}</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-indigo-200">
              {t.followUs}
            </h3>

            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white hover:text-(--primary-color)"
              >
                <FaFacebookF size={15} />
              </a>

              <a
                href="https://x.com"
                target="_blank"
                aria-label="X"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white hover:text-(--primary-color)"
              >
                <FaXTwitter size={15} />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white hover:text-(--primary-color)"
              >
                <FaYoutube size={16} />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white hover:text-(--primary-color)"
              >
                <FaInstagram size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-4 text-center text-sm text-white">
          © {new Date().getFullYear()} {t.title}. {t.copyright}
        </div>
      </div>
    </footer>
  );
}
