import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import { useNews } from "../context/NewsContext";
import { useLang } from "../context/LanguageContext";
import { localizeNews } from "../utils/localize";
import { displayTime, fullDateTimeNe, formatViewsNe } from "../utils/time";

import AdBanner from "../components/AdBanner";

// Font Awesome 5
import { FaFacebookF, FaWhatsapp, FaShareAlt } from "react-icons/fa";

// Font Awesome 6
import { FaXTwitter } from "react-icons/fa6";

function NewsDetail() {
  const { id } = useParams();
  const { getNewsById, loading } = useNews();
  const { lang } = useLang();

  // ==========================================
  // IMAGE POPUP STATE
  // ==========================================

  const [showImage, setShowImage] = useState(false);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return <p className="text-center mt-10">लोड हुँदैछ...</p>;
  }

  // ==========================================
  // GET ARTICLE
  // ==========================================

  const rawArticle = getNewsById(id);

  if (!rawArticle || rawArticle.published === false) {
    return (
      <main className="min-h-screen container mx-auto mt-10 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">समाचार फेला परेन</h1>

        <Link to="/" className="text-(--primary-color) underline">
          गृहपृष्ठमा फर्कनुहोस्
        </Link>
      </main>
    );
  }

  const article = localizeNews(rawArticle, lang);

  // Older/admin-added items may not have a separate long-form `content`
  // yet; fall back to the short description so the page never renders blank.
  const body = article.content?.trim() ? article.content : article.description;

  // ==========================================
  // CURRENT ARTICLE URL
  // ==========================================

  const shareUrl = window.location.href;

  // ==========================================
  // SHARE FUNCTION
  // ==========================================

  const handleShare = async (platform) => {
    const title = article.headline;

    const shareText = `${title}\n\n${shareUrl}`;

    // ========================================
    // NATIVE SHARE
    // ========================================

    if (platform === "native") {
      if (navigator.share) {
        try {
          await navigator.share({
            title: title,
            text: title,
            url: shareUrl,
          });
        } catch (error) {
          // User cancelled sharing
          console.log("Share cancelled");
        }
      } else {
        // Fallback if browser does not support navigator.share
        try {
          await navigator.clipboard.writeText(shareUrl);

          alert("समाचारको लिंक कपी भयो!");
        } catch (error) {
          alert("लिंक कपी गर्न सकिएन!");
        }
      }

      return;
    }

    // ========================================
    // FACEBOOK SHARE
    // ========================================

    if (platform === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl,
        )}`,
        "_blank",
        "width=600,height=500",
      );

      return;
    }

    // ========================================
    // X / TWITTER SHARE
    // ========================================

    if (platform === "x") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title,
        )}&url=${encodeURIComponent(shareUrl)}`,
        "_blank",
        "width=600,height=500",
      );

      return;
    }

    // ========================================
    // WHATSAPP SHARE
    // ========================================

    if (platform === "whatsapp") {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(shareText)}`,
        "_blank",
      );

      return;
    }
  };

  // ==========================================
  // JSX
  // ==========================================

  return (
    <main className="min-h-screen mx-6">
      {/* ==========================================
          ARTICLE + SIDE AD
      =========================================== */}

      <section
        className="
          container
          mx-auto
          mt-12
          flex
          flex-col
          xl:flex-row
          justify-center
          xl:gap-10
          gap-6
        "
      >
        {/* ==========================================
            NEWS ARTICLE CARD
        =========================================== */}

        <section
          className="
            shadow-lg
            w-full
            rounded-lg
            py-6
            px-4
            lg:px-10
            border
            border-gray-100
          "
        >
          {/* ==========================================
              NEWS IMAGE
          =========================================== */}

          <div className="block mt-4 mb-6">
            <img
              src={article.image}
              alt={article.headline}
              onClick={() => setShowImage(true)}
              title="तस्बिर खोल्नुहोस्"
              className="
                w-full
                max-h-[500px]
                object-cover
                rounded-lg
                cursor-zoom-in
                hover:opacity-95
                transition
              "
            />
          </div>

          {/* ==========================================
              CATEGORY + BREAKING
          =========================================== */}

          <div className="flex items-center gap-2 mb-3">
            {/* Category */}

            <span
              className="
                inline-block
                bg-red-600
                text-white
                text-xs
                font-semibold
                px-2
                py-1
                rounded
              "
            >
              {article.category}
            </span>

            {/* Breaking */}

            {article.isBreaking && (
              <span
                className="
                  inline-block
                  bg-yellow-400
                  text-gray-900
                  text-xs
                  font-bold
                  px-2
                  py-1
                  rounded
                "
              >
                ब्रेकिङ
              </span>
            )}
          </div>

          {/* ==========================================
              HEADLINE
          =========================================== */}

          <h1
            className="
              text-3xl
              font-bold
              text-gray-900
              mb-2
            "
          >
            {article.headline}
          </h1>

          {/* ==========================================
              AUTHOR + EXISTING TIME + VIEWS
          =========================================== */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-x-3
              gap-y-1
              text-sm
              text-gray-400
              mb-6
            "
          >
            {/* Author */}

            {article.author && (
              <span
                className="
                  text-gray-600
                  font-medium
                "
              >
                {article.author}
              </span>
            )}

            {/* EXISTING TIME */}

            <span title={fullDateTimeNe(article)}>{displayTime(article)}</span>

            {/* EXISTING VIEWS */}

            {typeof article.views === "number" && article.views > 0 && (
              <span>{formatViewsNe(article.views)} पटक हेरिएको</span>
            )}
          </div>

          {/* ==========================================
              SHARE BUTTONS
          =========================================== */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
              mb-6
            "
          >
            {/* ========================================
                NATIVE SHARE
            ========================================= */}

            <button
              type="button"
              onClick={() => handleShare("native")}
              aria-label="समाचार शेयर गर्नुहोस्"
              className="
                flex
                items-center
                gap-2
                bg-gray-600
                hover:bg-gray-700
                text-white
                px-3
                py-2
                rounded-md
                text-sm
                transition
              "
            >
              <FaShareAlt />

              <span>Share</span>
            </button>
          </div>

          {/* ==========================================
              ARTICLE CONTENT
          =========================================== */}

          <p
            className="
              text-gray-700
              leading-relaxed
              whitespace-pre-line
              mb-6
            "
          >
            {body}
          </p>

          {/* ==========================================
              TAGS
          =========================================== */}

          {Array.isArray(article.tags) && article.tags.length > 0 && (
            <div
              className="
                  flex
                  flex-wrap
                  gap-2
                  mb-10
                "
            >
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="
                      text-xs
                      bg-gray-100
                      text-gray-600
                      px-2
                      py-1
                      rounded
                    "
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* ==========================================
              BACK TO HOME
          =========================================== */}

          <Link to="/" className="text-(--primary-color) underline">
            {lang === "en" ? "← Back to home" : "← गृहपृष्ठमा फर्कनुहोस्"}
          </Link>
        </section>

        {/* ==========================================
            SIDE AD
        =========================================== */}

        <aside>
          <AdBanner slot="home-side" />
        </aside>
      </section>

      {/* ==================================================
          IMAGE LIGHTBOX / POPUP
      =================================================== */}

      {showImage && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            bg-black/80
            flex
            items-center
            justify-center
            p-4
          "
          onClick={() => setShowImage(false)}
        >
          {/* ========================================
              CLOSE BUTTON
          ========================================= */}

          <button
            type="button"
            onClick={() => setShowImage(false)}
            aria-label="Close image"
            className="
              absolute
              top-5
              right-5
              w-10
              h-10
              rounded-full
              bg-white
              text-black
              text-3xl
              font-bold
              flex
              items-center
              justify-center
              hover:bg-gray-200
              transition
              z-[10000]
            "
          >
            ×
          </button>

          {/* ========================================
              FULL IMAGE
          ========================================= */}

          <img
            src={article.image}
            alt={article.headline}
            onClick={(event) => event.stopPropagation()}
            className="
              max-w-full
              max-h-[90vh]
              object-contain
              rounded-lg
              shadow-2xl
            "
          />
        </div>
      )}
    </main>
  );
}

export default NewsDetail;
