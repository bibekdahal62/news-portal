import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAds } from "../../context/AdsContext";
import { fileToDataUrl } from "../../utils/file";

const EMPTY_FORM = {
  slot: "home-top",
  image: "",
  link: "",
  alt: "",
  active: true,
};

function AdminAdForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { getAdById, addAd, updateAd } = useAds();

  const existing = isEdit ? getAdById(id) : null;
  const [form, setForm] = useState(
    existing ? { ...EMPTY_FORM, ...existing } : EMPTY_FORM,
  );
  const [errorMsg, setErrorMsg] = useState("");

  if (isEdit && !existing) {
    return (
      <div>
        <p className="text-gray-500">यो विज्ञापन फेला परेन।</p>
        <Link to="/admin/ads" className="text-(--primary-color) underline">
          विज्ञापन सूचीमा फर्कनुहोस्
        </Link>
      </div>
    );
  }

  function handleChange(field) {
    return (e) =>
      setForm((f) => ({
        ...f,
        [field]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      }));
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

    if (!form.image.trim() || !form.link.trim()) {
      setErrorMsg("कृपया तस्बिर र लिंक भर्नुहोस्।");
      return;
    }

    if (isEdit) {
      updateAd(existing.id, form);
    } else {
      addAd(form);
    }
    navigate("/admin/ads");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {isEdit ? "विज्ञापन सम्पादन" : "नयाँ विज्ञापन थप्नुहोस्"}
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
            स्थान (Slot)
          </label>
          <select
            value={form.slot}
            onChange={handleChange("slot")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)"
          >
            <option value="home-top">गृहपृष्ठ - समाचार सूची माथि</option>
            <option value="home-side">गृहपृष्ठ - समाचार सूची छेउमा</option>
            <option value="home-bottom">गृहपृष्ठ - समाचार सूची तल</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            विज्ञापन तस्बिर
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            क्लिक गर्दा जाने लिंक
          </label>
          <input
            type="url"
            value={form.link}
            onChange={handleChange("link")}
            placeholder="https://advertiser-site.com"
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            वैकल्पिक विवरण (alt text)
          </label>
          <input
            type="text"
            value={form.alt}
            onChange={handleChange("alt")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={form.active}
            onChange={handleChange("active")}
          />
          सक्रिय (होमपेजमा देखाउने)
        </label>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-md bg-(--primary-color) text-white text-sm font-medium hover:opacity-90 cursor-pointer"
          >
            {isEdit ? "अपडेट गर्नुहोस्" : "थप्नुहोस्"}
          </button>
          <Link
            to="/admin/ads"
            className="px-5 py-2.5 rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50"
          >
            रद्द गर्नुहोस्
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AdminAdForm;
