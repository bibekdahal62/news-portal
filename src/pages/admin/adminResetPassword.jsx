import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

function AdminResetPassword() {
  const { resetPassword } = useAdminAuth();
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (newPassword !== confirmPassword) {
      setErrorMsg("नयाँ पासवर्ड र पुष्टि पासवर्ड मिलेन।");
      return;
    }

    const result = resetPassword(code.trim(), newPassword);
    if (result.success) {
      setSuccessMsg("पासवर्ड सफलतापूर्वक रिसेट भयो। अब लगइन गर्नुहोस्।");
      setTimeout(() => navigate("/admin/login"), 1500);
    } else {
      setErrorMsg(result.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-lg shadow-md border border-gray-100 p-8"
      >
        <h1 className="text-2xl font-bold text-(--primary-color) mb-1">
          पासवर्ड रिसेट
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          इमेल/डेमोमा प्राप्त कोड र नयाँ पासवर्ड हाल्नुहोस्।
        </p>

        {errorMsg && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded px-3 py-2">
            {errorMsg}
          </p>
        )}
        {successMsg && (
          <p className="mb-4 text-sm text-green-700 bg-green-50 border border-green-100 rounded px-3 py-2">
            {successMsg}
          </p>
        )}

        <label className="block text-sm font-medium text-gray-700 mb-1">
          रिसेट कोड
        </label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-(--primary-color) tracking-widest"
          placeholder="६ अंकको कोड"
          required
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">
          नयाँ पासवर्ड
        </label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-(--primary-color)"
          autoComplete="new-password"
          minLength={6}
          required
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">
          नयाँ पासवर्ड पुष्टि गर्नुहोस्
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-6 outline-none focus:ring-2 focus:ring-(--primary-color)"
          autoComplete="new-password"
          minLength={6}
          required
        />

        <button
          type="submit"
          className="w-full bg-(--primary-color) text-white font-semibold rounded-md py-2.5 hover:opacity-90 transition-opacity cursor-pointer"
        >
          पासवर्ड रिसेट गर्नुहोस्
        </button>

        <p className="mt-6 text-center text-sm">
          <Link
            to="/admin/login"
            className="text-(--primary-color) hover:underline"
          >
            लगइनमा फर्कनुहोस्
          </Link>
        </p>
      </form>
    </div>
  );
}

export default AdminResetPassword;
