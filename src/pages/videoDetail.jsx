import { Link, useParams } from "react-router-dom";
import { useVideos } from "../context/VideoContext";
import { youtubeEmbedUrl } from "../utils/youtube";
import { displayTime, fullDateTimeNe } from "../utils/time";

import AdBanner from "../components/AdBanner";

function VideoDetail() {
  const { id } = useParams();
  const { getVideoById } = useVideos();
  const rawVideo = getVideoById(id);
  const video = rawVideo && rawVideo.published !== false ? rawVideo : null;

  if (!video) {
    return (
      <main className="min-h-screen container mx-auto mt-10 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">भिडियो फेला परेन</h1>
        <Link to="/videos" className="text-(--primary-color) underline">
          सबै भिडियोमा फर्कनुहोस्
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-6 min-h-screen">
      <section className="container mx-auto mt-12 flex flex-col xl:flex-row justify-center xl:gap-10 gap-6">
        <section className="px-4 py-6 lg:px-10 shadow-lg rounded-lg w-full border border-gray-50">
          <div className="aspect-video w-full rounded-lg overflow-hidden shadow-md mb-6">
            <iframe
              className="w-full h-full"
              src={youtubeEmbedUrl(video.youtubeId)}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {video.category && (
            <span className="inline-block bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded mb-3">
              {video.category}
            </span>
          )}

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {video.title}
          </h1>

          <p
            className="text-sm text-gray-400 mb-6"
            title={fullDateTimeNe(video)}
          >
            {displayTime(video)}
          </p>

          {video.description && (
            <p className="text-gray-600 leading-relaxed whitespace-pre-line mb-10">
              {video.description}
            </p>
          )}

          <Link to="/videos" className="text-(--primary-color) underline">
            ← सबै भिडियो
          </Link>
        </section>

        <aside>
          <AdBanner slot="home-side" page={"news"} />
        </aside>
      </section>
    </main>
  );
}

export default VideoDetail;
