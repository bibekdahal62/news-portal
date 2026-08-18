import { useState } from "react";
import {
  MdSettings,
  MdContactPhone,
  MdShare,
  MdCheckCircle,
} from "react-icons/md";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useSettings } from "../../context/SettingsContext";
import { fileToDataUrl } from "../../utils/file";

const TABS = [
  { id: "general", label: "साधारण", icon: MdSettings },
  { id: "contact", label: "सम्पर्क विवरण", icon: MdContactPhone },
  { id: "social", label: "सामाजिक सञ्जाल", icon: MdShare },
];

function AdminSettings() {
  const { settings, updateSettings } = useSettings();
  const [activeTab, setActiveTab] = useState("general");
  const [form, setForm] = useState(settings);
  const [errorMsg, setErrorMsg] = useState("");
  const [savedMsg, setSavedMsg] = useState(false);

  function handleChange(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleLogoChange(field) {
    return async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        setErrorMsg("");
        const dataUrl = await fileToDataUrl(file);
        setForm((f) => ({ ...f, [field]: dataUrl }));
      } catch (err) {
        setErrorMsg(err.message);
      }
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    if (activeTab === "general" && !form.siteName.trim()) {
      setErrorMsg("कृपया साइटको नाम भर्नुहोस्।");
      return;
    }

    if (activeTab === "contact") {
      if (!form.phone.trim() || !form.email.trim() || !form.address.trim()) {
        setErrorMsg("कृपया फोन, इमेल र ठेगाना भर्नुहोस्।");
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
        setErrorMsg("कृपया मान्य इमेल ठेगाना भर्नुहोस्।");
        return;
      }
    }

    updateSettings(form);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
  }

  const tabBtnClass = (tab) =>
    `flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px cursor-pointer whitespace-nowrap ${
      activeTab === tab
        ? "border-(--primary-color) text-(--primary-color)"
        : "border-transparent text-gray-500 hover:text-gray-700"
    }`;

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">वेबसाइट सेटिङ</h1>
        <p className="text-gray-500 mt-1">
          साइटको नाम, लोगो, सम्पर्क विवरण, र सामाजिक सञ्जालका लिंकहरू यहाँबाट
          व्यवस्थापन गर्नुहोस्।
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm border border-gray-100 max-w-2xl"
      >
        <div className="flex border-b border-gray-200 px-4 overflow-x-auto">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={tabBtnClass(id)}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        <div className="p-6 flex flex-col gap-4">
          {errorMsg && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded px-3 py-2">
              {errorMsg}
            </p>
          )}

          {savedMsg && (
            <p className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-100 rounded px-3 py-2">
              <MdCheckCircle size={16} />
              सेटिङ सुरक्षित गरियो।
            </p>
          )}

          {/* General / branding */}
          {activeTab === "general" && (
            <>
              <div>
                <label className={labelClass}>साइटको नाम (नेपाली)</label>
                <input
                  type="text"
                  value={form.siteName}
                  onChange={handleChange("siteName")}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Site Name (English)</label>
                <input
                  type="text"
                  value={form.siteName_en}
                  onChange={handleChange("siteName_en")}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>ट्यागलाइन (नेपाली)</label>
                <input
                  type="text"
                  value={form.tagline}
                  onChange={handleChange("tagline")}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Tagline (English)</label>
                <input
                  type="text"
                  value={form.tagline_en}
                  onChange={handleChange("tagline_en")}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>लोगो (हेडरमा देखिने)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange("logo")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color) file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-(--primary-color) file:text-white file:text-sm file:font-medium file:cursor-pointer cursor-pointer"
                />
                <div className="mt-2 h-16 flex items-center px-3 rounded border border-gray-100 bg-gray-50 w-fit">
                  <img
                    src={form.logo || "/logo-nepali.png"}
                    alt="logo preview"
                    className="h-12 w-auto"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  सेतो लोगो (फुटरमा देखिने, गाढा पृष्ठभूमिमा)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange("logoWhite")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color) file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-(--primary-color) file:text-white file:text-sm file:font-medium file:cursor-pointer cursor-pointer"
                />
                <div className="mt-2 h-16 flex items-center px-3 rounded border border-gray-100 bg-(--primary-color) w-fit">
                  <img
                    src={form.logoWhite || "/logo-nepali-white.png"}
                    alt="white logo preview"
                    className="h-12 w-auto"
                  />
                </div>
              </div>
            </>
          )}

          {/* Contact details */}
          {activeTab === "contact" && (
            <>
              <div>
                <label className={labelClass}>फोन नम्बर</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={handleChange("phone")}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>इमेल ठेगाना</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>ठेगाना (नेपाली)</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={handleChange("address")}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Address (English)</label>
                <input
                  type="text"
                  value={form.address_en}
                  onChange={handleChange("address_en")}
                  className={inputClass}
                />
              </div>
            </>
          )}

          {/* Social media links */}
          {activeTab === "social" && (
            <>
              <div>
                <label className={labelClass}>
                  <span className="inline-flex items-center gap-1.5">
                    <FaFacebookF size={13} /> Facebook
                  </span>
                </label>
                <input
                  type="url"
                  value={form.facebook}
                  onChange={handleChange("facebook")}
                  placeholder="https://facebook.com/yourpage"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  <span className="inline-flex items-center gap-1.5">
                    <FaXTwitter size={13} /> X (Twitter)
                  </span>
                </label>
                <input
                  type="url"
                  value={form.twitter}
                  onChange={handleChange("twitter")}
                  placeholder="https://x.com/yourhandle"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  <span className="inline-flex items-center gap-1.5">
                    <FaYoutube size={13} /> YouTube
                  </span>
                </label>
                <input
                  type="url"
                  value={form.youtube}
                  onChange={handleChange("youtube")}
                  placeholder="https://youtube.com/@yourchannel"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  <span className="inline-flex items-center gap-1.5">
                    <FaInstagram size={13} /> Instagram
                  </span>
                </label>
                <input
                  type="url"
                  value={form.instagram}
                  onChange={handleChange("instagram")}
                  placeholder="https://instagram.com/yourhandle"
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

export default AdminSettings;
