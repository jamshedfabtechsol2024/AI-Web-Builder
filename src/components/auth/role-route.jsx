import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/use-auth-store";

const RoleRoute = ({ role }) => {
  const { isAuthenticated, user } = useAuthStore((s) => ({
    isAuthenticated: s.isAuthenticated,
    user: s.user,
  }));

  if (!isAuthenticated) {
    return <Navigate replace to="/auth/login" />;
  }
  if (!user?.role || user.role !== role) {
    return <Navigate replace to="/" />;
  }
  return <Outlet />;
};

export default RoleRoute;
