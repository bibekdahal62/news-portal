import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useNews } from "../../context/NewsContext";
import { fileToDataUrl } from "../../utils/file";
import { useCategories } from "../../context/CategoryContext";
import { toDatetimeLocalValue, fromDatetimeLocalValue } from "../../utils/time";

const EMPTY_FORM = {
  category: "",
  image: "",
  headline: "",
  description: "",
  content: "",
  headline_en: "",
  description_en: "",
  content_en: "",
  author: "",
  tagsInput: "",
  publishedAtLocal: "",
  isBreaking: false,
  isFeatured: false,
  published: true,
};

// news items store tags as an array; the form edits them as one
// comma-separated string for simplicity.
function tagsToInput(tags) {
  return Array.isArray(tags) ? tags.join(", ") : "";
}
function inputToTags(input) {
  return input
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

function AdminNewsForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { getNewsById, addNews, updateNews } = useNews();
  const { enabledCategories } = useCategories();

  const existing = isEdit ? getNewsById(id) : null;
  const [form, setForm] = useState(
    existing
      ? {
          ...EMPTY_FORM,
          ...existing,
          tagsInput: tagsToInput(existing.tags),
          published: existing.published !== false,
          publishedAtLocal: toDatetimeLocalValue(existing.publishedAt),
        }
      : { ...EMPTY_FORM, publishedAtLocal: toDatetimeLocalValue() },
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState("ne"); // "ne" | "en"

  if (isEdit && !existing) {
    return (
      <div>
        <p className="text-gray-500">यो समाचार फेला परेन।</p>
        <Link to="/admin/news" className="text-(--primary-color) underline">
          समाचार सूचीमा फर्कनुहोस्
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

  async function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setErrorMsg("");
      const dataUrl = await fileToDataUrl(file);
      setForm((f) => ({ ...f, image: dataUrl }));
    } catch (err) {
      setErrorMsg(err.message);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    if (
      !form.headline.trim() ||
      !form.image.trim() ||
      !form.description.trim() ||
      !form.content.trim()
    ) {
      setActiveTab("ne");
      setErrorMsg("कृपया नेपाली भाषाका सबै आवश्यक फिल्डहरू भर्नुहोस्।");
      return;
    }

    const { tagsInput, publishedAtLocal, ...rest } = form;
    const payload = {
      ...rest,
      tags: inputToTags(tagsInput),
      publishedAt: fromDatetimeLocalValue(publishedAtLocal),
    };

    if (isEdit) {
      updateNews(existing.id, payload);
    } else {
      addNews(payload);
    }
    navigate("/admin/news");
  }

  const tabBtnClass = (tab) =>
    `px-4 py-2 text-sm font-medium border-b-2 -mb-px cursor-pointer ${
      activeTab === tab
        ? "border-(--primary-color) text-(--primary-color)"
        : "border-transparent text-gray-500 hover:text-gray-700"
    }`;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {isEdit ? "समाचार सम्पादन" : "नयाँ समाचार थप्नुहोस्"}
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            श्रेणी
          </label>
          <select
            value={form.category}
            onChange={handleChange("category")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)"
          >
            {enabledCategories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            तस्बिर
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color) file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-(--primary-color) file:text-white file:text-sm file:font-medium file:cursor-pointer cursor-pointer"
          />
          {form.image && (
            <img
              src={form.image}
              alt="preview"
              className="mt-2 h-32 w-full object-cover rounded border border-gray-100"
              onError={(e) => (e.target.style.display = "none")}
            />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              लेखक
            </label>
            <input
              type="text"
              value={form.author}
              onChange={handleChange("author")}
              placeholder="जस्तै: रमेश श्रेष्ठ"
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              प्रकाशित मिति र समय
            </label>
            <input
              type="datetime-local"
              value={form.publishedAtLocal}
              onChange={handleChange("publishedAtLocal")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)"
            />
            <p className="text-xs text-gray-400 mt-1">
              भविष्यको मिति राखेर समाचार तालिकाबद्ध (scheduled) राख्न सकिन्छ।
            </p>
          </div>
        </div>

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
                  value={form.headline}
                  onChange={handleChange("headline")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  छोटो विवरण (कार्ड/सूचीमा देखिने)
                </label>
                <textarea
                  value={form.description}
                  onChange={handleChange("description")}
                  rows={2}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  पूर्ण समाचार (विस्तृत पृष्ठमा देखिने)
                </label>
                <textarea
                  value={form.content}
                  onChange={handleChange("content")}
                  rows={8}
                  placeholder="अनुच्छेदहरू बीच खाली लाइन छोड्नुहोस्"
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
                  Headline
                </label>
                <input
                  type="text"
                  value={form.headline_en}
                  onChange={handleChange("headline_en")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short summary (shown on cards/lists)
                </label>
                <textarea
                  value={form.description_en}
                  onChange={handleChange("description_en")}
                  rows={2}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full content (shown on detail page)
                </label>
                <textarea
                  value={form.content_en}
                  onChange={handleChange("content_en")}
                  rows={8}
                  placeholder="Leave a blank line between paragraphs"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)"
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ट्यागहरू (अल्पविरामले छुट्याउनुहोस्)
          </label>
          <input
            type="text"
            value={form.tagsInput}
            onChange={handleChange("tagsInput")}
            placeholder="जस्तै: राजनीति, संसद, बजेट"
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)"
          />
        </div>

        <div className="flex flex-wrap gap-6">
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
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={form.isBreaking}
              onChange={handleCheckbox("isBreaking")}
              className="rounded border-gray-300 text-(--primary-color) focus:ring-(--primary-color)"
            />
            ब्रेकिङ न्युज
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={handleCheckbox("isFeatured")}
              className="rounded border-gray-300 text-(--primary-color) focus:ring-(--primary-color)"
            />
            फिचर गर्नुहोस्
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-md bg-(--primary-color) text-white text-sm font-medium hover:opacity-90 cursor-pointer"
          >
            {isEdit
              ? "अपडेट गर्नुहोस्"
              : form.published
                ? "प्रकाशित गर्नुहोस्"
                : "ड्राफ्ट सुरक्षित गर्नुहोस्"}
          </button>
          <Link
            to="/admin/news"
            className="px-5 py-2.5 rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50"
          >
            रद्द गर्नुहोस्
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AdminNewsForm;
