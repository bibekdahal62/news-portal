import { useState } from "react";
import { Link } from "react-router-dom";
import { useNews } from "../../context/NewsContext";
import { MdEdit, MdDeleteOutline } from "react-icons/md";

function AdminNewsList() {
  const { news, deleteNews } = useNews();
  const [query, setQuery] = useState("");
  const [confirmId, setConfirmId] = useState(null);

  const filtered = news.filter((n) =>
    n.headline.toLowerCase().includes(query.toLowerCase()),
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
          <p className="text-gray-500">जम्मा {news.length} समाचार</p>
        </div>
        <Link
          to="/admin/news/new"
          className="px-4 py-2 rounded-md bg-(--primary-color) text-white text-sm font-medium hover:opacity-90"
        >
          + नयाँ समाचार
        </Link>
      </div>

      <input
        type="text"
        placeholder="शीर्षकद्वारा खोज्नुहोस्..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-sm border border-gray-300 rounded-md px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-(--primary-color)"
      />

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full min-w-140 text-sm">
          <thead className="bg-gray-50 text-gray-500 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">समाचार</th>
              <th className="px-4 py-3 font-medium">श्रेणी</th>
              <th className="px-4 py-3 font-medium w-32 text-right">कार्य</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((item) => (
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
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {item.category}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
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
            ))}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="px-4 py-10 text-center text-gray-400"
                >
                  कुनै समाचार फेला परेन।
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
    </div>
  );
}

export default AdminNewsList;
