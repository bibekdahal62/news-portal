import { useEffect, useState } from "react";
import { useAds } from "../context/AdsContext";

// Renders every active ad assigned to `slot`, optionally further filtered
// by which page it's allowed to appear on.
function AdBanner({ slot, page }) {
  const { ads } = useAds();

  const slotAds = ads.filter((a) => {
    if (a.slot !== slot || !a.active) return false;
    if (page === "home") return a.showOnHome !== false;
    if (page === "news") return a.showOnNews !== false;
    return true;
  });

  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  // Rotate home-top ads every 5 seconds
  useEffect(() => {
    if (slot !== "home-top" || slotAds.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % slotAds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slot, slotAds.length]);

  // Reset index if the ads change
  useEffect(() => {
    setCurrentAdIndex(0);
  }, [slot, slotAds.length]);

  if (slotAds.length === 0) return null;

  // For home-top, show only the current ad
  const displayedAds =
    slot === "home-top" ? [slotAds[currentAdIndex]] : slotAds;

  return (
    <div className="flex flex-col gap-4 mb-6 w-full xl:min-w-sm shadow-lg">
      {displayedAds.map((ad) => (
        <a
          key={ad.id}
          href={ad.link}
          target="_blank"
          rel="noopener sponsored"
          className="block relative rounded-lg overflow-hidden shadow-sm border border-gray-100"
        >
          <span className="absolute top-2 left-2 bg-black/60 text-white text-sm uppercase tracking-wide px-2 py-0.5 rounded">
            विज्ञापन
          </span>

          <img
            src={ad.image}
            alt={ad.alt || "Advertisement"}
            className={
              slot === "home-side"
                ? "w-full xl:max-w-md object-contain h-full"
                : "w-full object-contain max-h-64"
            }
          />
        </a>
      ))}
    </div>
  );
}

export default AdBanner;
