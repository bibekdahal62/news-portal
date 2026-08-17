import { useState } from "react";
import { MdClose } from "react-icons/md";
import { displayTime, fullDateTimeNe } from "../../utils/time";
import { localizeNews } from "../../utils/localize";

function NewsPreviewModal({ item, onClose }) {
  const [previewLang, setPreviewLang] = useState("ne");

  if (!item) return null;

  const article = localizeNews(item, previewLang);
  const body = article.content?.trim() ? article.content : article.description;
  const isPublished = item.published !== false;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-full overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-900">
              पूर्वावलोकन
            </span>
            <span
              className={
                isPublished
                  ? "text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded"
                  : "text-xs bg-gray-100 text-gray-500 border border-gray-200 px-2 py-0.5 rounded"
              }
            >
              {isPublished ? "प्रकाशित" : "ड्राफ्ट"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center rounded-full border border-gray-300 p-0.5 text-xs font-medium">
              <button
                type="button"
                onClick={() => setPreviewLang("ne")}
                className={`px-2.5 py-1 rounded-full ${
                  previewLang === "ne"
                    ? "bg-(--primary-color) text-white"
                    : "text-gray-500"
                }`}
              >
                नेपाली
              </button>
              <button
                type="button"
                onClick={() => setPreviewLang("en")}
                className={`px-2.5 py-1 rounded-full ${
                  previewLang === "en"
                    ? "bg-(--primary-color) text-white"
                    : "text-gray-500"
                }`}
              >
                EN
              </button>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded hover:bg-gray-100 text-gray-500 cursor-pointer"
              aria-label="बन्द गर्नुहोस्"
            >
              <MdClose size={20} />
            </button>
          </div>
        </div>

        <div className="p-5">
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
              <span className="text-gray-600 font-medium">
                {article.author}
              </span>
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
        </div>
      </div>
    </div>
  );
}

export default NewsPreviewModal;
