import { createContext, useContext, useState } from "react";

const TermsContext = createContext();

// Extra terms-of-service sections the admin can add on top of the page's
// default hardcoded content. Held in React state only for this session —
// nothing is written to localStorage, consistent with News/Ads/Video/
// ContactMessage/Privacy. Mirrors PrivacyContext exactly.
export function TermsProvider({ children }) {
  const [sections, setSections] = useState([]);

  function addSection(section) {
    const id = sections.length ? Math.max(...sections.map((s) => s.id)) + 1 : 1;
    const newSection = {
      ...section,
      id,
      createdAt: new Date().toISOString(),
    };
    setSections((prev) => [...prev, newSection]);
    return newSection;
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
    <TermsContext.Provider
      value={{
        sections,
        addSection,
        updateSection,
        deleteSection,
        getSectionById,
      }}
    >
      {children}
    </TermsContext.Provider>
  );
}

export function useTerms() {
  return useContext(TermsContext);
}
