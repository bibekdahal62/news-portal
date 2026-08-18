import { useState } from "react";
import { Link } from "react-router-dom";
import { useCategories } from "../../context/CategoryContext";
import { useNews } from "../../context/NewsContext";
import {
  MdEdit,
  MdDeleteOutline,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdLock,
} from "react-icons/md";

function AdminCategoriesList() {
  const {
    categories,
    updateCategory,
    deleteCategory,
    toggleEnabled,
    toggleShowInNav,
    moveCategory,
    isProtected,
  } = useCategories();
  const { news } = useNews();
  const [confirmId, setConfirmId] = useState(null);

  function newsCountFor(categoryName) {
    return news.filter((n) => n.category === categoryName).length;
  }

  function handleDelete(id) {
    deleteCategory(id);
    setConfirmId(null);
  }

  const confirmCategory = confirmId
    ? categories.find((c) => c.id === confirmId)
    : null;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            श्रेणी व्यवस्थापन
          </h1>
          <p className="text-gray-500">जम्मा {categories.length} श्रेणी</p>
        </div>
        <Link
          to="/admin/categories/new"
          className="px-4 py-2 rounded-md bg-(--primary-color) text-white text-sm font-medium hover:opacity-90"
        >
          + नयाँ श्रेणी
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-left">
            <tr>
              <th className="px-4 py-3 font-medium w-24">क्रम</th>
              <th className="px-4 py-3 font-medium">नेपाली नाम</th>
              <th className="px-4 py-3 font-medium">अंग्रेजी नाम</th>
              <th className="px-4 py-3 font-medium">समाचार</th>
              <th className="px-4 py-3 font-medium">स्थिति</th>
              <th className="px-4 py-3 font-medium text-right">कार्यहरू</th>
              <th className="px-4 py-3 font-medium">मेनुमा</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map((cat, index) => (
              <tr key={cat.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveCategory(cat.id, -1)}
                      disabled={index === 0}
                      className="p-1 rounded hover:bg-gray-100 text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      title="माथि सार्नुहोस्"
                    >
                      <MdKeyboardArrowUp size={18} />
                    </button>
                    <button
                      onClick={() => moveCategory(cat.id, 1)}
                      disabled={index === categories.length - 1}
                      className="p-1 rounded hover:bg-gray-100 text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      title="तल सार्नुहोस्"
                    >
                      <MdKeyboardArrowDown size={18} />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-gray-800">
                  <div className="flex items-center gap-1.5">
                    {cat.name}
                    {isProtected(cat) && (
                      <span title="मुख्य श्रेणी - मेटाउन मिल्दैन">
                        <MdLock size={13} className="text-gray-400" />
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{cat.nameEn}</td>
                <td className="px-4 py-3 text-gray-600">
                  {newsCountFor(cat.name)}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleEnabled(cat.id)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer ${
                      cat.enabled
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {cat.enabled ? "सक्रिय" : "निष्क्रिय"}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      to={`/admin/categories/${cat.id}/edit`}
                      className="p-2 rounded hover:bg-gray-100 text-gray-600"
                      title="सम्पादन"
                    >
                      <MdEdit size={18} />
                    </Link>
                    <button
                      onClick={() => !isProtected(cat) && setConfirmId(cat.id)}
                      disabled={isProtected(cat)}
                      className="p-2 rounded hover:bg-red-50 text-red-600 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent cursor-pointer"
                      title={
                        isProtected(cat)
                          ? "मुख्य श्रेणी मेटाउन मिल्दैन"
                          : "मेटाउनुहोस्"
                      }
                    >
                      <MdDeleteOutline size={18} />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleShowInNav(cat.id)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer ${
                      cat.showInNav
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {cat.showInNav ? "देखिन्छ" : "लुकेको"}
                  </button>
                </td>
              </tr>
            ))}

            {categories.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-gray-400"
                >
                  कुनै श्रेणी फेला परेन।
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {confirmCategory && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h3 className="font-semibold text-gray-900 mb-2">
              मेटाउने पुष्टि गर्नुहोस्
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              के तपाईं "{confirmCategory.name}" श्रेणी मेटाउन निश्चित हुनुहुन्छ?
              यो कार्य फिर्ता गर्न सकिँदैन।
            </p>
            {newsCountFor(confirmCategory.name) > 0 && (
              <p className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-md px-3 py-2 mb-3">
                यस श्रेणीमा हाल {newsCountFor(confirmCategory.name)} वटा समाचार
                छन्। मेटाएपछि ती समाचारहरूको श्रेणी अमान्य हुनेछ।
              </p>
            )}
            <div className="flex justify-end gap-3 mt-3">
              <button
                onClick={() => setConfirmId(null)}
                className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-50 cursor-pointer"
              >
                रद्द गर्नुहोस्
              </button>
              <button
                onClick={() => handleDelete(confirmCategory.id)}
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

export default AdminCategoriesList;
