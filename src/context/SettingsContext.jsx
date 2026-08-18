import { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

// Defaults mirror what's currently hardcoded across Header.jsx, Footer.jsx,
// contact.jsx and locales/*.json, so turning this context on doesn't change
// anything visually until an admin actually edits a value. Held in React
// state only for this session — nothing is written to localStorage,
// consistent with News/Ads/Video/ContactMessage/Privacy.
const DEFAULT_SETTINGS = {
  // General / branding
  siteName: "गुरुकुल टिभी",
  siteName_en: "Gurukul TV",
  tagline: "नेपाली र अंग्रेजी भाषामा दैनिक रूपमा प्रकाशित स्वतन्त्र समाचार।",
  tagline_en: "Independent news, reported daily in English and Nepali.",
  logo: "", // data URL once an admin uploads one; falls back to /logo-nepali.png
  logoWhite: "", // used on the dark footer; falls back to /logo-nepali-white.png

  // Contact details
  phone: "+९७७-९७००००००००",
  email: "news@newsite.com.np",
  address: "विराटनगर, नेपाल",
  address_en: "Biratnagar, Nepal",

  // Social media links
  facebook: "https://facebook.com",
  twitter: "https://x.com",
  youtube: "https://youtube.com",
  instagram: "https://instagram.com",
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  function updateSettings(updates) {
    setSettings((prev) => ({ ...prev, ...updates }));
  }

  function resetSettings() {
    setSettings(DEFAULT_SETTINGS);
  }

  return (
    <SettingsContext.Provider
      value={{ settings, updateSettings, resetSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
