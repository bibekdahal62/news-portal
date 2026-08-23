import { useState } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { PageHeader, FormField, FormAlert } from "../../components/admin/common";

function AdminChangePassword() {
  const { changePassword } = useAdminAuth();

  const [currentPassword, setCurrentPassword] = useState("");
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

    const result = changePassword(currentPassword, newPassword);
    if (result.success) {
      setSuccessMsg("पासवर्ड सफलतापूर्वक परिवर्तन भयो।");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setErrorMsg(result.message);
    }
  }

  return (
    <div>
      <PageHeader title="पासवर्ड परिवर्तन गर्नुहोस्" />

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 max-w-md flex flex-col gap-4"
      >
        <FormAlert>{errorMsg}</FormAlert>
        <FormAlert type="success">{successMsg}</FormAlert>

        <FormField
          label="हालको पासवर्ड"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        <FormField
          label="नयाँ पासवर्ड"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          autoComplete="new-password"
          minLength={6}
          required
        />

        <FormField
          label="नयाँ पासवर्ड पुष्टि गर्नुहोस्"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
          minLength={6}
          required
        />

        <div className="pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-md bg-(--primary-color) text-white text-sm font-medium hover:opacity-90 cursor-pointer"
          >
            पासवर्ड परिवर्तन गर्नुहोस्
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminChangePassword;
