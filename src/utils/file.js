// Converts an uploaded File into a base64 data URL so it can be stored
// directly on the news/ad item (just a string, same as the old image-URL
// field) and rendered straight into an <img src="..."> with no backend or
// object-storage needed. Since all admin data is in-memory only for this
// session, this is fine for now — a real backend would instead upload the
// file and store a served URL.
export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("कुनै फाइल छानिएको छैन।"));
      return;
    }
    if (!file.type.startsWith("image/")) {
      reject(new Error("कृपया तस्बिर फाइल मात्र छान्नुहोस्।"));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("फाइल पढ्न सकिएन।"));
    reader.readAsDataURL(file);
  });
}