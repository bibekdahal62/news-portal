import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

function AdminForgotPassword() {
  const { requestPasswordReset } = useAdminAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [demoCode, setDemoCode] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");
    setDemoCode(null);

    const result = requestPasswordReset(username.trim());
    if (result.success) {
      setDemoCode(result.code);
    } else {
      setErrorMsg(result.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md border border-gray-100 p-8">
        <h1 className="text-2xl font-bold text-(--primary-color) mb-1">
          पासवर्ड बिर्सनुभयो?
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          आफ्नो प्रयोगकर्ता नाम हाल्नुहोस्, हामी रिसेट कोड पठाउनेछौं।
        </p>

        {errorMsg && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded px-3 py-2">
            {errorMsg}
          </p>
        )}

        {demoCode ? (
          <div>
            <p className="mb-3 text-sm text-green-700 bg-green-50 border border-green-100 rounded px-3 py-2">
              रिसेट कोड तयार भयो। (डेमो: यहाँ प्रोडक्सनमा यो कोड इमेलमा पठाइनेछ)
            </p>
            <p className="mb-6 text-center text-2xl font-bold tracking-widest text-(--primary-color)">
              {demoCode}
            </p>
            <Link
              to="/admin/reset-password"
              className="block w-full text-center bg-(--primary-color) text-white font-semibold rounded-md py-2.5 hover:opacity-90 transition-opacity"
            >
              पासवर्ड रिसेट गर्नुहोस्
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              प्रयोगकर्ता नाम
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-6 outline-none focus:ring-2 focus:ring-(--primary-color)"
              autoComplete="username"
              required
            />

            <button
              type="submit"
              className="w-full bg-(--primary-color) text-white font-semibold rounded-md py-2.5 hover:opacity-90 transition-opacity cursor-pointer"
            >
              रिसेट कोड पठाउनुहोस्
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm">
          <Link
            to="/admin/login"
            className="text-(--primary-color) hover:underline"
          >
            लगइनमा फर्कनुहोस्
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AdminForgotPassword;
