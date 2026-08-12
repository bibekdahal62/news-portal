import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext();

const translations = {
  en: {
    title: "News Portal",
    home: "Home",
    news: "News",
    politics: "Politics",
    local: "Local",
    sports: "Sports",
    international: "International",
    about: "About",
    contact: "Contact",
    search: "Search",
    economic: "Economic",
    entertainment: "Entertainment",

    // Footer
    company: "Company",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
    reachUs: "Reach Us",
    followUs: "Follow Us",
    description: "Independent news, reported daily in English and Nepali.",
    phone: "+977-9700000000",
    location: "Biratnagar, Nepal",
    copyright: "All rights reserved.",
  },

  ne: {
    title: "समाचार पोर्टल",
    home: "गृहपृष्ठ",
    news: "समाचार",
    politics: "राजनीति",
    local: "स्थानीय",
    sports: "खेलकुद",
    international: "अन्तर्राष्ट्रिय",
    about: "हाम्रो बारेमा",
    contact: "सम्पर्क",
    search: "खोज्नुहोस्",
    economic: "अर्थ",
    entertainment: "मनोरञ्जन",

    // Footer
    company: "कम्पनी",
    privacy: "गोपनीयता नीति",
    terms: "नियम तथा सर्तहरू",
    reachUs: "सम्पर्क",
    followUs: "हामीलाई फलो गर्नुहोस्",
    description:
      "नेपाली र अंग्रेजी भाषामा दैनिक रूपमा प्रकाशित स्वतन्त्र समाचार।",
    phone: "+९७७-९७००००००००",
    location: "विराटनगर, नेपाल",
    copyright: "सर्वाधिकार सुरक्षित।",
  },
};

export function LanguageProvider({ children }) {
  const initialLang = document.documentElement.lang || "en";

  const [lang, setLang] = useState(initialLang === "ne" ? "ne" : "en");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
