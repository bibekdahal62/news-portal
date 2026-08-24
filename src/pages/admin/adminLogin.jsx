import { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { AuthCard, FormField, FormAlert } from "../../components/admin/common";

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
    <AuthCard title="एडमिन लगइन" subtitle="Gurukul TV Admin Panel">
      <form onSubmit={handleSubmit}>
        {errorMsg && (
          <div className="mb-4">
            <FormAlert>{errorMsg}</FormAlert>
          </div>
        )}

        <div className="mb-4">
          <FormField
            label="प्रयोगकर्ता नाम"
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </div>

        <div className="mb-2">
          <FormField
            label="पासवर्ड"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        <div className="text-right mb-6">
          <Link
            to="/admin/forgot-password"
            className="text-xs text-(--primary-color) hover:underline"
          >
            पासवर्ड बिर्सनुभयो?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-(--primary-color) text-white font-semibold rounded-md py-2.5 hover:opacity-90 transition-opacity cursor-pointer"
        >
          लगइन
        </button>
      </form>
    </AuthCard>
  );
}

export default AdminLogin;
