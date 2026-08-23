import { createContext, useContext, useState } from "react";
import { extractYouTubeId } from "../utils/youtube";

const VideoContext = createContext();

// In-memory only for this session — no localStorage, no backend. Videos
// added/edited by the admin work immediately but are lost on refresh.
export function VideoProvider({ children }) {
  const [videos, setVideos] = useState([]);

  // `videos` (raw, everything) is for the admin panel, which needs to see
  // and manage drafts/unpublished videos too. `publishedVideos` is what
  // every public-facing page/component should read from instead.
  const publishedVideos = videos.filter((v) => v.published !== false);

  function addVideo({ youtubeUrl, ...rest }) {
    const youtubeId = extractYouTubeId(youtubeUrl);
    if (!youtubeId) throw new Error("त्यो मान्य YouTube लिंक होइन।");

    const id = videos.length ? Math.max(...videos.map((v) => v.id)) + 1 : 1;
    const item = {
      id,
      youtubeUrl,
      youtubeId,
      category: "",
      published: true,
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      ...rest,
    };
    setVideos((prev) => [item, ...prev]);
    return item;
  }

  function updateVideo(id, updates) {
    let youtubeId;
    if (updates.youtubeUrl) {
      youtubeId = extractYouTubeId(updates.youtubeUrl);
      if (!youtubeId) throw new Error("त्यो मान्य YouTube लिंक होइन।");
    }

    setVideos((prev) =>
      prev.map((v) =>
        v.id === id
          ? {
              ...v,
              ...updates,
              ...(youtubeId ? { youtubeId } : {}),
              updatedAt: new Date().toISOString(),
            }
          : v,
      ),
    );
  }

  function deleteVideo(id) {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  }

  // Flips published <-> unpublished for one video.
  function togglePublish(id) {
    setVideos((prev) =>
      prev.map((v) =>
        v.id === id
          ? {
              ...v,
              published: !(v.published !== false),
              updatedAt: new Date().toISOString(),
            }
          : v,
      ),
    );
  }

  // Looks up by id across ALL videos (published or not) - the admin edit
  // form needs this to load drafts too. Public pages that use this
  // (videoDetail) are responsible for checking `.published` themselves so
  // an unpublished video's direct URL doesn't leak its content.
  function getVideoById(id) {
    return videos.find((v) => String(v.id) === String(id));
  }

  return (
    <VideoContext.Provider
      value={{
        videos,
        publishedVideos,
        addVideo,
        updateVideo,
        deleteVideo,
        togglePublish,
        getVideoById,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export function useVideos() {
  return useContext(VideoContext);
}
