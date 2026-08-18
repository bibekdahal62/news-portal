import { MdClose } from "react-icons/md";
import {
  SLOT_LABELS,
  getAdStatus,
  AD_STATUS_LABELS,
  AD_STATUS_STYLES,
} from "../../utils/ads";

function AdPreviewModal({ ad, onClose }) {
  if (!ad) return null;

  const status = getAdStatus(ad);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-full overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-900">
              विज्ञापन पूर्वावलोकन
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded ${AD_STATUS_STYLES[status]}`}
            >
              {AD_STATUS_LABELS[status]}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-gray-100 text-gray-500 cursor-pointer"
            aria-label="बन्द गर्नुहोस्"
          >
            <MdClose size={18} />
          </button>
        </div>

        <div className="p-5">
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
              <dd className="text-gray-800">
                {SLOT_LABELS[ad.slot] || ad.slot}
              </dd>
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
        </div>
      </div>
    </div>
  );
}

export default AdPreviewModal;
