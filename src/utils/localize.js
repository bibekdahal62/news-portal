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

// Same fallback pattern as localizeNews, but for heading/body pairs used
// by admin-added content sections (e.g. extra Privacy Policy sections).
// Falls back to the Nepali field whenever the English one is missing, so
// sections added before bilingual fields existed still render correctly.
export function localizeSection(section, lang) {
  if (!section) return section;
  if (lang !== "en") return section;

  return {
    ...section,
    heading: section.heading_en?.trim() ? section.heading_en : section.heading,
    body: section.body_en?.trim() ? section.body_en : section.body,
  };
}

export function localizeSectionList(list, lang) {
  return list.map((section) => localizeSection(section, lang));
}

// Same fallback pattern, for gallery albums: swaps title/description and
// every image's caption for their English counterparts when lang === "en",
// falling back to the Nepali text whenever the English one is empty.
export function localizeAlbum(album, lang) {
  if (!album) return album;
  if (lang !== "en") return album;

  return {
    ...album,
    title: album.title_en?.trim() ? album.title_en : album.title,
    description: album.description_en?.trim()
      ? album.description_en
      : album.description,
    images: (album.images || []).map((img) => ({
      ...img,
      caption: img.caption_en?.trim() ? img.caption_en : img.caption,
    })),
  };
}
