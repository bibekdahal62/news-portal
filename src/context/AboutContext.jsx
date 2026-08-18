import { createContext, useContext, useState } from "react";

const AboutContext = createContext();

// Defaults mirror the text currently hardcoded in locales/ne.json and
// locales/en.json for the About page, so nothing changes visually until an
// admin edits a field. Held in React state only for this session — nothing
// is written to localStorage, consistent with News/Ads/Video/Privacy.
const DEFAULT_ABOUT = {
  heroTitle: "हाम्रो बारेमा",
  heroTitle_en: "About Us",
  heroText:
    "समाचार पोर्टल विराटनगर, नेपालमा आधारित एउटा स्वतन्त्र सञ्चार माध्यम हो, जसले दैनिक रूपमा नेपाली र अंग्रेजी दुवै भाषामा समाचार प्रकाशित गर्दछ।",
  heroText_en:
    "News Portal is an independent media outlet based in Biratnagar, Nepal, publishing daily news in both Nepali and English.",

  missionTitle: "हाम्रो लक्ष्य",
  missionTitle_en: "Our Mission",
  missionText:
    "हामी विश्वास गर्छौं कि हरेक नेपालीले छिटो, सही र निष्पक्ष समाचार पाउनुपर्छ। स्थानीय घटनादेखि राष्ट्रिय राजनीति, खेलकुद र अन्तर्राष्ट्रिय मामिलासम्म, हाम्रो टिम तपाईंसम्म महत्त्वपूर्ण समाचार पुर्‍याउन निरन्तर खटिरहेको छ।",
  missionText_en:
    "We believe every Nepali deserves fast, accurate, and unbiased news. From local events to national politics, sports, and international affairs, our team works around the clock to bring you the news that matters.",

  values: [
    {
      id: 1,
      title: "शुद्धतामा प्राथमिकता",
      title_en: "Accuracy First",
      text: "प्रकाशन गर्नुअघि प्रत्येक समाचार प्रमाणित गरिन्छ, ताकि तपाईंले पढेको कुरामा विश्वास गर्न सक्नुहोस्।",
      text_en:
        "Every story is verified before publication, so you can trust what you read.",
    },
    {
      id: 2,
      title: "स्वतन्त्र आवाज",
      title_en: "Independent Voice",
      text: "हामी कुनै पनि राजनीतिक वा व्यापारिक प्रभाव बिना, तथ्यमा आधारित भएर मात्र समाचार प्रकाशित गर्छौं।",
      text_en:
        "We publish fact-based news, free from political or commercial influence.",
    },
    {
      id: 3,
      title: "सामुदायिक सरोकार",
      title_en: "Community Rooted",
      text: "विराटनगरमा जरा गाडेको हाम्रो टिम स्थानीय कथा र मानिसहरूसँग नजिक रहन्छ।",
      text_en:
        "Rooted in Biratnagar, our team stays close to local stories and people.",
    },
  ],

  ctaText: "कुनै समाचार वा प्रतिक्रिया छ? हामीलाई सुन्न मन छ।",
  ctaText_en: "Have a story or feedback? We'd love to hear from you.",
  ctaButton: "सम्पर्क गर्नुहोस्",
  ctaButton_en: "Contact Us",
};

export function AboutProvider({ children }) {
  const [about, setAbout] = useState(DEFAULT_ABOUT);

  function updateAbout(updates) {
    setAbout((prev) => ({ ...prev, ...updates }));
  }

  function updateValue(id, updates) {
    setAbout((prev) => ({
      ...prev,
      values: prev.values.map((v) => (v.id === id ? { ...v, ...updates } : v)),
    }));
  }

  function resetAbout() {
    setAbout(DEFAULT_ABOUT);
  }

  return (
    <AboutContext.Provider
      value={{ about, updateAbout, updateValue, resetAbout }}
    >
      {children}
    </AboutContext.Provider>
  );
}

export function useAbout() {
  return useContext(AboutContext);
}
