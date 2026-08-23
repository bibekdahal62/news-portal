import { Link } from "react-router-dom";

/**
 * This used to be a tiny component declared right inside adminDashboard.jsx.
 * Moving it here doesn't change anything today, but it means if we ever
 * want a similar "big number + icon" tile elsewhere (e.g. a reports page)
 * we're not copy-pasting it out of the dashboard file.
 */
function StatCard({ icon: Icon, label, value, to }) {
  return (
    <Link
      to={to}
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
    >
      <div className="w-12 h-12 rounded-full bg-(--primary-color)/10 flex items-center justify-center text-(--primary-color)">
        <Icon size={24} />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </Link>
  );
}

export default StatCard;
