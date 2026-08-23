// News items now carry a real ISO timestamp (`publishedAt`, set on the seed
// data and on every admin create/update) instead of a hand-typed string like
// "१ घण्टा अगाडि". This converts that timestamp into the same style of
// relative Nepali label at render time.

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

// Returns the relative-time display string for a news item. Prefers the
// real `publishedAt` timestamp (present on every item now, seed or
// admin-created); falls back to the legacy `createdAt`/`time` fields only
// for any leftover/older records that might not have been migrated.
export function displayTime(newsItem) {
  if (newsItem.publishedAt) return relativeTimeNe(newsItem.publishedAt);
  if (newsItem.createdAt) return relativeTimeNe(newsItem.createdAt);
  return newsItem.time || "";
}

// Full, readable absolute date+time for the article detail page, e.g.
// "2026-08-16, बिहान ९:००". Falls back gracefully if no timestamp exists.
export function fullDateTimeNe(newsItem) {
  const iso = newsItem.publishedAt || newsItem.createdAt;
  if (!iso) return "";
  const d = new Date(iso);
  const datePart = d.toLocaleDateString("en-CA"); // YYYY-MM-DD
  const timePart = toNepaliDigits(
    d.toLocaleTimeString("ne-NP", { hour: "2-digit", minute: "2-digit" }),
  );
  return `${datePart}, ${timePart}`;
}

// Compact, localized view count, e.g. 12400 -> "१२.४ हजार".
export function formatViewsNe(views) {
  if (!views && views !== 0) return "";
  if (views < 1000) return toNepaliDigits(views);
  if (views < 100000)
    return `${toNepaliDigits((views / 1000).toFixed(1))} हजार`;
  return `${toNepaliDigits((views / 100000).toFixed(1))} लाख`;
}

// Converts an ISO timestamp into the "YYYY-MM-DDTHH:mm" string that an
// <input type="datetime-local"> expects, in the browser's local time.
// Falls back to "now" if no timestamp is given (new/unsaved items).
export function toDatetimeLocalValue(iso) {
  const d = iso ? new Date(iso) : new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const min = pad(d.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}

// Converts a "YYYY-MM-DDTHH:mm" datetime-local value back into a real ISO
// timestamp for storage. Falls back to "now" if the value is empty/invalid.
export function fromDatetimeLocalValue(value) {
  const d = value ? new Date(value) : new Date();
  return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}
