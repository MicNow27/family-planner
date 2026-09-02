import FullScreenLoader from "@/components/loaders/FullScreenLoader/FullScreenLoader.tsx";
import { useAuth } from "@/context/auth/useAuth.ts";
import { useProfile } from "@/data/profile/useProfile.ts";
import { SOMETHING_WRONG_PROFILE } from "@copy/profile.ts";
import { Navigate, Outlet } from "react-router";

type AuthGateProps = {
  requireAuth: boolean;
};

const AuthGate = ({ requireAuth }: AuthGateProps) => {
  const { user, loading } = useAuth();
  const { data: profile, isPending, isError } = useProfile(user?.id);

  if (loading) return <FullScreenLoader />;

  if (requireAuth && !user) return <Navigate to="/" replace />;

  if (!requireAuth && user) {
    if (isPending) return <FullScreenLoader />;

    if (isError) return <Navigate to="/error-page" replace state={{ message: SOMETHING_WRONG_PROFILE }} />;

    return profile.onboarding_completed ? <Navigate to="/my-family" replace /> : <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
};

export default AuthGate;
