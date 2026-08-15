import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

function ProtectedRoute() {
  const { isAuthenticated } = useAdminAuth();

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
