import { createContext, useContext, useState } from "react";

const GalleryContext = createContext();

function nextId(list) {
  return list.length ? Math.max(...list.map((item) => item.id)) + 1 : 1;
}

// Generates a per-image id that only needs to be unique within one
// album's own `images` array — used as a React key and to target a
// specific image for caption edits, cover selection, reordering, and
// removal. Exported so the admin form can assign ids as images are
// added, before the album itself is saved.
export function nextImageId(images) {
  return images.length ? Math.max(...images.map((img) => img.id)) + 1 : 1;
}

// In-memory only for this session — no localStorage, no backend, same
// approach as NewsContext/VideoContext. Albums added/edited by the admin
// work immediately but are lost on refresh.
export function GalleryProvider({ children }) {
  const [albums, setAlbums] = useState([]);

  // `albums` (raw, everything) is for the admin panel, which needs to see
  // and manage drafts/unpublished albums too. `publishedAlbums` is what
  // every public-facing page/component should read from instead.
  const publishedAlbums = albums.filter((a) => a.published !== false);

  function addAlbum({ images = [], coverImageId, ...rest }) {
    const id = nextId(albums);
    const item = {
      title: "",
      title_en: "",
      description: "",
      description_en: "",
      published: true,
      createdAt: new Date().toISOString(),
      ...rest,
      id,
      images,
      // Falls back to the first image so a freshly-added album always has
      // a usable cover as soon as it has at least one image.
      coverImageId: coverImageId ?? (images[0] ? images[0].id : null),
    };
    setAlbums((prev) => [item, ...prev]);
    return item;
  }

  function updateAlbum(id, updates) {
    setAlbums((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, ...updates, updatedAt: new Date().toISOString() }
          : a,
      ),
    );
  }

  function deleteAlbum(id) {
    setAlbums((prev) => prev.filter((a) => a.id !== id));
  }

  // Flips published <-> unpublished for one album.
  function togglePublish(id) {
    setAlbums((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              published: !(a.published !== false),
              updatedAt: new Date().toISOString(),
            }
          : a,
      ),
    );
  }

  // Looks up by id across ALL albums (published or not) - the admin edit
  // form needs this to load drafts too. Public pages that use this
  // (galleryDetail) are responsible for checking `.published` themselves
  // so an unpublished album's direct URL doesn't leak its content.
  function getAlbumById(id) {
    return albums.find((a) => String(a.id) === String(id));
  }

  // Returns the album's designated cover image, falling back to the
  // first image if no cover is set (or the chosen cover was deleted).
  // Returns null for an album with no images yet.
  function getCoverImage(album) {
    if (!album || !album.images?.length) return null;
    return (
      album.images.find((img) => img.id === album.coverImageId) ||
      album.images[0]
    );
  }

  return (
    <GalleryContext.Provider
      value={{
        albums,
        publishedAlbums,
        addAlbum,
        updateAlbum,
        deleteAlbum,
        togglePublish,
        getAlbumById,
        getCoverImage,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
}

export function useGallery() {
  return useContext(GalleryContext);
}
