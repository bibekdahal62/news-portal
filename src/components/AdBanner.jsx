import { useAds } from "../context/AdsContext";

// Renders every active ad assigned to `slot`, optionally further filtered
// by which page it's allowed to appear on (`page="home"` or `page="news"`),
// matching the ad's showOnHome/showOnNews checkboxes set in the admin
// panel. If `page` is omitted, only slot + active are checked (used by
// pages like videos that aren't part of the home/news targeting feature).
function AdBanner({ slot, page }) {
  const { ads } = useAds();

  const slotAds = ads.filter((a) => {
    if (a.slot !== slot || !a.active) return false;
    if (page === "home") return a.showOnHome !== false;
    if (page === "news") return a.showOnNews !== false;
    return true;
  });

  if (slotAds.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 mb-6 w-full xl:min-w-sm shadow-lg">
      {slotAds.map((ad) => (
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
                ? `w-full xl:max-w-md object-contain h-full`
                : `w-full object-contain max-h-64`
            }
          />
        </a>
      ))}
    </div>
  );
}

export default AdBanner;
