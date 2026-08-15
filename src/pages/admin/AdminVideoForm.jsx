import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useVideos } from "../../context/VideoContext";
import { extractYouTubeId, youtubeEmbedUrl } from "../../utils/youtube";

const EMPTY_FORM = { title: "", youtubeUrl: "", description: "" };

function AdminVideoForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { getVideoById, addVideo, updateVideo } = useVideos();

  const existing = isEdit ? getVideoById(id) : null;
  const [form, setForm] = useState(existing ? { ...EMPTY_FORM, ...existing } : EMPTY_FORM);
  const [errorMsg, setErrorMsg] = useState("");

  if (isEdit && !existing) {
    return (
      <div>
        <p className="text-gray-500">यो भिडियो फेला परेन।</p>
        <Link to="/admin/videos" className="text-(--primary-color) underline">
          भिडियो सूचीमा फर्कनुहोस्
        </Link>
      </div>
    );
  }

  const previewId = extractYouTubeId(form.youtubeUrl);

  function handleChange(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    if (!form.title.trim() || !form.youtubeUrl.trim()) {
      setErrorMsg("कृपया शीर्षक र YouTube लिंक भर्नुहोस्।");
      return;
    }

    try {
      if (isEdit) {
        updateVideo(existing.id, form);
      } else {
        addVideo(form);
      }
      navigate("/admin/videos");
    } catch (err) {
      setErrorMsg(err.message);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {isEdit ? "भिडियो सम्पादन" : "नयाँ भिडियो थप्नुहोस्"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 max-w-2xl flex flex-col gap-4"
      >
        {errorMsg && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded px-3 py-2">
            {errorMsg}
          </p>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">शीर्षक</label>
          <input
            type="text"
            value={form.title}
            onChange={handleChange("title")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">YouTube लिंक</label>
          <input
            type="url"
            value={form.youtubeUrl}
            onChange={handleChange("youtubeUrl")}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)"
          />

          {form.youtubeUrl && !previewId && (
            <p className="mt-1 text-xs text-amber-600">
              यो मान्य YouTube लिंक जस्तो देखिँदैन।
            </p>
          )}

          {previewId && (
            <div className="mt-3 aspect-video w-full rounded overflow-hidden border border-gray-100">
              <iframe
                className="w-full h-full"
                src={youtubeEmbedUrl(previewId)}
                title="preview"
                allowFullScreen
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">विवरण (वैकल्पिक)</label>
          <textarea
            value={form.description}
            onChange={handleChange("description")}
            rows={4}
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-md bg-(--primary-color) text-white text-sm font-medium hover:opacity-90 cursor-pointer"
          >
            {isEdit ? "अपडेट गर्नुहोस्" : "थप्नुहोस्"}
          </button>
          <Link
            to="/admin/videos"
            className="px-5 py-2.5 rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50"
          >
            रद्द गर्नुहोस्
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AdminVideoForm;
