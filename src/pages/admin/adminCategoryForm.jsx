import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useCategories } from "../../context/CategoryContext";

const EMPTY_FORM = { name: "", nameEn: "", enabled: true, showInNav: true };

function AdminCategoryForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { getCategoryById, addCategory, updateCategory, categories } =
    useCategories();

  const existing = isEdit ? getCategoryById(id) : null;
  const [form, setForm] = useState(
    existing ? { ...EMPTY_FORM, ...existing } : EMPTY_FORM,
  );
  const [errorMsg, setErrorMsg] = useState("");

  if (isEdit && !existing) {
    return (
      <div>
        <p className="text-gray-500">यो श्रेणी फेला परेन।</p>
        <Link
          to="/admin/categories"
          className="text-(--primary-color) underline"
        >
          श्रेणी सूचीमा फर्कनुहोस्
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

    const name = form.name.trim();
    const nameEn = form.nameEn.trim();

    if (!name || !nameEn) {
      setErrorMsg("कृपया नेपाली र अंग्रेजी दुवै नाम भर्नुहोस्।");
      return;
    }

    const duplicate = categories.find(
      (c) => c.name === name && (!existing || c.id !== existing.id),
    );
    if (duplicate) {
      setErrorMsg("यो नाम भएको श्रेणी पहिले नै अवस्थित छ।");
      return;
    }

    if (isEdit) {
      updateCategory(existing.id, {
        name,
        nameEn,
        enabled: form.enabled,
        showInNav: form.showInNav,
      });
    } else {
      addCategory({
        name,
        nameEn,
        enabled: form.enabled,
        showInNav: form.showInNav,
      });
    }
    navigate("/admin/categories");
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {isEdit ? "श्रेणी सम्पादन" : "नयाँ श्रेणी"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col gap-4"
      >
        {errorMsg && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {errorMsg}
          </p>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            नेपाली नाम
          </label>
          <input
            type="text"
            value={form.name}
            onChange={handleChange("name")}
            placeholder="जस्तै: प्रविधि"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-(--primary-color)/30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            अंग्रेजी नाम
          </label>
          <input
            type="text"
            value={form.nameEn}
            onChange={handleChange("nameEn")}
            placeholder="e.g. Technology"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-(--primary-color)/30"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={form.enabled}
            onChange={(e) =>
              setForm((f) => ({ ...f, enabled: e.target.checked }))
            }
          />
          सक्रिय (न्युज फारममा देखिनेछ)
        </label>

        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={form.showInNav}
            onChange={(e) =>
              setForm((f) => ({ ...f, showInNav: e.target.checked }))
            }
          />
          प्रमुख मेनुमा देखाउने (Header nav)
        </label>

        <div className="flex items-center gap-3 mt-2">
          <button
            type="submit"
            className="px-5 py-2 rounded-md bg-(--primary-color) text-white text-sm font-medium hover:opacity-90 cursor-pointer"
          >
            {isEdit ? "अपडेट गर्नुहोस्" : "थप्नुहोस्"}
          </button>
          <Link
            to="/admin/categories"
            className="px-5 py-2 rounded-md border border-gray-300 text-sm text-gray-600 hover:bg-gray-50"
          >
            रद्द गर्नुहोस्
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AdminCategoryForm;
