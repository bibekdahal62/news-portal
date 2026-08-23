import { createContext, useContext, useState } from "react";

const CategoryContext = createContext();

// Seed data — these are the categories the site already ships with today
// (previously a plain array in utils/categories.js). "समाचार" (News) and
// "रोचक" (Interesting/homepage picks) are core categories used elsewhere
// in the app, so they're seeded as enabled and can't be deleted, only
// disabled — deleting them would silently break homepage/nav logic that
// assumes they exist.
//
// showInNav controls whether the category gets a link in the public site's
// top nav. This is separate from `enabled` (which controls whether it's
// selectable in the news form) — "रोचक" and "कला साहित्य" are usable
// categories for tagging news, but were never meant to clutter the main
// nav, matching how the site behaved before this became admin-editable.
const PROTECTED_NAMES = ["समाचार"];

const SEED_CATEGORIES = [
  { id: 1, name: "समाचार", nameEn: "News", enabled: true, showInNav: true },
  { id: 2, name: "अर्थ", nameEn: "Economy", enabled: true, showInNav: true },
  {
    id: 3,
    name: "राजनीति",
    nameEn: "Politics",
    enabled: true,
    showInNav: true,
  },
  { id: 4, name: "स्थानिय", nameEn: "Local", enabled: true, showInNav: true },
  { id: 5, name: "खेलकुद", nameEn: "Sports", enabled: true, showInNav: true },
  {
    id: 6,
    name: "मनोरञ्जन",
    nameEn: "Entertainment",
    enabled: true,
    showInNav: true,
  },
  {
    id: 7,
    name: "अन्तर्राष्ट्रिय",
    nameEn: "International",
    enabled: true,
    showInNav: true,
  },
  {
    id: 8,
    name: "रोचक",
    nameEn: "Interesting",
    enabled: true,
    showInNav: true,
  },
  {
    id: 9,
    name: "कला साहित्य",
    nameEn: "Arts & Literature",
    enabled: true,
    showInNav: true,
  },
  {
    id: 10,
    name: "शिक्षा",
    nameEn: "Education",
    enabled: true,
    showInNav: true,
  },
];

// In-memory only for this session — no localStorage, no backend, matching
// the rest of the admin contexts (Ads, Videos, etc.). Order in the array
// IS the display order; reordering just swaps neighbouring items instead
// of maintaining a separate "order" number.
export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState(SEED_CATEGORIES);

  function addCategory(category) {
    const id = categories.length
      ? Math.max(...categories.map((c) => c.id)) + 1
      : 1;
    const item = {
      id,
      enabled: true,
      showInNav: false,
      createdAt: new Date().toISOString(),
      ...category,
    };
    setCategories((prev) => [...prev, item]);
    return item;
  }

  function updateCategory(id, updates) {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    );
  }

  function deleteCategory(id) {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }

  function toggleEnabled(id) {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c)),
    );
  }

  function toggleShowInNav(id) {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, showInNav: !c.showInNav } : c)),
    );
  }

  // direction: -1 to move up, +1 to move down. Swaps with the adjacent
  // item so it's a no-op at either end of the list.
  function moveCategory(id, direction) {
    setCategories((prev) => {
      const index = prev.findIndex((c) => c.id === id);
      const targetIndex = index + direction;
      if (index === -1 || targetIndex < 0 || targetIndex >= prev.length) {
        return prev;
      }
      const next = [...prev];
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return next;
    });
  }

  function getCategoryById(id) {
    return categories.find((c) => String(c.id) === String(id));
  }

  function isProtected(category) {
    return PROTECTED_NAMES.includes(category?.name);
  }

  // What the news form / news-list filter should offer: enabled
  // categories, in their configured order.
  const enabledCategories = categories.filter((c) => c.enabled);

  // What the public site header/footer nav should render: enabled AND
  // flagged for nav, in configured order.
  const navCategories = categories.filter((c) => c.enabled && c.showInNav);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        enabledCategories,
        navCategories,
        addCategory,
        updateCategory,
        deleteCategory,
        toggleEnabled,
        toggleShowInNav,
        moveCategory,
        getCategoryById,
        isProtected,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  return useContext(CategoryContext);
}
