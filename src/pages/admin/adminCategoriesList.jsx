import { useState } from "react";
import { useCategories } from "../../context/CategoryContext";
import { useNews } from "../../context/NewsContext";
import {
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdLock,
} from "react-icons/md";
import { PageHeader, ConfirmDialog, ItemActions } from "../../components/admin/common";

function AdminCategoriesList() {
  const {
    categories,
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
      <PageHeader
        title="श्रेणी व्यवस्थापन"
        subtitle={`जम्मा ${categories.length} श्रेणी`}
        actionLabel="+ नयाँ श्रेणी"
        actionTo="/admin/categories/new"
      />

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
                  {/* Not a StatusBadge — this one's clickable to toggle,
                      the shared badge is display-only, so keep it local. */}
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
                  <ItemActions
                    editTo={`/admin/categories/${cat.id}/edit`}
                    onDelete={() => setConfirmId(cat.id)}
                    deleteDisabled={isProtected(cat)}
                    deleteDisabledTitle="मुख्य श्रेणी मेटाउन मिल्दैन"
                  />
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
                  colSpan={7}
                  className="px-4 py-10 text-center text-gray-400"
                >
                  कुनै श्रेणी फेला परेन।
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={Boolean(confirmCategory)}
        onCancel={() => setConfirmId(null)}
        onConfirm={() => handleDelete(confirmCategory?.id)}
        message={
          confirmCategory
            ? `के तपाईं "${confirmCategory.name}" श्रेणी मेटाउन निश्चित हुनुहुन्छ? यो कार्य फिर्ता गर्न सकिँदैन।`
            : ""
        }
      >
        {confirmCategory && newsCountFor(confirmCategory.name) > 0 && (
          <p className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-md px-3 py-2 mb-3">
            यस श्रेणीमा हाल {newsCountFor(confirmCategory.name)} वटा समाचार छन्।
            मेटाएपछि ती समाचारहरूको श्रेणी अमान्य हुनेछ।
          </p>
        )}
      </ConfirmDialog>
    </div>
  );
}

export default AdminCategoriesList;
