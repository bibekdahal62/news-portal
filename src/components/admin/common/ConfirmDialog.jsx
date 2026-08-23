/**
 * The "are you sure you want to delete this?" popup. This was the exact
 * same markup in News/Ads/Categories/Gallery/Videos list pages (only the
 * message text changed), so instead of keeping 5 copies in sync we render
 * one version and pass the message in.
 *
 * `open` just controls whether it renders — keeping it dumb like this makes
 * it easy to drop into any page without worrying about its own state.
 */
function ConfirmDialog({
  open,
  title = "मेटाउने पुष्टि गर्नुहोस्",
  message,
  confirmLabel = "मेटाउनुहोस्",
  cancelLabel = "रद्द गर्नुहोस्",
  onConfirm,
  onCancel,
  children, // for extra content, e.g. the "N news use this category" warning
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">{message}</p>
        {children}
        <div className="flex justify-end gap-3 mt-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-50 cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 cursor-pointer"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
