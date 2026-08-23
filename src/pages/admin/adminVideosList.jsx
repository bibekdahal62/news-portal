import { useEffect, useState } from "react";
import { useVideos } from "../../context/VideoContext";
import { useCategories } from "../../context/CategoryContext";
import { youtubeThumbnailUrl } from "../../utils/youtube";
import { displayTime } from "../../utils/time";
import { VideoPreviewModal } from "../../components/admin/PreviewModals";
import {
  PageHeader,
  ListFilterBar,
  ConfirmDialog,
  StatusBadge,
  ItemActions,
} from "../../components/admin/common";

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

  // Close any open preview when the filters change, otherwise it can be
  // left showing an item that's no longer in the filtered results.
  useEffect(() => {
    setPreviewVideo(null);
  }, [query, categoryFilter, statusFilter]);

  function handleDelete(id) {
    deleteVideo(id);
    setConfirmId(null);
  }

  return (
    <div>
      <PageHeader
        title="भिडियो व्यवस्थापन"
        subtitle={`जम्मा ${videos.length} भिडियो मध्ये ${filtered.length} देखाइँदै`}
        actionLabel="+ नयाँ भिडियो"
        actionTo="/admin/videos/new"
      />

      <ListFilterBar
        query={query}
        onQueryChange={setQuery}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        categories={categories}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

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
                <span className="absolute top-2 left-2">
                  <StatusBadge published={isPublished} variant="card" />
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

                <div className="mt-auto">
                  <ItemActions
                    onPreview={() => setPreviewVideo(video)}
                    isPublished={isPublished}
                    onTogglePublish={() => togglePublish(video.id)}
                    editTo={`/admin/videos/${video.id}/edit`}
                    onDelete={() => setConfirmId(video.id)}
                  />
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

      <ConfirmDialog
        open={confirmId !== null}
        message="के तपाईं यो भिडियो मेटाउन निश्चित हुनुहुन्छ? यो कार्य फिर्ता गर्न सकिँदैन।"
        onCancel={() => setConfirmId(null)}
        onConfirm={() => handleDelete(confirmId)}
      />

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
