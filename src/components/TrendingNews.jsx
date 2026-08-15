import { useNews } from "../context/NewsContext";
import { Link } from "react-router-dom";

function Trending() {
  const { getNewsByCategory } = useNews();

  const trendingItems = getNewsByCategory("रोचक");

  return (
    <aside className="xl:sticky top-0 self-start w-full z-50">
      <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden w-full">
        {/* Header */}
        <div className="px-4 pt-4 pb-2">
          <h2 className="flex items-center gap-2 text-blue-800 font-bold text-lg">
            <span>📈</span>
            <span>ट्रेन्डिङमा</span>
          </h2>

          <div className="mt-2 border-t-2 border-red-500 w-full" />
        </div>

        {/* List */}
        <ul className="divide-y divide-gray-100">
          {trendingItems.map((item, index) =>
            index <= 4 ? (
              <li key={item.id} className="px-4 py-3">
                <Link
                  to={`/news/${item.id}`}
                  className="flex items-start gap-3 group"
                >
                  <span className="text-red-600 font-bold text-sm w-4 shrink-0">
                    {index + 1}
                  </span>

                  <span className="text-sm text-gray-800 leading-snug group-hover:text-blue-700 transition-colors">
                    {item.headline}
                  </span>
                </Link>
              </li>
            ) : (
              ""
            ),
          )}
        </ul>
      </div>
    </aside>
  );
}

export default Trending;
