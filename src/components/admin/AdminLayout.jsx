import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import {
  MdDashboard,
  MdArticle,
  MdOutlineCampaign,
  MdOutlineVideoLibrary,
  MdLogout,
  MdOutlineOpenInNew,
} from "react-icons/md";

const navItems = [
  { to: "/admin", label: "ड्यासबोर्ड", icon: MdDashboard, end: true },
  { to: "/admin/news", label: "समाचार", icon: MdArticle },
  { to: "/admin/ads", label: "विज्ञापन", icon: MdOutlineCampaign },
  { to: "/admin/videos", label: "भिडियो", icon: MdOutlineVideoLibrary },
  { to: "/admin/policy-rule", label: "नीति/नियम", icon: MdArticle },
];

function AdminLayout() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/admin/login");
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 shrink-0 bg-(--primary-color) text-white flex flex-col">
        <div className="px-6 py-5 border-b border-white/10">
          <p className="text-lg font-bold">एडमिन प्यानल</p>
          <p className="text-xs text-white/70">News Portal Admin</p>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white text-(--primary-color)"
                    : "text-white/85 hover:bg-white/10"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10 flex flex-col gap-1">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-white/85 hover:bg-white/10"
          >
            <MdOutlineOpenInNew size={18} />
            साइट हेर्नुहोस्
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-white/85 hover:bg-white/10 cursor-pointer"
          >
            <MdLogout size={18} />
            लगआउट
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="max-w-6xl mx-auto p-6 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
