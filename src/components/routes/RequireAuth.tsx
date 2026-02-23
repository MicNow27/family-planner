import { useAuth } from "@/context/auth/useAuth.ts";
import FullScreenLoader from "@/features/auth/FullScreenLoader/FullScreenLoader.tsx";
import { Navigate, Outlet } from "react-router";

const RequireAuth = () => {
  const { user, loading } = useAuth();

  if (loading) return <FullScreenLoader />;

  if (!user) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default RequireAuth;
