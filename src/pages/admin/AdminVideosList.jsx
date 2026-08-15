import { Link } from "react-router-dom";
import { useVideos } from "../../context/VideoContext";
import { youtubeThumbnailUrl } from "../../utils/youtube";
import { MdEdit, MdDeleteOutline } from "react-icons/md";

function AdminVideosList() {
  const { videos, deleteVideo } = useVideos();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">भिडियो व्यवस्थापन</h1>
          <p className="text-gray-500">जम्मा {videos.length} भिडियो</p>
        </div>
        <Link
          to="/admin/videos/new"
          className="px-4 py-2 rounded-md bg-(--primary-color) text-white text-sm font-medium hover:opacity-90"
        >
          + नयाँ भिडियो
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col"
          >
            <img
              src={youtubeThumbnailUrl(video.youtubeId)}
              alt={video.title}
              className="w-full h-36 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col">
              <p className="text-sm font-semibold text-gray-900 line-clamp-2 mb-3 flex-1">
                {video.title}
              </p>

              <div className="flex items-center justify-end gap-2 mt-auto">
                <Link
                  to={`/admin/videos/${video.id}/edit`}
                  className="p-2 rounded hover:bg-gray-100 text-gray-600"
                >
                  <MdEdit size={18} />
                </Link>
                <button
                  onClick={() => deleteVideo(video.id)}
                  className="p-2 rounded hover:bg-red-50 text-red-600 cursor-pointer"
                >
                  <MdDeleteOutline size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {videos.length === 0 && (
          <p className="text-gray-400 col-span-full text-center py-10">
            अहिलेसम्म कुनै भिडियो थपिएको छैन।
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminVideosList;
