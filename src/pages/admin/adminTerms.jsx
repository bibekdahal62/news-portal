import { useState } from "react";
import { useTerms } from "../../context/TermsContext";
import { MdEdit, MdDeleteOutline } from "react-icons/md";

const EMPTY_FORM = { heading: "", heading_en: "", body: "", body_en: "" };

function AdminTerms() {
  const { sections, addSection, updateSection, deleteSection } = useTerms();
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmId, setConfirmId] = useState(null);
  const [activeTab, setActiveTab] = useState("ne"); // "ne" | "en"

  function handleChange(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    // Nepali is required/primary (matches the news form's convention);
    // English is optional — the site falls back to Nepali wherever the
    // English field is left blank, via localizeSection().
    if (!form.heading.trim() || !form.body.trim()) {
      setActiveTab("ne");
      setErrorMsg("कृपया नेपाली शीर्षक र विवरण दुवै भर्नुहोस्।");
      return;
    }

    if (editingId) {
      updateSection(editingId, form);
    } else {
      addSection(form);
    }
    setForm(EMPTY_FORM);
    setEditingId(null);
    setActiveTab("ne");
  }

  function handleEdit(section) {
    setEditingId(section.id);
    setForm({
      heading: section.heading || "",
      heading_en: section.heading_en || "",
      body: section.body || "",
      body_en: section.body_en || "",
    });
    setErrorMsg("");
    setActiveTab("ne");
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setErrorMsg("");
    setActiveTab("ne");
  }

  function handleDelete(id) {
    deleteSection(id);
    setConfirmId(null);
    if (editingId === id) handleCancelEdit();
  }

  const tabBtnClass = (tab) =>
    `px-4 py-2 text-sm font-medium border-b-2 -mb-px cursor-pointer ${
      activeTab === tab
        ? "border-(--primary-color) text-(--primary-color)"
        : "border-transparent text-gray-500 hover:text-gray-700"
    }`;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">नियम तथा सर्तहरू</h1>
        <p className="text-gray-500 mt-1">
          पूर्वनिर्धारित सर्तमा थप खण्डहरू (sections) थप्नुहोस्, सम्पादन
          गर्नुहोस् वा हटाउनुहोस्। नेपाली र अंग्रेजी दुवै भाषामा भर्न सकिन्छ।
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 max-w-2xl flex flex-col gap-4 mb-8"
      >
        <h2 className="font-semibold text-gray-900">
          {editingId ? "खण्ड सम्पादन गर्नुहोस्" : "नयाँ खण्ड थप्नुहोस्"}
        </h2>

        {errorMsg && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded px-3 py-2">
            {errorMsg}
          </p>
        )}

        {/* Language tabs: Nepali is required/primary, English is optional,
          same convention as the news form. */}
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
                  value={form.heading}
                  onChange={handleChange("heading")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  विवरण
                </label>
                <textarea
                  value={form.body}
                  onChange={handleChange("body")}
                  rows={5}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)"
                />
              </div>
            </div>
          )}

          {activeTab === "en" && (
            <div className="flex flex-col gap-4">
              <p className="text-xs text-gray-400 -mt-1">
                Optional — if left blank, the site falls back to the Nepali text
                when viewed in English.
              </p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heading
                </label>
                <input
                  type="text"
                  value={form.heading_en}
                  onChange={handleChange("heading_en")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Body
                </label>
                <textarea
                  value={form.body_en}
                  onChange={handleChange("body_en")}
                  rows={5}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-1">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-md bg-(--primary-color) text-white text-sm font-medium hover:opacity-90 cursor-pointer"
          >
            {editingId ? "अपडेट गर्नुहोस्" : "थप्नुहोस्"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-5 py-2.5 rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50 cursor-pointer"
            >
              रद्द गर्नुहोस्
            </button>
          )}
        </div>
      </form>

      <h2 className="font-semibold text-gray-900 mb-3">
        थपिएका खण्डहरू ({sections.length})
      </h2>

      {sections.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-gray-500">अहिलेसम्म कुनै थप खण्ड थपिएको छैन।</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-lg border border-gray-100 shadow-sm p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">
                    {section.heading}
                  </h3>
                  {section.heading_en?.trim() && (
                    <span className="text-[10px] font-medium bg-green-50 text-green-700 border border-green-200 px-1.5 py-0.5 rounded">
                      EN
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleEdit(section)}
                    className="p-2 rounded hover:bg-gray-100 text-gray-600 cursor-pointer"
                    title="सम्पादन"
                  >
                    <MdEdit size={18} />
                  </button>
                  <button
                    onClick={() => setConfirmId(section.id)}
                    className="p-2 rounded hover:bg-red-50 text-red-600 cursor-pointer"
                    title="मेटाउनुहोस्"
                  >
                    <MdDeleteOutline size={18} />
                  </button>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {section.body}
              </p>

              {section.heading_en?.trim() || section.body_en?.trim() ? (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs font-medium text-gray-400 mb-1">
                    English
                  </p>
                  {section.heading_en?.trim() && (
                    <h4 className="font-semibold text-gray-700 text-sm">
                      {section.heading_en}
                    </h4>
                  )}
                  {section.body_en?.trim() && (
                    <p className="mt-1 text-sm text-gray-500 leading-relaxed whitespace-pre-line">
                      {section.body_en}
                    </p>
                  )}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}

      {confirmId !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h3 className="font-semibold text-gray-900 mb-2">
              मेटाउने पुष्टि गर्नुहोस्
            </h3>
            <p className="text-sm text-gray-500 mb-5">
              के तपाईं यो खण्ड मेटाउन निश्चित हुनुहुन्छ? यो कार्य फिर्ता गर्न
              सकिँदैन।
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmId(null)}
                className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-50 cursor-pointer"
              >
                रद्द गर्नुहोस्
              </button>
              <button
                onClick={() => handleDelete(confirmId)}
                className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 cursor-pointer"
              >
                मेटाउनुहोस्
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminTerms;
