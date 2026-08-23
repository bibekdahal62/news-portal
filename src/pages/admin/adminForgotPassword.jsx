import { useState } from "react";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { AuthCard, FormField, FormAlert } from "../../components/admin/common";

function AdminForgotPassword() {
  const { requestPasswordReset } = useAdminAuth();

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
    <AuthCard
      title="पासवर्ड बिर्सनुभयो?"
      subtitle="आफ्नो प्रयोगकर्ता नाम हाल्नुहोस्, हामी रिसेट कोड पठाउनेछौं।"
    >
      {errorMsg && (
        <div className="mb-4">
          <FormAlert>{errorMsg}</FormAlert>
        </div>
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
          <div className="mb-6">
            <FormField
              label="प्रयोगकर्ता नाम"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-(--primary-color) text-white font-semibold rounded-md py-2.5 hover:opacity-90 transition-opacity cursor-pointer"
          >
            रिसेट कोड पठाउनुहोस्
          </button>
        </form>
      )}

      <p className="mt-6 text-center text-sm">
        <Link to="/admin/login" className="text-(--primary-color) hover:underline">
          लगइनमा फर्कनुहोस्
        </Link>
      </p>
    </AuthCard>
  );
}

export default AdminForgotPassword;
