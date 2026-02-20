import { useAuth } from "@/context/auth/useAuth.ts";
import { Navigate, Outlet } from "react-router";

const RequireAuth = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default RequireAuth;
