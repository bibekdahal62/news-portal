import { MdChevronLeft, MdChevronRight } from "react-icons/md";

/**
 * Simple prev/next pager with a "page X of Y" label. Only the news list
 * needs this today, but it's kept generic (just takes page numbers, no
 * knowledge of what's being paginated) so any other list can reuse it once
 * it grows past one page.
 */
function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-between mt-4">
      <p className="text-sm text-gray-500">
        पृष्ठ {currentPage} / {totalPages}
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded border border-gray-300 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
          aria-label="अघिल्लो पृष्ठ"
        >
          <MdChevronLeft size={18} />
        </button>
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-2 rounded border border-gray-300 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
          aria-label="अर्को पृष्ठ"
        >
          <MdChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
