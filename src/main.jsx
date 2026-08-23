import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import { NewsProvider } from "./context/NewsContext.jsx";
import { AdsProvider } from "./context/AdsContext.jsx";
import { VideoProvider } from "./context/VideoContext.jsx";
import { GalleryProvider } from "./context/GalleryContext.jsx";
import { AdminAuthProvider } from "./context/AdminAuthContext.jsx";
import { ContactMessageProvider } from "./context/ContactMessageContext.jsx";
import { PrivacyProvider } from "./context/PrivacyContext.jsx";
import { TermsProvider } from "./context/TermsContext.jsx";
import { AboutProvider } from "./context/AboutContext.jsx";
import { SettingsProvider } from "./context/SettingsContext.jsx";
import { CategoryProvider } from "./context/CategoryContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <AdminAuthProvider>
        <SettingsProvider>
          <NewsProvider>
            <CategoryProvider>
              <AdsProvider>
                <VideoProvider>
                  <GalleryProvider>
                    <ContactMessageProvider>
                      <PrivacyProvider>
                        <TermsProvider>
                          <AboutProvider>
                            <BrowserRouter>
                              <App />
                            </BrowserRouter>
                          </AboutProvider>
                        </TermsProvider>
                      </PrivacyProvider>
                    </ContactMessageProvider>
                  </GalleryProvider>
                </VideoProvider>
              </AdsProvider>
            </CategoryProvider>
          </NewsProvider>
        </SettingsProvider>
      </AdminAuthProvider>
    </LanguageProvider>
  </StrictMode>,
);
