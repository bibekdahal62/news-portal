import { useAds } from "../context/AdsContext";

// Renders every active ad assigned to `slot`. Currently only "home-top" is
// used (top of the homepage news grid), but any new placement just needs a
// new slot value in the admin form and a matching <AdBanner slot="..." />.
function AdBanner({ slot }) {
  const { ads } = useAds();
  const slotAds = ads.filter((a) => a.slot === slot && a.active);

  if (slotAds.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 mb-6 w-full">
      {slotAds.map((ad) => (
        <a
          key={ad.id}
          href={ad.link}
          target="_blank"
          rel="noopener sponsored"
          className="block relative rounded-lg overflow-hidden shadow-sm border border-gray-100"
        >
          <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] uppercase tracking-wide px-2 py-0.5 rounded">
            विज्ञापन
          </span>
          <img
            src={ad.image}
            alt={ad.alt || "Advertisement"}
            className={
              slot === "home-side"
                ? `w-full object-contain h-full`
                : `w-full object-contain max-h-40`
            }
          />
        </a>
      ))}
    </div>
  );
}

export default AdBanner;
