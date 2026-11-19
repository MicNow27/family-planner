import { useAuth } from "@auth/context/useAuth.ts";
import FullScreenLoader from "@components/loaders/FullScreenLoader/FullScreenLoader.tsx";
import { PROFILE_FETCH_ERROR } from "@navigation/copy/errors.ts";
import { useProfile } from "@navigation/data/profile/useProfile.ts";
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

    if (isError) return <Navigate to="/error-page" replace state={{ message: PROFILE_FETCH_ERROR }} />;

    return profile.onboarding_completed ? <Navigate to="/my-family" replace /> : <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
};

export default AuthGate;
