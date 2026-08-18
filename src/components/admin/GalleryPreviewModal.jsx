import { useState } from "react";
import { MdClose, MdStar } from "react-icons/md";
import { localizeAlbum } from "../../utils/localize";

function GalleryPreviewModal({ album, onClose }) {
  const [previewLang, setPreviewLang] = useState("ne");

  if (!album) return null;

  const localized = localizeAlbum(album, previewLang);
  const isPublished = album.published !== false;
  const cover =
    localized.images?.find((img) => img.id === localized.coverImageId) ||
    localized.images?.[0];

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
        </div>
      </div>
    </div>
  );
}

export default GalleryPreviewModal;
