import { useEffect, useState } from "react";
import { useNews } from "../../context/NewsContext";
import { useCategories } from "../../context/CategoryContext";
import { NewsPreviewModal } from "../../components/admin/PreviewModals";
import { displayTime } from "../../utils/time";
import {
  PageHeader,
  ListFilterBar,
  ConfirmDialog,
  StatusBadge,
  ItemActions,
  Pagination,
} from "../../components/admin/common";

const PAGE_SIZE = 8;

function AdminNewsList() {
  const { news, deleteNews, togglePublish } = useNews();
  const { categories } = useCategories();

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
      <PageHeader
        title="समाचार व्यवस्थापन"
        subtitle={`जम्मा ${news.length} समाचार मध्ये ${filtered.length} देखाइँदै`}
        actionLabel="+ नयाँ समाचार"
        actionTo="/admin/news/new"
      />

      <ListFilterBar
        query={query}
        onQueryChange={setQuery}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        categories={categories}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full min-w-160 text-sm">
          <thead className="bg-gray-50 text-gray-500 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">समाचार</th>
              <th className="px-4 py-3 font-medium">श्रेणी</th>
              <th className="px-4 py-3 font-medium">लेखक</th>
              <th className="px-4 py-3 font-medium">मिति</th>
              <th className="px-4 py-3 font-medium">हेराइ</th>
              <th className="px-4 py-3 font-medium">स्थिति</th>
              <th className="px-4 py-3 font-medium text-center">पूर्वावलोकन</th>
              <th className="px-4 py-3 font-medium w-40 text-right">कार्य</th>
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
                        {item.isFeatured && (
                          <span className="ml-2 inline-block bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded align-middle">
                            फिचर
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
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                    {displayTime(item)}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {typeof item.views === "number" ? item.views : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge published={isPublished} variant="table" />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <ItemActions onPreview={() => setPreviewItem(item)} />
                  </td>
                  <td className="px-4 py-3">
                    <ItemActions
                      isPublished={isPublished}
                      onTogglePublish={() => togglePublish(item.id)}
                      editTo={`/admin/news/${item.id}/edit`}
                      onDelete={() => setConfirmId(item.id)}
                    />
                  </td>
                </tr>
              );
            })}

            {paged.length === 0 && (
              <tr>
                <td
                  colSpan={8}
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}

      <ConfirmDialog
        open={confirmId !== null}
        message="के तपाईं यो समाचार मेटाउन निश्चित हुनुहुन्छ? यो कार्य फिर्ता गर्न सकिँदैन।"
        onCancel={() => setConfirmId(null)}
        onConfirm={() => handleDelete(confirmId)}
      />

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
