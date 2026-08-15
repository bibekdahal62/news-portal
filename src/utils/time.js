// The original seed data stores "time" as a hand-typed string like
// "१ घण्टा अगाडि". That obviously can't work for news created through
// the admin panel, so new/edited items store a real ISO `createdAt`
// timestamp instead, and this function turns it into the same style
// of relative label at render time.

const NEPALI_DIGITS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

function toNepaliDigits(num) {
  return String(num)
    .split("")
    .map((ch) => (/[0-9]/.test(ch) ? NEPALI_DIGITS[Number(ch)] : ch))
    .join("");
}

export function relativeTimeNe(isoString) {
  if (!isoString) return "";
  const diffMs = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diffMs / 60000);

  if (minutes < 1) return "अहिले भर्खर";
  if (minutes < 60) return `${toNepaliDigits(minutes)} मिनेट अगाडि`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${toNepaliDigits(hours)} घण्टा अगाडि`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${toNepaliDigits(days)} दिन अगाडि`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${toNepaliDigits(months)} महिना अगाडि`;
  const years = Math.floor(months / 12);
  return `${toNepaliDigits(years)} वर्ष अगाडि`;
}

// Returns the display string for a news item: prefer a computed
// relative time when we have a real timestamp, otherwise fall back to
// whatever static "time" string came from the seed JSON.
export function displayTime(newsItem) {
  if (newsItem.createdAt) return relativeTimeNe(newsItem.createdAt);
  return newsItem.time || "";
}
