import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useGallery, nextImageId } from "../../context/GalleryContext";
import { fileToDataUrl } from "../../utils/file";
import {
  MdDeleteOutline,
  MdArrowUpward,
  MdArrowDownward,
  MdStar,
  MdStarBorder,
  MdDragIndicator,
  MdRemoveRedEye,
} from "react-icons/md";
import { GalleryPreviewModal } from "../../components/admin/PreviewModals";

const EMPTY_FORM = {
  title: "",
  title_en: "",
  description: "",
  description_en: "",
  published: true,
};

function AdminGalleryForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { getAlbumById, addAlbum, updateAlbum } = useGallery();

  const existing = isEdit ? getAlbumById(id) : null;
  const [form, setForm] = useState(
    existing ? { ...EMPTY_FORM, ...existing } : EMPTY_FORM,
  );
  const [images, setImages] = useState(existing?.images || []);
  const [coverImageId, setCoverImageId] = useState(
    existing?.coverImageId ?? existing?.images?.[0]?.id ?? null,
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("ne"); // "ne" | "en"
  const [dragIndex, setDragIndex] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  if (isEdit && !existing) {
    return (
      <div>
        <p className="text-gray-500">यो ग्यालरी फेला परेन।</p>
        <Link to="/admin/gallery" className="text-(--primary-color) underline">
          ग्यालरी सूचीमा फर्कनुहोस्
        </Link>
      </div>
    );
  }

  function handleChange(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleCheckbox(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.checked }));
  }

  // Reads every selected file, converts each to a data URL, and appends
  // them as new image entries. Runs sequentially-safe via Promise.all;
  // one bad file (non-image) shows an error but doesn't block the rest.
  async function handleImagesChange(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setErrorMsg("");
    setUploading(true);
    try {
      const results = await Promise.allSettled(files.map(fileToDataUrl));

      setImages((prev) => {
        let nextId = nextImageId(prev);
        const added = [];
        results.forEach((res) => {
          if (res.status === "fulfilled") {
            added.push({
              id: nextId++,
              url: res.value,
              caption: "",
              caption_en: "",
            });
          }
        });
        const updated = [...prev, ...added];

        // First images uploaded to an empty album become the cover by
        // default so the admin doesn't have to remember to pick one.
        setCoverImageId((c) => c ?? added[0]?.id ?? null);

        return updated;
      });

      const failed = results.filter((r) => r.status === "rejected");
      if (failed.length) {
        setErrorMsg(
          `${failed.length} फाइल थप्न सकिएन (तस्बिर फाइल मात्र मान्य छ)।`,
        );
      }
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function updateImageField(imgId, field, value) {
    setImages((prev) =>
      prev.map((img) => (img.id === imgId ? { ...img, [field]: value } : img)),
    );
  }

  function removeImage(imgId) {
    setImages((prev) => {
      const updated = prev.filter((img) => img.id !== imgId);
      setCoverImageId((c) => (c === imgId ? (updated[0]?.id ?? null) : c));
      return updated;
    });
  }

  function moveImage(index, direction) {
    setImages((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const updated = [...prev];
      [updated[index], updated[target]] = [updated[target], updated[index]];
      return updated;
    });
  }

  function reorderTo(fromIndex, toIndex) {
    if (fromIndex === toIndex) return;
    setImages((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    if (!form.title.trim()) {
      setActiveTab("ne");
      setErrorMsg("कृपया ग्यालरीको शीर्षक भर्नुहोस्।");
      return;
    }
    if (images.length === 0) {
      setErrorMsg("कृपया कम्तीमा एउटा तस्बिर थप्नुहोस्।");
      return;
    }

    const payload = { ...form, images, coverImageId };

    if (isEdit) {
      updateAlbum(existing.id, payload);
    } else {
      addAlbum(payload);
    }
    navigate("/admin/gallery");
  }

  const tabBtnClass = (tab) =>
    `px-4 py-2 text-sm font-medium border-b-2 -mb-px cursor-pointer ${
      activeTab === tab
        ? "border-(--primary-color) text-(--primary-color)"
        : "border-transparent text-gray-500 hover:text-gray-700"
    }`;

  const previewAlbum = { ...form, images, coverImageId, id: existing?.id };

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? "ग्यालरी सम्पादन" : "नयाँ ग्यालरी थप्नुहोस्"}
        </h1>
        <button
          type="button"
          onClick={() => setShowPreview(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50 cursor-pointer"
        >
          <MdRemoveRedEye size={18} />
          पूर्वावलोकन
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 max-w-3xl flex flex-col gap-4"
      >
        {errorMsg && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded px-3 py-2">
            {errorMsg}
          </p>
        )}

        {/* Language tabs: Nepali is required/primary, English is optional. */}
        <div>
          <div className="flex border-b border-gray-200 mb-4">
            <button
              type="button"
              onClick={() => setActiveTab("ne")}
              className={tabBtnClass("ne")}
            >
              नेपाली *
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("en")}
              className={tabBtnClass("en")}
            >
              English
            </button>
          </div>

          {activeTab === "ne" && (
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  शीर्षक
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={handleChange("title")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  विवरण (वैकल्पिक)
                </label>
                <textarea
                  value={form.description}
                  onChange={handleChange("description")}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)"
                />
              </div>
            </div>
          )}

          {activeTab === "en" && (
            <div className="flex flex-col gap-4">
              <p className="text-xs text-gray-400 -mt-1">
                Optional — if left blank, the site falls back to the Nepali
                text.
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={form.title_en}
                  onChange={handleChange("title_en")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={form.description_en}
                  onChange={handleChange("description_en")}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)"
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={form.published}
              onChange={handleCheckbox("published")}
              className="rounded border-gray-300 text-(--primary-color) focus:ring-(--primary-color)"
            />
            प्रकाशित गर्नुहोस् (अनचेक गरे ड्राफ्टमा रहन्छ, सार्वजनिक पृष्ठमा
            देखिँदैन)
          </label>
        </div>

        <hr className="border-gray-100" />

        {/* Images: upload area + reorderable/captionable grid */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            तस्बिरहरू
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImagesChange}
            disabled={uploading}
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color) file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-(--primary-color) file:text-white file:text-sm file:font-medium file:cursor-pointer cursor-pointer disabled:opacity-60"
          />
          <p className="text-xs text-gray-400 mt-1">
            धेरै तस्बिर एकैचोटि छान्न सकिन्छ। तारा (★) चिन्ह भएको तस्बिर
            मुख्य/कभर तस्बिर हो — तल कुनै अर्को तस्बिरको तारा थिच्नुहोस् फेर्न।
            ↑↓ बटनले वा तानेर (drag) क्रम मिलाउन सकिन्छ।
          </p>

          {images.length === 0 ? (
            <p className="text-gray-400 text-center py-8 border border-dashed border-gray-200 rounded-md mt-3">
              अहिलेसम्म कुनै तस्बिर थपिएको छैन।
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
              {images.map((img, index) => {
                const isCover = img.id === coverImageId;
                return (
                  <div
                    key={img.id}
                    draggable
                    onDragStart={() => setDragIndex(index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      if (dragIndex !== null) reorderTo(dragIndex, index);
                      setDragIndex(null);
                    }}
                    className={`border rounded-md p-3 flex flex-col gap-2 bg-gray-50/50 ${
                      isCover
                        ? "border-(--primary-color) ring-1 ring-(--primary-color)"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="relative shrink-0">
                        <img
                          src={img.url}
                          alt={img.caption || `तस्बिर ${index + 1}`}
                          className="w-24 h-24 object-cover rounded"
                        />
                        <span className="absolute top-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
                          #{index + 1}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                        <input
                          type="text"
                          value={img.caption}
                          onChange={(e) =>
                            updateImageField(img.id, "caption", e.target.value)
                          }
                          placeholder="क्याप्शन (नेपाली)"
                          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-(--primary-color)"
                        />
                        <input
                          type="text"
                          value={img.caption_en}
                          onChange={(e) =>
                            updateImageField(
                              img.id,
                              "caption_en",
                              e.target.value,
                            )
                          }
                          placeholder="Caption (English, optional)"
                          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-(--primary-color)"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => setCoverImageId(img.id)}
                        title={
                          isCover
                            ? "यो मुख्य तस्बिर हो"
                            : "मुख्य तस्बिरको रूपमा तोक्नुहोस्"
                        }
                        className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded cursor-pointer ${
                          isCover
                            ? "text-(--primary-color)"
                            : "text-gray-500 hover:text-(--primary-color)"
                        }`}
                      >
                        {isCover ? (
                          <MdStar size={16} />
                        ) : (
                          <MdStarBorder size={16} />
                        )}
                        कभर
                      </button>

                      <div className="flex items-center gap-1 text-gray-500">
                        <span
                          className="p-1.5 cursor-grab active:cursor-grabbing"
                          title="तान्नुहोस्"
                        >
                          <MdDragIndicator size={16} />
                        </span>
                        <button
                          type="button"
                          onClick={() => moveImage(index, -1)}
                          disabled={index === 0}
                          className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          title="माथि सार्नुहोस्"
                        >
                          <MdArrowUpward size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveImage(index, 1)}
                          disabled={index === images.length - 1}
                          className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          title="तल सार्नुहोस्"
                        >
                          <MdArrowDownward size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeImage(img.id)}
                          className="p-1.5 rounded hover:bg-red-50 text-red-600 cursor-pointer"
                          title="हटाउनुहोस्"
                        >
                          <MdDeleteOutline size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={uploading}
            className="px-5 py-2.5 rounded-md bg-(--primary-color) text-white text-sm font-medium hover:opacity-90 cursor-pointer disabled:opacity-60"
          >
            {isEdit
              ? "अपडेट गर्नुहोस्"
              : form.published
                ? "प्रकाशित गर्नुहोस्"
                : "ड्राफ्ट सुरक्षित गर्नुहोस्"}
          </button>
          <Link
            to="/admin/gallery"
            className="px-5 py-2.5 rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50"
          >
            रद्द गर्नुहोस्
          </Link>
        </div>
      </form>

      {showPreview && (
        <GalleryPreviewModal
          album={previewAlbum}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}

export default AdminGalleryForm;
