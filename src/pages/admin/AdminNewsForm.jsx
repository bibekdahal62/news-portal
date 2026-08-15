import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useNews } from "../../context/NewsContext";

// Every category currently used across the site: the 7 that have their own
// nav link/route, plus "रोचक" (used to pick the 3 pinned homepage cards)
// and "कला साहित्य" which exists in the seed data but has no nav link yet.
const CATEGORIES = [
  "समाचार",
  "अर्थ",
  "राजनीति",
  "स्थानिय",
  "खेलकुद",
  "मनोरञ्जन",
  "अन्तर्राष्ट्रिय",
  "रोचक",
  "कला साहित्य",
];

const EMPTY_FORM = {
  category: CATEGORIES[0],
  image: "",
  headline: "",
  description: "",
};

function AdminNewsForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { getNewsById, addNews, updateNews } = useNews();

  const existing = isEdit ? getNewsById(id) : null;
  const [form, setForm] = useState(existing ? { ...EMPTY_FORM, ...existing } : EMPTY_FORM);
  const [errorMsg, setErrorMsg] = useState("");

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

  function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    if (!form.headline.trim() || !form.image.trim() || !form.description.trim()) {
      setErrorMsg("कृपया सबै आवश्यक फिल्डहरू भर्नुहोस्।");
      return;
    }

    if (isEdit) {
      updateNews(existing.id, form);
    } else {
      addNews(form);
    }
    navigate("/admin/news");
  }

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
          <label className="block text-sm font-medium text-gray-700 mb-1">श्रेणी</label>
          <select
            value={form.category}
            onChange={handleChange("category")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            तस्बिर URL
          </label>
          <input
            type="url"
            value={form.image}
            onChange={handleChange("image")}
            placeholder="https://..."
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)"
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">शीर्षक</label>
          <input
            type="text"
            value={form.headline}
            onChange={handleChange("headline")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">विवरण</label>
          <textarea
            value={form.description}
            onChange={handleChange("description")}
            rows={5}
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-md bg-(--primary-color) text-white text-sm font-medium hover:opacity-90 cursor-pointer"
          >
            {isEdit ? "अपडेट गर्नुहोस्" : "प्रकाशित गर्नुहोस्"}
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
