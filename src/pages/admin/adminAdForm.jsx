import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAds } from "../../context/AdsContext";
import {
  FormField,
  SelectField,
  CheckboxField,
  ImageUploadField,
  FormAlert,
  FormActions,
} from "../../components/admin/common";

const EMPTY_FORM = {
  slot: "home-top",
  image: "",
  link: "",
  alt: "",
  active: true,
  showOnHome: true,
  showOnNews: true,
  startDate: "",
  endDate: "",
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

  function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    if (!form.image.trim() || !form.link.trim()) {
      setErrorMsg("कृपया तस्बिर र लिंक भर्नुहोस्।");
      return;
    }

    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      setErrorMsg("अन्त्य मिति सुरु मितिभन्दा पछिको हुनुपर्छ।");
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
        <FormAlert>{errorMsg}</FormAlert>

        <SelectField
          label="स्थान (Slot)"
          value={form.slot}
          onChange={handleChange("slot")}
        >
          <option value="home-top">गृहपृष्ठ - समाचार सूची माथि</option>
          <option value="home-side">गृहपृष्ठ - समाचार सूची छेउमा</option>
          <option value="home-bottom">गृहपृष्ठ - समाचार सूची तल</option>
        </SelectField>

        <ImageUploadField
          label="विज्ञापन तस्बिर"
          value={form.image}
          onChange={(dataUrl) => setForm((f) => ({ ...f, image: dataUrl }))}
          onError={setErrorMsg}
        />

        <FormField
          label="क्लिक गर्दा जाने लिंक"
          type="url"
          value={form.link}
          onChange={handleChange("link")}
          placeholder="https://advertiser-site.com"
        />

        <FormField
          label="वैकल्पिक विवरण (alt text)"
          type="text"
          value={form.alt}
          onChange={handleChange("alt")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="सुरु मिति (वैकल्पिक)"
            type="date"
            value={form.startDate}
            onChange={handleChange("startDate")}
          />
          <FormField
            label="अन्त्य मिति (वैकल्पिक)"
            type="date"
            value={form.endDate}
            onChange={handleChange("endDate")}
          />
        </div>
        <p className="text-xs text-gray-400 -mt-2">
          मिति खाली छोडे विज्ञापन "सक्रिय" रहुन्जेल जहिले पनि देखिन्छ।
        </p>

        <CheckboxField
          label="सक्रिय"
          checked={form.active}
          onChange={handleChange("active")}
        />

        <div className="flex flex-wrap gap-6">
          <CheckboxField
            label="गृहपृष्ठमा देखाउने (Home page)"
            checked={form.showOnHome}
            onChange={handleChange("showOnHome")}
          />
          <CheckboxField
            label="समाचार पृष्ठमा देखाउने (News page)"
            checked={form.showOnNews}
            onChange={handleChange("showOnNews")}
          />
        </div>

        <FormActions
          submitLabel={isEdit ? "अपडेट गर्नुहोस्" : "थप्नुहोस्"}
          cancelTo="/admin/ads"
        />
      </form>
    </div>
  );
}

export default AdminAdForm;
