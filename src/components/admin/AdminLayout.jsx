import {
  MdDashboard,
  MdArticle,
  MdOutlineCampaign,
  MdOutlineVideoLibrary,
  MdOutlinePhotoLibrary,
  MdLogout,
  MdOutlineOpenInNew,
  MdMessage,
  MdMenu,
  MdClose,
  MdPrivacyTip,
  MdLockReset,
  MdCategory,
  MdSettings,
  MdInfoOutline,
  MdGavel,
} from "react-icons/md";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { useContactMessages } from "../../context/ContactMessageContext";
import { useNavigate, useLocation, NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

const navItems = [
  { to: "/admin", label: "ड्यासबोर्ड", icon: MdDashboard, end: true },
  { to: "/admin/news", label: "समाचार", icon: MdArticle },
  { to: "/admin/ads", label: "विज्ञापन", icon: MdOutlineCampaign },
  { to: "/admin/videos", label: "भिडियो", icon: MdOutlineVideoLibrary },
  { to: "/admin/gallery", label: "ग्यालरी", icon: MdOutlinePhotoLibrary },
  {
    to: "/admin/contact-messages",
    label: "सन्देश",
    icon: MdMessage,
    badgeKey: "unread",
  },
  { to: "/admin/about", label: "हाम्रो बारेमा", icon: MdInfoOutline },
  { to: "/admin/privacy", label: "गोपनीयता नीति", icon: MdPrivacyTip },
  { to: "/admin/terms", label: "नियम तथा सर्तहरू", icon: MdGavel },
  { to: "/admin/categories", label: "श्रेणी", icon: MdCategory },
  { to: "/admin/settings", label: "सेटिङ", icon: MdSettings },
];

function AdminLayout() {
  const { logout } = useAdminAuth();
  const { unreadCount } = useContactMessages();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock background scroll while the mobile/tablet drawer is open — without
  // this, touch-scrolling inside the drawer (or on the dimmed overlay) also
  // scrolls the page underneath it. Restored on close and on unmount so a
  // route change or navigating away never leaves scroll permanently locked.
  useEffect(() => {
    if (!menuOpen) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [menuOpen]);

  function handleLogout() {
    logout();
    navigate("/admin/login");
  }

  const sidebarContent = (
    <>
      <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
        <div>
          <p className="text-lg font-bold">एडमिन प्यानल</p>
          <p className="text-xs text-white/70">Gurukul TV Admin</p>
        </div>
        <button
          onClick={() => setMenuOpen(false)}
          className="lg:hidden p-1.5 rounded hover:bg-white/10 cursor-pointer"
          aria-label="मेनु बन्द गर्नुहोस्"
        >
          <MdClose size={22} />
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto overscroll-contain">
        {navItems.map(({ to, label, icon: Icon, end, badgeKey }) => (
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
            <span className="flex-1">{label}</span>
            {badgeKey === "unread" && unreadCount > 0 && (
              <span className="min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-[11px] font-semibold flex items-center justify-center">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
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
        <NavLink
          to="/admin/change-password"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? "bg-white text-(--primary-color)"
                : "text-white/85 hover:bg-white/10"
            }`
          }
        >
          <MdLockReset size={18} />
          पासवर्ड परिवर्तन
        </NavLink>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-white/85 hover:bg-white/10 cursor-pointer"
        >
          <MdLogout size={18} />
          लगआउट
        </button>
      </div>
    </>
  );

  return (
    <div translate="no" className="min-h-screen flex bg-gray-50">
      <aside className="hidden lg:flex w-64 shrink-0 bg-(--primary-color) text-white flex-col">
        {sidebarContent}
      </aside>

      <div
        className={`lg:hidden fixed inset-0 z-40 transition-opacity ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setMenuOpen(false)}
        />
        <aside
          className={`absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-(--primary-color) text-white flex flex-col transition-transform duration-200 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {sidebarContent}
        </aside>
      </div>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 -ml-2 rounded hover:bg-gray-100 text-gray-700 cursor-pointer"
            aria-label="मेनु खोल्नुहोस्"
          >
            <MdMenu size={22} />
          </button>
          <p className="font-bold text-(--primary-color)">एडमिन प्यानल</p>
        </header>

        <main className="flex-1 min-w-0">
          <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
