import { Link } from "react-router-dom";
import { useAds } from "../../context/AdsContext";
import { MdEdit, MdDeleteOutline } from "react-icons/md";

const SLOT_LABELS = {
  "home-top": "गृहपृष्ठ - समाचार सूची माथि",
};

function AdminAdsList() {
  const { ads, updateAd, deleteAd } = useAds();

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
        {ads.map((ad) => (
          <div
            key={ad.id}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col"
          >
            <img
              src={ad.image}
              alt={ad.alt || "ad"}
              className="w-full h-32 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col">
              <p className="text-xs text-gray-400 mb-1">
                {SLOT_LABELS[ad.slot] || ad.slot}
              </p>
              <p className="text-sm text-gray-800 line-clamp-2 mb-3 flex-1">
                {ad.alt || "(कुनै विवरण छैन)"}
              </p>

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
                <Link
                  to={`/admin/ads/${ad.id}/edit`}
                  className="p-2 rounded hover:bg-gray-100 text-gray-600"
                >
                  <MdEdit size={18} />
                </Link>
                <button
                  onClick={() => deleteAd(ad.id)}
                  className="p-2 rounded hover:bg-red-50 text-red-600 cursor-pointer"
                >
                  <MdDeleteOutline size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {ads.length === 0 && (
          <p className="text-gray-400 col-span-full text-center py-10">
            अहिलेसम्म कुनै विज्ञापन थपिएको छैन।
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminAdsList;
