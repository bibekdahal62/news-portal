import { useState } from "react";
import { Link } from "react-router-dom";
import { useGallery } from "../../context/GalleryContext";
import GalleryPreviewModal from "../../components/admin/GalleryPreviewModal";
import {
  MdEdit,
  MdDeleteOutline,
  MdVisibility,
  MdVisibilityOff,
  MdRemoveRedEye,
  MdImage,
} from "react-icons/md";

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
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            ग्यालरी व्यवस्थापन
          </h1>
          <p className="text-gray-500">जम्मा {albums.length} ग्यालरी</p>
        </div>
        <Link
          to="/admin/gallery/new"
          className="px-4 py-2 rounded-md bg-(--primary-color) text-white text-sm font-medium hover:opacity-90"
        >
          + नयाँ ग्यालरी
        </Link>
      </div>

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
                <span
                  className={`absolute top-2 left-2 text-[11px] font-medium px-2 py-0.5 rounded ${
                    isPublished
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-gray-100 text-gray-500 border border-gray-200"
                  }`}
                >
                  {isPublished ? "प्रकाशित" : "ड्राफ्ट"}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <p className="text-sm font-semibold text-gray-900 line-clamp-2 mb-3 flex-1">
                  {album.title || "(शीर्षक छैन)"}
                </p>

                <div className="flex items-center justify-end gap-1 mt-auto">
                  <button
                    onClick={() => setPreviewAlbum(album)}
                    className="p-2 rounded hover:bg-gray-100 text-gray-600 cursor-pointer"
                    title="पूर्वावलोकन"
                  >
                    <MdRemoveRedEye size={18} />
                  </button>
                  <button
                    onClick={() => togglePublish(album.id)}
                    className={
                      isPublished
                        ? "p-2 rounded hover:bg-gray-100 text-gray-600 cursor-pointer"
                        : "p-2 rounded hover:bg-green-50 text-green-600 cursor-pointer"
                    }
                    title={
                      isPublished ? "अप्रकाशित गर्नुहोस्" : "प्रकाशित गर्नुहोस्"
                    }
                  >
                    {isPublished ? (
                      <MdVisibilityOff size={18} />
                    ) : (
                      <MdVisibility size={18} />
                    )}
                  </button>
                  <Link
                    to={`/admin/gallery/${album.id}/edit`}
                    className="p-2 rounded hover:bg-gray-100 text-gray-600"
                    title="सम्पादन"
                  >
                    <MdEdit size={18} />
                  </Link>
                  <button
                    onClick={() => setConfirmId(album.id)}
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

        {albums.length === 0 && (
          <p className="text-gray-400 col-span-full text-center py-10">
            अहिलेसम्म कुनै ग्यालरी थपिएको छैन।
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
              के तपाईं यो ग्यालरी मेटाउन निश्चित हुनुहुन्छ? यसमा भएका सबै तस्बिर
              पनि हराउनेछन्। यो कार्य फिर्ता गर्न सकिँदैन।
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
