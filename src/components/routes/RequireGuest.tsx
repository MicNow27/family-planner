import { useAuth } from "@/context/auth/useAuth.ts";
import { Navigate, Outlet } from "react-router";

const RequireGuest = () => {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
};

export default RequireGuest;
