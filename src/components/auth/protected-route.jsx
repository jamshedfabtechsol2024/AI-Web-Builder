import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/use-auth-store";
import { getAccessToken, isUserAuthenticated } from "../../utils/auth-utils";

const ProtectedRoute = ({ allowedRoles }) => {
  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken) || getAccessToken();
  const location = useLocation();

  const isAuthenticated = isUserAuthenticated(user, accessToken);

  // ✅ If authenticated and tries to access login → redirect by role
  if (isAuthenticated && location.pathname === "/auth/login") {
    if (user?.role === "developer") {
      return <Navigate replace to="/developer/dashboard" />;
    } else if (user?.role === "admin") {
      return <Navigate replace to="/admin/dashboard" />;
    } else if (user?.role === "user") {
      return <Navigate replace to="/recently" />;
    } else {
      return <Navigate replace to="/auth/login" />;
    }
  }

  // ✅ If NOT authenticated → send to login
  if (!isAuthenticated) {
    return <Navigate replace to="/auth/login" />;
  }

  // ✅ Role protection for protected routes
  if (allowedRoles?.length && !allowedRoles.includes(user?.role)) {
    return <Navigate replace to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
