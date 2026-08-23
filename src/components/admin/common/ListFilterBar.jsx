/**
 * The "search by title" + category dropdown + status dropdown row above
 * the News and Videos tables. Both pages had this as identical JSX, so it's
 * one component now — pass in the categories and let the parent own the
 * actual filter state/logic (this component doesn't filter anything itself,
 * it just renders the controls).
 */
function ListFilterBar({
  query,
  onQueryChange,
  categoryFilter,
  onCategoryChange,
  categories,
  statusFilter,
  onStatusChange,
}) {
  return (
    <div className="flex flex-wrap gap-3 mb-4">
      <input
        type="text"
        placeholder="शीर्षकद्वारा खोज्नुहोस्..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="w-full max-w-sm border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)"
      />

      <select
        value={categoryFilter}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color) text-sm"
      >
        <option value="all">सबै श्रेणी</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>

      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color) text-sm"
      >
        <option value="all">सबै स्थिति</option>
        <option value="published">प्रकाशित</option>
        <option value="draft">ड्राफ्ट</option>
      </select>
    </div>
  );
}

export default ListFilterBar;
