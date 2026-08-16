import { createContext, useContext, useState } from "react";

const PrivacyContext = createContext();

// Extra privacy-policy sections the admin can add on top of the page's
// default hardcoded content. Held in React state only for this session —
// nothing is written to localStorage, consistent with News/Ads/Video/
// ContactMessage. Refreshing the page resets it back to just the defaults.
export function PrivacyProvider({ children }) {
  const [sections, setSections] = useState([]);

  function addSection({ heading, body }) {
    const id = sections.length ? Math.max(...sections.map((s) => s.id)) + 1 : 1;
    const section = { id, heading, body, createdAt: new Date().toISOString() };
    setSections((prev) => [...prev, section]);
    return section;
  }

  function updateSection(id, updates) {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    );
  }

  function deleteSection(id) {
    setSections((prev) => prev.filter((s) => s.id !== id));
  }

  function getSectionById(id) {
    return sections.find((s) => String(s.id) === String(id));
  }

  return (
    <PrivacyContext.Provider
      value={{
        sections,
        addSection,
        updateSection,
        deleteSection,
        getSectionById,
      }}
    >
      {children}
    </PrivacyContext.Provider>
  );
}

export function usePrivacy() {
  return useContext(PrivacyContext);
}
