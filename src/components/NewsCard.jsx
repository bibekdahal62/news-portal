import { Link } from "react-router-dom";

function NewsCard({ category, image, headline, description, time, href }) {
  return (
    <Link
      to={href}
      className="block bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden no-underline hover:no-underline group hover:shadow-md transition-shadow"
    >
      {/* 1 + 2: Category badge + Image */}
      <div className="relative">
        <img src={image} alt={headline} className="w-full h-48 object-cover" />
        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
          {category}
        </span>
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

        {/* 5: Time posted, with clock icon */}
        <div className="mt-auto pt-4 flex items-center gap-1 text-xs text-gray-400">
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
        </div>
      </div>
    </Link>
  );
}

export default NewsCard;
