import { createContext, useContext, useState } from "react";

const AdminAuthContext = createContext();

// !! DEMO-ONLY AUTH !!
// There is no backend in this project, so there is nowhere safe to check a
// password, send a real reset email, or store credentials securely. This
// hardcoded/sessionStorage-backed flow is only enough to demo the admin UI
// during development — anyone who opens devtools can read this file and log
// in, or read the "emailed" reset code straight out of storage.
//
// Login state, the current password, and any pending reset code are kept in
// sessionStorage (not localStorage): they survive page refreshes and new
// admin pages in the SAME tab, but are cleared the moment the tab is closed,
// and are never shared across tabs/devices. No news/ads/video data is
// stored this way — only these auth-related values.
const DEMO_ADMIN_USERNAME = "admin";
const DEFAULT_ADMIN_PASSWORD = "admin123";

const SESSION_KEY = "np_admin_session";
const PASSWORD_KEY = "np_admin_password";
const RESET_CODE_KEY = "np_admin_reset_code";

function readSession() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

function readPassword() {
  try {
    return sessionStorage.getItem(PASSWORD_KEY) || DEFAULT_ADMIN_PASSWORD;
  } catch {
    return DEFAULT_ADMIN_PASSWORD;
  }
}

function writePassword(password) {
  try {
    sessionStorage.setItem(PASSWORD_KEY, password);
  } catch {
    // sessionStorage unavailable (e.g. private browsing) — the new
    // password still works for the rest of this render/session.
  }
}

// Generates a 6-digit numeric code, e.g. "042817".
function generateResetCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(readSession);
  const [adminPassword, setAdminPassword] = useState(readPassword);

  function login(username, password) {
    if (username === DEMO_ADMIN_USERNAME && password === adminPassword) {
      try {
        sessionStorage.setItem(SESSION_KEY, "true");
      } catch {
        // ignore — auth still works for this render
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

  // Used by the "change password" screen while already logged in.
  function changePassword(currentPassword, newPassword) {
    if (currentPassword !== adminPassword) {
      return { success: false, message: "हालको पासवर्ड मिलेन।" };
    }
    if (!newPassword || newPassword.length < 6) {
      return {
        success: false,
        message: "नयाँ पासवर्ड कम्तिमा ६ अक्षरको हुनुपर्छ।",
      };
    }

    setAdminPassword(newPassword);
    writePassword(newPassword);
    return { success: true };
  }

  // Step 1 of "forgot password": no backend/email exists, so this
  // generates a demo reset code and stores it in sessionStorage. The
  // forgot-password page displays it directly (standing in for an email)
  // so the reset-password page can be tested end-to-end.
  function requestPasswordReset(username) {
    if (username !== DEMO_ADMIN_USERNAME) {
      return { success: false, message: "यो प्रयोगकर्ता नाम फेला परेन।" };
    }

    const code = generateResetCode();
    try {
      sessionStorage.setItem(RESET_CODE_KEY, code);
    } catch {
      // ignore — code is still returned for this render
    }
    return { success: true, code };
  }

  // Step 2 of "forgot password": verify the code and set a new password.
  function resetPassword(code, newPassword) {
    let storedCode = null;
    try {
      storedCode = sessionStorage.getItem(RESET_CODE_KEY);
    } catch {
      // ignore
    }

    if (!storedCode || code !== storedCode) {
      return { success: false, message: "रिसेट कोड मिलेन वा म्याद सकिएको छ।" };
    }
    if (!newPassword || newPassword.length < 6) {
      return {
        success: false,
        message: "नयाँ पासवर्ड कम्तिमा ६ अक्षरको हुनुपर्छ।",
      };
    }

    setAdminPassword(newPassword);
    writePassword(newPassword);
    try {
      sessionStorage.removeItem(RESET_CODE_KEY);
    } catch {
      // ignore
    }
    return { success: true };
  }

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        changePassword,
        requestPasswordReset,
        resetPassword,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
