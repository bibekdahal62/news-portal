/**
 * The centered, full-height gray page with a white card in the middle —
 * login, forgot-password and reset-password all use exactly this shell,
 * they just put different content inside it.
 */
function AuthCard({ title, subtitle, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md border border-gray-100 p-8">
        <h1 className="text-2xl font-bold text-(--primary-color) mb-1">
          {title}
        </h1>
        {subtitle && <p className="text-sm text-gray-500 mb-6">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}

export default AuthCard;
