import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { AuthCard, FormField, FormAlert } from "../../components/admin/common";

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
    <AuthCard
      title="पासवर्ड रिसेट"
      subtitle="इमेल/डेमोमा प्राप्त कोड र नयाँ पासवर्ड हाल्नुहोस्।"
    >
      <form onSubmit={handleSubmit}>
        {errorMsg && (
          <div className="mb-4">
            <FormAlert>{errorMsg}</FormAlert>
          </div>
        )}
        {successMsg && (
          <div className="mb-4">
            <FormAlert type="success">{successMsg}</FormAlert>
          </div>
        )}

        <div className="mb-4">
          <FormField
            label="रिसेट कोड"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="tracking-widest"
            placeholder="६ अंकको कोड"
            required
          />
        </div>

        <div className="mb-4">
          <FormField
            label="नयाँ पासवर्ड"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
            minLength={6}
            required
          />
        </div>

        <div className="mb-6">
          <FormField
            label="नयाँ पासवर्ड पुष्टि गर्नुहोस्"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            minLength={6}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-(--primary-color) text-white font-semibold rounded-md py-2.5 hover:opacity-90 transition-opacity cursor-pointer"
        >
          पासवर्ड रिसेट गर्नुहोस्
        </button>
      </form>

      <p className="mt-6 text-center text-sm">
        <Link to="/admin/login" className="text-(--primary-color) hover:underline">
          लगइनमा फर्कनुहोस्
        </Link>
      </p>
    </AuthCard>
  );
}

export default AdminResetPassword;
