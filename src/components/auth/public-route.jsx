import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/use-auth-store";
import { getAccessToken, isUserAuthenticated } from "../../utils/auth-utils";

const PublicRoute = () => {
  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken) || getAccessToken();

  const isAuthenticated = isUserAuthenticated(user, accessToken);

  if (isAuthenticated) {
    if (user?.role === "developer")
      return <Navigate to="/developer/dashboard" replace />;
    if (user?.role === "admin")
      return <Navigate to="/admin/dashboard" replace />;
    if (user?.role === "user") return <Navigate to="/recently" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
