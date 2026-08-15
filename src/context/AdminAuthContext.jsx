import { createContext, useContext, useState } from "react";

const AdminAuthContext = createContext();

// !! DEMO-ONLY AUTH !!
// There is no backend in this project, so there is nowhere safe to check a
// password. This hardcoded credential check is only enough to gate the
// admin UI during development/demos — anyone who opens devtools can read
// this file and log in.
//
// Login state is kept in sessionStorage (not localStorage): it survives
// page refreshes and new admin pages in the SAME tab, but is cleared the
// moment the tab is closed, and is never shared across tabs/devices. No
// news/ads/video data is stored this way — only this login flag.
const DEMO_ADMIN_USERNAME = "admin";
const DEMO_ADMIN_PASSWORD = "admin123";
const SESSION_KEY = "np_admin_session";

function readSession() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(readSession);

  function login(username, password) {
    if (username === DEMO_ADMIN_USERNAME && password === DEMO_ADMIN_PASSWORD) {
      try {
        sessionStorage.setItem(SESSION_KEY, "true");
      } catch {
        // sessionStorage unavailable (e.g. private browsing) — auth still
        // works for this render, it just won't survive a refresh.
      }
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }

  function logout() {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
