import { createContext, useContext, useState } from "react";
import { extractYouTubeId } from "../utils/youtube";

const VideoContext = createContext();

// In-memory only for this session — no localStorage, no backend. Videos
// added/edited by the admin work immediately but are lost on refresh.
export function VideoProvider({ children }) {
  const [videos, setVideos] = useState([]);

  function addVideo({ youtubeUrl, ...rest }) {
    const youtubeId = extractYouTubeId(youtubeUrl);
    if (!youtubeId) throw new Error("त्यो मान्य YouTube लिंक होइन।");

    const id = videos.length ? Math.max(...videos.map((v) => v.id)) + 1 : 1;
    const item = {
      id,
      youtubeUrl,
      youtubeId,
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
        v.id === id ? { ...v, ...updates, ...(youtubeId ? { youtubeId } : {}) } : v,
      ),
    );
  }

  function deleteVideo(id) {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  }

  function getVideoById(id) {
    return videos.find((v) => String(v.id) === String(id));
  }

  return (
    <VideoContext.Provider
      value={{ videos, addVideo, updateVideo, deleteVideo, getVideoById }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export function useVideos() {
  return useContext(VideoContext);
}
