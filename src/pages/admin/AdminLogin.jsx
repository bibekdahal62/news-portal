import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

function AdminLogin() {
  const { isAuthenticated, login } = useAdminAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  function handleSubmit(e) {
    e.preventDefault();
    const ok = login(username.trim(), password);
    if (ok) {
      navigate("/admin");
    } else {
      setErrorMsg("प्रयोगकर्ता नाम वा पासवर्ड मिलेन।");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-lg shadow-md border border-gray-100 p-8"
      >
        <h1 className="text-2xl font-bold text-(--primary-color) mb-1">
          एडमिन लगइन
        </h1>
        <p className="text-sm text-gray-500 mb-6">News Portal Admin Panel</p>

        {errorMsg && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded px-3 py-2">
            {errorMsg}
          </p>
        )}

        <label className="block text-sm font-medium text-gray-700 mb-1">
          प्रयोगकर्ता नाम
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-(--primary-color)"
          autoComplete="username"
          required
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">
          पासवर्ड
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-6 outline-none focus:ring-2 focus:ring-(--primary-color)"
          autoComplete="current-password"
          required
        />

        <button
          type="submit"
          className="w-full bg-(--primary-color) text-white font-semibold rounded-md py-2.5 hover:opacity-90 transition-opacity cursor-pointer"
        >
          लगइन
        </button>

        <p className="mt-4 text-xs text-gray-400">
          डेमो लगइन: admin / admin123
        </p>
      </form>
    </div>
  );
}

export default AdminLogin;
