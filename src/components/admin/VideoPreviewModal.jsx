import { MdClose } from "react-icons/md";
import { youtubeEmbedUrl } from "../../utils/youtube";
import { fullDateTimeNe } from "../../utils/time";

function VideoPreviewModal({ video, onClose }) {
  if (!video) return null;

  const isPublished = video.published !== false;

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

          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-gray-100 text-gray-500 cursor-pointer"
            aria-label="बन्द गर्नुहोस्"
          >
            <MdClose size={20} />
          </button>
        </div>

        <div className="p-5">
          <div className="aspect-video w-full rounded-lg overflow-hidden border border-gray-100 mb-5">
            <iframe
              className="w-full h-full"
              src={youtubeEmbedUrl(video.youtubeId)}
              title={video.title}
              allowFullScreen
            />
          </div>

          <div className="flex items-center gap-2 mb-3">
            {video.category && (
              <span className="inline-block bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                {video.category}
              </span>
            )}
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {video.title || "(कुनै शीर्षक छैन)"}
          </h1>

          {(video.publishedAt || video.createdAt) && (
            <p className="text-sm text-gray-400 mb-5">
              {fullDateTimeNe(video)}
            </p>
          )}

          {video.description && (
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {video.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoPreviewModal;
