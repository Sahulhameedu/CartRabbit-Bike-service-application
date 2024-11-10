import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { role, token } = useAuth();
  const location = useLocation();

  return allowedRoles.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : token ? (
    <Navigate to="*" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
