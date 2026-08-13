import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/home";
import NewsPage from "./pages/news";
import AboutPage from "./pages/about";

function App() {
  return (
    <>
      <Header />
      <Routes>
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
        <Route path="/contact" element={<h1>This is contact page</h1>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<h1>This is privacy policy page</h1>} />
        <Route path="/terms" element={<h1>This is terms page</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
