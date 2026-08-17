import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNews } from "../../context/NewsContext";
import { CATEGORIES } from "../../utils/categories";
import NewsPreviewModal from "../../components/admin/NewsPreviewModal";
import {
  MdEdit,
  MdDeleteOutline,
  MdVisibility,
  MdVisibilityOff,
  MdRemoveRedEye,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

const PAGE_SIZE = 8;

function AdminNewsList() {
  const { news, deleteNews, togglePublish } = useNews();
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [confirmId, setConfirmId] = useState(null);
  const [previewItem, setPreviewItem] = useState(null);

  const filtered = news.filter((n) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      n.headline.toLowerCase().includes(q) ||
      (n.headline_en || "").toLowerCase().includes(q);

    const matchesCategory =
      categoryFilter === "all" || n.category === categoryFilter;

    const isPublished = n.published !== false;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" && isPublished) ||
      (statusFilter === "draft" && !isPublished);

    return matchesQuery && matchesCategory && matchesStatus;
  });

  // Reset to page 1 whenever a filter changes, so we never get stuck on
  // an out-of-range page (e.g. was on page 3, filter now only has 1 page).
  useEffect(() => {
    setPage(1);
  }, [query, categoryFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  function handleDelete(id) {
    deleteNews(id);
    setConfirmId(null);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            समाचार व्यवस्थापन
          </h1>
          <p className="text-gray-500">
            जम्मा {news.length} समाचार मध्ये {filtered.length} देखाइँदै
          </p>
        </div>
        <Link
          to="/admin/news/new"
          className="px-4 py-2 rounded-md bg-(--primary-color) text-white text-sm font-medium hover:opacity-90"
        >
          + नयाँ समाचार
        </Link>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="शीर्षकद्वारा खोज्नुहोस्..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-sm border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color)"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color) text-sm"
        >
          <option value="all">सबै श्रेणी</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--primary-color) text-sm"
        >
          <option value="all">सबै स्थिति</option>
          <option value="published">प्रकाशित</option>
          <option value="draft">ड्राफ्ट</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full min-w-160 text-sm">
          <thead className="bg-gray-50 text-gray-500 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">समाचार</th>
              <th className="px-4 py-3 font-medium">श्रेणी</th>
              <th className="px-4 py-3 font-medium">लेखक</th>
              <th className="px-4 py-3 font-medium">हेराइ</th>
              <th className="px-4 py-3 font-medium">स्थिति</th>
              <th className="px-4 py-3 font-medium w-48 text-right">कार्य</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paged.map((item) => {
              const isPublished = item.published !== false;
              return (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.headline}
                        className="w-14 h-10 object-cover rounded shrink-0"
                      />
                      <span className="line-clamp-2 text-gray-900 max-w-55 sm:max-w-none">
                        {item.headline}
                        {item.isBreaking && (
                          <span className="ml-2 inline-block bg-yellow-400 text-gray-900 text-[10px] font-bold px-1.5 py-0.5 rounded align-middle">
                            ब्रेकिङ
                          </span>
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {item.author || "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {typeof item.views === "number" ? item.views : "—"}
                  </td>
                  <td className="px-4 py-3">
                    {isPublished ? (
                      <span className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded">
                        प्रकाशित
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-500 border border-gray-200 px-2 py-1 rounded">
                        ड्राफ्ट
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setPreviewItem(item)}
                        className="p-2 rounded hover:bg-gray-100 text-gray-600 cursor-pointer"
                        title="पूर्वावलोकन"
                      >
                        <MdRemoveRedEye size={18} />
                      </button>
                      <button
                        onClick={() => togglePublish(item.id)}
                        className={
                          isPublished
                            ? "p-2 rounded hover:bg-gray-100 text-gray-600 cursor-pointer"
                            : "p-2 rounded hover:bg-green-50 text-green-600 cursor-pointer"
                        }
                        title={
                          isPublished
                            ? "अप्रकाशित गर्नुहोस्"
                            : "प्रकाशित गर्नुहोस्"
                        }
                      >
                        {isPublished ? (
                          <MdVisibilityOff size={18} />
                        ) : (
                          <MdVisibility size={18} />
                        )}
                      </button>
                      <Link
                        to={`/admin/news/${item.id}/edit`}
                        className="p-2 rounded hover:bg-gray-100 text-gray-600"
                        title="सम्पादन"
                      >
                        <MdEdit size={18} />
                      </Link>
                      <button
                        onClick={() => setConfirmId(item.id)}
                        className="p-2 rounded hover:bg-red-50 text-red-600 cursor-pointer"
                        title="मेटाउनुहोस्"
                      >
                        <MdDeleteOutline size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {paged.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-gray-400"
                >
                  कुनै समाचार फेला परेन।
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filtered.length > 0 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500">
            पृष्ठ {currentPage} / {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded border border-gray-300 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
              aria-label="अघिल्लो पृष्ठ"
            >
              <MdChevronLeft size={18} />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded border border-gray-300 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
              aria-label="अर्को पृष्ठ"
            >
              <MdChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {confirmId !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h3 className="font-semibold text-gray-900 mb-2">
              मेटाउने पुष्टि गर्नुहोस्
            </h3>
            <p className="text-sm text-gray-500 mb-5">
              के तपाईं यो समाचार मेटाउन निश्चित हुनुहुन्छ? यो कार्य फिर्ता गर्न
              सकिँदैन।
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmId(null)}
                className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-50 cursor-pointer"
              >
                रद्द गर्नुहोस्
              </button>
              <button
                onClick={() => handleDelete(confirmId)}
                className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 cursor-pointer"
              >
                मेटाउनुहोस्
              </button>
            </div>
          </div>
        </div>
      )}

      {previewItem && (
        <NewsPreviewModal
          item={previewItem}
          onClose={() => setPreviewItem(null)}
        />
      )}
    </div>
  );
}

export default AdminNewsList;
