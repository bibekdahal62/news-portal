import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { Routes, Route, Outlet } from "react-router-dom";

import HomePage from "./pages/home";
import NewsPage from "./pages/news";
import NewsDetail from "./pages/newsDetail";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";
import PrivacyPage from "./pages/privacy";
import VideosPage from "./pages/videosPage";
import VideoDetail from "./pages/videoDetail";
import TermsPage from "./pages/terms";

import NewsCategoryPage from "./pages/newsCategory";

import SearchResultsPage from "./pages/searchResults";

import GalleryPage from "./pages/galleryPage";
import GalleryDetail from "./pages/galleryDetail";

import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import AdminLogin from "./pages/admin/adminLogin";
import AdminDashboard from "./pages/admin/adminDashboard";
import AdminNewsList from "./pages/admin/adminNewsList";
import AdminNewsForm from "./pages/admin/adminNewsForm";
import AdminAdsList from "./pages/admin/adminAdsList";
import AdminAdForm from "./pages/admin/adminAdForm";
import AdminVideosList from "./pages/admin/adminVideosList";
import AdminVideoForm from "./pages/admin/adminVideoForm";
import AdminContactMessage from "./pages/admin/adminContactMessage";
import AdminPrivacy from "./pages/admin/adminPrivacy";
import AdminTerms from "./pages/admin/adminTerms";
import AdminAbout from "./pages/admin/adminAbout";
import AdminSettings from "./pages/admin/adminSettings";

import AdminForgotPassword from "./pages/admin/adminForgotPassword";
import AdminResetPassword from "./pages/admin/adminResetPassword";
import AdminChangePassword from "./pages/admin/adminChangePassword";

import AdminCategoriesList from "./pages/admin/adminCategoriesList";
import AdminCategoryForm from "./pages/admin/adminCategoryForm";

import AdminGalleryList from "./pages/admin/adminGalleryList";
import AdminGalleryForm from "./pages/admin/adminGalleryForm";

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
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/news"
            element={<NewsPage category={"समाचार"} categoryKey="news" />}
          />
          <Route
            path="/news/economy"
            element={<NewsPage category={"अर्थ"} categoryKey="news" />}
          />
          <Route
            path="/news/politics"
            element={<NewsPage category={"राजनीति"} categoryKey="news" />}
          />
          <Route
            path="/news/local"
            element={<NewsPage category={"स्थानिय"} categoryKey="news" />}
          />
          <Route
            path="/news/sports"
            element={<NewsPage category={"खेलकुद"} categoryKey="news" />}
          />
          <Route
            path="/news/entertainment"
            element={<NewsPage category={"मनोरञ्जन"} categoryKey="news" />}
          />
          <Route
            path="/news/international"
            element={
              <NewsPage category={"अन्तर्राष्ट्रिय"} categoryKey="news" />
            }
          />
          <Route
            path="/news/category/:categoryId"
            element={<NewsCategoryPage />}
          />
          {/* Specific /news/* segments above are matched first by React
            Router; this dynamic one only catches numeric-style ids like
            /news/1, which previously had no matching route at all. */}
          <Route path="/news/:id" element={<NewsDetail />} />

          <Route path="/videos" element={<VideosPage />} />
          <Route path="/videos/:id" element={<VideoDetail />} />

          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/gallery/:id" element={<GalleryDetail />} />

          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/forgot-password"
          element={<AdminForgotPassword />}
        />
        <Route path="/admin/reset-password" element={<AdminResetPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />

            <Route path="change-password" element={<AdminChangePassword />} />

            <Route path="news" element={<AdminNewsList />} />
            <Route path="news/new" element={<AdminNewsForm />} />
            <Route path="news/:id/edit" element={<AdminNewsForm />} />

            <Route path="ads" element={<AdminAdsList />} />
            <Route path="ads/new" element={<AdminAdForm />} />
            <Route path="ads/:id/edit" element={<AdminAdForm />} />

            <Route path="videos" element={<AdminVideosList />} />
            <Route path="videos/new" element={<AdminVideoForm />} />
            <Route path="videos/:id/edit" element={<AdminVideoForm />} />

            <Route path="gallery" element={<AdminGalleryList />} />
            <Route path="gallery/new" element={<AdminGalleryForm />} />
            <Route path="gallery/:id/edit" element={<AdminGalleryForm />} />

            <Route path="contact-messages" element={<AdminContactMessage />} />
            <Route path="privacy" element={<AdminPrivacy />} />
            <Route path="terms" element={<AdminTerms />} />
            <Route path="about" element={<AdminAbout />} />
            <Route path="settings" element={<AdminSettings />} />

            <Route path="categories" element={<AdminCategoriesList />} />
            <Route path="categories/new" element={<AdminCategoryForm />} />
            <Route path="categories/:id/edit" element={<AdminCategoryForm />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
