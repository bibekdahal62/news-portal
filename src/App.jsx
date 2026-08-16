import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route, Outlet } from "react-router-dom";

import HomePage from "./pages/home";
import NewsPage from "./pages/news";
import NewsDetail from "./pages/NewsDetail";
import AboutPage from "./pages/about";
import ContactPage from "./pages/Contact";
import VideosPage from "./pages/VideosPage";
import VideoDetail from "./pages/VideoDetail";
import PolicyRule from "./pages/PolicyRule";

import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminNewsList from "./pages/admin/AdminNewsList";
import AdminNewsForm from "./pages/admin/AdminNewsForm";
import AdminAdsList from "./pages/admin/AdminAdsList";
import AdminAdForm from "./pages/admin/AdminAdForm";
import AdminVideosList from "./pages/admin/AdminVideosList";
import AdminVideoForm from "./pages/admin/AdminVideoForm";
import AdminPolicyRule from "./pages/admin/AdminPolicyRule";

// Public pages keep the site Header/Footer. Admin pages get their own
// AdminLayout (sidebar) instead, so this splits the two into separate
// route trees rather than always rendering Header/Footer everywhere.
function PublicLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/news" element={<NewsPage category={"समाचार"} />} />
        <Route path="/news/economy" element={<NewsPage category={"अर्थ"} />} />
        <Route
          path="/news/politics"
          element={<NewsPage category={"राजनीति"} />}
        />
        <Route path="/news/local" element={<NewsPage category={"स्थानिय"} />} />
        <Route path="/news/sports" element={<NewsPage category={"खेलकुद"} />} />
        <Route
          path="/news/entertainment"
          element={<NewsPage category={"मनोरञ्जन"} />}
        />
        <Route
          path="/news/international"
          element={<NewsPage category={"अन्तर्राष्ट्रिय"} />}
        />
        {/* Specific /news/* segments above are matched first by React
            Router; this dynamic one only catches numeric-style ids like
            /news/1, which previously had no matching route at all. */}
        <Route path="/news/:id" element={<NewsDetail />} />

        <Route path="/videos" element={<VideosPage />} />
        <Route path="/videos/:id" element={<VideoDetail />} />

        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/policy-rule" element={<PolicyRule />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />

          <Route path="news" element={<AdminNewsList />} />
          <Route path="news/new" element={<AdminNewsForm />} />
          <Route path="news/:id/edit" element={<AdminNewsForm />} />

          <Route path="ads" element={<AdminAdsList />} />
          <Route path="ads/new" element={<AdminAdForm />} />
          <Route path="ads/:id/edit" element={<AdminAdForm />} />

          <Route path="videos" element={<AdminVideosList />} />
          <Route path="videos/new" element={<AdminVideoForm />} />
          <Route path="videos/:id/edit" element={<AdminVideoForm />} />
          <Route path="/admin/policy-rule" element={<AdminPolicyRule />}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
