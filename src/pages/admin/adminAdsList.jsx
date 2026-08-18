import { Link } from "react-router-dom";
import { useState } from "react";
import { useAds } from "../../context/AdsContext";
import AdPreviewModal from "../../components/admin/AdPreviewModal";
import { MdEdit, MdDeleteOutline, MdRemoveRedEye } from "react-icons/md";
import {
  SLOT_LABELS,
  getAdStatus,
  AD_STATUS_LABELS,
  AD_STATUS_STYLES,
} from "../../utils/ads";

function AdminAdsList() {
  const { ads, updateAd, deleteAd } = useAds();
  const [confirmId, setConfirmId] = useState(null);
  const [previewAd, setPreviewAd] = useState(null);

  function handleDelete(id) {
    deleteAd(id);
    setConfirmId(null);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            विज्ञापन व्यवस्थापन
          </h1>
          <p className="text-gray-500">जम्मा {ads.length} विज्ञापन</p>
        </div>
        <Link
          to="/admin/ads/new"
          className="px-4 py-2 rounded-md bg-(--primary-color) text-white text-sm font-medium hover:opacity-90"
        >
          + नयाँ विज्ञापन
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ads.map((ad) => {
          const status = getAdStatus(ad);
          return (
            <div
              key={ad.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col"
            >
              <div className="relative">
                <img
                  src={ad.image}
                  alt={ad.alt || "ad"}
                  className="w-full h-32 object-cover"
                />
                <span
                  className={`absolute top-2 right-2 text-[10px] font-medium px-2 py-0.5 rounded ${AD_STATUS_STYLES[status]}`}
                >
                  {AD_STATUS_LABELS[status]}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-xs text-gray-400 mb-1">
                  {SLOT_LABELS[ad.slot] || ad.slot}
                </p>
                <p className="text-sm text-gray-800 line-clamp-2 mb-2 flex-1">
                  {ad.alt || "(कुनै विवरण छैन)"}
                </p>

                {(ad.startDate || ad.endDate) && (
                  <p className="text-xs text-gray-500 mb-3">
                    {ad.startDate || "…"} – {ad.endDate || "…"}
                  </p>
                )}

                <label className="flex items-center gap-2 text-sm text-gray-600 mb-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ad.active}
                    onChange={(e) =>
                      updateAd(ad.id, { active: e.target.checked })
                    }
                  />
                  सक्रिय
                </label>

                <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
                  <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={ad.showOnHome !== false}
                      onChange={(e) =>
                        updateAd(ad.id, { showOnHome: e.target.checked })
                      }
                    />
                    गृहपृष्ठ
                  </label>
                  <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={ad.showOnNews !== false}
                      onChange={(e) =>
                        updateAd(ad.id, { showOnNews: e.target.checked })
                      }
                    />
                    समाचार पृष्ठ
                  </label>
                </div>

                <div className="flex items-center justify-end gap-2 mt-auto">
                  <button
                    onClick={() => setPreviewAd(ad)}
                    className="p-2 rounded hover:bg-gray-100 text-gray-600 cursor-pointer"
                    title="पूर्वावलोकन"
                  >
                    <MdRemoveRedEye size={18} />
                  </button>
                  <Link
                    to={`/admin/ads/${ad.id}/edit`}
                    className="p-2 rounded hover:bg-gray-100 text-gray-600"
                    title="सम्पादन"
                  >
                    <MdEdit size={18} />
                  </Link>
                  <button
                    onClick={() => setConfirmId(ad.id)}
                    className="p-2 rounded hover:bg-red-50 text-red-600 cursor-pointer"
                    title="मेटाउनुहोस्"
                  >
                    <MdDeleteOutline size={18} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {ads.length === 0 && (
          <p className="text-gray-400 col-span-full text-center py-10">
            अहिलेसम्म कुनै विज्ञापन थपिएको छैन।
          </p>
        )}
      </div>

      {confirmId !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h3 className="font-semibold text-gray-900 mb-2">
              मेटाउने पुष्टि गर्नुहोस्
            </h3>
            <p className="text-sm text-gray-500 mb-5">
              के तपाईं यो विज्ञापन मेटाउन निश्चित हुनुहुन्छ? यो कार्य फिर्ता
              गर्न सकिँदैन।
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmId(null)}
                className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-50 cursor-pointer"
              >
                रद्द गर्नुहोस्
              </button>
              <button
                onClick={() => handleDelete(confirmId)}
                className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 cursor-pointer"
              >
                मेटाउनुहोस्
              </button>
            </div>
          </div>
        </div>
      )}

      {previewAd && (
        <AdPreviewModal ad={previewAd} onClose={() => setPreviewAd(null)} />
      )}
    </div>
  );
}

export default AdminAdsList;
