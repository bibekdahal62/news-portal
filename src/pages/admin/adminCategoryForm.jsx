import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useCategories } from "../../context/CategoryContext";
import {
  FormField,
  CheckboxField,
  FormAlert,
  FormActions,
} from "../../components/admin/common";

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
        <Link to="/admin/categories" className="text-(--primary-color) underline">
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
        <FormAlert>{errorMsg}</FormAlert>

        <FormField
          label="नेपाली नाम"
          type="text"
          value={form.name}
          onChange={handleChange("name")}
          placeholder="जस्तै: प्रविधि"
        />

        <FormField
          label="अंग्रेजी नाम"
          type="text"
          value={form.nameEn}
          onChange={handleChange("nameEn")}
          placeholder="e.g. Technology"
        />

        <CheckboxField
          label="सक्रिय (न्युज फारममा देखिनेछ)"
          checked={form.enabled}
          onChange={(e) =>
            setForm((f) => ({ ...f, enabled: e.target.checked }))
          }
        />

        <CheckboxField
          label="प्रमुख मेनुमा देखाउने (Header nav)"
          checked={form.showInNav}
          onChange={(e) =>
            setForm((f) => ({ ...f, showInNav: e.target.checked }))
          }
        />

        <FormActions
          submitLabel={isEdit ? "अपडेट गर्नुहोस्" : "थप्नुहोस्"}
          cancelTo="/admin/categories"
        />
      </form>
    </div>
  );
}

export default AdminCategoryForm;
