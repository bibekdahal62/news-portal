import { useState } from "react";
import { useAds } from "../../context/AdsContext";
import { AdPreviewModal } from "../../components/admin/PreviewModals";
import {
  SLOT_LABELS,
  getAdStatus,
  AD_STATUS_LABELS,
  AD_STATUS_STYLES,
} from "../../utils/ads";
import {
  PageHeader,
  ConfirmDialog,
  ItemActions,
  CheckboxField,
} from "../../components/admin/common";

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
      <PageHeader
        title="विज्ञापन व्यवस्थापन"
        subtitle={`जम्मा ${ads.length} विज्ञापन`}
        actionLabel="+ नयाँ विज्ञापन"
        actionTo="/admin/ads/new"
      />

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

                <div className="mb-2">
                  <CheckboxField
                    label="सक्रिय"
                    checked={ad.active}
                    onChange={(e) =>
                      updateAd(ad.id, { active: e.target.checked })
                    }
                  />
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
                  <CheckboxField
                    label="गृहपृष्ठ"
                    size="xs"
                    checked={ad.showOnHome !== false}
                    onChange={(e) =>
                      updateAd(ad.id, { showOnHome: e.target.checked })
                    }
                  />
                  <CheckboxField
                    label="समाचार पृष्ठ"
                    size="xs"
                    checked={ad.showOnNews !== false}
                    onChange={(e) =>
                      updateAd(ad.id, { showOnNews: e.target.checked })
                    }
                  />
                </div>

                <div className="mt-auto">
                  <ItemActions
                    onPreview={() => setPreviewAd(ad)}
                    editTo={`/admin/ads/${ad.id}/edit`}
                    onDelete={() => setConfirmId(ad.id)}
                  />
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

      <ConfirmDialog
        open={confirmId !== null}
        message="के तपाईं यो विज्ञापन मेटाउन निश्चित हुनुहुन्छ? यो कार्य फिर्ता गर्न सकिँदैन।"
        onCancel={() => setConfirmId(null)}
        onConfirm={() => handleDelete(confirmId)}
      />

      {previewAd && (
        <AdPreviewModal ad={previewAd} onClose={() => setPreviewAd(null)} />
      )}
    </div>
  );
}

export default AdminAdsList;
