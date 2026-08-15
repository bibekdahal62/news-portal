import { Link } from "react-router-dom";
import { useNews } from "../../context/NewsContext";
import { useAds } from "../../context/AdsContext";
import { useVideos } from "../../context/VideoContext";
import {
  MdArticle,
  MdOutlineCampaign,
  MdOutlineVideoLibrary,
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

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">ड्यासबोर्ड</h1>
      <p className="text-gray-500 mb-6">
        तपाईंको न्युज पोर्टलको संक्षिप्त विवरण
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
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
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
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
          {/* <Link
            to="/admin/contact-messages"
            className="px-4 py-2 rounded-md border border-(--primary-color) text-(--primary-color) text-sm font-medium hover:bg-red-500"
          >
            सन्देश
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
