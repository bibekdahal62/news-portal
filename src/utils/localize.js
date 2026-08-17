// Swaps a news item's Nepali fields for their English counterparts when
// lang === "en". Falls back to the Nepali field whenever the English one
// is missing/empty, so older items (seeded before _en fields existed)
// still render instead of going blank.
export function localizeNews(item, lang) {
  if (!item) return item;
  if (lang !== "en") return item;

  return {
    ...item,
    headline: item.headline_en?.trim() ? item.headline_en : item.headline,
    description: item.description_en?.trim()
      ? item.description_en
      : item.description,
    content: item.content_en?.trim() ? item.content_en : item.content,
  };
}

export function localizeNewsList(list, lang) {
  return list.map((item) => localizeNews(item, lang));
}