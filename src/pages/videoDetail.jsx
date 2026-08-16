import { Link, useParams } from "react-router-dom";
import { useVideos } from "../context/VideoContext";
import { youtubeEmbedUrl } from "../utils/youtube";

import AdBanner from "../components/AdBanner";

function VideoDetail() {
  const { id } = useParams();
  const { getVideoById } = useVideos();
  const video = getVideoById(id);

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
        <section className="px-4 py-6 lg:px-10 shadow-lg rounded-lg w-full border border-gray-100">
          <div className="aspect-video w-full rounded-lg overflow-hidden shadow-md mb-6">
            <iframe
              className="w-full h-full"
              src={youtubeEmbedUrl(video.youtubeId)}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            {video.title}
          </h1>
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
          <AdBanner slot="home-side" />
        </aside>
      </section>
    </main>
  );
}

export default VideoDetail;
