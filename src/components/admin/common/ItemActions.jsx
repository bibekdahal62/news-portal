import {
  MdEdit,
  MdDeleteOutline,
  MdVisibility,
  MdVisibilityOff,
  MdRemoveRedEye,
} from "react-icons/md";
import { Link } from "react-router-dom";

/**
 * The row of little icon buttons (preview / publish-toggle / edit / delete)
 * that appears at the end of a table row or in the footer of a card. Almost
 * every list page had its own copy of this — same icons, same order, same
 * hover styles — so it's centralized here.
 *
 * Each handler is optional: pass only what a given page actually supports.
 * e.g. Categories don't have a "preview" or "publish" button, just edit/delete.
 */
function ItemActions({
  onPreview,
  isPublished,
  onTogglePublish,
  editTo,
  onDelete,
  deleteDisabled = false,
  deleteDisabledTitle,
}) {
  return (
    <div className="flex items-center justify-end gap-1">
      {onPreview && (
        <button
          onClick={onPreview}
          className="p-2 rounded hover:bg-gray-100 text-gray-600 cursor-pointer"
          title="पूर्वावलोकन"
        >
          <MdRemoveRedEye size={18} />
        </button>
      )}

      {onTogglePublish && (
        <button
          onClick={onTogglePublish}
          className={
            isPublished
              ? "p-2 rounded hover:bg-gray-100 text-gray-600 cursor-pointer"
              : "p-2 rounded hover:bg-green-50 text-green-600 cursor-pointer"
          }
          title={isPublished ? "अप्रकाशित गर्नुहोस्" : "प्रकाशित गर्नुहोस्"}
        >
          {isPublished ? (
            <MdVisibilityOff size={18} />
          ) : (
            <MdVisibility size={18} />
          )}
        </button>
      )}

      {editTo && (
        <Link
          to={editTo}
          className="p-2 rounded hover:bg-gray-100 text-gray-600"
          title="सम्पादन"
        >
          <MdEdit size={18} />
        </Link>
      )}

      {onDelete && (
        <button
          onClick={() => !deleteDisabled && onDelete()}
          disabled={deleteDisabled}
          className="p-2 rounded hover:bg-red-50 text-red-600 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent cursor-pointer"
          title={deleteDisabled ? deleteDisabledTitle : "मेटाउनुहोस्"}
        >
          <MdDeleteOutline size={18} />
        </button>
      )}
    </div>
  );
}

export default ItemActions;
