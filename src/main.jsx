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
import { ContactMessageProvider } from "./context/ContactMessageContext.jsx";
import { PrivacyProvider } from "./context/PrivacyContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <AdminAuthProvider>
        <NewsProvider>
          <AdsProvider>
            <VideoProvider>
              <ContactMessageProvider>
                <PrivacyProvider>
                  <BrowserRouter>
                    <App />
                  </BrowserRouter>
                </PrivacyProvider>
              </ContactMessageProvider>
            </VideoProvider>
          </AdsProvider>
        </NewsProvider>
      </AdminAuthProvider>
    </LanguageProvider>
  </StrictMode>,
);
