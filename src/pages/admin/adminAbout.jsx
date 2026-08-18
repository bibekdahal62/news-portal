import { useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import { useAbout } from "../../context/AboutContext";

const SECTIONS = [
  { id: "hero", label: "हिरो खण्ड" },
  { id: "mission", label: "हाम्रो लक्ष्य" },
  { id: "values", label: "मूल्य मान्यता" },
  { id: "cta", label: "कल-टु-एक्सन" },
];

function AdminAbout() {
  const { about, updateAbout, updateValue } = useAbout();
  const [activeSection, setActiveSection] = useState("hero");
  const [activeTab, setActiveTab] = useState("ne"); // "ne" | "en"
  const [form, setForm] = useState(about);
  const [savedMsg, setSavedMsg] = useState(false);

  function handleChange(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleValueChange(id, field) {
    return (e) => {
      const value = e.target.value;
      setForm((f) => ({
        ...f,
        values: f.values.map((v) =>
          v.id === id ? { ...v, [field]: value } : v,
        ),
      }));
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { values, ...rest } = form;
    updateAbout(rest);
    values.forEach((v) => updateValue(v.id, v));
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
  }

  const sectionBtnClass = (id) =>
    `flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px cursor-pointer whitespace-nowrap ${
      activeSection === id
        ? "border-(--primary-color) text-(--primary-color)"
        : "border-transparent text-gray-500 hover:text-gray-700"
    }`;

  const tabBtnClass = (tab) =>
    `px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer ${
      activeTab === tab
        ? "bg-(--primary-color) text-white"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    }`;

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  const langSuffix = activeTab === "en" ? "_en" : "";

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          हाम्रो बारेमा पृष्ठ
        </h1>
        <p className="text-gray-500 mt-1">
          "हाम्रो बारेमा" पृष्ठको सामग्री यहाँबाट सम्पादन गर्नुहोस्। नेपाली र
          अंग्रेजी दुवै भाषामा भर्न सकिन्छ।
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm border border-gray-100 max-w-2xl"
      >
        <div className="flex border-b border-gray-200 px-4 overflow-x-auto">
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveSection(id)}
              className={sectionBtnClass(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="p-6 flex flex-col gap-4">
          {savedMsg && (
            <p className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-100 rounded px-3 py-2">
              <MdCheckCircle size={16} />
              सामग्री सुरक्षित गरियो।
            </p>
          )}

          <div className="flex gap-2">
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

          {activeSection === "hero" && (
            <>
              <div>
                <label className={labelClass}>शीर्षक</label>
                <input
                  type="text"
                  value={form[`heroTitle${langSuffix}`]}
                  onChange={handleChange(`heroTitle${langSuffix}`)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>विवरण</label>
                <textarea
                  value={form[`heroText${langSuffix}`]}
                  onChange={handleChange(`heroText${langSuffix}`)}
                  rows={4}
                  className={inputClass}
                />
              </div>
            </>
          )}

          {activeSection === "mission" && (
            <>
              <div>
                <label className={labelClass}>शीर्षक</label>
                <input
                  type="text"
                  value={form[`missionTitle${langSuffix}`]}
                  onChange={handleChange(`missionTitle${langSuffix}`)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>विवरण</label>
                <textarea
                  value={form[`missionText${langSuffix}`]}
                  onChange={handleChange(`missionText${langSuffix}`)}
                  rows={5}
                  className={inputClass}
                />
              </div>
            </>
          )}

          {activeSection === "values" && (
            <div className="flex flex-col gap-5">
              {form.values.map((v, idx) => (
                <div
                  key={v.id}
                  className="border border-gray-100 rounded-md p-4"
                >
                  <p className="text-xs font-semibold text-gray-400 mb-3">
                    मूल्य मान्यता {idx + 1}
                  </p>
                  <div className="flex flex-col gap-3">
                    <div>
                      <label className={labelClass}>शीर्षक</label>
                      <input
                        type="text"
                        value={v[`title${langSuffix}`]}
                        onChange={handleValueChange(v.id, `title${langSuffix}`)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>विवरण</label>
                      <textarea
                        value={v[`text${langSuffix}`]}
                        onChange={handleValueChange(v.id, `text${langSuffix}`)}
                        rows={3}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === "cta" && (
            <>
              <div>
                <label className={labelClass}>पाठ</label>
                <input
                  type="text"
                  value={form[`ctaText${langSuffix}`]}
                  onChange={handleChange(`ctaText${langSuffix}`)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>बटनको लेबल</label>
                <input
                  type="text"
                  value={form[`ctaButton${langSuffix}`]}
                  onChange={handleChange(`ctaButton${langSuffix}`)}
                  className={inputClass}
                />
              </div>
            </>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-md bg-(--primary-color) text-white text-sm font-medium hover:opacity-90 cursor-pointer"
            >
              सुरक्षित गर्नुहोस्
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AdminAbout;
