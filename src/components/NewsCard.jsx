import { Link } from "react-router-dom";
import { formatViewsNe } from "../utils/time";

function NewsCard({
  id,
  category,
  image,
  headline,
  description,
  time,
  href,
  author,
  views,
  isBreaking,
}) {
  return (
    <Link
      to={`/news/${id}`}
      className="block bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden no-underline hover:no-underline group hover:shadow-md transition-shadow"
    >
      {/* 1 + 2: Category badge + Image */}
      <div className="relative">
        <img src={image} alt={headline} className="w-full h-48 object-cover" />
        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
          {category}
        </span>
        {isBreaking && (
          <span className="absolute top-3 right-3 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded animate-pulse">
            ब्रेकिङ
          </span>
        )}
      </div>

      <div className="p-4">
        {/* 3: Headline (link styling, no underline, color shift on hover) */}
        <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-blue-700 transition-colors">
          {headline}
        </h3>

        {/* 4: Description */}
        <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* 5: Author + time posted + views */}
        <div className="mt-auto pt-4 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span>{time}</span>
            {author && <span className="hidden sm:inline">· {author}</span>}
          </div>

          {typeof views === "number" && views > 0 && (
            <div className="flex items-center gap-1 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span>{formatViewsNe(views)}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default NewsCard;
