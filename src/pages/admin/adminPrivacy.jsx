import { useState } from "react";
import { usePrivacy } from "../../context/PrivacyContext";
import { MdEdit, MdDeleteOutline } from "react-icons/md";

const EMPTY_FORM = { heading: "", body: "" };

function AdminPrivacy() {
  const { sections, addSection, updateSection, deleteSection } = usePrivacy();
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmId, setConfirmId] = useState(null);

  function handleChange(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    if (!form.heading.trim() || !form.body.trim()) {
      setErrorMsg("कृपया शीर्षक र विवरण दुवै भर्नुहोस्।");
      return;
    }

    if (editingId) {
      updateSection(editingId, form);
    } else {
      addSection(form);
    }
    setForm(EMPTY_FORM);
    setEditingId(null);
  }

  function handleEdit(section) {
    setEditingId(section.id);
    setForm({ heading: section.heading, body: section.body });
    setErrorMsg("");
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setErrorMsg("");
  }

  function handleDelete(id) {
    deleteSection(id);
    setConfirmId(null);
    if (editingId === id) handleCancelEdit();
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">गोपनीयता नीति</h1>
        <p className="text-gray-500 mt-1">
          पूर्वनिर्धारित नीतिमा थप खण्डहरू (sections) थप्नुहोस्, सम्पादन
          गर्नुहोस् वा हटाउनुहोस्।
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
                <h3 className="font-semibold text-gray-900">
                  {section.heading}
                </h3>
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

export default AdminPrivacy;
