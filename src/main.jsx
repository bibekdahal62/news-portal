import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import { NewsProvider } from "./context/NewsContext.jsx";
import { AdsProvider } from "./context/AdsContext.jsx";
import { VideoProvider } from "./context/VideoContext.jsx";
import { AdminAuthProvider } from "./context/AdminAuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <AdminAuthProvider>
        <NewsProvider>
          <AdsProvider>
            <VideoProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </VideoProvider>
          </AdsProvider>
        </NewsProvider>
      </AdminAuthProvider>
    </LanguageProvider>
  </StrictMode>,
);
