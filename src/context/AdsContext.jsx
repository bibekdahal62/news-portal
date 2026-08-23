import { createContext, useContext, useState } from "react";
import { getAdStatus } from "../utils/ads";

const AdsContext = createContext();

// In-memory only for this session — no localStorage, no backend. Ads
// added/edited by the admin work immediately but are lost on refresh.
export function AdsProvider({ children }) {
  const [ads, setAds] = useState([]);

  function addAd(ad) {
    const id = ads.length ? Math.max(...ads.map((a) => a.id)) + 1 : 1;
    const item = {
      id,
      active: true,
      showOnHome: true,
      showOnNews: true,
      startDate: "",
      endDate: "",
      createdAt: new Date().toISOString(),
      ...ad,
    };
    setAds((prev) => [item, ...prev]);
    return item;
  }

  function updateAd(id, updates) {
    setAds((prev) => prev.map((a) => (a.id === id ? { ...a, ...updates } : a)));
  }

  function deleteAd(id) {
    setAds((prev) => prev.filter((a) => a.id !== id));
  }

  function getAdById(id) {
    return ads.find((a) => String(a.id) === String(id));
  }

  // "Live" means the schedule + active toggle both currently allow the ad
  // to show — not just that the admin hasn't switched it off.
  const homeTopAds = ads.filter(
    (a) => a.slot === "home-top" && getAdStatus(a) === "active",
  );

  return (
    <AdsContext.Provider
      value={{ ads, addAd, updateAd, deleteAd, getAdById, homeTopAds }}
    >
      {children}
    </AdsContext.Provider>
  );
}

export function useAds() {
  return useContext(AdsContext);
}
