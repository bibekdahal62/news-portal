// Human-readable labels for each placement slot. Shared between the ad
// form (dropdown) and the ad list (badge) so they never drift apart.
export const SLOT_LABELS = {
  "home-top": "गृहपृष्ठ - समाचार सूची माथि",
  "home-side": "गृहपृष्ठ - समाचार सूची छेउमा",
  "home-bottom": "गृहपृष्ठ - समाचार सूची तल",
};

// An ad can be turned off manually (active=false) or scheduled to run only
// between a start and end date. This combines both into one status so the
// admin list/preview can show a single, clear badge instead of just a
// raw on/off checkbox.
//
// Returns one of: "inactive" | "scheduled" | "active" | "expired"
export function getAdStatus(ad, now = new Date()) {
  if (!ad.active) return "inactive";

  if (ad.startDate) {
    const start = new Date(`${ad.startDate}T00:00:00`);
    if (now < start) return "scheduled";
  }

  if (ad.endDate) {
    const end = new Date(`${ad.endDate}T23:59:59`);
    if (now > end) return "expired";
  }

  return "active";
}

export const AD_STATUS_LABELS = {
  active: "सक्रिय",
  inactive: "निष्क्रिय",
  scheduled: "तालिकाबद्ध",
  expired: "म्याद सकिएको",
};

export const AD_STATUS_STYLES = {
  active: "bg-green-50 text-green-700 border border-green-200",
  inactive: "bg-gray-100 text-gray-500 border border-gray-200",
  scheduled: "bg-amber-50 text-amber-700 border border-amber-200",
  expired: "bg-red-50 text-red-700 border border-red-200",
};
