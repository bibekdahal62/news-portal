import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useVideos } from "../../context/VideoContext";
import { useCategories } from "../../context/CategoryContext";
import { youtubeThumbnailUrl } from "../../utils/youtube";
import { displayTime } from "../../utils/time";
import VideoPreviewModal from "../../components/admin/VideoPreviewModal";
import {
  MdEdit,
  MdDeleteOutline,
  MdVisibility,
  MdVisibilityOff,
  MdRemoveRedEye,
} from "react-icons/md";

function AdminVideosList() {
  const { videos, deleteVideo, togglePublish } = useVideos();
  const { categories } = useCategories();

  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [confirmId, setConfirmId] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);

  const filtered = videos.filter((v) => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || (v.title || "").toLowerCase().includes(q);

    const matchesCategory =
      categoryFilter === "all" || v.category === categoryFilter;

    const isPublished = v.published !== false;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" && isPublished) ||
      (statusFilter === "draft" && !isPublished);

    return matchesQuery && matchesCategory && matchesStatus;
  });

  useEffect(() => {
    setPreviewVideo(null);
  }, [query, categoryFilter, statusFilter]);

  function handleDelete(id) {
    deleteVideo(id);
    setConfirmId(null);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            भिडियो व्यवस्थापन
          </h1>
          <p className="text-gray-500">
            जम्मा {videos.length} भिडियो मध्ये {filtered.length} देखाइँदै
          </p>
        </div>
        <Link
          to="/admin/videos/new"
          className="px-4 py-2 rounded-md bg-(--primary-color) text-white text-sm font-medium hover:opacity-90"
        >
          + नयाँ भिडियो
        </Link>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="शीर्षकद्वारा खोज्नुहोस्..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-sm border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color) text-sm"
        >
          <option value="all">सबै श्रेणी</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color) text-sm"
        >
          <option value="all">सबै स्थिति</option>
          <option value="published">प्रकाशित</option>
          <option value="draft">ड्राफ्ट</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((video) => {
          const isPublished = video.published !== false;

          return (
            <div
              key={video.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col"
            >
              <div className="relative">
                <img
                  src={youtubeThumbnailUrl(video.youtubeId)}
                  alt={video.title}
                  className="w-full h-36 object-cover"
                />
                <span
                  className={`absolute top-2 left-2 text-[11px] font-medium px-2 py-0.5 rounded ${
                    isPublished
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-gray-100 text-gray-500 border border-gray-200"
                  }`}
                >
                  {isPublished ? "प्रकाशित" : "ड्राफ्ट"}
                </span>
                {video.category && (
                  <span className="absolute top-2 right-2 bg-red-600 text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                    {video.category}
                  </span>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1 flex-1">
                  {video.title || "(शीर्षक छैन)"}
                </p>
                <p className="text-xs text-gray-400 mb-3">
                  {displayTime(video)}
                </p>

                <div className="flex items-center justify-end gap-1 mt-auto">
                  <button
                    onClick={() => setPreviewVideo(video)}
                    className="p-2 rounded hover:bg-gray-100 text-gray-600 cursor-pointer"
                    title="पूर्वावलोकन"
                  >
                    <MdRemoveRedEye size={18} />
                  </button>
                  <button
                    onClick={() => togglePublish(video.id)}
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
                    to={`/admin/videos/${video.id}/edit`}
                    className="p-2 rounded hover:bg-gray-100 text-gray-600"
                    title="सम्पादन"
                  >
                    <MdEdit size={18} />
                  </Link>
                  <button
                    onClick={() => setConfirmId(video.id)}
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

        {filtered.length === 0 && (
          <p className="text-gray-400 col-span-full text-center py-10">
            {videos.length === 0
              ? "अहिलेसम्म कुनै भिडियो थपिएको छैन।"
              : "कुनै भिडियो फेला परेन।"}
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
              के तपाईं यो भिडियो मेटाउन निश्चित हुनुहुन्छ? यो कार्य फिर्ता गर्न
              सकिँदैन।
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

      {previewVideo && (
        <VideoPreviewModal
          video={previewVideo}
          onClose={() => setPreviewVideo(null)}
        />
      )}
    </div>
  );
}

export default AdminVideosList;
