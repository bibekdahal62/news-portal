import { fileToDataUrl } from "../../../utils/file";

/**
 * File input styled to match the rest of the form, plus a preview image
 * once something is picked. Handles the fileToDataUrl conversion itself
 * so every form isn't rewriting the same try/catch.
 *
 * `value` is the current image (data URL or existing image URL when
 * editing), `onChange` is called with the new data URL once the file is
 * read. `onError` is optional, for forms that show their own error banner.
 */
function ImageUploadField({ label, value, onChange, onError, previewClassName = "mt-2 h-32 w-full object-cover rounded border border-gray-100" }) {
  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const dataUrl = await fileToDataUrl(file);
      onChange(dataUrl);
    } catch (err) {
      onError?.(err.message);
    }
  }

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color) file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-(--primary-color) file:text-white file:text-sm file:font-medium file:cursor-pointer cursor-pointer"
      />
      {value && (
        <img
          src={value}
          alt="preview"
          className={previewClassName}
          // if the stored data URL/path is bad, just hide it instead of
          // showing a broken-image icon
          onError={(e) => (e.target.style.display = "none")}
        />
      )}
    </div>
  );
}

export default ImageUploadField;
