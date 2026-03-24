import { useAuth } from "@/context/auth/useAuth.ts";
import FullScreenLoader from "@/features/auth/FullScreenLoader.tsx";
import { Navigate, Outlet } from "react-router";

type AuthGateProps = {
  requireAuth: boolean;
};

const AuthGate = ({ requireAuth }: AuthGateProps) => {
  const { user, loading } = useAuth();

  if (loading) return <FullScreenLoader />;

  if (requireAuth && !user) return <Navigate to="/" replace />;
  if (!requireAuth && user) return <Navigate to="/my-family" replace />;

  return <Outlet />;
};

export default AuthGate;
