import { Link } from "react-router-dom";
import { useVideos } from "../context/VideoContext";
import { youtubeThumbnailUrl } from "../utils/youtube";
import { FaPlay } from "react-icons/fa";

import AdBanner from "../components/AdBanner";

function VideosPage() {
  const { videos } = useVideos();

  return (
    <main className="mx-6 min-h-screen mt-12">
      <div className="container mx-auto mb-10">
        <AdBanner slot="home-top" />
      </div>
      <section className="container mx-auto mt-12 flex flex-col xl:flex-row justify-center xl:gap-10 gap-6">
        <section className="px-4 py-6 lg:px-10 shadow-lg rounded-lg w-full border border-gray-100">
          <h1 className="text-3xl font-bold mb-8">भिडियो</h1>

          {videos.length === 0 && (
            <p className="text-gray-400 text-center py-20">
              अहिलेसम्म कुनै भिडियो प्रकाशित गरिएको छैन।
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {videos.map((video) => (
              <Link
                key={video.id}
                to={`/videos/${video.id}`}
                className="block bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden no-underline hover:no-underline group hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img
                    src={youtubeThumbnailUrl(video.youtubeId)}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                      <FaPlay
                        className="text-(--primary-color) ml-1"
                        size={20}
                      />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <aside>
          <AdBanner slot="home-side" page={"news"} />
        </aside>
      </section>
    </main>
  );
}

export default VideosPage;
