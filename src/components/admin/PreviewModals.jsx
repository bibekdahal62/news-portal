import { useState } from "react";
import { MdClose, MdStar } from "react-icons/md";
import { displayTime, fullDateTimeNe } from "../../utils/time";
import { localizeNews, localizeAlbum } from "../../utils/localize";
import { youtubeEmbedUrl } from "../../utils/youtube";
import {
  SLOT_LABELS,
  getAdStatus,
  AD_STATUS_LABELS,
  AD_STATUS_STYLES,
} from "../../utils/ads";

/**
 * News, Ads, Gallery and Videos each had their own "preview" popup that
 * used to live in its own file, but all four were really the same dialog
 * (dark backdrop, white card, sticky header with a close button, scrollable
 * body) with different content inside. They're kept together here so the
 * shared bits — the shell, the published/draft pill, the ने/EN toggle —
 * only need to be written once.
 *
 * The four components below are still exported individually and used the
 * same way as before: <NewsPreviewModal item={..} onClose={..} />, etc.
 */

// --- shared bits -----------------------------------------------------

// The outer card + sticky header every preview modal sits inside.
// `badge` is whatever status pill a given modal wants to show (published/
// draft, or the ad's own active/scheduled/expired status), and
// `headerExtra` is for anything else that needs to sit in the header,
// like the language toggle.
function ModalShell({
  title = "पूर्वावलोकन",
  badge,
  headerExtra,
  maxWidth = "max-w-2xl",
  onClose,
  children,
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4 py-8">
      <div
        className={`bg-white rounded-lg shadow-lg w-full ${maxWidth} max-h-full overflow-y-auto`}
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-900">
              {title}
            </span>
            {badge}
          </div>

          <div className="flex items-center gap-3">
            {headerExtra}
            <button
              onClick={onClose}
              className="p-1.5 rounded hover:bg-gray-100 text-gray-500 cursor-pointer"
              aria-label="बन्द गर्नुहोस्"
            >
              <MdClose size={20} />
            </button>
          </div>
        </div>

        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

// The green "प्रकाशित" / gray "ड्राफ्ट" pill — News, Gallery and Videos
// previews all show one of these next to the modal title.
function PublishBadge({ isPublished }) {
  return (
    <span
      className={
        isPublished
          ? "text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded"
          : "text-xs bg-gray-100 text-gray-500 border border-gray-200 px-2 py-0.5 rounded"
      }
    >
      {isPublished ? "प्रकाशित" : "ड्राफ्ट"}
    </span>
  );
}

// The नेपाली/EN pill-toggle used by News and Gallery to preview content
// in either language.
function LangToggle({ lang, onChange }) {
  return (
    <div className="inline-flex items-center rounded-full border border-gray-300 p-0.5 text-xs font-medium">
      <button
        type="button"
        onClick={() => onChange("ne")}
        className={`px-2.5 py-1 rounded-full ${
          lang === "ne" ? "bg-(--primary-color) text-white" : "text-gray-500"
        }`}
      >
        नेपाली
      </button>
      <button
        type="button"
        onClick={() => onChange("en")}
        className={`px-2.5 py-1 rounded-full ${
          lang === "en" ? "bg-(--primary-color) text-white" : "text-gray-500"
        }`}
      >
        EN
      </button>
    </div>
  );
}

// --- News --------------------------------------------------------------

export function NewsPreviewModal({ item, onClose }) {
  const [previewLang, setPreviewLang] = useState("ne");

  if (!item) return null;

  const article = localizeNews(item, previewLang);
  const body = article.content?.trim() ? article.content : article.description;
  const isPublished = item.published !== false;

  return (
    <ModalShell
      badge={<PublishBadge isPublished={isPublished} />}
      headerExtra={<LangToggle lang={previewLang} onChange={setPreviewLang} />}
      onClose={onClose}
    >
      {article.image && (
        <img
          src={article.image}
          alt={article.headline}
          className="w-full max-h-72 object-cover rounded-lg mb-5"
        />
      )}

      <div className="flex items-center gap-2 mb-3">
        <span className="inline-block bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
          {article.category}
        </span>
        {article.isBreaking && (
          <span className="inline-block bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded">
            ब्रेकिङ
          </span>
        )}
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        {article.headline || "(कुनै शीर्षक छैन)"}
      </h1>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-400 mb-5">
        {article.author && (
          <span className="text-gray-600 font-medium">{article.author}</span>
        )}
        <span title={fullDateTimeNe(article)}>{displayTime(article)}</span>
      </div>

      <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">
        {body || "(कुनै विवरण छैन)"}
      </p>

      {Array.isArray(article.tags) && article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </ModalShell>
  );
}

// --- Ads -----------------------------------------------------------------

export function AdPreviewModal({ ad, onClose }) {
  if (!ad) return null;

  const status = getAdStatus(ad);

  return (
    <ModalShell
      title="विज्ञापन पूर्वावलोकन"
      badge={
        <span
          className={`text-xs px-2 py-0.5 rounded ${AD_STATUS_STYLES[status]}`}
        >
          {AD_STATUS_LABELS[status]}
        </span>
      }
      maxWidth="max-w-md"
      onClose={onClose}
    >
      {/* Mimics how the ad slot renders on the public site */}
      <a
        href={ad.link || "#"}
        target="_blank"
        rel="noreferrer"
        className="block rounded-lg overflow-hidden border border-gray-200"
        onClick={(e) => !ad.link && e.preventDefault()}
      >
        <img
          src={ad.image}
          alt={ad.alt || "ad preview"}
          className="w-full h-40 object-cover"
          onError={(e) => (e.target.style.display = "none")}
        />
      </a>
      <p className="text-[10px] uppercase tracking-wide text-gray-400 mt-1">
        विज्ञापन (Advertisement)
      </p>

      <dl className="mt-4 text-sm divide-y divide-gray-100 border-t border-gray-100">
        <div className="flex justify-between py-2">
          <dt className="text-gray-500">स्थान</dt>
          <dd className="text-gray-800">{SLOT_LABELS[ad.slot] || ad.slot}</dd>
        </div>
        <div className="flex justify-between py-2">
          <dt className="text-gray-500">लिंक</dt>
          <dd className="text-gray-800 truncate max-w-60 text-right">
            {ad.link || "—"}
          </dd>
        </div>
        <div className="flex justify-between py-2">
          <dt className="text-gray-500">सुरु मिति</dt>
          <dd className="text-gray-800">{ad.startDate || "—"}</dd>
        </div>
        <div className="flex justify-between py-2">
          <dt className="text-gray-500">अन्त्य मिति</dt>
          <dd className="text-gray-800">{ad.endDate || "—"}</dd>
        </div>
        <div className="flex justify-between py-2">
          <dt className="text-gray-500">देखिने ठाउँ</dt>
          <dd className="text-gray-800 text-right">
            {[
              ad.showOnHome !== false && "गृहपृष्ठ",
              ad.showOnNews !== false && "समाचार पृष्ठ",
            ]
              .filter(Boolean)
              .join(", ") || "—"}
          </dd>
        </div>
      </dl>
    </ModalShell>
  );
}

// --- Gallery ---------------------------------------------------------------

export function GalleryPreviewModal({ album, onClose }) {
  const [previewLang, setPreviewLang] = useState("ne");

  if (!album) return null;

  const localized = localizeAlbum(album, previewLang);
  const isPublished = album.published !== false;
  const cover =
    localized.images?.find((img) => img.id === localized.coverImageId) ||
    localized.images?.[0];

  return (
    <ModalShell
      badge={<PublishBadge isPublished={isPublished} />}
      headerExtra={<LangToggle lang={previewLang} onChange={setPreviewLang} />}
      onClose={onClose}
    >
      {cover && (
        <img
          src={cover.url}
          alt={localized.title}
          className="w-full max-h-72 object-cover rounded-lg mb-5"
        />
      )}

      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        {localized.title || "(कुनै शीर्षक छैन)"}
      </h1>

      {localized.description && (
        <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-5">
          {localized.description}
        </p>
      )}

      <p className="text-xs text-gray-400 mb-3">
        जम्मा {localized.images?.length || 0} तस्बिर
      </p>

      {localized.images?.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {localized.images.map((img) => (
            <div key={img.id} className="relative">
              <img
                src={img.url}
                alt={img.caption || ""}
                className="w-full h-28 object-cover rounded"
              />
              {img.id === localized.coverImageId && (
                <span className="absolute top-1 left-1 bg-(--primary-color) text-white rounded-full p-1">
                  <MdStar size={12} />
                </span>
              )}
              {img.caption && (
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {img.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </ModalShell>
  );
}

// --- Videos ------------------------------------------------------------

export function VideoPreviewModal({ video, onClose }) {
  if (!video) return null;

  const isPublished = video.published !== false;

  return (
    <ModalShell badge={<PublishBadge isPublished={isPublished} />} onClose={onClose}>
      <div className="aspect-video w-full rounded-lg overflow-hidden border border-gray-100 mb-5">
        <iframe
          className="w-full h-full"
          src={youtubeEmbedUrl(video.youtubeId)}
          title={video.title}
          allowFullScreen
        />
      </div>

      <div className="flex items-center gap-2 mb-3">
        {video.category && (
          <span className="inline-block bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
            {video.category}
          </span>
        )}
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        {video.title || "(कुनै शीर्षक छैन)"}
      </h1>

      {(video.publishedAt || video.createdAt) && (
        <p className="text-sm text-gray-400 mb-5">{fullDateTimeNe(video)}</p>
      )}

      {video.description && (
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {video.description}
        </p>
      )}
    </ModalShell>
  );
}
