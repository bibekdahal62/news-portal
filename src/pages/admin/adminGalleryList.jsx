import { useState } from "react";
import { useGallery } from "../../context/GalleryContext";
import { GalleryPreviewModal } from "../../components/admin/PreviewModals";
import { MdImage } from "react-icons/md";
import {
  PageHeader,
  ConfirmDialog,
  StatusBadge,
  ItemActions,
} from "../../components/admin/common";

function AdminGalleryList() {
  const { albums, deleteAlbum, togglePublish, getCoverImage } = useGallery();
  const [confirmId, setConfirmId] = useState(null);
  const [previewAlbum, setPreviewAlbum] = useState(null);

  function handleDelete(id) {
    deleteAlbum(id);
    setConfirmId(null);
  }

  return (
    <div>
      <PageHeader
        title="ग्यालरी व्यवस्थापन"
        subtitle={`जम्मा ${albums.length} ग्यालरी`}
        actionLabel="+ नयाँ ग्यालरी"
        actionTo="/admin/gallery/new"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {albums.map((album) => {
          const isPublished = album.published !== false;
          const cover = getCoverImage(album);

          return (
            <div
              key={album.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col"
            >
              <div className="relative">
                {cover ? (
                  <img
                    src={cover.url}
                    alt={album.title}
                    className="w-full h-36 object-cover"
                  />
                ) : (
                  <div className="w-full h-36 bg-gray-100 flex items-center justify-center text-gray-300">
                    <MdImage size={32} />
                  </div>
                )}
                <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[11px] px-1.5 py-0.5 rounded">
                  {album.images?.length || 0} तस्बिर
                </span>
                <span className="absolute top-2 left-2">
                  <StatusBadge published={isPublished} variant="card" />
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <p className="text-sm font-semibold text-gray-900 line-clamp-2 mb-3 flex-1">
                  {album.title || "(शीर्षक छैन)"}
                </p>

                <div className="mt-auto">
                  <ItemActions
                    onPreview={() => setPreviewAlbum(album)}
                    isPublished={isPublished}
                    onTogglePublish={() => togglePublish(album.id)}
                    editTo={`/admin/gallery/${album.id}/edit`}
                    onDelete={() => setConfirmId(album.id)}
                  />
                </div>
              </div>
            </div>
          );
        })}

        {albums.length === 0 && (
          <p className="text-gray-400 col-span-full text-center py-10">
            अहिलेसम्म कुनै ग्यालरी थपिएको छैन।
          </p>
        )}
      </div>

      <ConfirmDialog
        open={confirmId !== null}
        message="के तपाईं यो ग्यालरी मेटाउन निश्चित हुनुहुन्छ? यसमा भएका सबै तस्बिर पनि हराउनेछन्। यो कार्य फिर्ता गर्न सकिँदैन।"
        onCancel={() => setConfirmId(null)}
        onConfirm={() => handleDelete(confirmId)}
      />

      {previewAlbum && (
        <GalleryPreviewModal
          album={previewAlbum}
          onClose={() => setPreviewAlbum(null)}
        />
      )}
    </div>
  );
}

export default AdminGalleryList;
