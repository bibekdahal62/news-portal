import { Link } from "react-router-dom";

/**
 * "Save" + "Cancel" buttons at the bottom of a form. `cancelTo` is a route
 * (most forms just navigate back to their list), but some flows might want
 * a click handler instead, so `onCancel` is supported too.
 */
function FormActions({
  submitLabel,
  cancelLabel = "रद्द गर्नुहोस्",
  cancelTo,
  onCancel,
}) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <button
        type="submit"
        className="px-5 py-2.5 rounded-md bg-(--primary-color) text-white text-sm font-medium hover:opacity-90 cursor-pointer"
      >
        {submitLabel}
      </button>

      {cancelTo ? (
        <Link
          to={cancelTo}
          className="px-5 py-2.5 rounded-md border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          {cancelLabel}
        </Link>
      ) : (
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-md border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 cursor-pointer"
        >
          {cancelLabel}
        </button>
      )}
    </div>
  );
}

export default FormActions;
