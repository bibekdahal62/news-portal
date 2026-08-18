import { Link } from "react-router-dom";
import { useNews } from "../../context/NewsContext";
import { useAds } from "../../context/AdsContext";
import { useVideos } from "../../context/VideoContext";
import { useContactMessages } from "../../context/ContactMessageContext";
import { useCategories } from "../../context/CategoryContext";
import { displayTime } from "../../utils/time";
import {
  MdArticle,
  MdOutlineCampaign,
  MdOutlineVideoLibrary,
  MdCategory,
  MdMailOutline,
  MdEdit,
} from "react-icons/md";

function StatCard({ icon: Icon, label, value, to }) {
  return (
    <Link
      to={to}
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
    >
      <div className="w-12 h-12 rounded-full bg-(--primary-color)/10 flex items-center justify-center text-(--primary-color)">
        <Icon size={24} />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </Link>
  );
}

function AdminDashboard() {
  const { news } = useNews();
  const { ads } = useAds();
  const { videos } = useVideos();
  const { categories } = useCategories();
  const { messages } = useContactMessages();

  // Newest first, by publish date — used for the "recent content" panel.
  const recentNews = [...news]
    .sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0))
    .slice(0, 5);

  // Contact messages are already stored newest-first (unshifted on submit).
  const recentMessages = messages.slice(0, 5);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">ड्यासबोर्ड</h1>
      <p className="text-gray-500 mb-6">
        तपाईंको न्युज पोर्टलको संक्षिप्त विवरण
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard
          icon={MdArticle}
          label="कुल समाचार"
          value={news.length}
          to="/admin/news"
        />
        <StatCard
          icon={MdOutlineCampaign}
          label="सक्रिय विज्ञापन"
          value={ads.filter((a) => a.active).length}
          to="/admin/ads"
        />
        <StatCard
          icon={MdOutlineVideoLibrary}
          label="भिडियोहरू"
          value={videos.length}
          to="/admin/videos"
        />
        <StatCard
          icon={MdCategory}
          label="कुल श्रेणी"
          value={categories.length}
          to="/admin/categories"
        />
        <StatCard
          icon={MdMailOutline}
          label="सम्पर्क सन्देश"
          value={messages.length}
          to="/admin/contact-messages"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="font-semibold text-gray-900 mb-3">छिटो कार्यहरू</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/news/new"
            className="px-4 py-2 rounded-md bg-(--primary-color) text-white text-sm font-medium hover:opacity-90"
          >
            + नयाँ समाचार
          </Link>
          <Link
            to="/admin/ads/new"
            className="px-4 py-2 rounded-md border border-(--primary-color) text-(--primary-color) text-sm font-medium hover:bg-(--primary-color)/5"
          >
            + नयाँ विज्ञापन
          </Link>
          <Link
            to="/admin/videos/new"
            className="px-4 py-2 rounded-md border border-(--primary-color) text-(--primary-color) text-sm font-medium hover:bg-(--primary-color)/5"
          >
            + नयाँ भिडियो
          </Link>
          <Link
            to="/admin/contact-messages"
            className="px-4 py-2 rounded-md border border-(--primary-color) text-(--primary-color) text-sm font-medium hover:bg-(--primary-color)/5"
          >
            सन्देशहरू हेर्नुहोस्
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">हालैका समाचार</h2>
            <Link
              to="/admin/news"
              className="text-xs text-(--primary-color) hover:underline"
            >
              सबै हेर्नुहोस्
            </Link>
          </div>

          {recentNews.length === 0 ? (
            <p className="text-sm text-gray-400 py-6 text-center">
              अहिलेसम्म कुनै समाचार थपिएको छैन।
            </p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {recentNews.map((item) => {
                const isPublished = item.published !== false;
                return (
                  <li
                    key={item.id}
                    className="py-3 flex items-center gap-3 first:pt-0 last:pb-0"
                  >
                    <img
                      src={item.image}
                      alt={item.headline}
                      className="w-14 h-10 object-cover rounded shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-900 line-clamp-1">
                        {item.headline}
                      </p>
                      <p className="text-xs text-gray-400">
                        {item.category} · {displayTime(item)} ·{" "}
                        <span
                          className={
                            isPublished ? "text-green-600" : "text-gray-500"
                          }
                        >
                          {isPublished ? "प्रकाशित" : "ड्राफ्ट"}
                        </span>
                      </p>
                    </div>
                    <Link
                      to={`/admin/news/${item.id}/edit`}
                      className="p-1.5 rounded hover:bg-gray-100 text-gray-500 shrink-0"
                      title="सम्पादन"
                    >
                      <MdEdit size={16} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Recent messages */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">हालैका सन्देशहरू</h2>
            <Link
              to="/admin/contact-messages"
              className="text-xs text-(--primary-color) hover:underline"
            >
              सबै हेर्नुहोस्
            </Link>
          </div>

          {recentMessages.length === 0 ? (
            <p className="text-sm text-gray-400 py-6 text-center">
              अहिलेसम्म कुनै सन्देश प्राप्त भएको छैन।
            </p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {recentMessages.map((msg) => (
                <li key={msg.id} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {msg.name}
                    </p>
                    <p className="text-xs text-gray-400 shrink-0">{msg.date}</p>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                    {msg.subject}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
