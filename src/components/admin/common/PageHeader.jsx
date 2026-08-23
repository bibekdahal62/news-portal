import { Link } from "react-router-dom";

/**
 * Every admin list page starts with the same header: a title + a small
 * description underneath, and an "add new" button on the right. It was
 * copy-pasted into all 5 list pages with only the text changing, so it's
 * pulled out here.
 *
 * `action` is optional — pages like the dashboard don't need one.
 */
function PageHeader({ title, subtitle, actionLabel, actionTo }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-gray-500">{subtitle}</p>}
      </div>

      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="px-4 py-2 rounded-md bg-(--primary-color) text-white text-sm font-medium hover:opacity-90"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export default PageHeader;
