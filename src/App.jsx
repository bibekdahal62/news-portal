import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<h1>This is news page</h1>} />
        <Route path="/contact" element={<h1>This is contact page</h1>} />
        <Route path="/about" element={<h1>This is about page</h1>} />
        <Route path="/privacy" element={<h1>This is privacy policy page</h1>} />
        <Route path="/terms" element={<h1>This is terms page</h1>} />
        <Route path="/politics" element={<h1>This is politics page</h1>} />
        <Route path="/local" element={<h1>This is local page</h1>} />
        <Route path="/sports" element={<h1>This is sports page</h1>} />
        <Route
          path="/international"
          element={<h1>This is international page</h1>}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
