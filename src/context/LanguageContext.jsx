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
    videos: "Videos",

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

    // Contact page
    contactHeading: "Contact Us",
    contactSubheading: "Have a tip, feedback, or question? Send us a message.",
    formName: "Full Name",
    formEmail: "Email Address",
    formSubject: "Subject",
    formMessage: "Message",
    formSend: "Send Message",
    formSending: "Sending...",
    formSuccessTitle: "Message sent",
    formSuccessBody: "Thanks for reaching out — we'll get back to you soon.",
    formErrorRequired: "Please fill in all fields.",
    formSendAnother: "Send another message",
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
    videos: "भिडियो",

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

    // Contact page
    contactHeading: "सम्पर्क गर्नुहोस्",
    contactSubheading: "कुनै जानकारी, सुझाव वा प्रश्न छ भने हामीलाई सन्देश पठाउनुहोस्।",
    formName: "पूरा नाम",
    formEmail: "इमेल ठेगाना",
    formSubject: "विषय",
    formMessage: "सन्देश",
    formSend: "सन्देश पठाउनुहोस्",
    formSending: "पठाइँदैछ...",
    formSuccessTitle: "सन्देश पठाइयो",
    formSuccessBody: "सम्पर्क गर्नुभएकोमा धन्यवाद — हामी चाँडै जवाफ दिनेछौं।",
    formErrorRequired: "कृपया सबै फिल्डहरू भर्नुहोस्।",
    formSendAnother: "अर्को सन्देश पठाउनुहोस्",
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
